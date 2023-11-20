import styles from "./ControlPromotional.module.css";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { Promo01 } from "./Promotions";
import Arrow from "../../../assets/images/Arrow-right.svg";

export const ControlPromotional = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const componentsArray = [Promo01];

  const componentIndex = wrap(0, componentsArray.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const CurrentComponent = componentsArray[componentIndex];

  return (
    <main className={styles.container}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className={styles.promotions}
        >
          <CurrentComponent />
        </motion.div>
      </AnimatePresence>
      <div className={styles.controls}>
        <div className={styles.next} onClick={() => paginate(1)}>
          <img src={Arrow} alt="" />
        </div>
        <div className={styles.prev} onClick={() => paginate(-1)}>
          <img src={Arrow} alt=""  style={{ rotate : "180deg"}}/>
        </div>
      </div>
    </main>
  );
};
