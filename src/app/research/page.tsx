import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { ResearchArchive } from "@/components/research-archive";
import { publications } from "@/data/portfolio";
import { withBasePath } from "@/lib/site-path";
import styles from "./research.module.css";

export const metadata: Metadata = {
  title: "Research & Publications | Mehedi Hasan Nipu",
  description:
    "Research publications, preprints, conference papers, journals, and open datasets by Mehedi Hasan Nipu.",
};

export default function ResearchPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a href={withBasePath("/")} className={styles.backLink}>
          <ArrowLeft size={16} /> Portfolio
        </a>

        <div className={styles.headerTitle}>
          <FileText size={15} aria-hidden="true" />
          <span>RESEARCH INDEX</span>
        </div>

        <nav aria-label="Research page navigation">
          <a
            href="https://scholar.google.com/citations?view_op=list_works&hl=en&user=PaBcNmIAAAAJ"
            target="_blank"
            rel="noreferrer"
          >
            Google Scholar <ArrowUpRight size={14} />
          </a>
          <a href={withBasePath("/cv")}>CV</a>
        </nav>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroMeta}>
            <span>ARCHIVE / {String(publications.length).padStart(2, "0")}</span>
            <span>2024 - 2026</span>
          </div>
          <div className={styles.heroGrid}>
            <h1>Research &amp; Publications.</h1>
            <div>
              <p>
                Work spanning safe multi-agent systems, trustworthy language
                models, clinical AI, computer vision, federated learning, and
                responsible datasets.
              </p>
              <p className={styles.updated}>LAST UPDATED / JUL 2026</p>
            </div>
          </div>
        </section>

        <ResearchArchive />
      </main>
    </div>
  );
}