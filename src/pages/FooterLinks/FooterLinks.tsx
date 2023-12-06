import styles from "./FooterLinks.module.css";
import { useLocation, useParams } from "react-router-dom";
import data from "./LinksFooter.json";
import { useEffect, useState } from "react";

interface LinkContent {
  title: string;
  paragraph: string;
}

interface LinksProps {
  link_id: string;
  content: LinkContent[];
}

export const FooterLinks = () => {
  const location = useLocation();
  const [dataContent, setDataContent] = useState<LinksProps[]>([]);
  const queryParams = new URLSearchParams(location?.search);
  const firstParam = queryParams.entries().next().value;
  const [key, value] = firstParam;

  useEffect(() => {
    getUrl(key);
  }, [key]);

  const getUrl = (key: string) => {
    let filteredData: LinksProps[] = [];

    switch (key) {
      case "policy-privacy":
        filteredData = data?.filter((contentFooter) => contentFooter?.link_id === "Política de Privacidade") || [];
        break;
      case "responsible-gaming":
        filteredData = data?.filter((contentFooter) => contentFooter?.link_id === "Jogo Resposável") || [];
        break;
      case "terms-conditions":
        filteredData = data?.filter((contentFooter) => contentFooter?.link_id === "Termos e Condições") || [];
        break;
      case "policy-aml":
        filteredData = data?.filter((contentFooter) => contentFooter?.link_id === "Política e aml") || [];
        break;
      default:
        break;
    }

    setDataContent(filteredData);
  };

  return (
    <div className={styles.container}>
      {dataContent.map((link, index) => (
        <div className={styles.innerContent} key={index}>
          <div className={styles.introduction}>Inicio/{link?.link_id}</div>
          {link?.content.map((content, contentIndex) => (
            <div className={styles.texts} key={contentIndex}>
              <div className={styles.titles}>{content?.title}</div>
              <div className={styles.paragraph}>{content?.paragraph}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};