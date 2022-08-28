import {
  Alignment,
  Card,
  Elevation,
  Navbar,
} from "@blueprintjs/core";
import ConnectionInfo from "./ConnectionInfo";
import classes from "./Infobar.module.css";
import RunCode from "./RunCode";
import SelectedLanguageTag from "./SelectedLanguageTag";
import SelectLanguage from "./SelectLanguage";
import SessionButton from "./SessionButton";
import Username from "./Username";

const infobar = () => {
  return (
    <Card
      elevation={Elevation.TWO}
      className={classes.infobar_card + " bp4-dark"}
    >
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <RunCode />
          <SelectLanguage />
          <Navbar.Divider />
          <SelectedLanguageTag />
        </Navbar.Group>
        <Navbar.Group align={Alignment.RIGHT}>
          <SessionButton />
          <Navbar.Divider />
          <Username />
          <Navbar.Divider />
          <ConnectionInfo />
        </Navbar.Group>
      </Navbar>
    </Card>
  );
};

export default infobar;
