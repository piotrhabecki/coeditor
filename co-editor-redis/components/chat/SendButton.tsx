import { Button } from '@blueprintjs/core';

import classes from './Chat.module.css'

interface sendButton
{
    onSendMessage: () => void
}

const SendButton = (props: sendButton) => {
    return (
        <Button onClick={props.onSendMessage} className={classes.send__button} active minimal intent='primary' icon='send-message'/>
    );
};

export default SendButton;