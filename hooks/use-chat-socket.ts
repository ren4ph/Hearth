import { useSocket } from "@/components/providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { MessageWithMemberWithProfile } from "@/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
  notifKey: string;
  serverId: string;
};

export const UseChatSocket = ({
  addKey,
  updateKey,
  queryKey,
  notifKey,
  serverId,
}: ChatSocketProps) => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();
  const router = useRouter();

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
    
    const handleNotif = async (notification: any) => {
      try {
        console.log(notification);

        await fetch("/api/notifications", {
          method: "POST",
          body: JSON.stringify({
            message: notification.message,
            link: notification.link,
            serverId: serverId
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });


        toast("New Notification", {
          description: notification.message,
          action: notification.link
            ? {
              label: "Open",
              onClick: () =>
                notification.link
                  ? router.push(notification.link)
                  : router.refresh(),
            }
            : undefined,
        });

        if (Notification.permission === "granted") {
          const browserNotification = new Notification("New Chat!", {
            body: notification.message,
            data: { url: notification.link },
          });

          browserNotification.onclick = (event) => {
            event.preventDefault();
            if (notification.link) {
              window.open(notification.link, "_blank");
            }
          };
        }
      } catch (error) {
        console.log(error);
      }
    };

    console.log("[Socket] Attaching listener for updateKey:", updateKey);

    socket.on(addKey, handleAdd);
    socket.on(updateKey, handleUpdate);
    socket.on(notifKey, handleNotif);

    return () => {
      console.log("[Socket] Unsubscribing from:", addKey, updateKey);
      socket.off(addKey, handleAdd);
      socket.off(updateKey, handleUpdate);
      socket.off(notifKey, handleNotif);
    };
  }, [
    socket,
    queryClient,
    serverId,
    addKey,
    updateKey,
    queryKey,
    notifKey,
    router, // 🛠 Add `router` to deps array too since we're using it
  ])
};
