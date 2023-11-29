import styles from "./Header.module.css";

export const Header = () => {
  // const {
  //   modalLogin,
  //   setModalLogin,
  //   modalRegister,
  //   setModalRegister,
  //   isLogged,
  // } = useAuthContext();
  // const { setProfilePanels } = useAppContext();

  return (
    <main className={styles.header}>
      <div className={styles.innerHeader}></div>
    </main>
  );
};
