"use client"; // Asegúrate de marcar esto al principio del archivo

import Link from "next/link";
import { fetchCourseVideo } from "../../services";
import EmbeddedVideo from "@/components/atoms/videoReproductor";
import { OptionsComponent } from "@/components/atoms/optionsVideo";
import { Evaluation, Survey, VideoData } from "@/interfaces/video.interface";
import CommentModalClient from "@/components/atoms/buttonModal";
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import PlanesModule from "@/components/organisms/tariff";

export default function VideosCourses({ params }: any) {
  const dataUser = localStorage.getItem("dataUser");
  const { token, id } = JSON.parse(dataUser as string);
  const { id: lessonId } = params;
  const [videoData, setVideoData] = useState<VideoData[]>([]); // Cambiamos el nombre a videoData
  const [lessonEvaluation, setLessonEvaluation] = useState<Evaluation | null>({ id: null, name: "", url: "" });
  const [lessonSurvey, setLessonSurvey] = useState<Survey | null>({ id: null, name: "", url: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const showPremiun = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };
  // Efecto que se ejecuta al inicio para obtener los videos
  useEffect(() => {
    console.log(params);
    const fetchData = async () => {
      try {
        await fetchCourseVideo(lessonId); // Llama a la función aquí
        await getEvaluation(lessonId);
        await getSurvey(lessonId);
      } catch (error) {
        console.error("Error fetching course video:", error);
      }
    };

    fetchData(); // Llama a la función fetchData
  }, [lessonId]); // Añade id y token como dependencias

  const handleDownloadFile = async () => {
    if (lessonEvaluation && lessonEvaluation.url) {
      const response = await fetch(lessonEvaluation.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob(); // Convertir la respuesta en un Blob
      const url = URL.createObjectURL(blob); // Crear una URL para el Blob

      const a = document.createElement("a");
      a.href = url;
      a.download = lessonEvaluation.name; // Establecer el nombre para la descarga
      a.target = "_blank"; // Abrir en una nueva pestaña
      document.body.appendChild(a);
      a.click(); // Simula un clic en el enlace
      document.body.removeChild(a); // Limpia el DOM
      URL.revokeObjectURL(url); // Liberar el recurso
    }
  };

  const handleDownloadFileSurvey = async () => {
    if (lessonSurvey && lessonSurvey.url) {
      const response = await fetch(lessonSurvey.url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob(); // Convertir la respuesta en un Blob
      const url = URL.createObjectURL(blob); // Crear una URL para el Blob

      const a = document.createElement("a");
      a.href = url;
      a.download = lessonSurvey.name; // Establecer el nombre para la descarga
      a.target = "_blank"; // Abrir en una nueva pestaña
      document.body.appendChild(a);
      a.click(); // Simula un clic en el enlace
      document.body.removeChild(a); // Limpia el DOM
      URL.revokeObjectURL(url); // Liberar el recurso
    }
  };

  const handleSurveyUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Guardar el archivo en el estado

      setLoading(true);

      try {
        const newEvaluationData = {
          lessonId: lessonId,
          file: file,
          userResolveId: id,
          LessonSatisfactionSurveyId: lessonSurvey?.id,
        };

        const formData = new FormData();
        for (const key in newEvaluationData) {
          if (Object.prototype.hasOwnProperty.call(newEvaluationData, key)) {
            formData.append(key, (newEvaluationData as any)[key]);
          }
        }

        const fetchResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/upload-satisfaction-survey-resolve`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!fetchResponse.ok) {
          throw new Error(`Error: ${fetchResponse.status} ${fetchResponse.statusText}`);
        }

        toast.success("Encuesta enviada correctamente");
      } catch (error) {
        console.error("Error sending data to endpoint:", error);
        setLoading(false);
        toast.error("Error al subir el archivo");
      } finally {
        setLoading(false);
      }
    }
  };

  async function fetchCourseVideo(lessonId: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/video/list?LessonId=${lessonId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const { data } = await response.json();

    setVideoData(data);
  }

  async function getEvaluation(lessonId: number) {
    try {
      //setLoading(true); // Inicia la carga
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/evaluations/get/${lessonId}`, {
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
      //setLoading(false); // Termina la carga
    }
  }

  async function getSurvey(lessonId: number) {
    try {
      //setLoading(true); // Inicia la carga
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/survey/get/${lessonId}`, {
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
      console.error("Error fetching setLessonSurvey:", error);
    } finally {
      //setLoading(false); // Termina la carga
    }
  }

  return (
    <>
      <Link href={`/dashboard/${lessonId}`}>
        <button className="flex justify-content mt-5 items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500 hover:text-blue-700">
          <BackArrowIcon className="h-4 w-4 mr-2" />
          Atras
        </button>
      </Link>
      <div className="flex flex-col md:flex-row h-screen p-2">
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
            <span className="ml-2 text-white">Cargando...</span>
          </div>
        )}
        <div className="flex-1 relative">
          <EmbeddedVideo embedCode={videoData} /> {/* Cambia aquí para usar videoData */}
          <div className="flex gap-4">
            <CommentModalClient />
            <button className="flex justify-content mt-5 items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500 hover:text-blue-700">Historial de dudas</button>
          </div>
        </div>
        <div className="bg-gray-100 w-full md:w-[19rem] overflow-auto flex flex-col">
          <div className="bg-blue-950 h-16 flex justify-center items-center">
            <div className="text-white border border-collapse p-1 rounded-lg text-sm cursor-pointer" onClick={showPremiun}>
              Conviértete a Premiun
            </div>
          </div>
          <div className="mt-1">
            <div className="bg-blue-500 text-white p-2 w-2/5 rounded-sm ml-3">Excelencia</div>
          </div>
          <div className="flex p-1 gap-2">
            <div className="flex grow justify-center items-center bg-blue-950 text-white text-xs p-1">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Descargar los adjuntos aqui
            </div>
            <div className="flex grow justify-center items-center bg-blue-950 text-white text-xs p-1">
              <WarningIcon className="h-4 w-4 mr-2" />
              Reportar un problema
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-4">Cursos</h2>
            <div>
              {videoData.map(
                (
                  item: VideoData,
                  index: number // Cambia aquí para usar videoData
                ) => (
                  <OptionsComponent item={item} key={item.id} index={index} length={videoData.length} />
                )
              )}
            </div>
          </div>
          <div className="flex flex-col p-4 text-sm gap-2">
            <button className="bg-blue-950 text-white rounded-sm p-2 text-left w-full" onClick={handleDownloadFile}>
              Descargar examen y solucionario
            </button>
            <button className="bg-blue-950 text-white rounded-sm p-2 text-left w-full" onClick={handleDownloadFileSurvey}>
              Descargar encuesta de satisfacción
            </button>
            <label className="bg-blue-950 text-white rounded-sm p-2 text-left w-full cursor-pointer">
              <span>Enviar encuesta</span>
              <input type="file" className="hidden" onChange={handleSurveyUpload} />
            </label>
            <Link href={`/dashboard/dinamic`}>
              <button className="bg-blue-950 text-white rounded-sm p-2 text-left w-full">Programar dinámica</button>
            </Link>
          </div>
        </div>
        <Toaster richColors position="bottom-right" />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[90%]  max-h-[100vh] p-6 rounded shadow-lg overflow-y-auto">
            <PlanesModule onClose={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}

function MaximizeIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}
export function BackArrowIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function PauseIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}
function WarningIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3l-8.47-14.14a2 2 0 00-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  );
}
function PlayIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

function Volume2Icon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}
function DownloadIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  );
}
