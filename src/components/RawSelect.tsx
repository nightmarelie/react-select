import { FC, MouseEvent, SyntheticEvent, useCallback, useState } from "react";
import styles from "./raw-select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};

export const Select: FC<SelectProps> = ({ value, options = [], onChange }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenToggle = useCallback(
    () => setOpen((prevIsOpen) => !prevIsOpen),
    []
  );

  const handleClose = useCallback(() => setOpen(false), []);

  const clearOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(undefined);
  };

  const selectOption = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    onChange(options[Number(e.currentTarget.dataset["value"])]);
    handleClose();
  };

  return (
    <div
      tabIndex={0}
      className={styles.container}
      onClick={handleOpenToggle}
      onBlur={handleClose}
    >
      <span className={styles.value}>{value?.label}</span>
      <button className={styles["clear-btn"]} onClick={clearOptions}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ""}`}>
        {options.map(({ value, label }, idx) => (
          <li
            key={value}
            data-value={idx}
            className={styles.option}
            onClick={selectOption}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
