"use client";
import AsideBar from "@/components/molecules/asibar";
import React from "react";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function DashboardLayout({ children }: AuthLayoutProps) {
  return (
    <main className="h-[100vh] flex overflow-hidden">
      <AsideBar />
      <main className="flex-grow overflow-auto p-5 pt-0">{children}</main>
    </main>
  );
}
