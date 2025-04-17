import React from "react";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return ( 
    <div className="h-full bg-brown">
      <div className="hidden md:flex! h-full flex-col fixed inset-y-0 w-[72px] z-30">
        <NavigationSidebar />
      </div>
      <main className="md:pl-[72px] h-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
