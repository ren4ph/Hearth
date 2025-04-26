// app/api/notifications/[id]/route.ts

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE" 
  ) {
    try {
      await db.notification.delete({
        where: {
          id: id as string,
        },
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("[NOTIFICATION_DELETE]", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else if (req.method === "POST") {

    try {
      const { message, link, serverId } = await req.body();
      const userId = await currentProfile();
      const notification = await db.notification.create({
        profileId: profile?.id,
        message,
        link,
        serverId,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("[NOTIFICATION_DELETE]", error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }


}
