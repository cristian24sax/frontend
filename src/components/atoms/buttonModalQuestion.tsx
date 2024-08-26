"use client";

import { useState } from "react";
import { QuestionModal } from "../molecules/modalsQuestion";

interface Props {
  videoQuestionId: number;
  responseQuestion: string;
  onSave: (videoQuestionId: number, comment: string) => void; // Nueva prop
}

export default function CommentModalQuestionClient({ videoQuestionId, responseQuestion, onSave }: Props) {
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const dataUser = localStorage.getItem("dataUser");
  const { token, id } = JSON.parse(dataUser as string);

  const handleSaveQuestion = async (comment: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/question/response`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPersonId: id,
          response: comment,
          videoQuestionId,
        }),
      });

      onSave(videoQuestionId, comment); // Pasar el comentario al componente padre
      setCommentModalOpen(false); // Cerrar el modal después de guardar
    } catch (error) {
      console.error("Error saving question response:", error);
    }
  };

  return (
    <div>
      <button className="p-2 text-gray-600 hover:text-gray-900" onClick={() => setCommentModalOpen(true)}>
        <AskIcon className="h-4 w-4" />
        <span className="sr-only">responder</span>
      </button>
      <QuestionModal isOpen={isCommentModalOpen} responseQuestion={responseQuestion} onClose={() => setCommentModalOpen(false)} onSave={handleSaveQuestion} />
    </div>
  );
}

export function AskIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16h0" />
      <path d="M12 8c1.66 0 3 1.34 3 3s-1.34 3-3 3" />
    </svg>
  );
}
