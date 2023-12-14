import styles from "./Help.module.css";
import { IntroBar } from "components";
import Search from "assets/icons/search.svg";
import useAppContext from "data/hooks/useAppConfig";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";

export const Help = () => {
  const { helps } = useAppContext();
  const [searchHelp, setSearchHelp] = useState("");

  const filteredHelps = helps?.filter((item) => {
    function removeAccents(texts: string) {
      return texts
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    }
    const titleHelp = removeAccents(item.title).toLowerCase();
    const textHelp = removeAccents(item?.content).toLowerCase();
    const searchText = removeAccents(searchHelp).toLowerCase();
    return titleHelp.includes(searchText) || textHelp.includes(searchText);
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchHelp(e.target.value);
  };

  return (
    <>
      <IntroBar title={"Ajuda"} paragraph={""} />
      <div className={styles.container}>
        <div className={styles.search}>
          <div className={styles.title}>Pesquisar</div>
          <div className={styles.input}>
            <input
              type="search"
              name=""
              id=""
              placeholder="O que você está procurando?"
              onChange={handleSearchChange}
            />
            <div className={styles.img}>
              <img src={Search} alt="" />
            </div>
          </div>
        </div>
        <div className={styles.content}>
          {filteredHelps.length > 0 ? (
            filteredHelps.map((help, index) => (
              <motion.div
                className={styles.texts}
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  ease: [0, 0.71, 0.2, 1.01],
                  scale: {
                    type: "spring",
                    damping: 5,
                    stiffness: 20,
                    restDelta: 0.001,
                  },
                }}
              >
                <div className={styles.titles}>{help?.title}</div>
                <div className={styles.paragraph}>{help?.content}</div>
              </motion.div>
            ))
          ) : (
            <div className={styles.txtSearch}>
              Sem tópicos disponíveis no momento
            </div>
          )}
        </div>
      </div>
    </>
  );
};
