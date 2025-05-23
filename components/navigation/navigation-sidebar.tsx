import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { NavigationNotification } from "./navigation-notification";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  const notifications = await db.notification.findMany({
    where: {
      profileId: profile.id,
    },
  });

  const hasServerNotification = (serverId: string) => {
    return notifications.some((n) => !n.read && n.serverId === serverId);
  };

  return (
    <div className="flex flex-col items-center h-full text-primary w-full space-y-4 dark:bg-dark bg-slight py-3">
      <NavigationAction />
      <Separator className="h-[2px]! bg-zinc-300 dark:bg-zinc-700 rounded-md w-10! mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div className="mb-4" key={server.id}>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
            {hasServerNotification(server.id) && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            )}
          </div>
        ))}
      </ScrollArea>
      <div className="mt-auto flex items-center flex-col pb-3 gap-y-4">
        <ModeToggle />
        <NavigationNotification notifications={notifications} />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-[48px]! w-[48px]!",
            },
          }}
        />
      </div>
    </div>
  );
};
