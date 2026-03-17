# Blog (Section)

A blog section displaying articles in a grid or list layout with author information, publication date, read time, and article excerpts. Perfect for content-heavy sites.

## When to Use

| Scenario               | Use Blog                                 |
| ---------------------- | ---------------------------------------- |
| Blog home page         | ✅ Yes - displays multiple articles      |
| Article listing        | ✅ Yes - grid or list layouts            |
| News/updates section   | ✅ Yes - shows recent content            |
| Single article display | ❌ No - use custom article page instead  |
| Real-time feed         | ❌ No - use ActivityFeed section instead |

## Props Reference

| Prop        | Type             | Default | Description                      |
| ----------- | ---------------- | ------- | -------------------------------- |
| title       | string           | —       | Section heading                  |
| description | string           | —       | Section description              |
| articles    | BlogArticle[]    | —       | Array of articles to display     |
| layout      | "grid" \| "list" | "grid"  | Layout mode                      |
| columns     | 2 \| 3 \| 4      | 3       | Number of columns in grid layout |
| className   | string           | —       | Additional CSS class             |

### BlogArticle

| Prop     | Type       | Description                    |
| -------- | ---------- | ------------------------------ |
| id       | string     | Unique identifier              |
| title    | string     | Article title                  |
| excerpt  | string     | Article preview text           |
| image    | string     | Article cover image URL        |
| author   | BlogAuthor | Author information             |
| date     | string     | Publication date               |
| readTime | number     | Estimated read time in minutes |
| href     | string     | Article URL link               |

### BlogAuthor

| Prop   | Type   | Description       |
| ------ | ------ | ----------------- |
| name   | string | Author name       |
| avatar | string | Author avatar URL |

## Examples

### Grid Layout

```tsx
import { Blog } from "@orion-ds/react";

<Blog
  title="Latest Articles"
  articles={[
    {
      id: "1",
      title: "Getting Started with Design Systems",
      excerpt: "Learn the fundamentals of modern design systems...",
      image: "/articles/design-systems.jpg",
      author: { name: "Sarah Chen", avatar: "/avatars/sarah.jpg" },
      date: "Mar 15, 2024",
      readTime: 5,
      href: "/blog/design-systems",
    },
  ]}
  layout="grid"
  columns={3}
/>;
```

### List Layout

```tsx
<Blog title="All Posts" articles={articles} layout="list" />
```

## Accessibility

- Article links have descriptive text
- Images have appropriate alt text via image loading
- Author information is structured semantically
- Read time and date are clearly labeled

## Token Usage

- `--surface-base` — Section background
- `--surface-layer` — Article card background
- `--text-primary` — Article titles
- `--text-secondary` — Author name and date
- `--border-subtle` — Card borders
- `--spacing-6` — Section padding
