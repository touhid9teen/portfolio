import { GALAXY_STAR_COLORS } from "./galaxyPalette";
import { GALAXY_POINTS, GRID_HEIGHT, GRID_WIDTH, ROTATION_SPEED } from "./galaxyPoints";

const GLYPHS = " .·:+*#@";
const CORE_COLOR = "#e0e7ff";
const CORE_RADIUS = 8;

function createGrid() {
  return Array.from({ length: GRID_HEIGHT }, () =>
    Array.from({ length: GRID_WIDTH }, () => ({ brightness: 0, colorIndex: 0 }))
  );
}

function applyGalaxyPoints(grid, time) {
  for (const point of GALAXY_POINTS) {
    const angle = point.angle + time * ROTATION_SPEED;
    const x = Math.floor((Math.cos(angle) * point.dist + 1) * 0.5 * (GRID_WIDTH - 1));
    const y = Math.floor((Math.sin(angle) * point.dist + 1) * 0.5 * (GRID_HEIGHT - 1));
    if (x < 0 || x >= GRID_WIDTH || y < 0 || y >= GRID_HEIGHT) continue;
    const twinkle = 0.4 + 0.6 * Math.abs(Math.sin(time * point.twinkleSpeed + point.twinkleOffset));
    const brightness = point.brightness * twinkle;
    if (brightness > grid[y][x].brightness) grid[y][x] = { brightness, colorIndex: point.colorIndex };
  }
}

function applyCoreGlow(grid, time) {
  const centerX = Math.floor(GRID_WIDTH / 2);
  const centerY = Math.floor(GRID_HEIGHT / 2);
  for (let y = -8; y <= 8; y += 1) {
    for (let x = -12; x <= 12; x += 1) {
      const radius = Math.sqrt((x * 0.5) ** 2 + y ** 2);
      if (radius >= CORE_RADIUS) continue;
      const brightness = (1 - radius / CORE_RADIUS) * (0.85 + 0.15 * Math.sin(time * 3 + x * 0.3 + y * 0.5));
      const row = centerY + y;
      const column = centerX + x;
      if (row >= 0 && row < GRID_HEIGHT && column >= 0 && column < GRID_WIDTH && brightness > grid[row][column].brightness) {
        grid[row][column] = { brightness, colorIndex: -1 };
      }
    }
  }
}

function rowToMarkup(row) {
  return row.map((cell) => {
    const glyph = GLYPHS[Math.floor(cell.brightness * (GLYPHS.length - 1))];
    if (glyph === " ") return " ";
    const color = cell.colorIndex === -1 ? CORE_COLOR : GALAXY_STAR_COLORS[cell.colorIndex];
    return `<span style="color:${color}">${glyph}</span>`;
  }).join("");
}

export default function renderAsciiGalaxy(time) {
  const grid = createGrid();
  applyGalaxyPoints(grid, time);
  applyCoreGlow(grid, time);
  return grid.map(rowToMarkup).join("\n");
}
