import { db } from "./db"

export const getOrCreateChat = async (memberOneId: string, memberTwoId: string) => {
  let chat = await findChat(memberOneId, memberTwoId) || await findChat(memberTwoId, memberOneId)

  if (!chat) {
    chat = await createChat(memberOneId, memberTwoId)
  }

  return chat;
}

const findChat = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.chat.findFirst({
      where: {
        AND: [
          { memberOneId: memberOneId },
          { memberTwoId: memberTwoId }
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
  } catch (error) {
    return null;
  }
}

const createChat = async (memberOneId: string, memberTwoId: string) => {
  try {
    return await db.chat.create({
      data: {
        memberOneId,
        memberTwoId
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
  } catch (error) {
    return null;
  }
}
