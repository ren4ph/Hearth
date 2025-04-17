import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { NextResponse } from "next/server"


export async function PATCH(
  req: Request,
  props: { params: Promise<{ serverId: string, profileId: string }> }
) {
  const params = await props.params;
  try {
    const profile = await currentProfile();

    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 400 })
    }

    if (!params.profileId) {
      /* For leaving a server use own profile.id */
      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 })
      }

      const server = await db.server.update({
        where: {
          id: params.serverId,
          profileId: profile.id,
        },
        data: {
          members: {
            deleteMany: {
              profileId: profile.id
            }
          }
        }
      })
      return NextResponse.json(server)
    } else {
      const server = await db.server.update({
        where: {
          id: params.serverId,
          profileId: params.profileId,
        },
        data: {
          members: {
            deleteMany: {
              profileId: params.profileId
            }
          }
        }
      })
      return NextResponse.json(server)
    }

  } catch (error) {
    console.log("[SERVER_ID]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
