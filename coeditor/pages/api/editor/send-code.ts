import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "../../../pusher/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const roomId = req.body.roomId;
    if (roomId) {
      const Redis = require("ioredis");
      const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);
      const code = req.body.code;

      await redisClient.set(`CODE:${roomId}`, code);
      await redisClient.quit();
      await pusher.trigger(roomId, "SET_CODE", code);

      res.status(200).json({ message: "OK" });
      return;
    }
    res.status(400).json({ message: "No room id found!" });
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
