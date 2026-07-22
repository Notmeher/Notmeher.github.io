"use client";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import styles from "./cv-document.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

type CvDocumentProps = {
  file: string;
};

export function CvDocument({ file }: CvDocumentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(820);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const availableWidth = entry.contentRect.width - 32;
      setPageWidth(Math.max(280, Math.min(availableWidth, 920)));
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  const handleLoadSuccess = ({ numPages: loadedPages }: PDFDocumentProxy) => {
    setNumPages(loadedPages);
  };

  return (
    <div ref={containerRef} className={styles.stage}>
      <Document
        file={file}
        onLoadSuccess={handleLoadSuccess}
        loading={<p className={styles.message}>Rendering CV pages...</p>}
        error={
          <p className={styles.message}>
            The CV could not be rendered. Use Open PDF or Download above.
          </p>
        }
      >
        <div className={styles.pages}>
          {Array.from({ length: numPages }, (_, index) => {
            const pageNumber = index + 1;

            return (
              <article className={styles.page} key={pageNumber}>
                <div className={styles.pageLabel}>
                  PAGE {String(pageNumber).padStart(2, "0")} /{" "}
                  {String(numPages).padStart(2, "0")}
                </div>
                <Page
                  pageNumber={pageNumber}
                  width={pageWidth}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                  loading={
                    <p className={styles.message}>Rendering page {pageNumber}...</p>
                  }
                />
              </article>
            );
          })}
        </div>
      </Document>
    </div>
  );
}