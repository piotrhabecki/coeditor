class ChatMessage {
    username: string;
    message: string;

    constructor(
        username: string,
        message: string,
      ) {
        this.username = username;
        this.message = message;
      }
}

  export default ChatMessage;