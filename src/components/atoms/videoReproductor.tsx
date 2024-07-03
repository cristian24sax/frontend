"use client";
import { throttle } from "@/app/utils";
import { VideoData } from "@/interfaces/video.interface";
import { useVideoStore } from "@/store/ui/changeVideo";
import { useEffect, useRef, useState } from "react";

interface EmbeddedVideoProps {
  embedCode: VideoData[];
}

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = ({ embedCode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { value, setValue } = useVideoStore();
  const [currentTime, setCurrentTime] = useState(0);
  const dataUser = localStorage.getItem("dataUser");
  const { token, id } = JSON.parse(dataUser as string);

  const sendTimeToEndpoint = async (seconds: number) => {
    const roundedSeconds = Math.floor(seconds);
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/progress`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonVideoId: value,
          userPersonId: id,
          secondsElapsed: roundedSeconds,
        }),
      });
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  };

  const throttledSendTimeToEndpoint = throttle(sendTimeToEndpoint, 30000);

  useEffect(() => {
    if (containerRef.current && embedCode.length > 0) {
      containerRef.current.innerHTML = "";
      const tempDiv = document.createElement("div");

      // Encuentra el video inicial
      const initialVideo = embedCode.find((item) => item.id === value) || embedCode[0];
      const initialTime = initialVideo.secondsElapsed;

      tempDiv.innerHTML = initialVideo.htmlContent;
      containerRef.current.appendChild(tempDiv);

      const scriptTags = Array.from(tempDiv.querySelectorAll("script"));
      scriptTags.forEach((scriptTag) => {
        const newScriptTag = document.createElement("script");
        Array.from(scriptTag.attributes).forEach((attr) => newScriptTag.setAttribute(attr.name, attr.value));
        newScriptTag.innerHTML = scriptTag.innerHTML;
        containerRef.current.appendChild(newScriptTag);

        if (newScriptTag.src.includes("wistia.com/assets/external/E-v1.js")) {
          (newScriptTag as HTMLScriptElement).onload = () => {
            const wistiaEmbed = tempDiv.querySelector(".wistia_embed");
            if (wistiaEmbed) {
              const match = wistiaEmbed.className.match(/wistia_async_([a-zA-Z0-9]+)/);
              if (match) {
                const videoId = match[1];
                (window as any)._wq = (window as any)._wq || [];
                (window as any)._wq.push({
                  id: videoId,
                  options: {
                    autoPlay: true,
                  },
                  onReady: (video: any) => {
                    video.bind("end", () => {
                      const currentIndex = embedCode.findIndex((item) => item.id === value);
                      const nextIndex = currentIndex + 1;
                      if (nextIndex < embedCode.length) {
                        setValue(embedCode[nextIndex].id);
                      }
                    });
                    video.bind("timechange", (seconds: number) => {
                      setCurrentTime(seconds);
                      throttledSendTimeToEndpoint(seconds);
                    });
                    video.time(initialTime); // Establece el tiempo inicial
                    video.play();
                  },
                });
              }
            }
          };
        }
      });
    }
  }, [embedCode, value, setValue]);

  // Inicializa el valor de value con el último video visto
  useEffect(() => {
    const lastVideo = embedCode.find((item) => item.isLastVideoSeen === 1);
    if (lastVideo) {
      setValue(lastVideo.id);
    } else if (embedCode.length > 0) {
      setValue(embedCode[0].id);
    }
  }, [embedCode, setValue]);

  return <div ref={containerRef} />;
};

export default EmbeddedVideo;
