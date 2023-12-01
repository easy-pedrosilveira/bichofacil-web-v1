import { CardResults } from "components";
import styles from "./CarouselResults.module.css";
import useGameContext from "data/hooks/useGameContext";

export const CarouselResults = () => {
  const { data } = useGameContext();
  const leftClick = (e: any) => {
    e.preventDefault();
    // slider.current.scrollLeft -= slider.current.offsetWidth;
  };

  const rightClick = (e: any) => {
    e.preventDefault();
    // slider.current.scrollLeft += slider.current.offsetWidth;
  };

  return (
    <div className={styles.container}>
      {data ? (
        data !== undefined || [] ? (
          data.map((item, index) => {
            const uniqueKey = `${item.lottery_date}-${item.lottery_name}-${item.lottery_type}`;
            return <CardResults key={uniqueKey} data={item} />;
          })
        ) : null
      ) : (
        <>VSFD MLK 🤙 🤙</>
      )}
    </div>
  );
};
