import { FC } from "react";
import styles from "./raw-select.module.css";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
  placeholder?: string;
};

export const Select: FC<SelectProps> = ({ value, options, onChange }) => {
  return (
    <div className={styles.container}>
      <span className={styles.value}>Value</span>
      <button className={styles["clear-btn"]}>&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
    </div>
  );
};
