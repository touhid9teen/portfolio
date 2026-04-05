import posts from "../data/posts";
import ExternalLinkIcon from "../../../shared/components/ExternalLinkIcon";

export default function BlogPosts() {
  return (
    <main className="max-sm:px-1">
      <h1 className="mb-8 font-recoleta text-xl text-fg sm:text-2xl max-sm:mb-6 max-sm:text-lg">
        all posts
      </h1>

      <ul className="space-y-2.5 max-sm:space-y-3.5">
        {posts.map((post) => (
          <li
            key={`${post.date}-${post.url}`}
            className="flex flex-col gap-1.5 text-[0.95rem] leading-relaxed sm:flex-row sm:items-start sm:gap-4 sm:text-[1.02rem]"
          >
            <span className="shrink-0 font-mono text-[0.76rem] font-semibold uppercase tracking-[0.14em] text-[#a5b4fc] sm:text-[0.8rem]">
              {post.date}
            </span>

            <a
              href={post.url}
              className="inline-flex items-start gap-1.5 font-medium text-[#dbeafe] transition-colors hover:text-cyan-200 hover:underline max-sm:min-w-0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon className="mt-1.5 h-3 w-3 shrink-0" />
              {post.title}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
