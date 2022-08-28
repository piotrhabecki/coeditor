import { Pre } from "@blueprintjs/core";
import classes from './Output.module.css'

interface output {
    logs: string;
}

const Output = (props: output) => {

  return (
      <Pre className={classes.output}>
        {props.logs ? props.logs : 'here the output will be displayed'}
      </Pre>
  );
};

export default Output;
