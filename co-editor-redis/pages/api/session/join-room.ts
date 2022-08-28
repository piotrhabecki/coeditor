import type { NextApiRequest, NextApiResponse } from "next";
const { v4 } = require("uuid");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {

    const Redis = require("ioredis");
    const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);

    const username = req.body.username;
    const roomId = req.body.roomId;

    //@ts-ignore no need to cast string to redis key
    const room = await redisClient.exists(`USERS:${roomId}`);

    if (room === 0) {
      await redisClient.quit();
      res.status(404).json({ message: "There is no room with given ID" });
      return;
    }

    const users = await redisClient.lrange(`USERS:${roomId}`, 0, -1);
    if (users.includes(username)) {
      await redisClient.quit();
      res.status(409).json({
        message:
          "Username with same name exist in the room already. Please pick another name.",
      });
      return;
    }
    await redisClient.quit();
    res.status(200).json({ roomId: roomId, username: username });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
