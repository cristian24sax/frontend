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
      <div className="flex flex-col items-center">
        <div className="rounded-lg overflow-hidden mb-8">
          <Image src={data.previousImage} alt={`img`} width={800} height={700} unoptimized={true} className="rounded-md h-full" />
        </div>
        <div className="flex justify-end w-full mb-8 gap-4">
          <Link href={`/dashboard/videos/${id}`}>
            <button className="flex justify-content items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500 hover:text-blue-700">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Descargar video
            </button>
          </Link>
          <Link href={`/dashboard/videos/${id}`}>
            <button className="flex justify-content items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500 hover:text-blue-700">
              <PlayIcon className="h-4 w-4 mr-2" />
              Ver video
            </button>
          </Link>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold">{data.name}</h2>
          </div>
          <p className="text-gray-500 mt-2">{data.description}</p>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Objetivo del curso</h2>
            <p className="text-gray-500 mt-2">{data.objetives}</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Lo que aprenderás</h2>
            {data.indexLesson}
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold">Índice de temas</h2>
            {data.indexLesson}
          </div>
          <div className="mt-12">
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
            <div className="mt-8">
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
function PlayIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}
