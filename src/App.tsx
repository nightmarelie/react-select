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
];

function App() {
  const [value, setValue] = useState<RawSelectOption | undefined>(options[0]);

  const handleChange = useCallback(
    (value?: RawSelectOption) => setValue(value),
    []
  );

  return <RawSelect {...{ value, options, onChange: handleChange }} />;
}

export default App;
