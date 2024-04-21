import AsideBar from "@/components/molecules/asibar";
// ("use client");
import React from "react";
// import Link from "next/link";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function DashboardLayout({ children }: AuthLayoutProps) {
  return (
    <main className="h-[100vh] flex overflow-hidden">
      <AsideBar children={children} />
      <main className="flex-grow overflow-auto p-5 pt-0">{children}</main>
    </main>
  );
}
