import { Card, Elevation } from "@blueprintjs/core";
import Input from "./Input";
import Messages from "./Messages";
import { useDispatch } from "react-redux";
import { messagesActions } from "../../store/messages-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { sessionActions } from "../../store/session-slice";

import classes from "./Chat.module.css";
import { AppToaster } from "../UI/toaster";

const showToast = (message: string) => {
  AppToaster!.show({
    message: message,
    intent: "success",
    timeout: 3000
  });
};

const Chat = () => {
  const dispatch = useDispatch();
  let roomId = useSelector((state: RootState) => {
    return state.session.roomId;
  });

  let username = useSelector((state: RootState) => {
    return state.session.username;
  });

  let messagePusher = useSelector((state: RootState) => {
    return state.socket.messagePusher;
  });

  async function onMessageSend(message: string) {
    if(message.length > 0)
    {
      const msg = JSON.stringify({ username, message });
      await fetch(`/api/messages/send-message`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({message: msg, roomId}),
        method: "POST",
      });
    }
  }

  if(messagePusher)
  {
    messagePusher.bind('NEW_USER_CONNECTED', (username: string) => {
      dispatch(sessionActions.setOtherUserConnected(true));
      showToast(`User ${username} connected`);
    })

    messagePusher.bind('USER_DISCONNECTED', (username: string) => {
      dispatch(sessionActions.setOtherUserConnected(true));
      showToast(`User ${username} disconnected`);
    })
    
    messagePusher.bind("NEW_MESSAGE", async () => {
      const res = await fetch(`/api/messages/get-messages?roomId=${roomId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const result = await res.json();
      dispatch(messagesActions.setMessages(result.messages));
    });
  }


  return (
    <Card
      elevation={Elevation.TWO}
      className={"bp4-dark " + classes.chat__container}
    >
      <Messages />
      <Input onMessageSend={onMessageSend} />
    </Card>
  );
};

export default Chat;
