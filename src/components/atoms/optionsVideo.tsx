"use client";
import { VideoData } from "@/interfaces/video.interface";
import { useVideoStore } from "@/store/ui/changeVideo";
import { useEffect } from "react";

interface Props {
  item: VideoData;
  index: number;
  length: number;
}

export const OptionsComponent = ({ item, index, length }: Props) => {
  const { setValue, value } = useVideoStore();
  const dataUser = localStorage.getItem("dataUser");
  const { token, id: idPerson } = JSON.parse(dataUser as string);
  const handleOptions = (id: number) => {
    setValue(id);
  };
  const handlecheck = async (id: number) => {
    const changeState = item.hasBeenPlayed === 1 ? 0 : 1;
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/user/check`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonVideoId: id,
          userPersonId: idPerson,
          checkedState: changeState,
        }),
      });
      if (resp.status === 200) {
        item.hasBeenPlayed = changeState;
      }
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  };

  return (
    <div className={`relative p-2 transition-colors cursor-pointer w-full ${value === item.id ? "bg-neutral-900 text-white" : "bg-white text-black"} border-t-2`}>
      <div className="absolute top-[4px] left-[4px] flex flex-col items-center h-full">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${item.hasBeenPlayed === 1 ? "bg-green-500" : value === item.id ? "bg-blue-500" : "bg-gray-300"}`} onClick={() => handlecheck(item.id)}>
          <span className={`text-xs ${item.hasBeenPlayed === 1 ? "text-white" : "text-white"}`}>{index + 1}</span>
        </div>
        {index !== length - 1 && <div className={`h-full w-0.5 ${item.hasBeenPlayed === 1 ? "bg-green-500" : value === item.id ? "bg-blue-500" : "bg-gray-300"}`}></div>}
      </div>
      <div className="pl-6" onClick={() => handleOptions(item.id)}>
        <div className={`font-medium text-sm ${value === item.id ? "text-white" : "text-gray-900"}`}>{item.name}</div>
        <div className="flex justify-between items-center">
          <div className="text-gray-500 text-sm">{item.formattedDuration}</div>
        </div>
      </div>
    </div>
  );
};
