"use client";
import { ChangeEvent, useState } from "react";

import SelectInput from "@/components/atoms/selectInput";
import { CourseList } from "@/interfaces/dataCourseList";
import { InputComponent } from "@/components/atoms";
import { Button, Input, Label, Textarea } from "@headlessui/react";
interface props {
  courseList: CourseList[];
}
interface NewCourse {
  courseProjectId: number;
  courseId: number;
  userCreatorId: number;
  id: number;
  name: string;
  description: string;
  previousImage: File | null;
  lessonOrder: number;
  objectives: string;
  bibliography: string;
  cvInstructor: string;
  instructorName: string;
  instructorProfession: string;
}
export default function VideoMain({ courseList }: props) {
  const dataUser = localStorage.getItem("dataUser");
  const { token, id } = JSON.parse(dataUser as string);
  const [selectedCourse, setSelectedCourse] = useState<any>(courseList[0]);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState<NewCourse>({
    courseProjectId: 0,
    courseId: 0,
    userCreatorId: 0,
    id: 0,
    name: "",
    description: "",
    previousImage: null,
    lessonOrder: 0,
    objectives: "",
    bibliography: "",
    cvInstructor: "",
    instructorName: "",
    instructorProfession: "",
  });
  const [courses, setCourses] = useState<NewCourse[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const handleSelectionChange = (newSelection: any) => {
    setSelectedCourse(newSelection);
    console.log(selectedCourse, "course");
  };
  const handleInputChange = (e: any) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewCourse((prevState: any) => ({
      ...prevState,
      previousImage: file ? file.name : "",
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setNewCourse((prevState: any) => ({
      ...prevState,
      previousImage: "",
    }));
    setImagePreview(null);
  };

  const handleSaveCourse = async (e: any) => {
    e.preventDefault();
    const newCourseId = courses.length + 1;
    const newCourseData = {
      courseProjectId: selectedCourse.courseProjectId,
      courseId: selectedCourse.id,
      userCreatorId: id,
      id: newCourseId,
      name: newCourse.name,
      description: newCourse.description,
      previousImage: newCourse.previousImage,
      lessonOrder: newCourse.lessonOrder,
      objectives: newCourse.objectives,
      bibliography: newCourse.bibliography,
      cvInstructor: newCourse.cvInstructor,
      instructorName: newCourse.instructorName,
      instructorProfession: newCourse.instructorProfession,
    };
    console.log(newCourseData, "data del form");
    const formData = new FormData();
    for (const key in newCourseData) {
      if (Object.prototype.hasOwnProperty.call(newCourseData, key)) {
        formData.append(key, (newCourseData as any)[key]);
      }
    }
    try {
      await sendVideo(formData);
      setShowModal(false);
    } catch (error) {
      console.error("Error saving course:", error);
    }

    // Aquí puedes hacer la lógica para enviar el formData a tu backend
    console.log(formData.entries(), "form data");
    setCourses([...courses, newCourseData]);
    setShowModal(false);
    // setNewCourse({
    //   name: "",
    //   description: "",
    //   classes: 0,
    //   previousImage: null,
    //   lessonOrder: 0,
    //   objectives: "",
    //   bibliography: "",
    //   cvInstructor: "",
    //   instructorName: "",
    //   instructorProfession: "",
    // });
  };
  async function sendVideo(formData: FormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // No incluyas "Content-Type" aquí
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Success:", data);
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  }

  return (
    <div className="p-4  h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="w-1/2">
          <SelectInput onSelectionChange={handleSelectionChange} options={courseList} />
        </div>
        <button className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center cursor-pointer" disabled={!selectedCourse} onClick={() => setShowModal(true)}>
          <div className="p-4 text-center flex">
            <PlusIcon className="w-8 h-8 text-primary" />
            <p className="text-lg font-semibold text-primary">Agregar Curso</p>
          </div>
        </button>
      </div>
      <div className="container mx-auto py-8">
        <div>
          {courses.length === 0 ? (
            <div className="flex items-center justify-center h-64 bg-white w-full border border-dashed border-blue-500 text-blue text-2xl font-semibold rounded-lg shadow-md">No hay cursos creados</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div key={course.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={imagePreview as any} alt={course.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{course.name}</h3>
                    <div>{newCourse.instructorName}</div>
                    <div>{newCourse.instructorProfession}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {showModal && (
          <div className=" fixed inset-0 bg-black bg-opacity-50 flex  mb-16 z-50 ">
            <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6 mx-auto my-8 mb-16 h-full overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Nuevo Curso</h2>
              <form onSubmit={handleSaveCourse} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <h4>Nombre</h4>
                  <input className="w-full border-gray-200 border" type="text" id="name" name="name" value={newCourse.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-4">
                  <h4>Descripción</h4>
                  <textarea className="w-full border-gray-200 border" id="description" name="description" value={newCourse.description} onChange={handleInputChange} rows={4} required />
                </div>

                <div className="mb-4">
                  <h4>Imagen Previa</h4>
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-h-[6rem] rounded border border-gray-300" />
                      <button type="button" onClick={removeImage} className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-700 focus:outline-none">
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full h-[6rem] border-2 border-dashed border-gray-300 text-gray-500 rounded cursor-pointer">
                      <span>Seleccione una imagen</span>
                      <input type="file" id="previousImage" name="previousImage" onChange={handleImageChange} className="hidden" />
                    </label>
                  )}
                </div>
                {/* value={newCourse.previousImage} */}
                <div className="mb-4">
                  <h4>Orden de la Lección</h4>
                  <input className="w-full border-gray-200 border" type="number" id="lessonOrder" name="lessonOrder" value={newCourse.lessonOrder} onChange={handleInputChange} min={0} required />
                </div>
                <div className="mb-4 col-span-1 md:col-span-2">
                  <h4>Objetivos</h4>
                  <textarea className="w-full border-gray-200 border" id="objectives" name="objectives" value={newCourse.objectives} onChange={handleInputChange} rows={3} required />
                </div>
                <div className="mb-4 col-span-1 md:col-span-2">
                  <h4>Bibliografía</h4>
                  <textarea className="w-full border-gray-200 border" id="bibliography" name="bibliography" value={newCourse.bibliography} onChange={handleInputChange} rows={3} required />
                </div>
                <div className="mb-4">
                  <h4>Nombre del Instructor</h4>
                  <input className="w-full border-gray-200 border" type="text" id="instructorName" name="instructorName" value={newCourse.instructorName} onChange={handleInputChange} required />
                </div>
                <div className="mb-4">
                  <h4>Profesión del Instructor</h4>
                  <input className="w-full border-gray-200 border" type="text" id="instructorProfession" name="instructorProfession" value={newCourse.instructorProfession} onChange={handleInputChange} required />
                </div>
                <div className="mb-4 col-span-1 md:col-span-2">
                  <h4>CV del Instructor</h4>
                  <textarea className="w-full border-gray-200 border" id="cvInstructor" name="cvInstructor" value={newCourse.cvInstructor} onChange={handleInputChange} rows={3} required />
                </div>
                <div className="flex justify-end col-span-1 md:col-span-2">
                  <button type="button" className="mr-2 border border-gray-300 rounded px-4 py-2" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PlusIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
