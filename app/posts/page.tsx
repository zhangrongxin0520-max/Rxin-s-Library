import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default function PostsIndexPage() {
  const posts = getPosts();

  return (
    <section className="section works">
      <div className="container">
        <h1 className="section-title">Works &amp; Writing</h1>
        <p className="section-intro">
          In this section I mainly share what I&apos;ve learned in finance:
          concepts, cases and my own reflections. Click any article below to
          read it in full.
        </p>
        <div className="post-grid">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="post-card"
            >
              <h2 className="post-card-title">{post.title}</h2>
              {post.description && (
                <p className="post-card-desc">{post.description}</p>
              )}
            </Link>
          ))}
        </div>
        <p className="back-home-link">
          <Link href="/">← Back to home</Link>
        </p>
      </div>
    </section>
  );
}

