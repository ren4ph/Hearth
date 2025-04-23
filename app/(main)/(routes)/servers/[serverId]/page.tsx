import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const ServerIdPage = async (props: {
  params: Promise<{ serverId: string }>;
}) => {
  const params = await props.params;

  const para = await params;

  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: para.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const channel = server?.channels[0];

  if (!channel || channel.name !== "general") {
    return null;
  }

  return redirect(`/servers/${server.id}/channels/${channel.id}`);
};

export default ServerIdPage;
