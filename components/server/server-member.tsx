"use client";

import { cn } from "@/lib/utils";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole, Server } from "@prisma/client";
import { Edit, ShieldAlert, ShieldCheck, Trash, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ForwardRefExoticComponent } from "react";
import { ActionTooltip } from "../action-tooltip";
import { UserAvatar } from "../user-avatar";

interface ServerSectionProps {
  name: string;
  id: string;
  imgUrl?: string;
  role?: MemberRole;
  memberRole?: MemberRole;
  server?: Server;
}

const roleIconMap = {
  GUEST: <User />,
  MODERATOR: <ShieldCheck className="h-4 w-4 mr-2 text-orange" />,
  ADMIN: <ShieldAlert className="h-4 w-4 mr-2 text-orange" />,
};

export const ServerMember = ({
  name,
  id,
  server,
  role,
  memberRole,
  imgUrl,
}: ServerSectionProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[memberRole || MemberRole.GUEST];

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-dark/10 dark:hover:bg-dark/50 transition mb-1",
        params?.channelId === id && "bg-beige/40 dark:bg-dark/30"
      )}
    >
      <UserAvatar src={imgUrl} className="md:w-7 md:h-7" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-md text-jet/50 dark:text-zinc-400 group-hover:text-jet/70 group-hover:dark:text-zinc-300 transition",
          params?.channelId === id &&
            "text-brown/80 dark:text-sslight/80 group-hover:dark:text-slight"
        )}
      >
        {name}
      </p>
      {icon}
      {memberRole === MemberRole.GUEST && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Manage" side="top">
            <Edit className="hidden group-hover:block w-4 h-4 text-orange/60 dark:text-orange/60 hover:text-zinc-600 hover:dark:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Kick" side="top">
            <Trash className="hidden group-hover:block w-4 h-4 text-orange/60 dark:text-orange/60 hover:text-zinc-600 hover:dark:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {memberRole === MemberRole.MODERATOR && role === MemberRole.ADMIN && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Manage" side="top">
            <Edit className="hidden group-hover:block w-4 h-4 text-orange/60 dark:text-orange/60 hover:text-zinc-600 hover:dark:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Kick" side="top">
            <Trash className="hidden group-hover:block w-4 h-4 text-orange/60 dark:text-orange/60 hover:text-zinc-600 hover:dark:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
    </button>
  );
};
