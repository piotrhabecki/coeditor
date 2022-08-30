import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "../../../pusher/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const Redis = require("ioredis");
    const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);

    const username = req.body.username;
    const roomId = req.body.roomId;
    const socketId = req.body.socketId;

    console.log("ON REMOVE");

    const users = await redisClient.lrange(`USERS:${roomId}`, 0, -1);
    console.log(users);
    if (users.length === 2) {
      await redisClient.del(`USERS:${roomId}`);
      await redisClient.del(`ROOM:${roomId}`);
      await redisClient.del(`CODE:${roomId}`)
      await redisClient.del(`MESSAGES:${roomId}`)
    } else if (users.includes(username)) {
      console.log("ON REMOVE INSIDE");
      console.log(username)
      console.log(socketId)
      await redisClient.lrem(`USERS:${roomId}`, -5, username);
      await redisClient.hdel(`ROOM:${roomId}`, username, socketId);

      pusher.trigger(roomId, "USER_DISCONNECTED", username);
      await redisClient.quit();
      res.status(200).json({ username: username });
      return;
    }
    res.status(404).json({ message: "user not found in the room" });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
