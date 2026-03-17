import Link from "next/link";
import type { PostMeta } from "@/lib/posts";

interface PostCardProps {
  post: PostMeta;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  const formatter = new Intl.DateTimeFormat("zh-HK", {
    timeZone: "Asia/Hong_Kong",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`} className="post-card">
      <div className="post-card-header-row">
        {post.tags && post.tags.length > 0 && (
          <div className="post-card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        <h3 className="post-card-title">{post.title}</h3>
      </div>
      {post.description && (
        <p className="post-card-desc">{post.description}</p>
      )}
      {post.date && (
        <time className="post-card-date" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      )}
    </Link>
  );
}
