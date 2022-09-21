import { FC } from "react";
import styles from "./raw-select.module.css";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
  placeholder?: string;
};

export const Select: FC<SelectProps> = ({ value, options = [], onChange }) => {
  return (
    <div tabIndex={0} className={styles.container}>
      <span className={styles.value}>Value</span>
      <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={styles.options}>
        {options.map(({ value, label }) => (
          <li key={value} className={styles.options}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
};
