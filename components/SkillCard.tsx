 "use client";

import { useState } from "react";

interface SkillCardProps {
  title: string;
  htmlEn: string;
  rawEn: string;
  htmlZh: string;
  rawZh: string;
}

export default function SkillCard({
  title,
  htmlEn,
  rawEn,
  htmlZh,
  rawZh,
}: SkillCardProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState<"en" | "zh">("en");

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleCopy = async () => {
    const textToCopy = lang === "en" ? rawEn : rawZh;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const html = lang === "en" ? htmlEn || htmlZh : htmlZh || htmlEn;

  return (
    <div className={`skill-card${open ? " skill-card-open" : ""}`}>
      <button
        type="button"
        className="skill-card-header"
        onClick={handleToggle}
      >
        <div className="skill-card-title-row">
          <span className="skill-card-title">{title}</span>
          <span className="skill-card-toggle">{open ? "▴" : "▾"}</span>
        </div>
      </button>
      {open && (
        <div className="skill-card-body">
          <div className="skill-card-lang-tabs">
            <button
              type="button"
              className={`skill-card-lang-tab${
                lang === "en" ? " skill-card-lang-tab-active" : ""
              }`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`skill-card-lang-tab${
                lang === "zh" ? " skill-card-lang-tab-active" : ""
              }`}
              onClick={() => setLang("zh")}
            >
              中文
            </button>
          </div>
          <div className="skill-card-toolbar">
            <button
              type="button"
              className="skill-card-copy-btn"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy"}
              title={copied ? "Copied" : "Copy"}
            >
              <span className="skill-card-copy-icon">
                {copied ? "✓" : "⧉"}
              </span>
            </button>
          </div>
          <div
            className="skill-card-content prose"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      )}
    </div>
  );
}

