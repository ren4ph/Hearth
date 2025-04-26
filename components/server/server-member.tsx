"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Edit, ShieldAlert, ShieldCheck, Trash, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ActionTooltip } from "../action-tooltip";
import { UserAvatar } from "../user-avatar";

interface ServerSectionProps {
  member: Member & { profile: Profile };
  role?: MemberRole;
  server?: Server;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 mr-2 text-orange" />,
  ADMIN: <ShieldAlert className="h-4 w-4 mr-2 text-orange" />,
};

export const ServerMember = ({ member, role }: ServerSectionProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role || MemberRole.GUEST];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/chats/${member?.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-dark/10 dark:hover:bg-dark/50 transition mb-1",
        params?.memberId === member.id && "bg-beige/40 dark:bg-dark"
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="md:w-7 md:h-7" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-md text-jet/50 dark:text-zinc-400 group-hover:text-jet/70 group-hover:dark:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-brown/80 dark:text-sslight/80 group-hover:dark:text-slight"
        )}
      >
        {member.profile.screenName || member.profile.name}
      </p>
      {icon}
    </button>
  );
};
