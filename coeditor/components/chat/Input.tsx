import SendButton from "./SendButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { DetailedHTMLProps, InputHTMLAttributes, KeyboardEventHandler, useState } from "react";

import classes from "./Chat.module.css";
import { Button } from "@blueprintjs/core";

interface input {
  onMessageSend: (message: string) => void
}

const Input = (props: input) => {


  let socket = useSelector((state: RootState) => {
    return state.socket.messageSocket;
  });

  let username = useSelector((state: RootState) => {
    return state.session.username;
  });

  let roomId = useSelector((state: RootState) => {
    return state.session.roomId;
  }); 

  const [message, setMessage] = useState<string>("");

  function onMessageChange(event: React.FormEvent<HTMLInputElement>) {
    setMessage(event.currentTarget.value);
  }

  const onEnter = (event: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
    if(event.key === "Enter")
    {
      props.onMessageSend(message);
      setMessage("");
    }
  }

  return (
    <div className={classes.input__container}>
      <input onChange={onMessageChange} className={classes.input} onKeyDown={onEnter} value={message}/>
      <Button onClick={() => props.onMessageSend(message)} className={classes.send__button} active minimal intent='primary' icon='send-message'/>
    </div>
  );
};

export default Input;
