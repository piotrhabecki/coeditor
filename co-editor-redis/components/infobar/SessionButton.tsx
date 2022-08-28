import { Alignment, Button, Position, Toaster } from "@blueprintjs/core";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AppToaster } from "../UI/toaster";

const showToast = () => {
  AppToaster!.show({
    message: "Session id copied to clipboard",
    intent: "primary",
  });
};

const SessionButton = () => {

  const sessionId = useSelector((state: RootState) => {
    return state.session.roomId;
  });
  
  const onSessionInformationClick = () => {
    navigator.clipboard.writeText(`${sessionId}`);

    showToast();
  };

  return (
    <>
      <Button
        className="bp3-minimal"
        alignText={Alignment.CENTER}
        icon={"duplicate"}
        onClick={onSessionInformationClick}
        text={`Room ID ${sessionId}`}
      ></Button>
      <Toaster position={Position.BOTTOM}></Toaster>
    </>
  );
};

export default SessionButton;
