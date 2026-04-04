import posts from "../data/posts";
import ExternalLinkIcon from "./ExternalLinkIcon";

export default function BlogPosts() {
  return (
    <main className="max-sm:px-1">
      <h1 className="mb-8 font-recoleta text-3xl text-fg sm:text-4xl max-sm:mb-6 max-sm:text-2xl">
        all posts
      </h1>

      <ul className="space-y-2 max-sm:space-y-3">
        {posts.map((post) => (
          <li
            key={`${post.date}-${post.url}`}
            className="flex flex-col gap-1 text-sm sm:flex-row sm:gap-4 sm:text-base"
          >
            <span className="shrink-0 font-mono text-fg-muted">
              {post.date}
            </span>

            <a
              href={post.url}
              className="inline-flex gap-1 text-accent transition-colors hover:text-cyan-300 hover:underline max-sm:min-w-0 max-sm:leading-relaxed"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="mt-1.5 mr-1 h-3 w-3 shrink-0" />
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
