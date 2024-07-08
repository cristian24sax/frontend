"use client";

import { useState } from "react";
import { CommentModal } from "../molecules/modalsComment";
import { useVideoStore } from "@/store/ui/changeVideo";

export default function CommentModalClient() {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const dataUser = localStorage.getItem("dataUser");
  const { token, id } = JSON.parse(dataUser as string);
  const { value, currentTime } = useVideoStore();

  const handleSaveComment = async (comment: string, hours: string, minutes: string, seconds: string) => {
    console.log("Comment saved:", comment, { hours }, seconds, minutes, value, id, currentTime);
    if (hours === "" && minutes === "" && seconds === "") {
      hours = "0";
      minutes = "0";
      seconds = "0";
    }
    const totalSeconds = parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/question`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPersonId: id,
          lessonVideoId: value,
          comment: comment,
          timeQuestion: totalSeconds,
        }),
      });
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  };

  return (
    <div>
      <button className="flex justify-content mt-5 items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500 hover:text-blue-700" onClick={() => setCommentModalOpen(true)}>
        <CommentIcon className="h-4 w-4 mr-2" />
        Dudas
      </button>
      <CommentModal isOpen={isCommentModalOpen} onClose={() => setCommentModalOpen(false)} onSave={handleSaveComment} />
    </div>
  );
}

export function CommentIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
  );
}
