import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "pages";
import { Header, Error, Navbar, Footer } from "components";
import styles from "../styles/Routes.module.css";

export const Rotas = () => {
  return (
    <main className={styles.main}>
      <BrowserRouter>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.menu}>
          <Navbar />
        </div>
        {/* <div className={styles.content}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div> */}
        <div className={styles.footer}>
          <Footer />
        </div>
      </BrowserRouter>
    </main>
  );
};
