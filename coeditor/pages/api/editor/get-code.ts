import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {

    const roomId = req.query['roomId']
    if(roomId)
    {
      const Redis = require("ioredis");
      const redisClient = new Redis(process.env.REDIS_CONNECTION_STRING);
  
      
      const code = await redisClient.get(`CODE:${roomId}`)
      await redisClient.quit();
  
      console.log(code)
      res.status(200).json({code: code});
      return;
    }
    res.status(400).json({message: "No room id found!"})
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
