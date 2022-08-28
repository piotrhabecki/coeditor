import React from 'react';
import SelectCodeLanguage from './SelectCodeLanguage';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const SelectLanguage = () => {

  let roomId = useSelector((state: RootState) => {
    return state.session.roomId;
  })

  const onCodeSelect = async (event: any) => {
    const language = JSON.parse(event.target.value)
    await fetch(`/api/editor/set-language`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({language: language, roomId: roomId}),
      method: "POST",
    });
  };

    return (
        <SelectCodeLanguage
        onSelect={onCodeSelect}
      />
    );
};

export default SelectLanguage;