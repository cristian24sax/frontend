"use client";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { Toaster, toast } from "sonner";
import { Trash2Icon, EditIcon, AddIcon } from "./tableVideo";
import { Evaluation, Survey } from "@/interfaces/video.interface";

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
  previousImage?: File | string | null; // Ahora puede ser un string o File
  lessonOrder?: number;
  objectives?: string;
  bibliography?: string;
  cvInstructor?: string;
  instructorName?: string;
  instructorProfession: string;
  listLessonVideoDetailsResponses?: any[];
  nameLessonOrder?: string;
  imagePreview?: string | null;
  classNumber?: string | null;
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
  const [loading, setLoading] = useState(false); // Estado de carga
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
  const [lessonEvaluation, setLessonEvaluation] = useState<Evaluation | null>({ id: null, name: "", url: "" });
  const [lessonSurvey, setLessonSurvey] = useState<Survey | null>({ id: null, name: "", url: "" });
  const [refresh, setRefresh] = useState(false);
  const [isContent, setIsContent] = useState(false);
  const [courseNew, setCourseNew] = useState(nameEdit || "");
  const [variable, setVariable] = useState({
    courseProjectId: 0,
    id: 0,
  });

  // Estado para almacenar el archivo seleccionado
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFileSurvey, setSelectedFileSurvey] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRefSurvey = useRef<HTMLInputElement | null>(null);

  const [editClase, setEditClase] = useState(false);

  const openModalClase = () => {
    setShowModal(true);
    setEditClase(false);
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
  }
  // Función para abrir el modo de edición
  const handleEdit = async (lesson: any) => {
    
    setShowModal(true)
    setEditClase(true);
    try {
      
      setLoading(true); // Inicia la carga
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/${lesson.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      }

      const { data } = await resp.json();
      
      setNewCourse({
        courseProjectId: 0,
        courseId: 0,
        userCreatorId: 0,
        id: data.id,
        name: data.name,
        description: data.description,
        previousImage: data.previousImage,
        lessonOrder: data.lessonOrder,
        objectives: data.objectives,
        bibliography: data.bibliography,
        cvInstructor: data.cvInstructor,
        instructorName: data.instructorName,
        instructorProfession: data.instructorProfession,
        imagePreview: data.previousImage,
      });
    } catch (error) {
      console.error("Error sending data to endpoint:", error);
      toast.error("Ocurrio un error al publicar");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar la subida del archivo
  const handleExamUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Guardar el archivo en el estado
    }
  };

  // Función para manejar la subida de la encuesta
  const handleSurveyUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFileSurvey(file); // Guardar el archivo en el estado
    }
  };

  // Función para eliminar el archivo
  const handleRemoveFile = async (id: number | null) => {

    try {
      if (id == null) {
        setSelectedFile(null); // Guardar el archivo en el estado

        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reiniciar el valor del input de archivo
        }
      } else {
        setLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/evaluations/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Realiza la lógica para actualizar el estado o manejar la UI
        setLessonEvaluation({ id: null, name: "", url: "" });
        setSelectedFile(null); // Limpiar el archivo seleccionado también
      }
    } catch (error) {
      console.error("Error eliminando el archivo:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFileSurvey = async (id: number | null) => {

    try {
      if (id == null) {
        setSelectedFile(null); // Guardar el archivo en el estado

        if (fileInputRefSurvey.current) {
          fileInputRefSurvey.current.value = ""; // Reiniciar el valor del input de archivo
        }
      } else {
        setLoading(true);
        await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/surveys/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Realiza la lógica para actualizar el estado o manejar la UI
        setLessonSurvey({ id: null, name: "", url: "" });
        setSelectedFileSurvey(null); // Limpiar el archivo seleccionado también

        toast.success("Encuesta eliminada correctamente");
      }
    } catch (error) {
      console.error("Error eliminando el archivo:", error);
      toast.error("Ocurrio un error al publicar la encuesta");
    } finally {
      setLoading(false);
    }
  };

  // Función para descargar el archivo
  const handleDownloadFile = async () => {
    if (lessonEvaluation && lessonEvaluation.url) {
      const response = await fetch(lessonEvaluation.url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob(); // Convertir la respuesta en un Blob
      const url = URL.createObjectURL(blob); // Crear una URL para el Blob

      const a = document.createElement('a');
      a.href = url;
      a.download = lessonEvaluation.name; // Establecer el nombre para la descarga
      a.target = '_blank'; // Abrir en una nueva pestaña
      document.body.appendChild(a);
      a.click(); // Simula un clic en el enlace
      document.body.removeChild(a); // Limpia el DOM
      URL.revokeObjectURL(url); // Liberar el recurso
    } else {
      if (selectedFile) {
        // Crear un enlace para descargar el archivo
        const url = URL.createObjectURL(selectedFile);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedFile.name;
        a.click();
        URL.revokeObjectURL(url); // Liberar el recurso
      }
    }
  };

  const handleDownloadFileSurvey = async () => {
  };

  // Función para manejar la publicación
  const handlePublish = async () => {
    if (selectedFile) {

      try {
        const newEvaluationData = {
          lessonId: response,
          file: selectedFile,
          UserPersonId: id
        };

        setLoading(true); // Inicia la carga

        const formData = new FormData();
        for (const key in newEvaluationData) {
          if (Object.prototype.hasOwnProperty.call(newEvaluationData, key)) {
            formData.append(key, (newEvaluationData as any)[key]);
          }
        }

        const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/upload-evaluation`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!fetchResponse.ok) {
          throw new Error(`Error: ${fetchResponse.status} ${fetchResponse.statusText}`);
        }

        const { data } = await fetchResponse.json();
        setLessonEvaluation(data);
        toast.success("Examen publicado correctamente");
      } catch (error) {
        console.error("Error sending data to endpoint:", error);
        toast.error("Ocurrio un error al publicar");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePublishSurvey = async () => {
    if (selectedFileSurvey) {
      try {
        const newSurveyData = {
          lessonId: response,
          file: selectedFileSurvey,
          UserPersonId: id
        };

        setLoading(true); // Inicia la carga

        const formData = new FormData();
        for (const key in newSurveyData) {
          if (Object.prototype.hasOwnProperty.call(newSurveyData, key)) {
            formData.append(key, (newSurveyData as any)[key]);
          }
        }

        const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/upload-satisfaction-survey`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!fetchResponse.ok) {
          throw new Error(`Error: ${fetchResponse.status} ${fetchResponse.statusText}`);
        }

        const { data } = await fetchResponse.json();

        setLessonSurvey(data);
        toast.success("Encuesta publicada correctamente");
      } catch (error) {
        console.error("Error sending data to endpoint:", error);
        toast.error("Ocurrio un error al subir el archivo");
      } finally {
        setLoading(false);
      }
    }
  };

  const getDetailCourse = async () => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson?CourseId=${idCourse}`;

    try {
      setLoading(true); // Inicia la carga
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
      console.error("Failed to fetch course details:", error);
      throw error;
    } finally {
      setLoading(false); // Termina la carga
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
  
    const newCourseData: NewCourse = {
      ...newCourse,
      courseProjectId: variable.courseProjectId || courseProjectId,
      courseId: variable.id || idCourse,
      userCreatorId: id,
    };
  
    const formData = new FormData();
  
    // Verificar si previousImage es una URL
    if (newCourseData.previousImage && typeof newCourseData.previousImage === "string" && newCourseData.previousImage.startsWith("http")) {
      try {
        // Descargar la imagen y convertirla en un blob binario
        const response = await fetch(newCourseData.previousImage);
        if (response.ok) {
          const blob = await response.blob();
          formData.append("previousImage", blob, "image.jpg"); // Usa un nombre y tipo apropiado
        } else {
          console.error("Error fetching image:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    } else if (newCourseData.previousImage) {
      // Si ya es un archivo (binario), lo agregamos directamente
      formData.append("previousImage", newCourseData.previousImage);
    }
  
    // Agregar el resto de los campos
    for (const key in newCourseData) {
      if (Object.prototype.hasOwnProperty.call(newCourseData, key) && key !== "previousImage") {
        formData.append(key, (newCourseData as any)[key]);
      }
    }
  
    try {
      setLoading(true); // Inicia la carga
      if (editClase) {
        await updateClase(formData);
      } else {
        await createClase(formData);
        setCourses([...courses, newCourseData]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setLoading(false); // Termina la carga
    }
  
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
  
  

  async function updateClase(formData: FormData) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson`, {
        method: "PUT",
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
      console.error("Error sending data to endpoint:", error);
    }
  }

  async function createClase(formData: FormData) {
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
      console.error("Error sending data to endpoint:", error);
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

      const newVideoDetails = files.map((file) => {

        const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

        const playOrder = fileNameWithoutExtension.split('.')[0];

        return {
          id: null,
          name: fileNameWithoutExtension,
          description: "",
          playOrder: Number(playOrder),
          videoFile: file,
        };
      });

      setVideoDetails(newVideoDetails);
    }
  };

  async function getListVideo(value: number) {
    try {
      setLoading(true); // Inicia la carga
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
      console.error("Error fetching video list:", error);
    } finally {
      getEvaluation(value);
      getSurvey(value);
      setLoading(false); // Termina la carga
    }
  }

  async function getEvaluation(value: number) {
    try {
      setLoading(true); // Inicia la carga
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/evaluations/get/${value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      }

      const { data } = await resp.json();

      setLessonEvaluation(data);
    } catch (error) {
      console.error("Error fetching getEvaluation:", error);
    } finally {
      setLoading(false); // Termina la carga
    }
  }

  async function getSurvey(value: number) {
    try {
      setLoading(true); // Inicia la carga
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/satisfaction/get/${value}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error(`Error: ${resp.status} ${resp.statusText}`);
      }

      const { data } = await resp.json();

      setLessonSurvey(data);
    } catch (error) {
      console.error("Error fetching getEvaluation:", error);
    } finally {
      setLoading(false); // Termina la carga
    }
  }

  const handleSendVideo = async (e: any) => {
    e.preventDefault();
    setShowModalVideo(false);

    try {
      setLoading(true); // Inicia la carga

      // Crear una copia de los detalles del video con un playOrder predeterminado si es necesario
      const updatedVideoDetails = videoDetails.map((video, index) => ({
        ...video,
        playOrder: video.playOrder !== undefined && video.playOrder !== null
          ? video.playOrder
          : index + 1, // Asignar playOrder basado en el índice si no existe
      }));

      for (const video of updatedVideoDetails) {
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

        await sendVideoList(formData);
      }

      setShowModalVideo(false);
    } catch (error) {
      console.error("Error saving video:", error);
    } finally {
      setLoading(false); // Termina la carga
    }
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
    } catch (error) {
      console.error("Error sending video to endpoint:", error);
    }
  }

  const createCourse = async () => {
    const request = {
      name: courseNew,
      description: "string",
      userCreatorId: id,
    };
    try {
      setLoading(true); // Inicia la carga
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to create course");
      }

      setIsContent(true);
      const { data } = await response.json();
      const { courseProjectId, id } = data;
      setVariable({ courseProjectId, id });
      setRefresh((prev) => !prev);
      toast.success("Curso creado exitosamente");
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  const EditCourse = async () => {
    const request = {
      id: idCourse,
      courseProjectId: courseProjectId,
      name: courseNew,
      description: courseNew,
      userCreatorId: id,
    };
    try {
      setLoading(true); // Inicia la carga
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error("Failed to edit course");
      }
      toast.success("Curso editado exitosamente");

      await response.json();
    } catch (error) {
      console.error("Error editing course:", error);
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  const handleAddCourse = () => {
    createCourse();
  };

  const handleEditCourse = () => {
    EditCourse();
  };

  const handleDeleteClass = async (course: any) => {
    if (isEdit) {
      setResponse(course.id);
    }
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/${response}`;

    try {
      setLoading(true); // Inicia la carga
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
      toast.success("Clase eliminada exitosamente");
      setCourses((prevCourses) => prevCourses.filter((item) => item.id !== course.id));
      setRefresh((prev) => !prev);
      return result;
    } catch (error) {
      console.error("Failed to delete the course:", error);
      throw error;
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  const handleDeleteVideo = async (id: number) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/video/${id}`;

    try {
      setLoading(true); // Inicia la carga
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
      console.error("Failed to delete the video:", error);
      throw error;
    } finally {
      setLoading(false); // Termina la carga
    }
  };

  useEffect(() => {
    if (isEdit) {
      getDetailCourse();
    }
  }, [refresh]);

  return (
    <div className="p-4 h-full">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
          <span className="ml-2 text-white">Cargando...</span>
        </div>
      )}
      <h3 className="border-b-2 text-2xl">{`${isEdit ? "Editar curso" : "Nuevo curso"}`}</h3>
      <div>
        <div className="flex items-center p-4 gap-4 mt-4 bg-gray-100 rounded-md shadow-lg">
          <input
            onChange={(e: any) => {
              setCourseNew(e.target.value);
            }}
            value={courseNew}
            placeholder="Agregar curso"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={isEdit ? handleEditCourse : handleAddCourse} className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {isEdit ? "Guardar" : "Agregar curso"}
          </button>
        </div>
        {!isEdit && isContent}
        <div className="flex items-center justify-between my-4">
          {(variable.id !== 0 || isEdit) && (
            <button className="bg-white rounded-lg shadow-md overflow-hidden flex items-center justify-center cursor-pointer" onClick={openModalClase}>
              <div className="p-4 text-center flex">
                <PlusIcon className="w-8 h-8 text-primary" />
                <p className="text-lg font-semibold text-primary">Agregar Clase</p>
              </div>
            </button>
          )}
        </div>
      </div>
      <div className="container mx-auto py-8">
        <div>
          {courses.length === 0 ? (
            <div className="flex items-center justify-center h-64 bg-white w-full border border-dashed border-blue-500 text-blue text-2xl font-semibold rounded-lg shadow-md">No hay cursos creados</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {courses.map((lesson) => (
                <div key={lesson.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={lesson.imagePreview || (lesson.previousImage as any)} alt={lesson.name} className="w-full h-48 object-cover" />
                  <div className="p-4 flex flex-col">
                    {/* Información del curso */}
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">
                        {lesson.classNumber || `${lesson["lessonOrder"]}.`} {lesson.name}
                      </h3>
                      <div>{lesson.instructorName || lesson["nameLessonOrder"]}</div>
                      <div>{lesson.instructorProfession}</div>
                    </div>

                    {/* Botones debajo de la información */}
                    <div className="flex flex-row items-center justify-between">
                      <div className="flex space-x-2"> {/* Espaciado entre Editar y Eliminar */}
                        <button className="p-2" onClick={() => handleEdit(lesson)}>
                          <EditIcon className="h-6 w-6 text-green-500" />
                          <span className="sr-only">Editar</span>
                        </button>

                        <button
                          className="p-2 text-red-600 hover:text-red-900"
                          onClick={() => handleDeleteClass(lesson)}
                        >
                          <Trash2Icon className="h-6 w-6" />
                          <span className="sr-only">Eliminar</span>
                        </button>
                      </div>

                      <button
                        className="px-2 py-1 text-white" // Añade un color de fondo si lo deseas
                        onClick={() => openModal(lesson)}
                      >
                        <AddIcon className="h-6 w-6" />
                        <span className="sr-only">Agregar</span>
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
            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                <span className="ml-2 text-white">Cargando...</span>
              </div>
            )}
            <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6 pt-0 mx-auto my-8 mb-16 h-[80%] overflow-y-auto">
              <div className="sticky top-0 z-10 bg-white shadow-md flex justify-between items-center mb-4 p-4">
                <h2 className="text-2xl font-semibold">Videos de {courseNew}</h2>

                <div className="flex gap-4">
                  <label className="p-2 mt-4 bg-green-500 text-white rounded hover:bg-green-700">
                    <span>Agregar Video</span>
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleMultiVideoChange}
                      className="w-full p-2 border rounded hidden"
                    />
                  </label>

                  <button
                    className="p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-700"
                    onClick={handleSendVideo}
                  >
                    Guardar
                  </button>

                  <button
                    className="mt-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={closeModal}
                  >
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
                        <td className="pr-2">
                          <input type="number" name="playOrder"
                            value={videoDetail.playOrder || index + 1}
                            onChange={(e) => handleVideoDetailsChange(e, index)} placeholder="Orden de reproducción" className="w-full p-2 border rounded" />
                        </td>
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

              <div className="sticky top-0 z-10 bg-white shadow-md flex justify-between items-center mb-4 p-4">
                <label
                  className={`p-2 text-white rounded cursor-pointer ${lessonEvaluation && lessonEvaluation.name ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
                    }`}
                >
                  <span>Seleccionar examen</span>
                  <input
                    type="file"
                    onChange={handleExamUpload}
                    className="hidden"
                    ref={fileInputRef} // Referencia al input de archivo
                    disabled={lessonEvaluation && lessonEvaluation.name ? true : false}
                  />
                </label>

                {selectedFile && (!lessonEvaluation || !lessonEvaluation.name) && (
                  <div className="flex items-center gap-4 ml-4">
                    <a
                      onClick={handleDownloadFile}
                      className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                    >
                      {selectedFile.name}
                    </a>
                    <button
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={handlePublish}
                    >
                      Publicar
                    </button>

                    <button
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleRemoveFile(null)} // Verificar si el id no es null
                    >
                      Eliminar
                    </button>
                  </div>
                )}

                {lessonEvaluation && lessonEvaluation.name && (
                  <div className="flex items-center gap-4 ml-4">
                    <a
                      onClick={handleDownloadFile}
                      className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                    >
                      {lessonEvaluation.name}
                    </a>

                    <button
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => lessonEvaluation.id && handleRemoveFile(lessonEvaluation.id)} // Verificar si el id no es null
                    >
                      Eliminar
                    </button>
                  </div>
                )}

              </div>

              <div className="sticky top-0 z-10 bg-white shadow-md flex justify-between items-center mb-4 p-4">
                <label
                  className={`p-2 text-white rounded cursor-pointer ${lessonSurvey && lessonSurvey.name ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
                    }`}
                >
                  <span>Seleccionar encuesta</span>
                  <input
                    type="file"
                    onChange={handleSurveyUpload}
                    className="hidden"
                    ref={fileInputRefSurvey}
                    disabled={lessonSurvey && lessonSurvey.name ? true : false}
                  />
                </label>

                {selectedFileSurvey && (!lessonSurvey || !lessonSurvey.name) && (
                  <div className="flex items-center gap-4 ml-4">
                    <a
                      onClick={handleDownloadFile}
                      className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                    >
                      {selectedFileSurvey.name}
                    </a>
                    <button
                      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                      onClick={handlePublishSurvey}
                    >
                      Publicar
                    </button>

                    <button
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleRemoveFileSurvey(null)} // Verificar si el id no es null
                    >
                      Eliminar
                    </button>
                  </div>
                )}

                {lessonSurvey && lessonSurvey.name && (
                  <div className="flex items-center gap-4 ml-4">
                    <a
                      onClick={handleDownloadFileSurvey}
                      className="text-blue-500 underline cursor-pointer hover:text-blue-700"
                    >
                      {lessonSurvey.name}
                    </a>

                    <button
                      className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => lessonSurvey.id && handleRemoveFileSurvey(lessonSurvey.id)} // Verificar si el id no es null
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex mb-16 z-50 ">
            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
                <span className="ml-2 text-white">Cargando...</span>
              </div>
            )}
            <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-6 mx-auto my-8 mb-16 h-full overflow-y-auto">
              <h2 className="text-2xl font-semibold mb-4">{`${isEdit ? "Editar clase" : "Nueva clase"}`}</h2>
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
