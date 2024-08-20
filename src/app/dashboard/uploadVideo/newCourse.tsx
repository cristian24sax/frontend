"use client";
import { CourseList } from "@/interfaces/dataCourseList";
import { ChangeEvent, use, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Trash2Icon } from "./tableVideo";

interface Props {
  nameEdit?: string;
  courseProjectId?: number;
  id?: number;
  isEdit: boolean;
  courseDetailList: any[];
}

interface NewCourse {
  courseProjectId?: number;
  courseId?: number;
  userCreatorId?: number;
  id?: number;
  name?: string;
  description?: string;
  previousImage?: File | null;
  lessonOrder?: number;
  objectives?: string;
  bibliography?: string;
  cvInstructor?: string;
  instructorName?: string;
  instructorProfession: string;
  listLessonVideoDetailsResponses?: any[];
  nameLessonOrder?: string;
  imagePreview?: string | null;
}

interface VideoDetail {
  id: number | null;
  name: string;
  description: string;
  playOrder: number | null;
  videoFile: File | null;
}

export default function NewCourse({ isEdit, nameEdit, courseProjectId, id: idCourse, courseDetailList }: Props) {
  const dataUser = localStorage.getItem("dataUser");
  const { token, id } = JSON.parse(dataUser as string);
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
    imagePreview: null,
  });

  const [courses, setCourses] = useState<NewCourse[]>([]);
  const [showModalVideo, setShowModalVideo] = useState(false);
  const [response, setResponse] = useState(0);
  const [videoDetails, setVideoDetails] = useState<VideoDetail[]>([{ id: null, name: "", description: "", playOrder: null, videoFile: null }]);
  const [refresh, setRefresh] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [courseNew, setCourseNew] = useState(nameEdit || "");
  const [variable, setVariable] = useState({
    courseProjectId: 0,
    id: 0,
  });
  const getDetailCourse = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson?CourseId=${idCourse}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();

      setCourses(result.data);
    } catch (error) {
      console.error("Failed to delete the course:", error);
      throw error;
    }
  };
  const handleInputChange = (e: any) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setNewCourse((prevState: any) => ({
      ...prevState,
      previousImage: file,
    }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCourse((prevState: any) => ({
          ...prevState,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setNewCourse((prevState: any) => ({
        ...prevState,
        imagePreview: null,
      }));
    }
  };

  const removeImage = () => {
    setNewCourse((prevState: any) => ({
      ...prevState,
      previousImage: null,
      imagePreview: null,
    }));
  };

  const handleSaveCourse = async (e: any) => {
    e.preventDefault();
    const newCourseId = courses.length + 1;
    const newCourseData: NewCourse = {
      ...newCourse,
      courseProjectId: variable.courseProjectId || courseProjectId,
      courseId: variable.id || idCourse,
      userCreatorId: id,
      id: newCourseId,
    };
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

    setCourses([...courses, newCourseData]);
    setShowModal(false);
    setNewCourse({
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
      imagePreview: null,
    });
  };

  async function sendVideo(formData: FormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const { data } = await response.json();

      setResponse(data.id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  }

  const openModal = (course: any) => {
    if (isEdit) {
      setResponse(course.id);
      getListVideo(course.id);
    } else {
      getListVideo(response);
    }
    setShowModalVideo(true);
  };

  const closeModal = () => {
    setShowModalVideo(false);
  };

  const handleVideoDetailsChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    e.preventDefault();
    const { name, value } = e.target;
    const newVideoDetails = [...videoDetails];
    if (name in newVideoDetails[index]) {
      (newVideoDetails[index] as any)[name] = value;
      setVideoDetails(newVideoDetails);
    }
  };

  const handleMultiVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newVideoDetails = files.map((file) => ({
        id: null,
        name: file.name,
        description: "",
        playOrder: null,
        videoFile: file,
      }));
      setVideoDetails(newVideoDetails);
    }
  };

  async function getListVideo(value: number) {
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/video/listByLessonId?LessonId=${value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      }

      const { data } = await resp.json();
      setVideoDetails(data);
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  }
  const handleSendVideo = async (e: any) => {
    e.preventDefault();
    videoDetails.forEach((video) => {
      const newCourseData = {
        lessonId: response,
        name: video.name,
        userCreatorId: id,
        description: video.name,
        playOrder: video.playOrder,
        courseProjectId: variable.courseProjectId || courseProjectId,
        videoFile: video.videoFile,
      };
      const formData = new FormData();
      for (const key in newCourseData) {
        if (Object.prototype.hasOwnProperty.call(newCourseData, key)) {
          formData.append(key, (newCourseData as any)[key]);
        }
      }
      try {
        sendVideoList(formData);
        setShowModalVideo(false);
      } catch (error) {
        console.error("Error saving course:", error);
      }
    });
  };

  async function sendVideoList(formData: FormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/video`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      await response.json();
      // setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  }

  const createCourse = async () => {
    const request = {
      name: courseNew,
      description: "string",
      userCreatorId: 1091,
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request), // Aquí se incluye el cuerpo del request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      // setCourseNew("");
      setIsContent(true);
      const { data } = await response.json();
      const { courseProjectId, id } = data;
      setVariable({ courseProjectId, id });
      setRefresh((prev) => !prev);
      toast.success("Curso creado exitosamente");
    } catch (error: any) {
      console.error("Error fetching courses:", error);
    }
  };
  const EditCourse = async () => {
    const request = {
      id: idCourse,
      courseProjectId: courseProjectId,
      name: courseNew,
      description: courseNew,
      userCreatorId: 1091,
    };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request), // Aquí se incluye el cuerpo del request
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      toast.success("Curso editado exitosamente");

      await response.json();
    } catch (error: any) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = (e: any) => {
    createCourse();
  };
  const handleEditCourse = (e: any) => {
    EditCourse();
  };
  const handleDeleteClass = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/${id}`;
    const rsp = response;
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
      toast.success("Clase eliminado exitosamente");
      // setCourses((prevCourses) => prevCourses.filter((item) => item.id !== rsp));
      setRefresh((prev) => !prev);
      return result;
    } catch (error) {
      console.error("Failed to delete the course:", error);
      throw error;
    }
  };
  const handleDeleteVideo = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/video/${id}`;

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
      toast.success("Video eliminado exitosamente");
      setVideoDetails((prevCourses) => prevCourses.filter((item) => item.id !== id));

      return result;
    } catch (error) {
      console.error("Failed to delete the course:", error);
      throw error;
    }
  };
  useEffect(() => {
    if (isEdit) {
      getDetailCourse();
    }
  }, [refresh]);
  return (
    <div className="p-4 h-full">
      <h3 className="border-b-2 text-2xl">{`${isEdit ? "Editar curso" : "Nuevo curso"}`}</h3>
      <div>
        <div className="flex items-center p-4 gap-4 mt-4 bg-gray-100 rounded-md shadow-lg">
          <input
            onChange={(e: any) => {
              setCourseNew(e.target.value);
            }}
            value={courseNew}
            placeholder="Agregar curso"
            className="p-2  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={isEdit ? handleEditCourse : handleAddCourse} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {isEdit ? "Guardar" : "Agregar curso"}
          </button>
        </div>
        {!isEdit && isContent}
        <div className="flex items-center justify-between my-4">
          <button className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => setShowModal(true)}>
            <div className="p-4 text-center flex">
              <PlusIcon className="w-8 h-8 text-primary" />
              <p className="text-lg font-semibold text-primary">Agregar Clase</p>
            </div>
          </button>
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div>
          {courses.length === 0 ? (
            <div className="flex items-center justify-center h-64 bg-white w-full border border-dashed border-blue-500 text-blue text-2xl font-semibold rounded-lg shadow-md">No hay cursos creados</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {courses.map((course) => (
                <div key={course.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={course.imagePreview || (course.previousImage as any)} alt={course.name} className="w-full h-48 object-cover" />
                  <div className="p-4 flex">
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{course.name}</h3>
                      <div>{course.instructorName || course["nameLessonOrder"]}</div>
                      <div>{course.instructorProfession}</div>
                    </div>
                    <div className="">
                      <button className="p-2 text-red-600 hover:text-red-900" onClick={() => handleDeleteClass(course.id as number)}>
                        <Trash2Icon className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </button>
                      <button className="mt-4 px-2 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-700" onClick={() => openModal(course)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {showModalVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex z-50">
            <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6 pt-0 mx-auto my-8 mb-16 h-[80%] overflow-y-auto">
              <div className="sticky top-0 z-10 bg-white shadow-md flex justify-between items-center mb-4 p-4">
                <h2 className="text-2xl font-semibold">Videos de {courseNew}</h2>

                <div className="flex gap-4">
                  <label className="p-2 mt-4 bg-green-500 text-white rounded hover:bg-green-700">
                    <span>Agregar información de Video</span>
                    <input type="file" accept="video/*" multiple onChange={handleMultiVideoChange} className="w-full p-2 border rounded hidden" />
                  </label>
                  <button className="p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleSendVideo}>
                    Guardar
                  </button>
                  <button className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700" onClick={closeModal}>
                    Cerrar
                  </button>
                </div>
              </div>
              {videoDetails.map((videoDetail, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-100 rounded-lg">
                  <table className="w-full mb-4">
                    <tbody>
                      <tr>
                        <td className="pr-2">
                          <input type="text" name="name" value={videoDetail.name} onChange={(e) => handleVideoDetailsChange(e, index)} placeholder="Nombre del video" className="w-full p-2 border rounded" />
                        </td>
                        {/* <td className="pr-2">
                          <input type="text" name="description" value={videoDetail.description} onChange={(e) => handleVideoDetailsChange(e, index)} placeholder="Descripción" className="w-full p-2 border rounded" />
                        </td> */}
                        <td className="pr-2">
                          <input type="number" name="playOrder" value={videoDetail.playOrder as any} onChange={(e) => handleVideoDetailsChange(e, index)} placeholder="Orden de reproducción" className="w-full p-2 border rounded" />
                        </td>
                        {/* <td>
                <input type="file" accept="video/*" onChange={(e) => handleVideoChange(e, index)} className="w-full p-2 border rounded" />
              </td> */}
                        <td>
                          {videoDetail.id ? (
                            <button className="p-2 text-red-600 hover:text-red-900" onClick={() => handleDeleteVideo(videoDetail.id as number)}>
                              <Trash2Icon className="h-4 w-4" />
                              <span className="sr-only">Eliminar</span>
                            </button>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {videoDetail.videoFile && <video src={URL.createObjectURL(videoDetail.videoFile)} controls className="w-full h-48" />}
                </div>
              ))}
            </div>
          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex mb-16 z-50 ">
            <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6 mx-auto my-8 mb-16 h-full overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">Nueva clase</h2>
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
                  {newCourse.imagePreview ? (
                    <div className="relative">
                      <img src={newCourse.imagePreview} alt="Preview" className="max-h-[6rem] rounded border border-gray-300" />
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
      <Toaster richColors position="bottom-right" />
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
