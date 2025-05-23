"use client";

import { useSocket } from "../providers/socket-provider";
import { Badge } from "./badge";

export const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="bg-yellow-600 text-white">
        Fallback: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="bg-emerald-600 text-white">
      Live: Real-Time
    </Badge>
  );
};
