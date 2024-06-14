import Link from "next/link";
import { fetchCourseVideo } from "../../services";
import EmbeddedVideo from "@/components/atoms/videoReproductor";
import { OptionsComponent } from "@/components/atoms/optionsVideo";
import { VideoData } from "@/interfaces/video.interface";

export default async function VideosCourses({ params }: any) {
  const { id } = params;
  const { data } = await fetchCourseVideo(id);

  return (
    <div className="flex flex-col md:flex-row h-screen p-5">
      <div className="flex-1 relative">
        <EmbeddedVideo embedCode={data} />
      </div>
      <div className="bg-gray-100  w-full md:w-64 overflow-auto flex flex-col justify-between">
        <div className="p-4">
          <h2 className="text-lg font-medium mb-4">Cursos</h2>
          <div className="space-y-2">
            {data.map((item: VideoData, index: number) => (
              <OptionsComponent item={item} key={item.id} index={index} />
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

function PauseIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="4" width="4" height="16" rx="1" />
      <rect x="6" y="4" width="4" height="16" rx="1" />
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
