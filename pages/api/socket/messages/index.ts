import { NextApiRequest } from "next"
import { NextApiResponseServerIo } from "@/types"
import { currentProfilePages } from "@/lib/current-profile-pages"
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed"})
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { serverId, channelId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unathorized" })
    }

    if (!serverId) {
      return res.status(400).json({ error: "Server Id missing"})
    }

    if (!channelId) {
      return res.status(400).json({ error: "Channel Id missing"})
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing"})
    }

    const server = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      include: {
        members: true,
      }
    })

    if (!server) {
      return res.status(404).json({ message: "Server with such id not found" })
    }

    const channel = await db.channel.findFirst({
      where: {
        id: channelId as string,
        serverId: serverId as string,
      }
    })

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" })
    }

    const member = server.members.find((member) => member.profileId === profile.id)

    if (!member) {
      return res.status(404).json({ message: "Cannot find user in server" })
    }

    const message = await db.message.create({
      data: {
        content, fileUrl,
        channelId: channelId as string,
        memberId: member.id
      }, 
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    const channelKey = `chat:${channelId}:messages`;
    console.log("Emitting message Create to:", `chat:${channelId}:messages:update`);
    res?.socket?.server?.io?.emit(channelKey, message)
    server.members.map(async (memb) => {
      if (memb.profileId === member.profileId) return;
      const notifKey = `user:${memb.profileId}:notifications`

      const notif = {
        id: memb.profileId,
        message: `${message.member.profile.screenName} in ${server.name}#${channel.name}: ${message.content}`,
        link: `/servers/${serverId}/channels/${channelId}`,
      }
      console.log("Emitting message Notif to: ", notifKey, notif)
      res?.socket?.server?.io?.emit(notifKey, notif)
    })


    return res.status(200).json(message)
  } catch (error) {
    console.log("[MESSAGES_POST]", error)
    return res.status(500).json({ message: "Internal Error"})
  }
}
