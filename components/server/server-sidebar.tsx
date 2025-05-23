import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { Hash, Mic, ShieldAlert, ShieldCheck, User, Video } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServerSearch } from "./server-search";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

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
    TEXT: <Hash className="h-4 w-4 mr-2" />,
    AUDIO: <Mic className="h-4 w-4 mr-2" />,
    VIDEO: <Video className="h-4 w-4 mr-2" />,
  };

  const roleIconMap = {
    GUEST: null,
    MODERATOR: <ShieldCheck className="h-4 w-4 mr-2 text-orange" />,
    ADMIN: <ShieldAlert className="h-4 w-4 mr-2 text-orange" />,
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
      <ScrollArea className="flex-1 px-3">
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: typeIconMap[channel.type],
                })),
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: typeIconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: typeIconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.screenName || member.profile.name,
                  icon: roleIconMap[member.role],
                })),
              },
            ]}
          />
        </div>
        <Separator className="bg-orange/40 dark:bg-orange/40 rounded-md my-2" />
        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              server={server}
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
            />
            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
              />
            ))}
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <Separator className="max-w-[40%] bg-orange/40 dark:bg-orange/40 rounded-md my-2 ml-[30%]" />
            <ServerSection
              sectionType="channels"
              server={server}
              channelType={ChannelType.AUDIO}
              role={role}
              label="Voice Channels"
            />
            {audioChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
              />
            ))}
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <Separator className="max-w-[40%] bg-orange/40 dark:bg-orange/40 rounded-md my-1 ml-[30%]" />
            <ServerSection
              sectionType="channels"
              server={server}
              channelType={ChannelType.VIDEO}
              role={role}
              label="Video Channels"
            />
            {videoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                server={server}
              />
            ))}
          </div>
        )}
        {!!members?.length && (
          <div className="mb-2">
            <Separator className="max-w-[40%] bg-orange/40 dark:bg-orange/40 rounded-md my-1 ml-[30%]" />
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            {members.map((member) => (
              <ServerMember
                key={member.id}
                member={member}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
