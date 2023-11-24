import React from "react";
import styles from "./GameProviders.module.css";

const images = [
  {
    sponsors: "Patroinador01",
  },
  {
    sponsors: "Patroinador02",
  },
  {
    sponsors: "Patroinador03",
  },
  {
    sponsors: "Patroinador04",
  },
  {
    sponsors: "Patroinador05",
  },
  {
    sponsors: "Patroinador06",
  },
  {
    sponsors: "Patroinador07",
  },
];

export const GameProviders = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.sliderWrapper}>
        <div className={styles.slideTrack}>
          {images.map((item, index) => (
            <div key={index} className={styles.sponsors}>
              <span>{item?.sponsors}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};