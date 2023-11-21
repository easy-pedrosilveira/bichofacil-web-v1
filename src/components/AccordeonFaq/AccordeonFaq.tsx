import { useRef } from "react";
import styles from "./AccordeonFaq.module.css";

interface AccordeonProps {
  helps: {title: string, content: string};
  isActive: boolean;
  onClick: () => void;
}

export const AccordeonFaq = ({helps, isActive, onClick }: AccordeonProps) => {
  const contentEl = useRef<HTMLDivElement>(null);

  return (
    <div className={styles.accordeon}>
      <header className={styles.header} onClick={onClick}>
        <div className={styles.title}>{helps?.title}</div>
        <div className={styles.arrow}>
          {isActive ? <img src="" alt="mais" /> : <img src="" alt="menos" />}
        </div>
      </header>
      <div
        ref={contentEl}
        className={`${styles.collapse} ${isActive ? `${styles.show}` : ""}`}
        style={
          isActive
            ? { height: contentEl?.current?.scrollHeight! }
            : { height: "0px" }
        }
      >
        <div className={styles.texts}>{helps?.content}</div>
      </div>
    </div>
  );
};
