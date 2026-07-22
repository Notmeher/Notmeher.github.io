"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  GripHorizontal,
} from "lucide-react";
import { awardsAndCertifications } from "@/data/portfolio";
import styles from "./awards-carousel.module.css";

function getRelativeOffset(index: number, activeIndex: number, total: number) {
  let offset = index - activeIndex;

  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;

  return offset;
}

export function AwardsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const draggedRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const total = awardsAndCertifications.length;

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + total) % total);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % total);
  };

  return (
    <div
      className={styles.carousel}
      role="region"
      aria-roledescription="carousel"
      aria-label="Awards and certifications"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          showPrevious();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          showNext();
        }
      }}
    >
      <div className={styles.browseHint}>
        <GripHorizontal size={15} aria-hidden="true" />
        <span>Drag, swipe, or use arrow keys</span>
      </div>

      <div className={styles.stage}>
        {awardsAndCertifications.map((item, index) => {
          const offset = getRelativeOffset(index, activeIndex, total);
          const depth = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <motion.article
              className={styles.card}
              data-active={isActive}
              key={item.title}
              drag={isActive && !shouldReduceMotion ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragMomentum={false}
              onDragStart={() => {
                draggedRef.current = true;
              }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -64 || info.velocity.x < -450) {
                  showNext();
                } else if (info.offset.x > 64 || info.velocity.x > 450) {
                  showPrevious();
                }

                window.setTimeout(() => {
                  draggedRef.current = false;
                }, 0);
              }}
              animate={{
                x: offset * 34,
                y: depth * 17,
                scale: 1 - depth * 0.045,
                rotate: offset * 0.75,
                opacity: 1 - depth * 0.2,
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.01 }
                  : { type: "spring", stiffness: 250, damping: 28, mass: 0.72 }
              }
              style={{
                zIndex: 10 - depth,
                pointerEvents: isActive ? "auto" : "none",
              }}
              aria-hidden={!isActive}
            >
              <header className={styles.cardHeader}>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.type}</span>
                </div>
                <span>{item.issued}</span>
              </header>

              <div className={styles.cardBody}>
                <p className={styles.issuer}>{item.issuer}</p>
                <h3>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>

              <footer className={styles.cardFooter}>
                <dl>
                  {item.credentialId ? (
                    <div>
                      <dt>Credential ID</dt>
                      <dd>{item.credentialId}</dd>
                    </div>
                  ) : null}
                  {item.associatedWith ? (
                    <div>
                      <dt>Associated with</dt>
                      <dd>{item.associatedWith}</dd>
                    </div>
                  ) : null}
                </dl>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  tabIndex={isActive ? 0 : -1}
                  onClick={(event) => {
                    if (draggedRef.current) event.preventDefault();
                  }}
                >
                  {item.linkLabel} <ArrowUpRight size={15} />
                </a>
              </footer>
            </motion.article>
          );
        })}
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={showPrevious} aria-label="Previous award">
          <ChevronLeft size={18} />
        </button>

        <div className={styles.dots} aria-label="Select award">
          {awardsAndCertifications.map((item, index) => (
            <button
              type="button"
              key={item.title}
              className={index === activeIndex ? styles.activeDot : undefined}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show ${item.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>

        <span className={styles.counter} aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>

        <button type="button" onClick={showNext} aria-label="Next award">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}