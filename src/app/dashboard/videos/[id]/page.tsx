import Link from "next/link";
import { fetchCourseVideo } from "../../services";
import EmbeddedVideo from "@/components/atoms/videoReproductor";
import { OptionsComponent } from "@/components/atoms/optionsVideo";
import { VideoData } from "@/interfaces/video.interface";
import CommentModalClient from "@/components/atoms/buttonModal";

export default async function VideosCourses({ params }: any) {
  const { id } = params;
  const { data } = await fetchCourseVideo(id);

  return (
    <>
      <Link href={`/dashboard/${id}`}>
        <button className="flex justify-content mt-5 items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500 hover:text-blue-700">
          {/* <BackArrowIcon className="h-4 w-4 mr-2" /> */}
          Atras
        </button>
      </Link>
      <div className="flex flex-col md:flex-row h-screen p-2">
        <div className="flex-1 relative ">
          <EmbeddedVideo embedCode={data} />
          <div className="flex gap-4">
            <CommentModalClient />
            <button className="flex justify-content mt-5 items-center outline outline-1 rounded-sm border-spacing-0 p-1 py-0 text-gray-500 hover:text-blue-700">Historial de dudas</button>
          </div>
        </div>
        <div className="bg-gray-100  w-full md:w-[19rem] overflow-auto flex flex-col">
          <div className="bg-blue-950 h-16 flex justify-center items-center">
            <div className="text-white border border-collapse p-1 rounded-lg text-sm">Conviértete a Premiun</div>
          </div>
          <div className="mt-1">
            <div className="bg-blue-500 text-white p-2 w-2/5 rounded-sm ml-3 ">Excelencia</div>
          </div>
          <div className="flex p-1 gap-2">
            <div className="flex  grow justify-center items-center bg-blue-950 text-white text-xs p-1">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Descargar los adjuntos aqui
            </div>
            <div className="flex  grow justify-center items-center bg-blue-950 text-white text-xs p-1">
              <WarningIcon className="h-4 w-4 mr-2" />
              Reportar un problema
            </div>
          </div>
          <div>
            <h2 className="text-lg font-medium mb-4">Cursos</h2>
            <div>
              {data.map((item: VideoData, index: number) => (
                <OptionsComponent item={item} key={item.id} index={index} length={data.length} />
              ))}
            </div>
          </div>
          <div className="flex flex-col p-4 text-sm gap-2">
            <span className="bg-blue-950 text-white rounded-sm p-2">Examen</span>
            <span className="bg-blue-950 text-white rounded-sm p-2">Encuesta de sastifaccion curso</span>
            <span className="bg-blue-950 text-white rounded-sm p-2">Programar dinámica</span>
          </div>
        </div>
      </div>
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
