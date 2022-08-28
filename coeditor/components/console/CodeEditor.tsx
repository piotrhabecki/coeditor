import Editor from "@monaco-editor/react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { codeEditorActions } from "../../store/code-editor-slice";

import classes from "./CodeEditor.module.css";

const CodeEditor = () => {
  
  const dispatch = useDispatch()

  const codeChangeHandler = (event: any) => {
    dispatch(codeEditorActions.setCode(event))
  };

  let code = useSelector((state: RootState) => {
    return state.editor.code
  });

  const codeLangauge = useSelector((state: RootState) => {
    return state.editor.language.value;
  });

  return (
    <div className={classes.editor}>
      <Editor
        defaultLanguage="javascript"
        language={codeLangauge}
        defaultValue="// some comment"
        value={code}
        theme={"vs-dark"}
        onChange={codeChangeHandler}
      />
    </div>
  );
};

export default CodeEditor;
