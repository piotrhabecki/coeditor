import type { NextApiRequest, NextApiResponse } from "next";
const { v4 } = require("uuid");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const Redis = require("ioredis");
    const redisClient = new Redis(
      process.env.REDIS_CONNECTION_STRING
    );

    const username = req.body.username;
    const roomId = req.body.roomId;
    const socketId = req.body.socketId;

    const users = await redisClient.lrange(`USERS:${roomId}`, 0, -1);
    if (users.includes(username)) {
      await redisClient.lrem(`USERS:${roomId}`, -1, `${username}`);
      await redisClient.hdel(`ROOM:${roomId}`, socketId, username);
      await redisClient.del(`USERS:${roomId}`);
      await redisClient.del(`ROOM:${roomId}`);

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
