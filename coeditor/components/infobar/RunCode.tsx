import { Button, Intent } from "@blueprintjs/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { outputActions } from "../../store/output-slice";
import classes from "./Infobar.module.css";

const RunCode = () => {
  let code = useSelector((state: RootState) => {
    return state.editor.code;
  });

  const codeLangauge = useSelector((state: RootState) => {
    return state.editor.language.value;
  });

  console.log(codeLangauge);

  const dispatch = useDispatch();

  const onCodeRun = async () => {
    const res = await fetch(`/api/editor/evaluate`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: code }),
      method: "POST",
    });
    if (res.ok) {
      const result = await res.json();
      dispatch(outputActions.setOutput(result));
    }
  };

  return (
    <Button
      text={"RUN CODE"}
      intent={Intent.SUCCESS}
      className={classes.run_button}
      rightIcon="play"
      onClick={onCodeRun}
      disabled={codeLangauge !== "javascript"}
    />
  );
};

export default RunCode;
