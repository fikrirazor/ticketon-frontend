import React from "react";
import { OrganizerSidebar } from "./OrganizerSidebar";

interface OrganizerLayoutProps {
  children: React.ReactNode;
}

export const OrganizerLayout: React.FC<OrganizerLayoutProps> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <OrganizerSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4 md:p-8 lg:p-12">{children}</div>
      </main>
    </div>
  );
};
