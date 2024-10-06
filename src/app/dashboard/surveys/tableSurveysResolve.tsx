"use client";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

interface Props {
    data: any[];
}
export default function TableSurveysComponent({ data }: Props) {

    const [isAdmin, setIsAdmin] = useState(false);
    const [surveys, setSurveys] = useState(data);

    useEffect(() => {
        const dataUser = localStorage.getItem("dataUser");
        const parsedData = JSON.parse(dataUser as string);
        setIsAdmin(parsedData.is_Admin);
    }, []);

    const handleDownloadFile = async (url: any, fileName: any) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const blob = await response.blob(); // Convertir la respuesta en un Blob
            const downloadUrl = URL.createObjectURL(blob); // Crear una URL para el Blob

            // Crear un enlace para descargar el archivo
            const a = document.createElement("a");
            a.href = downloadUrl;
            a.download = fileName; // Establecer el nombre del archivo descargado
            a.target = "_blank"; // Abrir en una nueva pestaña
            document.body.appendChild(a);
            a.click(); // Simular un clic en el enlace
            document.body.removeChild(a); // Limpiar el DOM
            URL.revokeObjectURL(downloadUrl); // Liberar el recurso
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <div className="w-full p-5">
            <header className="flex items-center justify-between border-b pb-4 mb-6">
                <h1 className="text-2xl font-bold">Listado de encuestas resueltas</h1>
            </header>
            <div className="border rounded-lg overflow-hidden">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Nombre del curso</th>
                            <th className="px-4 py-2">Nombre de la clase</th>
                            <th className="px-4 py-2">Nombre del archivo</th>
                            <th className="px-4 py-2 whitespace-nowrap">Fecha de registro</th>
                            <th className="px-4 py-2">Usuario</th>
                            <th className="px-4 py-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((item) => (
                            <tr>
                                <td className="border px-4 py-2 font-medium">{item.courseName}</td>
                                <td className="border px-4 py-2">{item.lessonName}</td>
                                <td className="border px-4 py-2">{item.evaluationResolveFileName}</td>
                                <td className="border px-4 py-2 whitespace-nowrap">{item.createdAt}</td>
                                <td className="border px-4 py-2">{item.evaluatedUser}</td>
                                <td className="border px-4 py-2">
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => handleDownloadFile(item.url, item.evaluationResolveFileName)}
                                            className="text-blue-500 underline"
                                        >
                                            <FontAwesomeIcon icon={faDownload} size="lg" />
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