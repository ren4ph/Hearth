import { Channel, MemberRole, Server } from "@prisma/client";
import { Hash, Mic, Video } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { SocketIndicator } from "../ui/socket-indicator";

interface ChannelHeaderProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

const typeIconMapBlank = {
  TEXT: Hash,
  AUDIO: Mic,
  VIDEO: Video,
};

export const ChannelHeader = ({
  channel,
  server,
  role,
}: ChannelHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  const Icon = typeIconMapBlank[channel.type];

  return (
    <div className="flex flex-row justify-between items-center px-4 py-auto h-13 bg-beige dark:bg-dark/80">
      <p className="flex flex-row gap-x-2 items-center text-2xl font-bold dark:text-sslight/80 text-jet/60">
        <MobileToggle serverId={server.id} />
        <Icon className="my-auto mb-1" />
        {channel.name}
      </p>
      <div className="ml-auto flex items-center">
        <SocketIndicator />
      </div>
    </div>
  );
};
