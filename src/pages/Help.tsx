import styles from "../styles/pages/Help.module.css";
import Search from "../assets/images/search.svg";
import { AccordeonHelp } from "components";
import { ChangeEvent, useState } from "react";
import { motion } from "framer-motion";

export const Help = () => {
  const [searchHelp, setSearchHelp] = useState("");
  const [activeAccordion, setActiveAccordion] = useState(null);

  const helps = [
    {
      title: "Ajuda 1",
      content: "Conteúdo da ajuda 1"
    },
    {
      title: "Ajuda 2",
      content: "Conteúdo da ajuda 2"
    },
    {
      title: "Ajuda 3",
      content: "Conteúdo da ajuda 3"
    },
    {
      title: "Ajuda 4",
      content: "Conteúdo da ajuda 4"
    },
    {
      title: "Ajuda 5",
      content: "Conteúdo da ajuda 5"
    }
  ];
  
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

  const handleAccordionClick = (index: any) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.introduction}>
        <div className={styles.title}>
          Filtre suas duvidas, sua busca de forma rapida e agil.
        </div>
        <div className={styles.input}>
          <input
            className={styles.search}
            type="text"
            placeholder="Pesquise por sua duvida."
          />
          <img src={Search} alt="" style={{ width: "10%", height: "100%" }} />
        </div>
      </div>
      <div className={styles.accordion}>
      {filteredHelps.length > 0 ? (
          filteredHelps.map((helps, index) => (
            <motion.div
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
              <AccordeonHelp
                key={index}
                helps={helps}
                isActive={activeAccordion === index}
                onClick={() => handleAccordionClick(index)}
              />
            </motion.div>
          ))
        ) : (
          <div className={styles.txtSearch}>
            Sem tópicos disponíveis no momento
          </div>
        )}
      </div>
    </div>
  );
};
