"use client";

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface ServerHeader {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export const ServerHeader = ({ server, role }: ServerHeader) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md  font-semibold px-3 flex items-center h-13 border-orange/20 dark:border-neutral-900/90 border-b-2 hover:bg-beige/80 dark:hover:bg-zinc-700/30 transition">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        {isModerator && (
          <DropdownMenuItem
            onClick={() => onOpen("invite", { server })}
            className="group text-orange hover:text-orange-400 dark:text-orange-400 dark:hover:text-orange-300 px-3 py-2 text-sm cursor-pointer transition-all"
          >
            Invite People
            <UserPlus className="text-orange group-hover:text-orange-400 dark:text-orange-400 dark:group-hover:text-orange-300 h4 w-4 ml-auto transition-all" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer transition-all"
            onClick={() => onOpen("editServer", { server })}
          >
            Server Settings
            <Settings className="h4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer transition-all"
            onClick={() => onOpen("members", { server })}
          >
            Manage Members
            <Users className="h4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className="px-3 py-2 text-sm cursor-pointer transition-all"
            onClick={() => onOpen("createChannel", { server })}
          >
            Create Channel
            <PlusCircle className="h4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator className="bg-zinc-600/20" />}
        {isAdmin && (
          <DropdownMenuItem
            className="group text-rose-500 hover:text-rose-400 dark:hover:text-rose-400 px-3 py-2 text-sm cursor-pointer transition-all"
            onClick={() => onOpen("deleteServer", { server })}
          >
            Delete Server
            <Trash className="text-rose-500 group-hover:text-rose-400 h4 w-4 ml-auto transition-all" />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className="text-rose-500 px-3 py-2 text-sm cursor-pointer transition-all"
            onClick={() => onOpen("leaveServer", { server })}
          >
            Leave Server
            <LogOut className="text-rose-500 h4 w-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
