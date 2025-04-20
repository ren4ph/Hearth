import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId || !params.memberId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (params.memberId === profile.id) {
      return new NextResponse("Cannot change your own role", { status: 400 });
    }

    const updatedMember = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error: any) {
    console.log("[MEMBERS_ID_PATCH]", error?.message);
    console.log(error);
    return new NextResponse("Internal Error", { status: 499 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!serverId || !params.memberId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    if (params.memberId === profile.id) {
      return new NextResponse("Cannot kick yourself", { status: 400 });
    }

    const updatedMember = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id
            }
          }
        }
      },
      include: {
        members: {
          include: { profile: true },
          orderBy: { role: "asc" },
        },
      },
    });

    return NextResponse.json(updatedMember);
  } catch (error: any) {
    console.log("[MEMBERS_ID_PATCH]", error?.message);
    console.log(error);
    return new NextResponse("Internal Error", { status: 499 });
  }
}

