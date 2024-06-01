"use client";
import SesionComponent from "@/components/atoms/cardSesion";
import SearchComponent from "@/components/atoms/search";
import AsideBar from "@/components/molecules/asibar";
import React, { useState } from "react";

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function DashboardLayout({ children }: AuthLayoutProps) {
  
  return (
    <main className="h-[100vh] flex overflow-hidden">
      <AsideBar children={children} />
      <main className="flex-grow overflow-auto p-5 pt-0">
        <header className="shadow-sm sticky top-0 flex justify-between items-center  h-16 rounded-sm bg-stone-100 p-4 z-10">
          <SearchComponent />
          <SesionComponent />
        </header>
        {children}
      </main>
    </main>
  );
}
