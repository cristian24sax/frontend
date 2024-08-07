"use client";
import VideoMain from "./main";
import { useState } from "react";
import NewCourse from "./newCourse";
interface TableVideoProps {
  courseList: any[];
  courserListAdmin: any[];
}
export default function TableVideoComponent({ courseList, courserListAdmin }: TableVideoProps) {
  const [showVideoMain, setShowVideoMain] = useState(false);

  const handleNewCourseClick = (event: any) => {
    event.preventDefault();
    setShowVideoMain(!showVideoMain);
  };

  if (showVideoMain) {
    return (
      <div>
        <button className="pt-5" onClick={handleNewCourseClick}>
          Atras
        </button>
        <NewCourse courseList={courseList} />
      </div>
    );
  }
  return (
    <div className="w-full p-5">
      <header className="flex items-center justify-between border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold">Administración de cursos</h1>
        <button onClick={handleNewCourseClick}>Nuevo curso</button>
      </header>
      <div className="border rounded-lg overflow-hidden">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Duración</th>
              <th className="px-4 py-2">Creado</th>
              <th className="px-4 py-2">Usuario</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {courserListAdmin.map((course) => (
              <tr key={course.id}>
                <td className="border px-4 py-2 font-medium">{course.name}</td>
                <td className="border px-4 py-2">{course.duration}</td>
                <td className="border px-4 py-2">{course.createdAt}</td>
                <td className="border px-4 py-2">{course.userCreator}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900">
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
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
    </div>
  );
}
function FilePenIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

function Trash2Icon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}
