"use client";

import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export const ActionTooltip = ({
  label,
  children,
  side = "top",
  align = "center",
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          sideOffset={4}
          className="relative text-sm"
        >
          <p className="capitalize">{label.toLowerCase()}</p>
          <TooltipArrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%-2px)]! rotate-45 rounded-[2px]" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
