import Image from "next/image";
import { fetchCourseDetail } from "../services";
import Link from "next/link";

export default async function DetailCourse({ params }: any) {
  const { id } = params;
  const { data } = await fetchCourseDetail(id);
  console.log({ data });
  const avatarUrl = `https://ui-avatars.com/api/?name=${data.instructorName}&background=random&color=fff`;
  return (
    <div className="w-full mx-auto py-12 px-4 md:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-lg overflow-hidden">
            <Image src={data.previousImage} alt={`img`} width={800} height={700} unoptimized={true} className="rounded-md h-full" />
          </div>
          <div className="flex justify-end mt-4">
            <Link href={`/dashboard/videos/${id}`}>
              <button className="flex justify-content items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500  hover:text-blue-700">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Descargar video
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <Link href={`/dashboard/videos/${id}`}>
              <button>Ver video</button>
            </Link>
          </div>
          <p className="text-gray-500 mt-2">{data.description}</p>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Objetivo del curso</h2>
            <p className="text-gray-500 mt-2">{data.objetives}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Lo que aprenderás</h2>
            {/* <ul className="list-disc pl-6 text-gray-500 mt-2">
              <li>Fundamentos de React.js</li>
              <li>Crear y trabajar con componentes</li>
              <li>Manejar el estado de la aplicación</li>
              <li>Utilizar props para pasar datos entre componentes</li>
              <li>Entender el ciclo de vida de los componentes</li>
              <li>Implementar routing en una aplicación React</li>
              <li>Consumir APIs y manejar datos asíncronos</li>
              <li>Optimizar el rendimiento de la aplicación</li>
            </ul> */}
            {data.indexLesson}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Índice de temas</h2>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-lg font-bold">Sección 1</h3>
                <ul className="list-disc pl-6 text-gray-500 mt-2">
                  <li>Introducción a React.js</li>
                  <li>Configuración del entorno de desarrollo</li>
                  <li>Creación de un proyecto React</li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-lg font-bold">Sección 2</h3>
                <ul className="list-disc pl-6 text-gray-500 mt-2">
                  <li>Componentes funcionales y de clase</li>
                  <li>Manejo de estado y props</li>
                  <li>Ciclo de vida de los componentes</li>
                </ul>
              </div>
              <div className="bg-gray-100  rounded-lg p-4">
                <h3 className="text-lg font-bold">Sección 3</h3>
                <ul className="list-disc pl-6 text-gray-500 mt-2">
                  <li>Routing con React Router</li>
                  <li>Manejo de formularios</li>
                  <li>Consumo de APIs</li>
                </ul>
              </div>
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="text-lg font-bold">Sección 4</h3>
                <ul className="list-disc pl-6 text-gray-500 mt-2">
                  <li>Optimización de rendimiento</li>
                  <li>Pruebas unitarias</li>
                  <li>Despliegue de aplicaciones</li>
                </ul>
              </div>
            </div> */}
            {data.indexLesson}
          </div>
        </div>
      </div>
      <div className="mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold">Sobre el instructor</h2>
            <div className="flex items-center mt-4">
              <Image src={avatarUrl} alt={`Avatar de ${data.instructorName}`} width={40} height={40} unoptimized={true} className="rounded-md" />
              <div className="ml-4">
                <h3 className="text-lg font-bold">{data.instructorName}</h3>
                <p className="text-gray-500">{data.instructorProfession}</p>
              </div>
            </div>
            <p className="text-gray-500 mt-4">{data.cvInstructor}</p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Información del curso</h2>
            <div className="mt-4">
              <div className="flex items-center">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-500">8 horas de contenido</span>
              </div>
              <div className="flex items-center mt-2">
                <CalendarIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-500">Acceso de por vida</span>
              </div>
              <div className="flex items-center mt-2">
                <BadgeIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-500">Certificado de finalización</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BadgeIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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
