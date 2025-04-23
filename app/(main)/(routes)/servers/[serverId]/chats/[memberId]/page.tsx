import { ChatHeader } from "@/components/messaging/chat-header";
import { ChatInput } from "@/components/messaging/chat-input";
import { getOrCreateChat } from "@/lib/chat";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const MemberIdPage = async (props: {
  params: Promise<{ serverId: string; memberId: string }>;
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
      members: {
        where: {
          id: para.memberId,
        },
        include: {
          profile: true,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }
  const currentMember = await db.member.findFirst({
    where: {
      serverId: para.serverId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const chat = await getOrCreateChat(currentMember.id, params.memberId);

  if (!chat) {
    return redirect(`/servers/${params.serverId}`);
  }

  const { memberOne, memberTwo } = chat;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className="bg-white dark:bg-brown flex flex-col h-full">
      <ChatHeader
        member={otherMember}
        server={server}
        role={currentMember.role}
      />
      <p className="flex-1">Chat Id Page</p>
      <ChatInput
        name={otherMember.profile.screenName || otherMember.profile.name}
        type="chat"
        apiUrl="/api/socket/messages"
        query={{
          channelId: otherMember.id,
          serverId: otherMember.serverId,
        }}
      />
    </div>
  );
};

export default MemberIdPage;
