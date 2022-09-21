import { useCallback, useState } from "react";
import { RawSelect, RawSelectOption } from "@components";

const options: RawSelectOption[] = [
  {
    label: "First name",
    value: "Oleksii",
  },
  {
    label: "Second name",
    value: "Anna",
  },
  {
    label: "Third name",
    value: "Ylia",
  },
  {
    label: "Forth name",
    value: "Dasha",
  },
];

function App() {
  const [value, setValue] = useState<RawSelectOption | undefined>(options[0]);
  const [values, setValues] = useState<RawSelectOption[]>(
    [] as RawSelectOption[]
  );

  const handleSingleChange = useCallback(
    (value?: RawSelectOption) => setValue(value),
    []
  );

  const handleMultipleChange = useCallback(
    (values: RawSelectOption[]) => setValues(values),
    []
  );

  return (
    <>
      <RawSelect {...{ value, options, onChange: handleSingleChange }} />
      <RawSelect
        {...{
          value: values,
          options,
          onChange: handleMultipleChange,
          multiple: true,
        }}
      />
    </>
  );
}

export default App;
