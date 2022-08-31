import { Button, Intent, Spinner, SpinnerSize } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sessionActions } from "../../store/session-slice";
import { AppToaster } from "../UI/toaster";

import classes from "./EnterRoom.module.css";

const showToast = (message: string) => {
  AppToaster!.show({
    message: message,
    intent: "warning",
  });
};

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const onRoomIdChange = (event: React.FormEvent<HTMLInputElement>) =>
    setRoomId(event.currentTarget.value);

  const onNameChange = (event: React.FormEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  const onJoinSession = async () => {
    const createRoom = async (name: string, roomId: string) => {
      const res = await fetch("/api/session/join-room", {
        body: JSON.stringify({ username: name, roomId: roomId }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.ok) {
        dispatch(sessionActions.setRoomId(roomId));
        dispatch(sessionActions.setUsername(name));
      }
      return res;
    };
    setIsLoading(true);
    const res = await createRoom(name, roomId);
    if (res.ok) {
      localStorage.setItem("username", name);
      router.push(`/coeditor/${roomId}`);
    } else {
      setIsLoading(false);
      const response = await res.json();
      showToast(response.message);
    }
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Spinner
            className={classes.spinner}
            size={SpinnerSize.LARGE}
            intent={Intent.SUCCESS}
          />
        </div>
      ) : (
        <div className={classes.join_room__container}>
          <h2>Join room</h2>
          <input onChange={onRoomIdChange} placeholder="room id" />
          <input onChange={onNameChange} placeholder="your name" />
          <Button
            text={"JOIN"}
            small
            intent={Intent.PRIMARY}
            disabled={roomId.length == 0 || name.length == 0}
            onClick={onJoinSession}
          />
        </div>
      )}
    </>
  );
};

export default JoinRoom;
