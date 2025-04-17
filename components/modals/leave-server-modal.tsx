"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import { LogOut, X } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const LeaveServerModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const isModalOpen = isOpen && type === "leaveServer";
  const { server } = data

  const [isLoading, setIsLoading] = useState(false);

  const onLeave = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(`/api/servers/${server?.id}/leave`)

      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-light text-dark p-0 overflow-hidden fixed top-1/2 left-1/2 transform translate-x-[-50%]! translate-y-[-50%]!">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Are you sure?
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col justify-center p-6 pt-0">
          <Label
            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70 text-center justify-center pb-8"
          >
            Last chance
          </Label>
          <div className="flex flex-row justify-center gap-4 *:w-32 *:justify-between! *:text-dark">
            <Button
              variant="default"
              size="sm"
              className="text-xs text-zinc-500 mt-4"
              disabled={isLoading}
              onClick={onClose}
            >
              Cancel
              <X className="w-4 h-4 ml-2"/>
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs text-zinc-500 mt-4"
              disabled={isLoading}
              onClick={onLeave}
            >
              Leave Server
              <LogOut className="text-rose-500 h4 w-4 ml-auto" />
            </Button>
          </div>
        </div>
          
      </DialogContent>
    </Dialog>
  );
};
