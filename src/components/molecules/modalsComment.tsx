import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (comment: string, hours: string, minutes: string, seconds: string) => void;
}

export function CommentModal({ isOpen, onClose, onSave }: CommentModalProps) {
  const [comment, setComment] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setComment("");
      setHours("0");
      setMinutes("");
      setSeconds("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (comment.trim() === "") {
      toast.error("El comentario no puede estar vacío");

      return;
    }
    if (hours.trim() === "" && minutes.trim() === "" && seconds.trim() === "") {
      toast.error("Debes ingresar al menos una hora, minuto o segundo");

      return;
    }
    onSave(comment, hours, minutes, seconds);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Escribe tu duda o comentario</h2>
        <textarea className="w-full h-32 p-2 border rounded-lg mb-4" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
        <div className="flex gap-2 mb-4">
          {/* <input type="number" placeholder="Horas" className="w-1/3 p-2 border rounded-lg" value={hours} onChange={(e) => setHours(e.target.value)} /> */}
          <input type="number" placeholder="Minutos" className="w-1/3 p-2 border rounded-lg mx-2" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
          <input type="number" placeholder="Segundos" className="w-1/3 p-2 border rounded-lg" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
        </div>
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
