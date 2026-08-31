import posts from "../data/posts";
import ExternalLinkIcon from "../../../shared/components/ExternalLinkIcon";

export default function BlogPosts() {
  return (
    <main className="max-w-2xl mx-auto max-sm:px-1">
      <h1 className="mb-10 font-recoleta text-2xl font-bold text-[#111] sm:text-3xl max-sm:mb-8 max-sm:text-xl">
        all posts
      </h1>

      <ul className="space-y-0">
        {posts.map((post, index) => (
          <li
            key={`${post.date}-${post.url}`}
            className="border-t border-[#e5e7eb] py-5 first:border-t-0"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="shrink-0 font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-[#9ca3af] sm:text-[0.75rem]">
                {post.date}
              </span>

              <a
                href={post.url}
                className="group inline-flex items-start gap-2 font-medium text-[#374151] transition-colors hover:text-[#111] max-sm:min-w-0"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="font-recoleta font-semibold text-[0.95rem] leading-snug sm:text-[1.05rem]">
                  {post.title}
                </span>
                <ExternalLinkIcon className="mt-1.5 h-3.5 w-3.5 shrink-0 text-[#9ca3af] transition-colors group-hover:text-[#111]" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
