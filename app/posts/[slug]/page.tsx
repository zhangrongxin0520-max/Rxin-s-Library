import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: any) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.content);

  return (
    <article className="post-page">
      <div className="container">
        <Link href="/" className="back-link">← Back to Home</Link>
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          {post.date && (
            <time dateTime={post.date} className="post-date">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
