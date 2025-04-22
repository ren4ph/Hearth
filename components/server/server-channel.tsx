"use client";

import { cn } from "@/lib/utils";
import { ServerWithMembersWithProfiles } from "@/types";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Hash, Lock, LucideProps, Mic, Trash, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ForwardRefExoticComponent } from "react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  server?: Server;
  channel?: Channel;
  role?: MemberRole;
}

const typeIconMapBlank = {
  TEXT: Hash,
  AUDIO: Mic,
  VIDEO: Video,
};

export const ServerChannel = ({
  server,
  channel,
  role,
}: ServerSectionProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const { name, id, type } = channel || {};

  const Icon = typeIconMapBlank[type || ChannelType.TEXT];

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-dark/10 dark:hover:bg-dark/50 transition mb-1",
        params?.channelId === id && "bg-beige/40 dark:bg-dark/30"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-jet/50 dark:text-zinc-400 group-hover:text-jet/70 group-hover:dark:text-zinc-300 transition",
          params?.channelId === id &&
            "text-brown/80 dark:text-sslight/80 group-hover:dark:text-slight"
        )}
      >
        {name}
      </p>
      {name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit" side="top">
            <Edit
              onClick={() => onOpen("editChannel", { channel, server })}
              className="hidden group-hover:block w-4 h-4 text-orange/60 dark:text-orange/60 hover:text-zinc-600 hover:dark:text-zinc-300 transition"
            />
          </ActionTooltip>
          <ActionTooltip label="Delete" side="top">
            <Trash
              onClick={() => onOpen("deleteChannel", { channel, server })}
              className="hidden group-hover:block w-4 h-4 text-orange/60 dark:text-orange/60 hover:text-zinc-600 hover:dark:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
      {name === "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="This channel cannot be edited." side="right">
            <Lock className="w-4 h-4 text-jet/30 dark:text-zinc-400 hover:text-zinc-600 hover:dark:text-zinc-300 transition" />
          </ActionTooltip>
        </div>
      )}
      {name === "general" && role === MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <Lock className="w-4 h-4 text-jet/30 dark:text-zinc-400 hover:text-zinc-600 hover:dark:text-zinc-300 transition" />
        </div>
      )}
    </button>
  );
};
