/**
 * Blog Section Component
 *
 * A versatile blog/article list section for displaying posts.
 */

import React from "react";
import type { BlogProps, BlogArticle } from "./Blog.types";
import { Badge } from "@orion-ds/react";
import styles from "./Blog.module.css";

/**
 * Article Card Component
 */
const ArticleCard: React.FC<{
  article: BlogArticle;
  showAuthor?: boolean;
  showDate?: boolean;
  showCategory?: boolean;
  showReadTime?: boolean;
  featured?: boolean;
}> = ({
  article,
  showAuthor = true,
  showDate = true,
  showCategory = true,
  showReadTime = true,
  featured = false,
}) => {
  return (
    <article
      className={`${styles.article} ${featured ? styles.featuredMain : ""}`}
    >
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className={styles.articleImage}
        />
      )}
      <div className={styles.articleContent}>
        <div className={styles.articleMeta}>
          {showCategory && article.category && (
            <Badge variant="primary" size="sm">
              {article.category}
            </Badge>
          )}
          {showReadTime && article.readTime && (
            <span className={styles.readTime}>{article.readTime} min read</span>
          )}
        </div>

        <h3 className={styles.articleTitle}>
          {article.href ? (
            <a href={article.href}>{article.title}</a>
          ) : (
            article.title
          )}
        </h3>

        <p className={styles.excerpt}>{article.excerpt}</p>

        {article.tags && article.tags.length > 0 && (
          <div className={styles.tags}>
            {article.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {showAuthor && article.author && (
          <div className={styles.author}>
            {article.author.avatar && (
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className={styles.authorAvatar}
              />
            )}
            <div className={styles.authorInfo}>
              <span className={styles.authorName}>{article.author.name}</span>
              {showDate && article.date && (
                <span className={styles.date}>{article.date}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

/**
 * Blog section for displaying articles
 */
export const Blog: React.FC<BlogProps> = ({
  eyebrow,
  title,
  description,
  articles,
  layout = "grid",
  columns = 3,
  showAuthor = true,
  showDate = true,
  showCategory = true,
  showReadTime = true,
  background = "base",
  viewAllHref,
  viewAllText = "View all articles",
  className,
  ...rest
}) => {
  const renderArticles = () => {
    if (layout === "featured" && articles.length > 0) {
      const [featuredArticle, ...restArticles] = articles;
      if (!featuredArticle) return null;
      return (
        <div className={styles.featured}>
          <ArticleCard
            article={featuredArticle}
            showAuthor={showAuthor}
            showDate={showDate}
            showCategory={showCategory}
            showReadTime={showReadTime}
            featured
          />
          {restArticles.slice(0, 2).map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              showAuthor={showAuthor}
              showDate={showDate}
              showCategory={showCategory}
              showReadTime={showReadTime}
            />
          ))}
        </div>
      );
    }

    const layoutClass = layout === "list" ? styles.list : styles.grid;

    return (
      <div
        className={layoutClass}
        data-columns={layout === "grid" ? columns : undefined}
      >
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            showAuthor={showAuthor}
            showDate={showDate}
            showCategory={showCategory}
            showReadTime={showReadTime}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      className={`${styles.blog} ${className || ""}`}
      data-background={background}
      {...rest}
    >
      <div className={styles.container}>
        {(eyebrow || title || description) && (
          <header className={styles.header}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {description && <p className={styles.description}>{description}</p>}
          </header>
        )}

        {renderArticles()}

        {viewAllHref && (
          <div className={styles.viewAll}>
            <a href={viewAllHref} className={styles.viewAllLink}>
              {viewAllText}
              <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

Blog.displayName = "Blog";
