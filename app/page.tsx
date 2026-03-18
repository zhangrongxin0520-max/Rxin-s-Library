import fs from "fs";
import path from "path";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { markdownToHtml } from "@/lib/markdown";
import PostCard from "@/components/PostCard";
import SkillCard from "@/components/SkillCard";

export default async function HomePage() {
  const posts = getPosts();
  const aiPosts = posts.filter(
    (post) => post.tags && post.tags.includes("AI"),
  );
  const nonAiPosts = posts.filter(
    (post) => !post.tags || !post.tags.includes("AI"),
  );

  const docCnPath = path.join(
    process.cwd(),
    "content/docs/stock-research-assistant-cn.md",
  );
  const docEnPath = path.join(
    process.cwd(),
    "content/docs/stock-research-assistant-en.md",
  );

  const docCnRaw = fs.existsSync(docCnPath)
    ? fs.readFileSync(docCnPath, "utf8")
    : "";
  const docEnRaw = fs.existsSync(docEnPath)
    ? fs.readFileSync(docEnPath, "utf8")
    : "";

  const geoCnPath = path.join(
    process.cwd(),
    "content/docs/geopolitics_skills_cn.md",
  );
  const geoEnPath = path.join(
    process.cwd(),
    "content/docs/geopolitics_skills_en.md",
  );

  const geoCnRaw = fs.existsSync(geoCnPath)
    ? fs.readFileSync(geoCnPath, "utf8")
    : "";
  const geoEnRaw = fs.existsSync(geoEnPath)
    ? fs.readFileSync(geoEnPath, "utf8")
    : "";

  const [docCnHtml, docEnHtml, geoCnHtml, geoEnHtml] = await Promise.all([
    docCnRaw ? markdownToHtml(docCnRaw) : Promise.resolve(""),
    docEnRaw ? markdownToHtml(docEnRaw) : Promise.resolve(""),
    geoCnRaw ? markdownToHtml(geoCnRaw) : Promise.resolve(""),
    geoEnRaw ? markdownToHtml(geoEnRaw) : Promise.resolve(""),
  ]);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Welcome to Rxin&apos;s Library
          </h1>
          <p className="hero-desc">
            A collection of the <strong>best resources</strong> on AI and Finance.
            All resources are <strong>free</strong> to access and frinedly to non-experienced people.
          

          </p>
        </div>
      </section>

      <section id="skills" className="section skills">
        <div className="container">
          <h2 className="section-title">Prompts</h2>
          <div className="skill-grid">
            <SkillCard
              title="Stock Research Assistant"
              htmlEn={docEnHtml}
              rawEn={docEnRaw}
              htmlZh={docCnHtml}
              rawZh={docCnRaw}
            />
            <SkillCard
              title="Geopolitics Skill"
              htmlEn={geoEnHtml}
              rawEn={geoEnRaw}
              htmlZh={geoCnHtml}
              rawZh={geoCnRaw}
            />
          </div>
        </div>
      </section>

      <section id="blogs" className="section blogs">
        <div className="container blogs-layout">
          <div className="blogs-intro">
            <h2 className="section-title">BLOGs</h2>
            <p>
              Learn from the best.
              Official blogs from major AI labs and platforms.
              Find the latest news and updates here.
            </p>
          </div>
          <div className="blogs-list">
            <div className="blogs-column">
              <a
                href="https://openai.com/blog"
                target="_blank"
                rel="noreferrer"
                className="blog-link"
              >
                <h3>OpenAI Blog</h3>
                <p>Official updates on models, products, and research.</p>
              </a>
              <a
                href="https://deepmind.google/discover/blog"
                target="_blank"
                rel="noreferrer"
                className="blog-link"
              >
                <h3>Google DeepMind</h3>
                <p>Research breakthroughs and AI science stories.</p>
              </a>
            </div>
            <div className="blogs-column">
              <a
                href="https://www.anthropic.com/news"
                target="_blank"
                rel="noreferrer"
                className="blog-link"
              >
                <h3>Anthropic</h3>
                <p>News and posts on Claude and safety research.</p>
              </a>
              <a
                href="https://developer.nvidia.com/blog"
                target="_blank"
                rel="noreferrer"
                className="blog-link"
              >
                <h3>NVIDIA Developer Blog</h3>
                <p>GPU, AI infrastructure, and developer guides.</p>
              </a>
              <a
                href="https://claude.com/blog?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="blog-link"
              >
                <h3>Claude Blog</h3>
                <p>Product updates and usage tips for Claude.</p>
              </a>
              <a
                href="https://qwen.lm/zh-cn/blog?utm_source=chatgpt.com"
                target="_blank"
                rel="noreferrer"
                className="blog-link"
              >
                <h3>Qwen Blog</h3>
                <p>Official posts from Qwen (通义千问).</p>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="ai-notebook" className="section works">
        <div className="container">
          <h2 className="section-title">AI Notebook</h2>
          <p className="section-intro">
            Forget boring textbooks! Turn AI&apos;s &quot;mystery box&quot; into
            easy-to-grasp stories.
          </p>
          <div className="post-grid">
            {aiPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="section works">
        <div className="container">
          <h2 className="section-title">
            <Link href="/posts">Works &amp; Writing</Link>
          </h2>
          <p className="section-intro">
              Finance is what I thougt very mysterious before.
              Here, you'll find it easy under my words. ^^
          </p>
          <div className="post-grid">
            {nonAiPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="container">
          <h2 className="section-title">About</h2>
          <div className="about-card">
            <p>

              I created this site simply to organize what I have learned and practiced on AI and Finance.
              Feel free to browse and reach out
              Hope you can enjoy and find something useful.
              If you have any questions, feel free to contact me:
              <a href="mailto:zhangrongxin0520@gmail.com">zhangrongxin0520@gmail.com</a>
              <br />
              Have a good day!  --By ZRX
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
