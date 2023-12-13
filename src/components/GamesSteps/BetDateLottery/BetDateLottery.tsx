import styles from "./BetDateLottery.module.css";
import { IModalities } from "interfaces";
import { useEffect, useState } from "react";
import useGameContext from "data/hooks/useGameContext";
import { format } from "date-fns";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface BetDateLotteryProps {
  dateAndLottery: IModalities;
  dataDate: (data: string) => void;
  dataLottery: (data: string[]) => void;
}

export const BetDateLottery = ({
  dateAndLottery,
  dataDate,
  dataLottery,
}: BetDateLotteryProps) => {
  const { lotteries, setBetDate, fullLotteries, getFilteredLotteries } =
    useGameContext();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateValue, setSelectedDateValue] = useState<string>("");
  const [selectedLottery, setSelectedLottery] = useState<string[]>([]);
  const animatedComponents = makeAnimated();
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 5);

  const getCurrentDateTime = () => {
    const currentDate = new Date();
    return format(currentDate, "HH:mm:ss");
  };

  const handleDateChange = (event: any) => {
    setBetDate(event.target.value);
    const selectedDate = event.target.value;
    setSelectedDateValue(selectedDate);
    const currentDateTime = getCurrentDateTime();
    setSelectedDate(`${selectedDate}T${currentDateTime}`);
  };

  const handleLotteryChange = (selectedOptions: any) => {
    const selectedLotteries = selectedOptions.map(
      (option: any) => option.value
    );
    setSelectedLottery(selectedLotteries);
  };

  const options = lotteries.length
    ? lotteries.map((item) => ({
        value: item.lottery_type,
        label: item.lottery_name,
      }))
    : fullLotteries.map((item) => ({
        value: item.lottery_type,
        label: item.lottery_name,
      }));

  useEffect(() => {
    dataDate(selectedDate);
    dataLottery(selectedLottery);
  }, [selectedDate, selectedLottery]);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      width: 270,
      height: "auto",
      paddingTop: 7,
      paddingBottom: 7,
      display: "flex",
      justifyContent: "center",
      borderRadius: 32,
      border: state.isFocused ? "2px solid #3F73E3" : "1px solid #3F73E3",
      background: "#FFF",
      color: "#7A7786",
      fontSize: 17,
      textIndent: 10,
      lineHeight: "normal",
      flex: "1",
    }),
    menu: (provided: any) => ({
      ...provided,
      width: 230,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? "transparent" : "transparent",
      color: state.isSelected ? "#FFF" : "#7A7786",
      cursor: "pointer",
    }),
  };

  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary: "#3F73E3",
      primary75: "#3F73E3",
      primary50: "#3F73E3",
      primary25: "#3F73E3",
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.date}>
        <div className={styles.title}>Data da Aposta</div>
        <input
          type="date"
          id="datePicker"
          name="datePicker"
          className={styles.input}
          value={selectedDateValue}
          onChange={handleDateChange}
          min={minDate.toISOString().split("T")[0]}
          max={maxDate.toISOString().split("T")[0]}
        />
      </div>
      <div className={styles.underline}></div>
      <div className={styles.lotteryes}>
        <div className={styles.title}>Loteria</div>
        <Select
          onChange={handleLotteryChange}
          closeMenuOnSelect={false}
          components={{ ...animatedComponents }}
          options={options}
          value={options.filter((option) =>
            selectedLottery.includes(option.value)
          )}
          theme={customTheme}
          isMulti
          required
          placeholder={
            options.length > 0 ? options[0].label : "Selecione uma loteria"
          }
          styles={customStyles}
        />
      </div>
    </div>
  );
};
