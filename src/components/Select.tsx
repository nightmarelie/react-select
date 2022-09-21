import { FC } from "react";
import { Select as SelectUI } from "@chakra-ui/react";

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

export const Select: FC<SelectProps> = ({
  value,
  options,
  onChange,
  placeholder = "",
}) => {
  return <SelectUI placeholder={placeholder}>Select</SelectUI>;
};
