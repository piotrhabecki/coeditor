import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { useDispatch, useSelector } from "react-redux";
import Coeditor from "../../../components/coeditor/Coeditor";
import Footer from "../../../components/footer/Footer";
import { RootState } from "../../../store";
import { messagesActions } from "../../../store/messages-slice";
import { sessionActions } from "../../../store/session-slice";
import { socketActions } from "../../../store/socket-slice";

const EditorPage: React.FC<{
  roomId: string;
  otherUsersConnected: boolean
}> = ({ roomId, otherUsersConnected }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  let messagePusher = useSelector((state: RootState) => {
    return state.socket.messagePusher;
  })

  if (typeof window !== "undefined") {
    const username = localStorage.getItem("username");
    if (!username) {
      router.push("/");
    }
    else if(messagePusher === null)
    {
      socketInitializer(username, roomId, otherUsersConnected);
    }

    window.onbeforeunload = async () => {
      if(JSON.parse(JSON.stringify(performance.getEntriesByType("navigation")[0])).type !== 'reload')
      {
        await fetch(`/api/session/remove-user-from-room`, {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            socketId: messagePusher!.sessionID,
            roomId: roomId
          }),
          method: "DELETE",
        });
        messagePusher!.disconnect();
        dispatch(socketActions.setMessagePusher(null));
      }
    }
  }

  //@ts-ignore
  console.log()
  
  async function socketInitializer(username: string, roomId: string, otherUsersConnected: boolean) {
    if (roomId.length > 0) {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      });
    
      pusher.subscribe(roomId);

      const res = await fetch('/api/session/connect-to-room', {headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        socketId: pusher.sessionID,
        roomId: roomId
      }),
      method: "POST",
    });
      if(res.ok)
      {
        const res = await fetch(`/api/messages/get-messages?roomId=${roomId}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const result = await res.json();
        dispatch(messagesActions.setMessages(result.messages));
        dispatch(socketActions.setMessagePusher(pusher));
        dispatch(sessionActions.setRoomId(roomId));
        dispatch(sessionActions.setUsername(username));
        dispatch(sessionActions.setOtherUserConnected(otherUsersConnected))

      }
    }
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <main style={{ height: "85vh", background: "#1C2127" }}>
        <Coeditor />
      </main>
      <Footer />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const roomId: string = ctx.query.roomId as string;

  const res = await fetch(
    `http://${ctx.req.headers.host}/api/session/get-session?roomId=${roomId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  if (!res.ok) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }

  const result = await res.json();

  return {
    props: {
      roomId: roomId,
      otherUsersConnected: result.numberOfUsers > 2
    },
  };
};

export default EditorPage;
