import { RawSelect } from "@components";

function App() {
  const options = [
    {
      label: "First name",
      value: "Oleksii",
    },
    {
      label: "Second name",
      value: "Anna",
    },
  ];
  return <RawSelect options={options} />;
}

export default App;
