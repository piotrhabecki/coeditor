import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Username = () => {

  const username = useSelector((state: RootState) => {
    return state.session.username;
  });

  return <h3>Username: {username}</h3>;
};

export default Username;
