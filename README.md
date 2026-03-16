# 个人作品集站点

基于 Next.js 14 的静态站点，用于展示作品与文章。

## 开发

```bash
npm install
npm run dev
```

浏览器打开 [http://localhost:3000](http://localhost:3000)。

## 添加文章

在 `content/posts/` 下新建 `.md` 文件，顶部写 frontmatter：

```yaml
---
title: 文章标题
date: 2025-03-04
description: 简短描述
tags: [标签1, 标签2]
---
```

正文使用标准 Markdown 书写。

## 构建

```bash
npm run build
npm start
```
