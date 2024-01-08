import styles from "./NumberMask.module.css";
import { motion } from "framer-motion";
import { IModalities } from "interfaces";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import Delete from "assets/icons/delete-number-mask.svg";

interface NumberMaskProps {
  mask: IModalities;
  block_numbers: string[];
  dataNumbers: (data: string[]) => void;
  dataGroups: (data: string[]) => void;
  dataArrayGroups: (data: string[][]) => void;
}

interface selectedGroups {
  cardIndex: number;
  grupo: string;
  numero_grupo: string;
}

export const NumberMask = ({
  mask,
  block_numbers,
  dataNumbers,
  dataGroups,
  dataArrayGroups,
}: NumberMaskProps) => {
  const [numberValue, setNumberValue] = useState<string>("");
  const [numberSelected, setNumberSelected] = useState<string[]>([]);
  const [modalGroups, setModalGroups] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<selectedGroups[]>([]);
  const [numberMask, setNumberMask] = useState<string>("");
  const [numberValid, setNumberValid] = useState<boolean>(false);
  const [groupCounter, setGroupCounter] = useState<boolean>(false);
  const [newArray, setNewArray] = useState<selectedGroups[][]>([]);
  const newMask = numberMask.split("-").length;

  const handleMask = () => {
    const newMask = mask?.mask?.replace(/#/g, "9");
    setNumberMask(newMask);
  };

  useEffect(() => {
    handleMask();
  }, [mask]);

  const handleSelectGroupsCards = (selectedGroupsCards: selectedGroups[]) => {
    setSelectedGroups(selectedGroupsCards);
  };

  const handleSelectArrayDouble = (selectedGroups: selectedGroups[][]) => {
    setNewArray(selectedGroups);
  };

  const toggleGroups = () => {
    setModalGroups(!modalGroups);
  };

  const handleNumberSelected = (e: any) => {
    setNumberValue(e.target.value);

    const mascara = mask?.mask;
    const numeroSemUnderlines = e.target.value.replace(/_/g, "");
    const valorSemMascara = numeroSemUnderlines.replace(/-/g, "");
    const separator = numeroSemUnderlines.split("-");

    const validNumbersGroup = separator.map((grupo: any) => {
      let contadorValido = 0;
      let contadorGrupos = 0;

      for (let i = 0; i < grupo.length; i++) {
        const caractere = grupo[i];
        if (/[0-9]/.test(caractere)) {
          contadorValido++;
          if (contadorValido === mask?.number_of_digits) {
            contadorGrupos++;
            contadorValido = 0;
          }
        }
      }
      return contadorGrupos;
    });

    const groupCounter = validNumbersGroup.reduce((cont: any, number: any) => {
      if (number === 1) {
        cont++;
      }
      return cont;
    });

    if (valorSemMascara.length % mask?.number_of_digits === 0) {
      setNumberValid(true);
    } else {
      setNumberValid(false);
    }

    if (groupCounter < mask?.min_group_of_digits) {
      setGroupCounter(false);
    } else {
      setGroupCounter(true);
    }

    if (
      numeroSemUnderlines.length === mascara.length &&
      parseInt(numeroSemUnderlines) <= mask?.max_allowed_number
    ) {
      if (numberSelected.length < mask?.max_bet_length) {
        if (!block_numbers.includes(numeroSemUnderlines)) {
          // setNumberSelected([...numberSelected, numeroSemUnderlines]);
          // setNumberValue("");
        } else {
          toast.error("Este número está bloqueado.");
        }
      } else {
        toast.error(
          `O máximo de jogos possíveis é de ${mask?.max_bet_length} números`
        );
      }
    }
  };

  const handleSubmit = () => {
    if (
      groupCounter &&
      numberValid &&
      numberValue !== "" &&
      numberSelected.length < mask?.max_bet_length
    ) {
      const numeroSemUnderlines = numberValue.replace(/_/g, "");
      const numbersFormatted = numeroSemUnderlines.replace(/-+$/, "");
      const numbersFinalFormatted = numbersFormatted.replace(/^[-]+/, "");

      if (!block_numbers.includes(numbersFinalFormatted)) {
        setNumberSelected([...numberSelected, numbersFinalFormatted]);
        setNumberValue("");
      } else {
        toast.info("Este número está bloqueado.");
      }
    } else {
      if (numberSelected.length >= mask?.max_bet_length) {
        toast.error(
          `O máximo de jogos possíveis é de ${mask?.max_bet_length} números`
        );
      } else if (newArray.length >= mask?.max_bet_length) {
        toast.error(
          `O máximo de jogos possíveis é de ${mask?.max_bet_length} grupos`
        );
      }
    }
  };

  const removeCard = (index: number, isGroup: boolean = false) => {
    if (isGroup) {
      const newSelectedGroups = [...selectedGroups];
      const array = [...newArray];
      array.splice(index, 1);
      newSelectedGroups.splice(index, 1);
      setSelectedGroups(newSelectedGroups);
      setNewArray(array);
    } else {
      const newNumberSelected = [...numberSelected];
      newNumberSelected.splice(index, 1);
      setNumberSelected(newNumberSelected);
    }
  };

  useEffect(() => {
    dataNumbers(numberSelected);
  }, [numberSelected]);

  useEffect(() => {
    if (newMask === 1) {
      const selectedGroupStrings = selectedGroups.map(
        (group) => group.numero_grupo
      );
      dataGroups(selectedGroupStrings);
    } else {
      const selectedGroupStrings = newArray.map((group) =>
        group.map((item) => item.numero_grupo)
      );
      dataArrayGroups(selectedGroupStrings);
    }
  }, [selectedGroups, newArray]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{mask?.name}</div>
      {mask?.max_allowed_number !== 25 ? (
        <>
          <div className={styles.select}>
            <InputMask
              className={styles.input}
              type="text"
              mask={numberMask}
              value={numberValue}
              name="number-selected"
              id="number-selected"
              onChange={handleNumberSelected}
            />
            {groupCounter && numberValid && numberValue !== "" ? (
              <button
                className={styles.btnAdd}
                onClick={handleSubmit}
                type="button"
              >
                Adicionar
              </button>
            ) : (
              <button
                className={styles.btnAdd}
                onClick={handleSubmit}
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "2px solid #3F73E3",
                  cursor: "auto",
                }}
                type="button"
              >
                Adicionar
              </button>
            )}
          </div>
          <div className={styles.selected}>
            {numberSelected.map((numero, index) => (
              <motion.div
                variants={{
                  open: {
                    clipPath: "inset(0% 0% 0% 0% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.7,
                      delayChildren: 0.3,
                      staggerChildren: 0.05,
                    },
                  },
                  closed: {
                    clipPath: "inset(10% 50% 90% 50% round 10px)",
                    transition: {
                      type: "spring",
                      bounce: 0,
                      duration: 0.3,
                    },
                  },
                }}
                className={styles.card}
                key={index}
              >
                <span className={styles.numberSelected}>
                  {numero.replace(/-$/, "")}
                </span>
                  <img
                    src={Delete}
                    alt="Delete"
                    onClick={() => removeCard(index)}
                    className={styles.delete}
                  />
              </motion.div>
            ))}
          </div>
        </>
      ) : mask?.max_allowed_number === 25 ? (
        <>
          <button
            type="button"
            className={styles.btnGroups}
            onClick={toggleGroups}
          >
            Escolher Grupo
          </button>
          {/* {modalGroups ? (
            <Groups
              number_of_digits={numbers?.number_of_digits}
              mask={numbers?.mask}
              max_bet_length={numbers?.max_bet_length}
              groupDigits={numbers?.min_group_of_digits}
              onModalChange={toggleGroups}
              onSelectedGroups={handleSelectGroupsCards}
              onSelectArrayDouble={handleSelectArrayDouble}
            />
          ) : null} */}
          <div className={styles.selected}>
            {newArray
              ? newArray.map((selectedGroup, index) => (
                  <div className={styles.selectedGroup} key={index}>
                    {newArray[index].map((item, id) => (
                      <div className={styles.groupCard} key={id}>
                        <div>{item.numero_grupo}</div>
                        <div>{item.grupo}</div>
                      </div>
                    ))}
                    <img
                      src={Delete}
                      alt="Delete"
                      onClick={() => removeCard(index, true)}
                    />
                  </div>
                ))
              : null}
            {selectedGroups
              ? selectedGroups.map((selectedGroup, index) => (
                  <div className={styles.selectedGroup} key={index}>
                    <div className={styles.groupCard}>
                      <div>Grupo {selectedGroup.numero_grupo}</div>
                      <div>{selectedGroup.grupo}</div>
                    </div>
                    <img
                      src={Delete}
                      alt="Delete"
                      onClick={() => removeCard(index, true)}
                    />
                  </div>
                ))
              : null}
          </div>
        </>
      ) : null}
      <div className={styles.underline}></div>
    </div>
  );
};
