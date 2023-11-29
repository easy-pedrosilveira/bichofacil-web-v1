import {
  ControlPromotional,
  Opportunity,
  NewGames,
  You2Recommendations,
  DailyJackpots,
  GameProviders,
} from "components";
import { motion } from "framer-motion";
import { initial, inView } from "utils";

export const Home = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "60vh",
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <ControlPromotional />
      </div>
      <motion.div
        initial={initial}
        whileInView={inView}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 100,
          delay: 1,
        }}
      >
        <Opportunity />
      </motion.div>
      <motion.div
        initial={initial}
        whileInView={inView}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 100,
          delay: 1,
        }}
      >
        <NewGames />
      </motion.div>
      <motion.div
        initial={initial}
        whileInView={inView}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 100,
          delay: 1,
        }}
      >
        <You2Recommendations />
      </motion.div>
      <motion.div
        initial={initial}
        whileInView={inView}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 100,
          delay: 1,
        }}
      >
        <DailyJackpots />
      </motion.div>
        <GameProviders />
    </>
  );
};
