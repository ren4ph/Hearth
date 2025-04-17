import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: Promise<{
    inviteCode: string;
  }>
}

const InviteCodePage = async (props: InviteCodePageProps) => {
  const params = await props.params;
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  if (!params.inviteCode) {
    return redirect("/")
  }

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  const targetServer = await db.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
    },
  });

  if (!targetServer) {
    return redirect("/"); // or show a 404 page
  }

  const server = await db.server.update({
    where: {
      id: targetServer.id,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id
          },
        ],
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return null;
}

export default InviteCodePage;
