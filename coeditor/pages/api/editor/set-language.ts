import type { NextApiRequest, NextApiResponse } from "next";
import pusher from "../../../pusher/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {

    const language = req.body.language;
    const roomId = req.body.roomId;

    await pusher.trigger(roomId, 'SET_LANGUAGE', language);
    
    res.status(200).json({language: language});
  } else {
    //Response for other than POST method
    res.status(500).json({ message: "Route not valid" });
  }
}
