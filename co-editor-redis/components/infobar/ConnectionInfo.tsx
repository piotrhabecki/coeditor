import { Icon, Intent } from '@blueprintjs/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ConnectionInfo = () => {

  const otherUsersConnected = useSelector((state: RootState) => {
    return state.session.otherUserConnected;
  });

    return (
        <>
          <h3>Other users connected? </h3>
          <Icon
            style={{ paddingLeft: "10px" }}
            icon={"selection"}
            intent={otherUsersConnected ? Intent.SUCCESS : Intent.NONE}
          />
        </>
    );
};

export default ConnectionInfo;