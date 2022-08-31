import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Language from "../../models/language";
import { RootState } from "../../store";
import { codeEditorActions } from "../../store/code-editor-slice";
import { LANGAUGES_OBJECTS, LANGUAGES } from "../../utils/consts";
import CodeEditor from "./CodeEditor";

const Editor = () => {
  const dispatch = useDispatch();

  let messagePusher = useSelector((state: RootState) => {
    return state.socket.messagePusher;
  });

  if (messagePusher !== null) {
    messagePusher.bind("SET_LANGUAGE", (language: Language) => {
      dispatch(
        codeEditorActions.setLanguage(
          LANGAUGES_OBJECTS.get(language.value)?.langauge
        )
      );
    });

    messagePusher.bind("SET_CODE", (code: string) => {
      dispatch(codeEditorActions.setCode(code));
    });
  }

  return <CodeEditor />;
};

export default Editor;
