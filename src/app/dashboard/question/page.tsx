import { Toaster } from "sonner";
import { fetchQuestionListAdmin } from "../services";
import { Trash2Icon } from "../uploadVideo/tableVideo";

export default async function Component() {
  const { data } = await fetchQuestionListAdmin();

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
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((question: any) => (
              <tr key={question.id}>
                <td className="border px-4 py-2 font-medium">{question.courseName}</td>
                <td className="border px-4 py-2">{question.lessonName}</td>
                <td className="border px-4 py-2">{question.lessonVideoName}</td>
                <td className="border px-4 py-2">{question.userName}</td>
                <td className="border px-4 py-2">{question.comment}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <AskIcon className="h-4 w-4" />
                      <span className="sr-only">responder</span>
                    </button>
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

export function AskIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16h0" />
      <path d="M12 8c1.66 0 3 1.34 3 3s-1.34 3-3 3" />
    </svg>
  );
}
