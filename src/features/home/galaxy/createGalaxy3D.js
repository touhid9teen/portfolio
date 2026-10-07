import * as THREE from "three";
import { GALAXY_STAR_COLORS } from "./galaxyPalette";

const ARM_COUNT = 3;
const DISK_POINT_COUNT = 2600;
const CORE_POINT_COUNT = 750;
const FIELD_POINT_COUNT = 340;
const BRIGHT_POINT_COUNT = 90;
const GALAXY_RADIUS = 10;
const ARM_WINDING = 0.6;
const DISK_TILT_X = 0.42;
const ROTATION_SPEED = -0.06; // radians per second — slow, majestic spin
const CAMERA_FOV = 45;
const CAMERA_POSITION = { x: 0, y: 5.8, z: 13.2 };
const PARALLAX_STRENGTH = { x: 1.15, y: 0.7 };
const MAX_PIXEL_RATIO = 2;

// Reuse the site palette; a few extra accents for core/bright stars on the light theme
const CORE_STAR_COLORS = ["#7c3aed", "#a855f7", "#6d28d9", "#4f46e5"];
const BRIGHT_STAR_COLORS = ["#4f46e5", "#6366f1", "#7c3aed", "#93c5fd"];

function gaussianRandom() {
  return (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
}

function randomStarColor(target) {
  const palette = Math.random() < 0.5 ? GALAXY_STAR_COLORS : BRIGHT_STAR_COLORS;
  return target.set(palette[Math.floor(Math.random() * palette.length)]);
}

function createSoftDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.4, "rgba(255, 255, 255, 0.8)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createStarGeometry(count, place) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const color = new THREE.Color();
  for (let index = 0; index < count; index += 1) {
    const point = place(index);
    positions[index * 3] = point.x;
    positions[index * 3 + 1] = point.y;
    positions[index * 3 + 2] = point.z;
    color.set(point.color);
    colors[index * 3] = color.r;
    colors[index * 3 + 1] = color.g;
    colors[index * 3 + 2] = color.b;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

function createStarMaterial(size, opacity, map) {
  return new THREE.PointsMaterial({
    size,
    map,
    vertexColors: true,
    transparent: true,
    opacity,
    depthWrite: false,
    sizeAttenuation: true,
  });
}

// Spiral-arm disk with real vertical thickness that grows outward
function placeDiskStar(index) {
  const dist = Math.pow(Math.random(), 0.62) * GALAXY_RADIUS;
  const armAngle = (index % ARM_COUNT) * ((Math.PI * 2) / ARM_COUNT);
  const angle =
    armAngle + dist * ARM_WINDING + gaussianRandom() * (0.14 + (dist / GALAXY_RADIUS) * 0.3);
  return {
    x: Math.cos(angle) * dist,
    y: gaussianRandom() * (0.18 + (dist / GALAXY_RADIUS) * 0.6),
    z: Math.sin(angle) * dist,
    color: randomStarColor(new THREE.Color()),
  };
}

function placeCoreStar() {
  const radius = Math.abs(gaussianRandom()) * 1.8;
  const theta = Math.random() * Math.PI * 2;
  const cosPhi = 2 * Math.random() - 1;
  const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
  return {
    x: radius * sinPhi * Math.cos(theta),
    y: radius * cosPhi * 0.55,
    z: radius * sinPhi * Math.sin(theta),
    color: new THREE.Color(CORE_STAR_COLORS[Math.floor(Math.random() * CORE_STAR_COLORS.length)]),
  };
}

function placeBrightStar(index) {
  const dist = Math.pow(Math.random(), 0.7) * GALAXY_RADIUS;
  const armAngle = (index % ARM_COUNT) * ((Math.PI * 2) / ARM_COUNT);
  const angle = armAngle + dist * ARM_WINDING + gaussianRandom() * 0.12;
  return {
    x: Math.cos(angle) * dist,
    y: gaussianRandom() * 0.35,
    z: Math.sin(angle) * dist,
    color: new THREE.Color(BRIGHT_STAR_COLORS[Math.floor(Math.random() * BRIGHT_STAR_COLORS.length)]),
  };
}

function placeFieldStar() {
  const dist = GALAXY_RADIUS * (1.08 + Math.random() * 0.9);
  const theta = Math.random() * Math.PI * 2;
  const cosPhi = 2 * Math.random() - 1;
  const sinPhi = Math.sqrt(1 - cosPhi * cosPhi);
  return {
    x: dist * sinPhi * Math.cos(theta),
    y: dist * cosPhi * 0.55,
    z: dist * sinPhi * Math.sin(theta),
    color: randomStarColor(new THREE.Color()),
  };
}

export default function createGalaxy3D(host) {
  if (!host) return undefined;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  } catch {
    return undefined; // WebGL unavailable — the page just keeps its plain backdrop
  }

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO));
  renderer.setSize(host.clientWidth || window.innerWidth, host.clientHeight || window.innerHeight);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    CAMERA_FOV,
    (host.clientWidth || window.innerWidth) / (host.clientHeight || window.innerHeight),
    0.1,
    100,
  );
  camera.position.set(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z);

  const dotTexture = createSoftDotTexture();

  const galaxy = new THREE.Group();
  galaxy.rotation.x = DISK_TILT_X;
  scene.add(galaxy);

  const diskPoints = new THREE.Points(
    createStarGeometry(DISK_POINT_COUNT, placeDiskStar),
    createStarMaterial(0.085, 0.75, dotTexture),
  );
  const corePoints = new THREE.Points(
    createStarGeometry(CORE_POINT_COUNT, placeCoreStar),
    createStarMaterial(0.12, 0.85, dotTexture),
  );
  const brightPoints = new THREE.Points(
    createStarGeometry(BRIGHT_POINT_COUNT, placeBrightStar),
    createStarMaterial(0.2, 0.95, dotTexture),
  );
  const fieldPoints = new THREE.Points(
    createStarGeometry(FIELD_POINT_COUNT, placeFieldStar),
    createStarMaterial(0.07, 0.5, dotTexture),
  );
  diskPoints.renderOrder = 0;
  corePoints.renderOrder = 1;
  brightPoints.renderOrder = 2;
  fieldPoints.renderOrder = 0;
  galaxy.add(diskPoints, corePoints, brightPoints, fieldPoints);

  // Soft core haze — normal blending so it tints the white background like a glow
  const hazeInner = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: dotTexture, color: 0xa855f7, transparent: true, opacity: 0.32, depthWrite: false }),
  );
  hazeInner.scale.set(6.5, 6.5, 1);
  hazeInner.renderOrder = -1;
  const hazeOuter = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: dotTexture, color: 0x6366f1, transparent: true, opacity: 0.18, depthWrite: false }),
  );
  hazeOuter.scale.set(11.5, 11.5, 1);
  hazeOuter.renderOrder = -2;
  scene.add(hazeOuter, hazeInner);

  const pointerTarget = { x: 0, y: 0 };
  const pointerSmooth = { x: 0, y: 0 };
  const handlePointerMove = (event) => {
    pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerTarget.y = (event.clientY / window.innerHeight) * 2 - 1;
  };

  const clock = new THREE.Clock();
  let frameId = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderFrame = () => {
    const delta = Math.min(clock.getDelta(), 0.05);
    const time = clock.elapsedTime;
    galaxy.rotation.y += ROTATION_SPEED * delta;
    pointerSmooth.x += (pointerTarget.x - pointerSmooth.x) * 0.04;
    pointerSmooth.y += (pointerTarget.y - pointerSmooth.y) * 0.04;
    camera.position.x =
      CAMERA_POSITION.x + pointerSmooth.x * PARALLAX_STRENGTH.x + Math.sin(time * 0.13) * 0.35;
    camera.position.y =
      CAMERA_POSITION.y - pointerSmooth.y * PARALLAX_STRENGTH.y + Math.cos(time * 0.09) * 0.22;
    camera.lookAt(0, 0, 0);
    hazeInner.material.opacity = 0.3 + Math.sin(time * 1.6) * 0.05;
    renderer.render(scene, camera);
  };

  const renderLoop = () => {
    renderFrame();
    frameId = requestAnimationFrame(renderLoop);
  };

  const handleResize = () => {
    const width = host.clientWidth || window.innerWidth;
    const height = host.clientHeight || window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    if (reducedMotion) renderFrame();
  };

  if (reducedMotion) {
    renderFrame(); // one static frame, no loop, no parallax
  } else {
    window.addEventListener("pointermove", handlePointerMove);
    renderLoop();
  }
  window.addEventListener("resize", handleResize);

  return () => {
    cancelAnimationFrame(frameId);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("resize", handleResize);
    scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
      else if (object.material) object.material.dispose();
    });
    dotTexture.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
