import { useState, useEffect } from "react";
import styles from "./Error.module.css";

export const Error = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.card}
        style={{
          background: "red",
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      >
      </div>
      <div
        className={styles.card}
        style={{
          background: "blue",
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      >
      </div>
      <div
        className={styles.card}
        style={{
          background: "green",
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      >
      </div>
    </div>
  );
};
