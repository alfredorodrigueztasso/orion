"use client";

import { forwardRef } from "react";
import type { BlogProps, BlogArticle } from "./Blog.types";
import styles from "./Blog.module.css";

const ArticleCard = ({
  article,
  isListLayout,
}: {
  article: BlogArticle;
  isListLayout: boolean;
}) => {
  const content = (
    <div className={isListLayout ? styles.cardInner : undefined}>
      {article.image && (
        <img
          src={article.image}
          alt={article.title}
          className={styles.cardImage}
        />
      )}
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{article.title}</h3>
        <p className={styles.cardExcerpt}>{article.excerpt}</p>
        <div className={styles.cardMeta}>
          {article.author && (
            <>
              {article.author.avatar && (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className={styles.authorAvatar}
                />
              )}
              <span className={styles.authorName}>{article.author.name}</span>
            </>
          )}
          {article.date && (
            <>
              {article.author && (
                <span className={styles.metaSeparator}>·</span>
              )}
              <span className={styles.date}>{article.date}</span>
            </>
          )}
          {article.readTime && (
            <>
              <span className={styles.metaSeparator}>·</span>
              <span className={styles.readTime}>
                {article.readTime} min read
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );

  return <div className={styles.card}>{content}</div>;
};

export const Blog = forwardRef<HTMLElement, BlogProps>(
  (
    {
      title,
      description,
      articles,
      layout = "grid",
      columns = 3,
      className,
      ...rest
    },
    ref,
  ) => {
    const isGrid = layout === "grid";
    const gridClass = isGrid
      ? `${styles.grid} ${
          columns === 2
            ? styles.cols2
            : columns === 4
              ? styles.cols4
              : styles.cols3
        }`
      : styles.list;

    return (
      <section
        ref={ref}
        className={`${styles.section} ${className || ""}`}
        {...rest}
      >
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {description && <p className={styles.description}>{description}</p>}
          </div>
          <div className={gridClass}>
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                isListLayout={!isGrid}
              />
            ))}
          </div>
        </div>
      </section>
    );
  },
);

Blog.displayName = "Blog";
