import { NextApiRequest } from "next"
import { NextApiResponseServerIo } from "@/types"
import { currentProfilePages } from "@/lib/current-profile-pages"
import { db } from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  console.log("Incoming request:", req.method, req.url)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed"})
  }

  try {
    const profile = await currentProfilePages(req);
    const { content, fileUrl } = req.body;
    const { chatId } = req.query;

    if (!profile) {
      return res.status(401).json({ error: "Unathorized" })
    }

    if (!chatId) {
      return res.status(400).json({ error: "Chat Id missing"})
    }

    if (!content) {
      return res.status(400).json({ error: "Content missing"})
    }

    const chat = await db.chat.findFirst({
      where: {
        id: chatId as string,
        OR: [
          {
            memberOne: {
              profileId: profile.id
            }
          },
          {
            memberTwo: {
              profileId: profile.id
            }
          }
        ]
      },
      include: {
        memberOne: {
          include: {
            profile: true,
          }
        },
        memberTwo: {
          include: {
            profile: true,
          }
        }
      }
    })

    if (!chat) { return res.status(404).json({ message: "Chat not found" }) }

    const member = chat.memberOne.profileId === profile.id ? chat.memberOne : chat.memberTwo

    if (!member) {
      return res.status(404).json({ message: "Member not found" })
    }

    const message = await db.directMessage.create({
      data: {
        content, fileUrl,
        chatId: chatId as string,
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

    const channelKey = `chat:${chatId}:messages`;
    res?.socket?.server?.io?.emit(channelKey, message)

    return res.status(200).json(message)
  } catch (error) {
    console.log("[DIRECT_MESSAGES_POST]", error)
    return res.status(500).json({ message: "Internal Error"})
  }
}
