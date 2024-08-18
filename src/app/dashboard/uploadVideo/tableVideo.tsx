"use client";
import { useState } from "react";
import NewCourse from "./newCourse";
import { Toaster, toast } from "sonner";

interface TableVideoProps {
  courseList: any[];
  courserListAdmin: any[];
}
export default function TableVideoComponent({ courseList, courserListAdmin }: TableVideoProps) {
  const [showVideoMain, setShowVideoMain] = useState(false);
  const [showEditVideoMain, setShowEditVideoMain] = useState(false);
  const [showEditName, setShowEditName] = useState("");
  const [showEditId, setShowEditId] = useState(0);
  const [showEditcourseProjectId, setShowEditcourseProjectId] = useState(0);
  const [tableCourse, setTableCourse] = useState<any[]>(courserListAdmin);
  const [courseDetailList, setCourseDetailList] = useState<any[]>([]);
  const handleNewCourseClick = (event: any) => {
    event.preventDefault();
    setShowVideoMain(!showVideoMain);
  };
  const handleEditCourseClick = (course: any) => {
    const { name, id, courseProjectId } = course;

    setShowEditVideoMain(!showEditVideoMain);
    setShowEditName(name);
    setShowEditId(id);
    setShowEditcourseProjectId(courseProjectId);
  };

  if (showVideoMain) {
    return (
      <div>
        <button className="pt-5" onClick={handleNewCourseClick}>
          Atras
        </button>
        <NewCourse courseDetailList={courseList} isEdit={false} />
      </div>
    );
  }
  if (showEditVideoMain) {
    return (
      <div>
        <button className="pt-5" onClick={handleEditCourseClick}>
          Atras
        </button>
        <NewCourse courseDetailList={courseDetailList} isEdit={true} nameEdit={showEditName} id={showEditId} courseProjectId={showEditcourseProjectId} />
      </div>
    );
  }
  const handleDelete = async (course: any) => {
    const { id, courseProjectId } = course;
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/${id}/${courseProjectId}`;

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      toast.success("Curso eliminado exitosamente");
      setTableCourse((prevCourses) => prevCourses.filter((item) => item.id !== course.id));

      return result;
    } catch (error) {
      console.error("Failed to delete the course:", error);
      throw error;
    }
  };
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
            {tableCourse.map((course) => (
              <tr key={course.id}>
                <td className="border px-4 py-2 font-medium">{course.name}</td>
                <td className="border px-4 py-2">{course.duration}</td>
                <td className="border px-4 py-2">{course.createdAt}</td>
                <td className="border px-4 py-2">{course.userCreator}</td>
                <td className="border px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-600 hover:text-gray-900" onClick={() => handleEditCourseClick(course)}>
                      <FilePenIcon className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-900" onClick={() => handleDelete(course)}>
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
function FilePenIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
}

export function Trash2Icon(props: any) {
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
