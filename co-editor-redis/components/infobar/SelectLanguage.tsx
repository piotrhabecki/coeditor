import React from 'react';
import SelectCodeLanguage from './SelectCodeLanguage';
import { codeEditorActions } from '../../store/code-editor-slice';
import { useDispatch } from 'react-redux';

const SelectLanguage = () => {

  const dispatch = useDispatch()

  const onCodeSelect = (event: any) => {
    dispatch(codeEditorActions.setLanguage(JSON.parse(event.target.value)));
  };

    return (
        <SelectCodeLanguage
        onSelect={onCodeSelect}
      />
    );
};

export default SelectLanguage;