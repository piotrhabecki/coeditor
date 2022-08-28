import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {

    const Redis = require("ioredis");
    const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);

    const roomId = req.query['roomId']
    const messages = await redisClient.lrange(`MESSAGES:${roomId}`, 0, -1)
    await redisClient.quit();
    res.status(200).json({messages: messages.reverse()});
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
