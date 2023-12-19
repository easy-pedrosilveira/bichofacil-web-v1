import styles from "./NumberMask.module.css";
import { IModalities } from "interfaces";
import InputMask from "react-input-mask";

interface NumberMaskProps {
  mask: IModalities;
  block_numbers: string[];
  dataNumbers: (data: string[]) => void;
  dataGroups: (data: string[]) => void;
  dataArrayGroups: (data: string[][]) => void;
}

export const NumberMask = ({ mask }: NumberMaskProps) => {
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
      <div className={styles.underline}></div>
    </div>
  );
};
