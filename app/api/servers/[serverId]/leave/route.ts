import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.serverId) {
      return new NextResponse("Missing serverId", { status: 400 });
    }

    if (!profile.id) {
      return new NextResponse("Cannot force someone else to leave", { status: 400 });
    }

    const updatedMember = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id
        },
        members: {
          some: {
            profileId: profile.id
          }
        }, 
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error: any) {
    console.log("[MEMBERS_ID_PATCH]", error?.message);
    return new NextResponse("Internal Error", { status: 499 });
  }
}
