"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
  publications,
  researchInterests,
  type PublicationFilter,
} from "@/data/portfolio";
import styles from "./research-archive.module.css";

const filters: PublicationFilter[] = [
  "All",
  "Preprint",
  "Journal",
  "Conference",
  "Dataset",
];

export function ResearchArchive() {
  const [activeFilter, setActiveFilter] = useState<PublicationFilter>("All");
  const shouldReduceMotion = useReducedMotion();
  const visiblePublications = publications.filter(
    (publication) =>
      activeFilter === "All" || publication.category === activeFilter,
  );

  return (
    <section className={styles.archive} aria-labelledby="archive-heading">
      <div className={styles.archiveIntro}>
        <div>
          <p>RESEARCH SIGNALS</p>
          <h2 id="archive-heading">The complete index.</h2>
        </div>
        <div className={styles.interests}>
          {researchInterests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </div>
      </div>

      <div className={styles.toolbar}>
        <div role="group" aria-label="Filter research outputs">
          {filters.map((filter) => {
            const count =
              filter === "All"
                ? publications.length
                : publications.filter((item) => item.category === filter).length;

            return (
              <button
                type="button"
                key={filter}
                className={filter === activeFilter ? styles.activeFilter : undefined}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={filter === activeFilter}
              >
                {filter} <span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>
        <p aria-live="polite">
          Showing {String(visiblePublications.length).padStart(2, "0")} records
        </p>
      </div>

      <motion.div layout className={styles.list}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visiblePublications.map((publication, index) => (
            <motion.article
              layout
              key={publication.title}
              className={styles.item}
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 14, filter: "blur(5px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.34,
                delay: shouldReduceMotion ? 0 : Math.min(index * 0.025, 0.12),
              }}
            >
              <div className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className={styles.itemMain}>
                <div className={styles.itemMeta}>
                  <span>{publication.category}</span>
                  <span>{publication.publishedDate ?? publication.year}</span>
                  <span>{publication.status}</span>
                </div>
                <h3>{publication.title}</h3>
                {publication.authors?.length ? (
                  <p className={styles.authors}>
                    {publication.authors.map((author, authorIndex) => (
                      <span key={author}>
                        {author === "Md Mehedi Hasan Nipu" ? (
                          <strong>{author}</strong>
                        ) : (
                          author
                        )}
                        {authorIndex < publication.authors!.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                ) : null}
                <p className={styles.venue}>{publication.venue}</p>
              </div>

              {publication.href ? (
                <a
                  href={publication.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${publication.title}`}
                >
                  Open <ArrowUpRight size={16} />
                </a>
              ) : null}
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}