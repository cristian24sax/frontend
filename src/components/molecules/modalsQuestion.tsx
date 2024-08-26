import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

interface CommentModalProps {
  isOpen: boolean;
  responseQuestion: string;
  onClose: () => void;
  onSave: (comment: string) => void;
}

export function QuestionModal({ isOpen, onClose, onSave, responseQuestion }: CommentModalProps) {
  console.log(responseQuestion,'response')
  const [comment, setComment] = useState(responseQuestion || "");

  useEffect(() => {
    if (!isOpen) {
      // setComment("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (comment.trim() === "") {
      toast.error("La respuesta no puede estar vacío");

      return;
    }

    onSave(comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Escribe tu respuesta</h2>
        <textarea className="w-full h-32 p-2 border rounded-lg mb-4" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <div className="flex justify-end">
          <button className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
      <Toaster richColors position="bottom-right" />
    </div>
  );
}
