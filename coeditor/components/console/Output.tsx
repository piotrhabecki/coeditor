import { Pre } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import classes from "./Output.module.css";

const Output = () => {
  let output = useSelector((state: RootState) => {
    return state.output.output;
  });

  console.log(output.ConsoleOutput);
  const consoleOutputs = output.ConsoleOutput?.map((element, index) => <li key={index}>{element}</li>)

  return (
    <Pre className={classes.output}>
      {output.EvalOutput || output.ConsoleOutput ? (
        <>
          <p>Evaluate output: {output.EvalOutput}</p>
          <p>
            Console output: <ul>{consoleOutputs}</ul>
          </p>
        </>
      ) : (
        "here the output will be displayed"
      )}
    </Pre>
  );
};

export default Output;
