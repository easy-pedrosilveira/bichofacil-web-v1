import React, { useState, useEffect } from "react";
import styles from './ControlPromotional.module.css';

const images = [
  "https://img.freepik.com/vetores-premium/banner-de-convite-de-cassino-online-para-site-com-maquina-caca-niqueis-de-botao-fichas-de-poquer-de-roleta-de-cassino-e-cartas-de-baralho-em-cena-vermelha-com-anel-de-neon-amarelo-no-fundo_7993-7691.jpg",
  "https://img.freepik.com/premium-psd/casino-royal-flyer-social-media-post-template_25996-1193.jpg",
  "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/casino-banner-design-template-d50428bdf34d5f9160f513e08ddf145b_screen.jpg?ts=1659342147"
]

export const ControlPromotional = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Avança para a próxima imagem
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.slider_container}>
      {images.map((image, index) => (
        <div
          key={index}
          className={`${styles.slider_image} ${
            index === currentImageIndex ? styles.active : index < currentImageIndex ? styles.previous : styles.next
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}
    </div>
  );
};