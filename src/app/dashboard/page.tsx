"use client";
import AsideBar from "@/components/asibar";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
      <AsideBar />
      <div>
        <h1>Dashboard</h1>
        <pre>
          <code>{JSON.stringify(session, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
export default Dashboard;
