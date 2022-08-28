import type { NextApiRequest, NextApiResponse } from "next";
const { v4 } = require("uuid");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const Redis = require("ioredis");
    const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);

    const roomId = req.query["roomId"];

    const room = await redisClient.exists(`ROOM:${roomId}`, "");

    if (room) {
      const users = await redisClient.lrange(`USERS:${roomId}`, 0, -1) as string[];
      await redisClient.quit();

      const numberOfUsers = users.filter(user => user !== '').length 
      res.status(200).json({ roomId: `ROOM:${roomId}`, numberOfUsers});
      return;
    }
    await redisClient.quit();
    res.status(404).json({ message: "room not found" });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
