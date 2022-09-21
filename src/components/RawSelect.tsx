import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
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
  const [highlightedIdx, setHighlightedIdx] = useState(0);

  const handleOpenToggle = useCallback(
    () => setOpen((prevIsOpen) => !prevIsOpen),
    []
  );

  const handleClose = useCallback(() => setOpen(false), []);

  const clearOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(undefined);
  };

  const handleSelectOption = (e: MouseEvent<HTMLLIElement>) => {
    const option = options[Number(e.currentTarget.dataset["value"])];

    if (option === value) {
      return;
    }

    e.stopPropagation();
    onChange(option);
    handleClose();
  };

  const isOptionSelected = (option: SelectOption) => {
    return option === value;
  };

  const isHighlightedIdx = (idx: number) => {
    return idx === highlightedIdx;
  };

  const handleHighlightedIdx = (e: MouseEvent<HTMLLIElement>) => {
    setHighlightedIdx(Number(e.currentTarget.dataset["value"]));
  };

  useEffect(() => {
    isOpen && setHighlightedIdx(0);
  }, [isOpen]);

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
            className={`${styles.option} ${
              isOptionSelected(options[idx]) ? styles.selected : ""
            } ${isHighlightedIdx(idx) ? styles.highlighted : ""}`}
            onMouseEnter={handleHighlightedIdx}
            onClick={handleSelectOption}
          >
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
