import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { MemberRole } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo,
) {
  if (req.method !== "DELETE" && req.method !== "PATCH") {
    return res.status(405).json({ error: "Method Not allowed!"})
  }

  try {
    const profile = await currentProfilePages(req);
    const { directMessageId, chatId } = req.query;
    const { content } = req.body;

    if (!profile) {
      return res.status(401).json({ error: "Unauthorized"})
    }

    if (!directMessageId) {
      return res.status(400).json({ error: "messageId missing"})
    }

    if (!chatId) {
      return res.status(400).json({ error: "chatId missing"})
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
            profile: true
          }
        },

        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    })
    
    if (!chat) {
      return res.status(404).json({ error: "chat not found"})
    }

    const member = chat.memberOne.profileId === profile.id ? chat.memberOne : chat.memberTwo

    if (!member) {
      return res.status(404).json({ error: "member not found"})
    }

    let directMessage = await db.directMessage.findFirst({
      where: {
        id: directMessageId as string,
        chatId: chatId as string,
      },
      include: {
        member: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!directMessage || directMessage.deleted) {
      return res.status(404).json({ error: "message not found"})
    }

    const isMessageOwner = directMessage.memberId === member.id;
    const isAdmin = member.role === MemberRole.ADMIN;
    const isModerator = member.role === MemberRole.MODERATOR;
    const canModify = isMessageOwner || isAdmin || isModerator;

    if (!canModify) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    if (req.method === "DELETE") {
      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          fileUrl: null,
          content: "This message has been deleted.",
          deleted: true,
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        }
      });
    } else if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return res.status(401).json({ error: "Unauthorized" })
      }

      directMessage = await db.directMessage.update({
        where: {
          id: directMessageId as string,
        },
        data: {
          content,
        },
        include: {
          member: {
            include: {
              profile: true
            }
          }
        }
      });
    }


    const updateKey = `chat:${chatId}:messages:update`
    console.log("Emitting message update to:", updateKey);
    res?.socket?.server?.io?.emit(updateKey, directMessage)

    return res.status(200).json(directMessage)
  } catch (error) {
    console.log("[DIRECT_MESSAGE_ID]", error);
    return res.status(500).json({ error: "Internal Error" })
  }

 }
