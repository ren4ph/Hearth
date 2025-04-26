"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area"; // for scrolling notifications
import { Badge } from "@/components/ui/badge"; // for the unread count
import { Notification } from "@prisma/client";

interface NavigationNotificationProps {
  notifications: Notification[];
}

export const NavigationNotification = ({
  notifications,
}: NavigationNotificationProps) => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const markAsRead = (id: string) => {
    const x = 0;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-2">
        <h4 className="font-semibold mb-2">Notifications</h4>
        <ScrollArea className="h-64">
          {notifications.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              No notifications
            </p>
          )}

          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-2 p-2 hover:bg-accent rounded-md"
            >
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    notif.read ? "text-muted-foreground" : "text-foreground"
                  }`}
                >
                  {notif.message}
                </p>
                {notif.link && (
                  <Button
                    variant="link"
                    className="p-0 text-sm"
                    onClick={() => (window.location.href = notif.link!)}
                  >
                    Open
                  </Button>
                )}
              </div>
              {!notif.read && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => markAsRead(notif.id)}
                >
                  Mark as read
                </Button>
              )}
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
