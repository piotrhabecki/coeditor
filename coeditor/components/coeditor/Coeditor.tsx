import { Card, Elevation } from "@blueprintjs/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Chat from "../chat/Chat";
import CodeEditor from "../console/CodeEditor"
import Output from "../console/Output";
import Infobar from "../infobar/Infobar";

import classes from "./Coeditor.module.css";

const Coeditor = () => {

  let output = useSelector((state: RootState) => {
    return state.output.output;
  });

  return (
    <div className={classes.app__container}>
      <Infobar />
      <div className={classes.editor__container}>
        <div className={classes.editor__space}>
          <Card elevation={Elevation.TWO} className={classes.editor_card + " bp4-dark"}>
            <CodeEditor />
          </Card>
          <Card elevation={Elevation.TWO} className="bp4-dark">
            <Output logs={output}/>
          </Card>
        </div>
        <div className={classes.editor__chat}>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Coeditor;
