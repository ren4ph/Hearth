"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import qs from "query-string";

import { useParams, useRouter } from "next/navigation";

export const DeleteChannelModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();
  const params = useParams();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: params?.serverId,
        },
      });

      axios.delete(url);

      onClose();
      router.refresh();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-light text-dark dark:bg-brown dark:text-sslight p-0 overflow-hidden fixed top-1/2 left-1/2 transform translate-x-[-50%]! translate-y-[-50%]!">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Channel
          </DialogTitle>
          <DialogDescription className="text-sm font-bold text-zinc-500 dark:text-zinc-400/70 text-center justify-center pb-8">
            Are you sure you want to do this? <br />
            Channel
            <span className="font-semibold text-orange">
              {" #"}
              {server?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col justify-center p-6 pt-0 bg-beige/60 dark:bg-jet/80">
          <div className="flex flex-row justify-between gap-4 *:justify-between! *:text-dark *:w-[45%]">
            <Button
              variant="default"
              size="sm"
              className="text-xs text-zinc-500 mt-4 bg-brown/35 hover:bg-brown/50 dark:bg-beige/70 dark:hover:bg-beige/90"
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
              <X className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs text-jet mt-4 bg-rose-500/40! hover:bg-rose-500/55! dark:bg-rose-400/70! dark:hover:bg-rose-400/80!"
              disabled={isLoading}
              onClick={onDelete}
            >
              Delete Channel
              <LogOut className="text-rose-500 dark:text-jet/80 h4 w-4 ml-auto" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
