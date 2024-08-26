"use client";
import { useState } from "react";
import { Toaster } from "sonner";
import { Trash2Icon } from "../uploadVideo/tableVideo";
import CommentModalQuestionClient from "@/components/atoms/buttonModalQuestion";

interface Props {
  data: any[];
}

export default function TableQuestionComponent({ data }: Props) {
  const [questions, setQuestions] = useState(data);

  const handleSaveComment = (videoQuestionId: number, newComment: string) => {
    setQuestions((prevQuestions) => prevQuestions.map((question) => (question.id === videoQuestionId ? { ...question, response: newComment } : question)));
  };

  return (
    <div className="w-full p-5">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold">Administración de preguntas</h1>
      </header>
      <div className="border rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre del curso</th>
              <th className="px-4 py-2">Nombre de la clase</th>
              <th className="px-4 py-2">Nombre del video</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Pregunta</th>
              <th className="px-4 py-2">Respuesta</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={question.id}>
                <td className="border px-4 py-2 font-medium">{question.courseName}</td>
                <td className="border px-4 py-2">{question.lessonName}</td>
                <td className="border px-4 py-2">{question.lessonVideoName}</td>
                <td className="border px-4 py-2">{question.userName}</td>
                <td className="border px-4 py-2">{question.comment}</td>
                <td className="border px-4 py-2">{question.response}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    <CommentModalQuestionClient
                      videoQuestionId={question.id}
                      responseQuestion={question.response}
                      onSave={handleSaveComment} // Pasamos la función de guardado
                    />
                    <button className="p-2 text-red-600 hover:text-red-900">
                      <Trash2Icon className="h-4 w-4" />
                      <span className="sr-only">Eliminar</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
