"use client";

import { Plus } from "lucide-react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
  const { onOpen } = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <button
          onClick={() => onOpen("createServer")}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-beige/80 border border-dark/10 dark:border-none dark:bg-neutral-700 group-hover:bg-orange dark:group-hover:bg-orange">
            <Plus
              className="group-hover:text-dark transition text-orange"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
