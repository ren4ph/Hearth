"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Member, MemberRole, Profile } from "@prisma/client";
import { UserAvatar } from "../user-avatar";
import { ActionTooltip } from "../action-tooltip";
import {
  Check,
  Copy,
  Edit,
  FileIcon,
  ShieldAlert,
  ShieldCheck,
  Trash,
  X,
} from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";

const DATE_FORMAT_LONG = "d MMM yyyy, HH:mm";
const DATE_FORMAT_TIME = "p";
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const timestampText = (dat1: Date, appendText?: string) => {
  const date = new Date(dat1);
  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();
  const isOld = dat1 < yesterday;
  const timestampLong = format(date, DATE_FORMAT_LONG);
  const timestampTime = format(date, DATE_FORMAT_TIME);
  return [
    isOld
      ? timestampLong
      : isYesterday
      ? `Yesterday at ${timestampTime}`
      : timestampTime,
    appendText ? `${appendText}${timestampLong}` : timestampLong,
  ];
};

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: Date;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  updatedAt: Date;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-orange" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-green-600" />,
};

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  updatedAt,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(`/servers/${params?.serverId}/chats/${member.id}`);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });

      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }

      window.addEventListener("keydown", handleKeyDown);

      return () => window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    form.reset({
      content: content,
    });
  }, [content]);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-2 pt-3 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={onMemberClick}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={onMemberClick}
                className="font-semibold text-sm hover:underline cursor-pointer text-jet dark:text-white/90"
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                <p>{roleIconMap[member.role]}</p>
              </ActionTooltip>
            </div>
            <span className="text-xs text-grey dark:text-ssslight">
              <ActionTooltip label={timestampText(timestamp)[1]}>
                <p>{timestampText(timestamp)[0]}</p>
              </ActionTooltip>
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
                sizes="(max-width:900px) 50vw, 33vw"
              />
            </a>
          )}
          {isPDF && (
            <div className="relative flex items-center pt-2 mt-2 rounded-md bg-background/10">
              <FileIcon className="h-10 w-10 fill-orange-200 stroke-orange-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-orange-500 dark:text-orange-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted && "italic text-grey dark:text-sssssslight text-xs mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <ActionTooltip
                  label={timestampText(updatedAt, "Edited on ")[1]}
                >
                  <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                    (edited at {timestampText(updatedAt)[0]})
                  </span>
                </ActionTooltip>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                className="flex items-cetner w-full gap-x-2 pt-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-beige/90 dark:bg-jet/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-grey dark:text-zinc-200"
                            placeholder="Edited Message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 ml-1 text-grey dark:text-ssslight">
                Press esc to cancel and enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      <div className="hidden group-hover:flex! items-center gap-x-2 absolute p-1 -top-2 right-5 bg-orange-300 dark:bg-zinc-800 border rounded-sm">
        <ActionTooltip label={!fileUrl ? "Copy Message" : "Copy Link"}>
          {copied ? (
            <Check
              onClick={onCopy}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          ) : (
            <Copy
              onClick={onCopy}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          )}
        </ActionTooltip>
        {canEditMessage && (
          <ActionTooltip label="Edit Message">
            <Edit
              onClick={() => setIsEditing(true)}
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        )}
        {canDeleteMessage && (
          <ActionTooltip label="Delete Message">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                  messageContent: content,
                })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        )}
      </div>
    </div>
  );
};
