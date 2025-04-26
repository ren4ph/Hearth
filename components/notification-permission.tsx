"use client";

import { useEffect } from "react";

export const NotificationPermission = () => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  return null;
};
