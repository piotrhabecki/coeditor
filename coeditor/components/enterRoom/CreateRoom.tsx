import { Button, Intent, Spinner, SpinnerSize } from "@blueprintjs/core";
import { useRouter } from "next/router";
import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { useDispatch } from "react-redux";
import { sessionActions } from "../../store/session-slice";

import classes from "./EnterRoom.module.css";

const CreateRoom = () => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const onGenerateSession = async () => {
    const createRoom = async (name: string) => {
      const res = await fetch("/api/session/create-room", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.ok) {
        const result = await res.json();
        const roomId: string = result.roomId;

        dispatch(sessionActions.setRoomId(roomId));
        dispatch(sessionActions.setUsername(name));
        return roomId;
      }
    };
    setIsLoading(true);
    const roomId = await createRoom(name);
    localStorage.setItem("username", name);
    router.push(`/coeditor/${roomId}`);
  };

  const onNameChange = (event: React.FormEvent<HTMLInputElement>) =>
    setName(event.currentTarget.value);

  const onEnter = (
    event: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    if (event.key === "Enter") {
      onGenerateSession();
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner
          className={classes.spinner}
          size={SpinnerSize.LARGE}
          intent={Intent.SUCCESS}
        />
      ) : (
        <div className={classes.join_room__container}>
          <h2>Create room</h2>
          <input
            onChange={onNameChange}
            placeholder="your name"
            onKeyDown={onEnter}
          />
          <Button
            text={"CREATE"}
            small
            intent={Intent.PRIMARY}
            disabled={name.length == 0}
            onClick={onGenerateSession}
          />
        </div>
      )}
    </>
  );
};

export default CreateRoom;
