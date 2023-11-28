import styles from "./Games.module.css";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FullScreen from "assets/images/full-screen.svg";

export const Games = () => {
  const location = useLocation();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const iframeRef = useRef(null);
  const iframeSrc = new URLSearchParams(location.search).get("iframeSrc");

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(
        !!(
          document.fullscreenElement ||
          document.fullscreenElement ||
          document.fullscreenElement ||
          document.fullscreenElement
        )
      );
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("msfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  const toggleFullScreen = () => {
    const element = document.documentElement;

    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  return (
    <main className={styles.container}>
      <div className="introduction">
        <button onClick={toggleFullScreen}>
          <img src={FullScreen} alt="" />
        </button>
      </div>
      <div className={styles.screen}>
        {iframeSrc ? (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title="Jogo Específico"
            width="100%"
            height="100%"
            style={{
              background: "violet",
              borderRadius: "8px",
              border: "none",
            }}
          >
            aaaa
          </iframe>
        ) : null}
      </div>
      <div className={styles.rules}></div>
    </main>
  );
};
