import { useSocket } from "@/components/providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MessageWithMemberWithProfile } from "@/types";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

export const UseChatSocket = ({
  addKey,
  updateKey,
  queryKey,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!socket) return;

    const handleAdd = (message: MessageWithMemberWithProfile) => {
      console.log("[Socket] Received add:", message);
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData?.pages) {
          return { pages: [{ items: [message] }] };
        }

        const newPages = [...oldData.pages];
        newPages[0] = {
          ...newPages[0],
          items: [message, ...newPages[0].items],
        };

        return { ...oldData, pages: newPages };
      });
    };

  const handleUpdate = (message: MessageWithMemberWithProfile) => {
    console.log("Received updated message:", message);  // Check if the data is valid here
    queryClient.setQueryData([queryKey], (oldData: any) => {
      const newData = oldData.pages.map((page: any) => {
        return {
          ...page,
          items: page.items.map((item: MessageWithMemberWithProfile) => {
            if (item.id === message.id) {
              return message;
            }
            return item;
          })
        }
      });
      console.log("Updated cache:", {
        ...oldData,
        pages: newData,
      });
      return {
        ...oldData,
        pages: newData,
      };
    });
  }
  console.log("[Socket] Attaching listener for updateKey:", updateKey);

    console.log("[Socket] Subscribing to:", addKey, updateKey);
    socket.on(addKey, handleAdd);
    socket.on(updateKey, handleUpdate);

    // Clean up listeners on key change or unmount
    return () => {
      console.log("[Socket] Unsubscribing from:", addKey, updateKey);
      socket.off(addKey, handleAdd);
      socket.off(updateKey, handleUpdate);
    };
  }, [socket, queryClient, addKey, updateKey, queryKey]);
};
