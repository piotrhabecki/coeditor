import { Card, Elevation } from "@blueprintjs/core";
import Chat from "../chat/Chat";
import Editor from "../console/Editor";
import Output from "../console/Output";
import Infobar from "../infobar/Infobar";

import classes from "./Coeditor.module.css";

const Coeditor = () => {

  return (
    <div className={classes.app__container}>
      <Infobar />
      <div className={classes.editor__container}>
        <div className={classes.editor__space}>
          <Card elevation={Elevation.TWO} className={classes.editor_card + " bp4-dark"}>
            <Editor />
          </Card>
          <Card elevation={Elevation.TWO} className="bp4-dark">
            <Output />
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
