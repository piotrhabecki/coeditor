import { useSelector } from "react-redux";
import { RootState } from "../../store";
import classes from "./Chat.module.css";
import Message from "./Message";

const Messages = () => {
  let messages = useSelector((state: RootState) => {
    return state.messages.messages;
  });

  let username = useSelector((state: RootState) => {
    return state.session.username;
  });

  const welcomeMessage = {message: "Hello there! Please remember that this is a demo application. You can run your code by clicking on RUN CODE button 🏁. Select language by dropdown button 🖥️. Click on Room ID button to copy the session ID number 🖱️. Give it to your friend and start typing together!", username: "infobot 🤖"}

  return (
    <div className={classes.messages__container}>
      <ul className={classes.messages__list}>
      <Message
              key={0}
              messageStyling={classes.incomming__message}
              username={welcomeMessage.username}
              value={welcomeMessage.message}
            />
        {messages.map((message, index) => {
          if (message.username === username)
            return (
              <Message
                key={index}
                messageStyling={classes.my__message}
                username={message.username}
                value={message.message}
              />
            );
          return (
            <Message
              key={index}
              messageStyling={classes.incomming__message}
              username={message.username}
              value={message.message}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Messages;
