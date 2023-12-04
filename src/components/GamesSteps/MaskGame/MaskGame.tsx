import styles from "./MaskGame.module.css";
import { IModalities } from "interfaces";
import InputMask from "react-input-mask";

interface MaskGameProps {
  mask: IModalities;
}
export const MaskGame = ({ mask }: MaskGameProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{mask?.name}</div>
      <div className={styles.select}>
        <InputMask
          mask={""}
          className={styles.input}
          placeholder={`Digite a ${mask?.name}`}
          // onClick={}
        />
      </div>
      <div className={styles.selected}></div>
    </div>
  );
};
