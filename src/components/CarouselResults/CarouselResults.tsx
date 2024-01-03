import styles from "./CarouselResults.module.css";
import { useState } from "react";
import { CardResults } from "components";
import useGameContext from "data/hooks/useGameContext";
import Arrow from "assets/icons/arrow-results.svg";

export const CarouselResults = () => {
  const { data } = useGameContext();
  const [sliderPosition, setSliderPosition] = useState(0);

  const handleNextSlide = () => {
    setSliderPosition((prevPosition) => prevPosition + 1);
  };

  const handlePrevSlide = () => {
    setSliderPosition((prevPosition) => prevPosition - 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {data ? (
          data.length > 0 ? (
            data.map((item, index) => {
              const uniqueKey = `${item.lottery_date}-${item.lottery_name}-${item.lottery_type}`;
              return (
                <div key={uniqueKey} className={styles.slide}>
                  <CardResults key={index} data={item} />
                </div>
              );
            })
          ) : null
        ) : (
          <>Sem Resultados no momento</>
        )}
      </div>
      {/* <div className={styles.buttons}>
        <div className={styles.btns} onClick={handlePrevSlide}>
          <img src={Arrow} alt="Previous" />
        </div>
        <div className={styles.btns} onClick={handleNextSlide}>
          <img src={Arrow} alt="Next" style={{ transform: "rotate(180deg)" }} />
        </div>
      </div> */}
    </div>
  );
};
