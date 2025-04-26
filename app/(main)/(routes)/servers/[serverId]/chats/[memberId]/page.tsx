import { MediaRoom } from "@/components/media-room";
import { ChatHeader } from "@/components/messaging/chat-header";
import { ChatInput } from "@/components/messaging/chat-input";
import { ChatMessages } from "@/components/messaging/chat-messages";
import { getOrCreateChat } from "@/lib/chat";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
  params: { serverId: string; memberId: string };
  searchParams: {
    video?: boolean;
  };
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      members: {
        where: {
          id: params.memberId,
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
      serverId: params.serverId,
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
    <div className="bg-sslight dark:bg-brown flex flex-col h-full">
      <ChatHeader
        member={otherMember}
        server={server}
        role={currentMember.role}
      />
      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={chat.id}
            serverId={server.id}
            type="chat"
            apiUrl="/api/direct-messages"
            socketUrl="/api/socket/direct-messages"
            socketQuery={{
              chatId: chat.id,
            }}
            paramKey="chatId"
            paramValue={chat.id}
          />
          <ChatInput
            name={otherMember.profile.screenName || otherMember.profile.name}
            type="chat"
            apiUrl="/api/socket/direct-messages"
            query={{
              chatId: chat.id,
            }}
          />
        </>
      )}
      {searchParams.video && (
        <MediaRoom chatId={chat.id} video={true} audio={true} />
      )}
    </div>
  );
};

export default MemberIdPage;
