"use client";
import { VideoData } from "@/interfaces/video.interface";
import { useVideoStore } from "@/store/ui/changeVideo";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PlanesModule from "../organisms/tariff";

interface Props {
  item: VideoData;
  index: number;
  length: number;
}

export const OptionsComponent = ({ item, index, length }: Props) => {
  const router = useRouter();
  const { setValue, value, hasBeenPlayedMap, setHasBeenPlayed } = useVideoStore();
  const dataUser = localStorage.getItem("dataUser");
  const { token, id: idPerson } = JSON.parse(dataUser as string);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal planes

  const showPremiun = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleOptions = (id: number) => {
    setValue(id);
  };

  const suscriptionPlan = (order:number, hasSubscription:boolean) => {
    console.log("order");
    console.log(order);

    console.log("hasSubscription");
    console.log(hasSubscription);

    console.log(item);
    if(order > 2 && hasSubscription == false){
      setValue(0);
      showPremiun();
    }
  };

  const hasBeenPlayed = hasBeenPlayedMap[item.id] ?? item.hasBeenPlayed;
  const handlecheck = async (id: number) => {
    const changeState = hasBeenPlayed ? false : true;
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
          checkedState: changeState ? 1 : 0,
        }),
      });
      if (resp.status === 401) {
        router.push("/auth/login", { scroll: false });
        throw new Error("Failed to fetch data");
      }
      if (resp.status === 200) {
        setHasBeenPlayed(id, changeState);
        item.hasBeenPlayed = changeState;
      }
    } catch (error) {
      console.error("Error sending time to endpoint:", error);
    }
  };

  return (
    <>
      <div 
      onClick={() =>  suscriptionPlan(item.playOrder, item.hasSubscriptionPlan) } 
      className={`relative p-2 transition-colors cursor-pointer w-full ${value === item.id ? "bg-neutral-900 text-white" : "bg-white text-black"} border-t-2`}>
        <div className="absolute top-[4px] left-[4px] flex flex-col items-center h-full">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center cursor-pointer ${hasBeenPlayed ? "bg-green-500" : value === item.id ? "bg-blue-500" : "bg-gray-300"}`} onClick={() => handlecheck(item.id)}>
            <span className={`text-xs text-white`}>{index + 1}</span>
          </div>
          {index !== length - 1 && <div className={`h-full w-0.5 ${hasBeenPlayed ? "bg-green-500" : value === item.id ? "bg-blue-500" : "bg-gray-300"}`}></div>}
        </div>
        <div className="pl-6" onClick={() => handleOptions(item.id)}>
          <div className={`font-medium text-sm ${value === item.id ? "text-white" : "text-gray-900"}`}>{item.name}</div>
          <div className="flex justify-between items-center">
            <div className="text-gray-500 text-sm">{item.formattedDuration}</div>
          </div>
        </div>
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
};
