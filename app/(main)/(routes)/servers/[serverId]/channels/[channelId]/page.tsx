import { MediaRoom } from "@/components/media-room";
import { ChannelHeader } from "@/components/messaging/channel-header";
import { ChatInput } from "@/components/messaging/chat-input";
import { ChatMessages } from "@/components/messaging/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
const ChannelIdPage = async (props: {
  children: React.ReactNode;
  params: Promise<{ serverId: string; channelId: string }>;
}) => {
  const params = await props.params;

  const { children } = props;

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
          id: para.channelId,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  const member = await db.member.findFirst({
    where: {
      serverId: para.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!member) {
    return redirect("/");
  }

  const channel = server?.channels[0];
  return (
    <div className="bg-light dark:bg-brown flex flex-col h-full">
      <ChannelHeader server={server} channel={channel} />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            serverId={server.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type="channel"
            apiUrl="/api/socket/messages"
            query={{
              channelId: channel.id,
              serverId: channel.serverId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} video={false} audio={true} />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default ChannelIdPage;
