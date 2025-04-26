import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Hash, Mic, ShieldAlert, ShieldCheck, User, Video } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { Avatar } from "../ui/avatar";
import { UserAvatar } from "../user-avatar";
import { SocketIndicator } from "../ui/socket-indicator";
import { ChatVideoButton } from "./chat-video-button";

interface ChatHeaderProps {
  member: Member & { profile: Profile };
  server: Server;
  role?: MemberRole;
}

const roleIconMapBlank = {
  GUEST: User,
  MODERATOR: ShieldCheck,
  ADMIN: ShieldAlert,
};

export const ChatHeader = ({ member, server, role }: ChatHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const Icon = roleIconMapBlank[member.role];

  return (
    <div className="flex flex-row justify-between items-center px-4 py-auto h-13 bg-beige dark:bg-dark/80">
      <div className="flex flex-row gap-x-4 items-center text-2xl font-bold dark:text-sslight/80 text-jet/60">
        <MobileToggle serverId={server.id} />
        <UserAvatar src={member.profile.imageUrl} className="md:w-8 md:h-8" />
        <div className="flex flex-row justify-start items-center gap-x-1">
          {member.profile.screenName || member.profile.name}
          <Icon className="my-auto mb-1" />
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <ChatVideoButton />
        <SocketIndicator />
      </div>
    </div>
  );
};
