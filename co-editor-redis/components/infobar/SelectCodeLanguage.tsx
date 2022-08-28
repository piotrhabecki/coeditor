interface OnSelectProps {
  onSelect: (event: any) => void;
}

const SelectCodeLanguage = (props: OnSelectProps) => {
  const codeLanguageList = [
    { value: "javascript", label: "Javascript" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
  ];

  return (
    <div style={{ paddingLeft: "10px" }}>
      <select defaultValue={"Change editor langauge"} onChange={props.onSelect}>
        <option disabled hidden>
          Change editor langauge
        </option>
        {codeLanguageList.map((option, index) => (
          <option key={index} value={JSON.stringify(option)}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectCodeLanguage;
