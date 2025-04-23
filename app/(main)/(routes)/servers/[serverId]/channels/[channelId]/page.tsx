import { ChannelHeader } from "@/components/messaging/channel-header";
import { ChatInput } from "@/components/messaging/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
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

  const channel = server?.channels[0];
  return (
    <div className="bg-white dark:bg-brown flex flex-col h-full">
      <ChannelHeader server={server} channel={channel} />
      <div className="flex-1">Future Message</div>
      <ChatInput
        name={channel.name}
        type="channel"
        apiUrl="/api/socket/messages"
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default ChannelIdPage;
