import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { Mic, Text, Video } from "lucide-react";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          role: "asc",
        },
      },
    },
  });

  const typeIconMap = {
    TEXT: <Text className="h-4 w-4 ml-auto" />,
    AUDIO: <Mic className="h-4 w-4 ml-auto" />,
    VIDEO: <Video className="h-4 w-4 ml-auto" />,
  };

  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
  const members = server?.members.filter(
    (member) => member.profileId !== profile.id
  );

  if (!server) {
    return redirect("/");
  }

  const role = server.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className="flex flex-col h-full text-primary w-full dark:bg-jet bg-sslight">
      <ServerHeader server={server} role={role} />
      <div>
        {server.channels.map((channel) => (
          <div
            key={channel.id}
            className="p-2 h-10 flex flex-row items-center justify-start"
          >
            {typeIconMap[channel.type]}{" "}
            <div className="mr-auto">{channel.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
