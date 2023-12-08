import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import Age from "assets/imgs/age-footer.svg";
import Arrow from "assets/icons/arrow.svg";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className={styles.footer}>
      <div className={styles.innerFooter}>
        <div className={styles.txt}>
          Lorem ipsum dolor sit amet consectetur. Urna nulla et vestibulum eros
          cursus. Rhoncus elit nunc feugiat morbi. Pellentesque mauris
          adipiscing senectus dictum commodo senectus integer. At consectetur id
          lectus amet cursus mattis dui urna enim. At sed aliquet vitae
          tincidunt morbi non adipiscing. Donec vestibulum senectus quis magna
          fermentum volutpat fermentum tristique tortor. Dapibus vitae in
          faucibus amet quis. Lorem in sed sapien semper vehicula eros vitae in.
        </div>
        <div className={styles.infoLinks}>
          <div className={styles.links}>
            <Link
              to={`/policy-privacy`}
              className={styles.item}
              onClick={scrollToTop}
            >
              Política de Privacidade
            </Link>
            <Link
              to={`/responsible-gaming`}
              className={styles.item}
              onClick={scrollToTop}
            >
              Jogo Resposável
            </Link>
            <Link
              to={`/terms-conditions`}
              className={styles.item}
              onClick={scrollToTop}
            >
              Termos e Condições
            </Link>
            <Link
              to={`/policy-aml`}
              className={styles.item}
              onClick={scrollToTop}
            >
              Política e aml
            </Link>
          </div>
          <img src={Age} alt="+18" className={styles.age} />
          <div className={styles.doubt}>duvidas@bichofacil.com</div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className={styles.innerBottom}>
          <div className={styles.lastInfo}>
            Copyright@2022. Bicho Fácil - Todos os direitos reservados.
          </div>
          <div className={styles.lastInfo} id={styles.doubtBottom}>
            duvidas@bichofacil.com
          </div>
        </div>
        <div className={styles.toTop} onClick={scrollToTop}>
          <img src={Arrow} alt="Ao topo" style={{ rotate: "180deg" }} />
        </div>
      </div>
    </div>
  );
};
