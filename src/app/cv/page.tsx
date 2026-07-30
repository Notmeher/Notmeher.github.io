import type { Metadata } from "next";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { CvViewer } from "@/components/cv-viewer";
import { withBasePath } from "@/lib/site-path";
import styles from "./cv.module.css";

const cvPath = withBasePath("/files/Mehedi-Hasan-Nipu-CV.pdf");

export const metadata: Metadata = {
  title: "CV | Mehedi Hasan Nipu",
  description:
    "Curriculum vitae of Mehedi Hasan Nipu, AI engineer and researcher.",
};

export default function CvPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.backLink} href={withBasePath("/")}>
          <ArrowLeft size={16} /> Portfolio
        </a>

        <div className={styles.headerTitle}>
          <FileText size={16} aria-hidden="true" />
          <span>MEHEDI HASAN NIPU / CV</span>
        </div>

        <div className={styles.actions}>
          <a href={cvPath} target="_blank" rel="noreferrer">
            <ExternalLink size={15} />
            <span>Open PDF</span>
          </a>
          <a href={cvPath} download>
            <Download size={15} />
            <span>Download</span>
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.intro}>
          <p>CURRICULUM VITAE / 2026</p>
          <h1>Experience, research, and selected work.</h1>
          <p>
            The document is rendered directly below. Use the controls in the
            PDF viewer or the header actions to open and download it.
          </p>
        </section>

        <section className={styles.viewerShell} aria-label="CV document viewer">
          <div className={styles.viewerBar}>
            <span>MEHEDI-HASAN-NIPU-CV.PDF</span>
            <span>PDF · 2 PAGES · 158 KB</span>
          </div>
          <CvViewer file={cvPath} />
          <p className={styles.viewerFallback}>
            If your browser cannot display the embedded PDF,{" "}
            <a href={cvPath} target="_blank" rel="noreferrer">
              open it in a new tab
            </a>
            .
          </p>
        </section>
      </main>
    </div>
  );
}