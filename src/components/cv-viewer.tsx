"use client";

import dynamic from "next/dynamic";
import styles from "./cv-document.module.css";

const CvDocument = dynamic(
  () => import("./cv-document").then((module) => module.CvDocument),
  {
    ssr: false,
    loading: () => (
      <p className={styles.message}>Preparing the PDF renderer...</p>
    ),
  },
);

export function CvViewer({ file }: { file: string }) {
  return <CvDocument file={file} />;
}