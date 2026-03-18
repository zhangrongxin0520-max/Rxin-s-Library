"use client";

import { useEffect, useRef } from "react";

type Props = {
  html: string;
};

export default function ProseWithCopy({ html }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const pres = Array.from(root.querySelectorAll("pre"));
    for (const pre of pres) {
      // Avoid duplicate buttons on hot reload / re-render
      if (pre.querySelector(":scope > button[data-copy-code]")) continue;

      pre.classList.add("code-block");

      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.copyCode = "true";
      btn.className = "code-copy-btn";
      btn.textContent = "Copy";

      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code");
        const text = code?.textContent ?? pre.textContent ?? "";

        try {
          await navigator.clipboard.writeText(text.trimEnd());
          btn.textContent = "Copied";
          btn.setAttribute("aria-label", "Copied");
          window.setTimeout(() => {
            btn.textContent = "Copy";
            btn.setAttribute("aria-label", "Copy");
          }, 1200);
        } catch {
          btn.textContent = "Failed";
          window.setTimeout(() => {
            btn.textContent = "Copy";
          }, 1200);
        }
      });

      pre.prepend(btn);
    }
  }, [html]);

  return (
    <div
      ref={ref}
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

