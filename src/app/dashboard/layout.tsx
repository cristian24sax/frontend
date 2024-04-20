import AsideBar from "@/components/molecules/asibar";
// ("use client");
import React from "react";
// import Link from "next/link";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function DashboardLayout({ children }: AuthLayoutProps) {
  return (
    <main className="h-[100vh] flex">
      <AsideBar children={children} />
      {/* <main className="container absolute">{children}</main> */}
    </main>
  );
}
