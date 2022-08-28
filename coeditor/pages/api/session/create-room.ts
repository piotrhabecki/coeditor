import type { NextApiRequest, NextApiResponse } from "next";
const { v4 } = require("uuid");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {

    const Redis = require("ioredis");
    const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);

    const roomId = v4();

    await redisClient.hset(`ROOM:${roomId}`, "", "");
    await redisClient.lpush(`USERS:${roomId}`, "");
    await redisClient.quit();
    res.status(200).json({ roomId: roomId });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
