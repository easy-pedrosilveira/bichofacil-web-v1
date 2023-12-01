import { useState } from "react";
import { CardResults } from "components";
import styles from "./CarouselResults.module.css";
import useGameContext from "data/hooks/useGameContext";
import Arrow from "assets/icons/arrow-results.svg";

export const CarouselResults = () => {
  const { data } = useGameContext();
  const [sliderPosition, setSliderPosition] = useState(0);

  const leftClick = (e: any) => {
    e.preventDefault();
    setSliderPosition((prevPosition) => prevPosition - 1);
  };

  const rightClick = (e: any) => {
    e.preventDefault();
    setSliderPosition((prevPosition) => prevPosition + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.btns} onClick={leftClick}>
        <img src={Arrow} alt="" />
      </div>
      <div className={styles.slider}>
        {data ? (
          data !== undefined || [] ? (
            data.map((item, index) => {
              const uniqueKey = `${item.lottery_date}-${item.lottery_name}-${item.lottery_type}`;
              return (
                <div
                  key={uniqueKey}
                  className={styles.slide}
                  style={{
                    transform: `translateX(${sliderPosition * -100}%)`,
                  }}
                >
                  <CardResults data={item} />
                </div>
              );
            })
          ) : null
        ) : (
          <>VSFD MLK 🤙 🤙</>
        )}
      </div>
      <div className={styles.btns} onClick={rightClick} style={{}}>
        <img src={Arrow} alt="" style={{ rotate: "180deg"}}/>
      </div>
    </div>
  );
};
