"use client";
import { VideoData } from "@/interfaces/video.interface";
import { useVideoStore } from "@/store/ui/changeVideo";
import { useEffect, useRef, useState } from "react";

interface EmbeddedVideoProps {
  embedCode: VideoData[];
}

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = ({ embedCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { value } = useVideoStore();
  useEffect(() => {
    if (containerRef.current) {
      // Limpia el contenedor antes de añadir nuevo contenido
      containerRef.current.innerHTML = "";
      let video = "";
      // Crea un contenedor temporal para extraer los scripts
      const tempDiv = document.createElement("div");
      if (value === 0) {
        video = embedCode[0]?.htmlContent;
      }
      tempDiv.innerHTML = embedCode?.find((item) => item.id === value)?.htmlContent || video;
      // console.log(tempDiv.innerHTML,'valor')
      // Añade el contenido sin scripts
      containerRef.current.appendChild(tempDiv);

      // Reemplaza y ejecuta los scripts
      const scriptTags = Array.from(tempDiv.querySelectorAll("script"));
      scriptTags.forEach((scriptTag) => {
        const newScriptTag = document.createElement("script");
        Array.from(scriptTag.attributes).forEach((attr) => newScriptTag.setAttribute(attr.name, attr.value));
        newScriptTag.innerHTML = scriptTag.innerHTML;
        containerRef.current?.appendChild(newScriptTag);
      });
    }
  }, [embedCode, value]);

  return <div ref={containerRef} />;
};

export default EmbeddedVideo;
