import { Button, Intent } from '@blueprintjs/core';
import classes from "./Infobar.module.css";

const RunCode = () => {
    return (
        <Button
        text={"RUN CODE"}
        intent={Intent.SUCCESS}
        className={classes.run_button}
        rightIcon="play"
      />
    );
};

export default RunCode;