import { useEffect, useState } from "react";
import styles from "./PlacingGame.module.css";
import { IModalities } from "interfaces";

interface PlacingGameProps {
  placing: IModalities;
  dataPlacing: (data: number[]) => void;
}

export const PlacingGame = ({ placing, dataPlacing }: PlacingGameProps) => {
  const [checkedPosition, setCheckedPosition] = useState<number[]>([]);
  const lastNumber =
    placing?.allow_positions[placing?.allow_positions.length - 1]; //pegar ultimo numero do array

  function isChecked(index: number) {
    if (placing?.fixed_position) {
      return; //nao permite selecionar as posicoes
    }

    if (checkedPosition.includes(index)) {
      setCheckedPosition(checkedPosition.filter((pos) => pos !== index)); //se o numero estiver selecionado, ira mudar o estado dele para nao selecioando
    } else {
      setCheckedPosition([...checkedPosition, index]); //adcionando o numero selecionado ao Array
    }
  }

  function selectPositions1() {
    if (placing?.fixed_position) {
      return;
    }
    setCheckedPosition([...Array(5).keys()].map((i) => i + 1)); // marcando do 1 ao 5 ao clicar no botao 1 ao 5
  }

  function selectPositions2() {
    if (placing?.fixed_position) {
      return;
    }
    if (placing?.allow_positions.length > 0) {
      setCheckedPosition([...Array(lastNumber).keys()].map((i) => i + 1)); // marcando do 1 ao 7 ao clicar no botao 1 ao 7
    }
  }

  useEffect(() => {
    setCheckedPosition(checkedPosition.sort());
    dataPlacing(checkedPosition);
  }, [checkedPosition]); // organiza os numeros em ordem crescente

  useEffect(() => {
    if (placing?.fixed_position) {
      setCheckedPosition([...Array(5).keys()].map((i) => i + 1)); // se o jogo e fixo, os numeros são setados como 1,2,3,4,5
    }
  }, [placing?.fixed_position]);

  const isFive = [1, 2, 3, 4, 5].every((placing) =>
    checkedPosition.includes(placing)
  );

  const isAll = [6, 7].some((placing) => checkedPosition.includes(placing));

  return (
    <div className={styles.container}>
      <div className={styles.title}>Colocação</div>
      <div className={styles.positions}>
        <div className={styles.topPositions}>
          <button
            className={`${
              isFive && !isAll ? styles.positionActive : styles.btnPosition
            }`}
            onClick={selectPositions1}
            disabled={placing.fixed_position}
            type="button"
          >
            1° ao 5°
          </button>
          {lastNumber === 5 ? null : (
            <button
              className={`${
                checkedPosition.length === lastNumber
                  ? styles.positionActive
                  : styles.btnPosition
              }`}
              onClick={selectPositions2}
              disabled={placing.fixed_position}
              type="button"
            >
              1° ao {lastNumber}°
            </button>
          )}
        </div>
        <div className={styles.bottomPositions}>
          {placing?.allow_positions.map((index) => (
            <button
              key={index}
              onClick={() => isChecked(index)}
              className={
                checkedPosition.includes(index)
                  ? styles.positionActive
                  : styles.btnPosition
              }
              type="button"
              disabled={placing?.fixed_position}
            >
              {index}°
            </button>
          ))}
        </div>
      </div>
      <div className={styles.underline}></div>
    </div>
  );
};
