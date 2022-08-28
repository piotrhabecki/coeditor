import {
  Button,
  ButtonGroup,
  Card,
  Elevation,
  Intent,
} from "@blueprintjs/core";
import Image from "next/image";
import { useState } from "react";

import editorImage from "../../assets/coding.png";
import CreateRoom from "./CreateRoom";
import classes from "./EnterRoom.module.css";
import JoinRoom from "./JoinRoom";

const EnterRoom = () => {
  const [selectedButton, setSelectedButton] = useState(1);

  return (
    <Card
      elevation={Elevation.THREE}
      className={classes.enter_room__container + " " + "bp4-dark"}
    >
      <div className={classes.logo__container}>
        <h1>Co-editor</h1>
        <Image src={editorImage} alt="editor" objectFit={"contain"} />
        <h3>Edit code with coworkers</h3>
      </div>
      <Card
        elevation={Elevation.FOUR}
        className={classes.elements_with_button__container}
      >
        <div>{selectedButton === 1 ? <JoinRoom /> : <CreateRoom />}</div>
        <ButtonGroup fill>
          <Button
            onClick={() => setSelectedButton(1)}
            large
            intent={selectedButton === 1 ? Intent.PRIMARY : Intent.NONE}
            text={"JOIN ROOM"}
          />
          <Button
            onClick={() => setSelectedButton(2)}
            large
            intent={selectedButton === 2 ? Intent.PRIMARY : Intent.NONE}
            text={"CREATE ROOM"}
          />
        </ButtonGroup>
      </Card>
    </Card>
  );
};

export default EnterRoom;
