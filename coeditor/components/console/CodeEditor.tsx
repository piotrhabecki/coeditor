import Editor from "@monaco-editor/react";
import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import classes from "./CodeEditor.module.css";

const codeReducer = (state: any, action: any) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val };
  }
  return { value: '' };
};

const CodeEditor = () => {

  let code = useSelector((state: RootState) => {
    return state.editor.code;
  });

  const codeLangauge = useSelector((state: RootState) => {
    return state.editor.language.value;
  });

  const roomId = useSelector((state: RootState) => {
    return state.session.roomId;
  })

  const [codeState, dispatchCode] = useReducer(codeReducer, {
    value: code,
  });

  const { value: codeValue } = codeState;

  const codeChangeHandler = (event: any) => {
    dispatchCode({ type: 'USER_INPUT', val: event });
  };

  async function setCode(code: string) {
    await fetch(`/api/editor/send-code`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({code: code, roomId: roomId}),
      method: "POST",
    });
  }

  useEffect(() => {
    const identifier = setTimeout(() => {
      setCode(codeValue)
    }, 800);

    return () => {
      clearTimeout(identifier);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeValue]);




  return (
    <div className={classes.editor}>
      <Editor
        defaultLanguage="javascript"
        language={codeLangauge}
        value={code}
        theme={"vs-dark"}
        onChange={codeChangeHandler}
      />
    </div>
  );
};

export default CodeEditor;
