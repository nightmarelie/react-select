import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import styles from "./raw-select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

type MultipleOnChange = MultipleSelectProps["onChange"];
type SingleOnChange = SingleSelectProps["onChange"];
type MultipleValue = MultipleSelectProps["value"];
type SingleValue = SingleSelectProps["value"];

export const Select: FC<SelectProps> = ({
  value,
  onChange,
  options = [],
  multiple = false,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [highlightedIdx, setHighlightedIdx] = useState(0);

  const handleOpenToggle = useCallback(
    () => setOpen((prevIsOpen) => !prevIsOpen),
    []
  );

  const handleClose = useCallback(() => setOpen(false), []);

  const isMultipleHandler = (
    onChange: MultipleOnChange | SingleOnChange
  ): onChange is MultipleOnChange => multiple;

  const isMultipleValue = (
    value: MultipleValue | SingleValue
  ): value is MultipleValue => multiple;

  const clearOptions = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    isMultipleHandler(onChange) ? onChange([]) : onChange(undefined);
  };

  const clearOption = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isMultipleValue(value) && isMultipleHandler(onChange)) {
      const option = value[Number(e.currentTarget.dataset["value"])];
      onChange(value.filter((opt) => opt !== option));
    }
  };

  const handleSelectOption = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation();
    const option = options[Number(e.currentTarget.dataset["value"])];

    if (isMultipleHandler(onChange)) {
      if (isMultipleValue(value)) {
        if (value.includes(option)) {
          onChange(value.filter((opt) => opt !== option));
        } else {
          onChange([...value, option]);
        }
      }
    } else {
      if (option === value) {
        return;
      }
      onChange(option);
    }

    handleClose();
  };

  const isOptionSelected = (option: SelectOption) => {
    return isMultipleValue(value) ? value.includes(option) : option === value;
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
      <span className={styles.value}>
        {isMultipleValue(value)
          ? value.map(({ value, label }, idx) => (
              <button
                key={value}
                className={styles["option-badge"]}
                data-value={idx}
                onClick={clearOption}
              >
                {label}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
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
