import classes from "./Chat.module.css";

interface message {
  messageStyling: string;
  username: string;
  value: string;
}

const Message = (props: message) => {
  return (
    <li className={classes.message + " " + props.messageStyling}>
      <small>User: {props.username}</small>
      <div>{props.value}</div>
    </li>
  );
};

export default Message;
