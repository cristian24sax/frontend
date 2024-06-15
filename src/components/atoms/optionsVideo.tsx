"use client";
import { VideoData } from "@/interfaces/video.interface";
import { useVideoStore } from "@/store/ui/changeVideo";

interface Props {
  item: VideoData;
  index: number;
}
export const OptionsComponent = ({ item, index }: Props) => {
  const { setValue, value } = useVideoStore();
  let valueNew: number = 0;
  if (value === 0) valueNew = 1;
  const handleOptions = (id: number) => {
    setValue(id);
  };
  return (
    <div onClick={() => handleOptions(item.id)} className={`flex items-center gap-3 p-2 grow  pr-1 rounded-md hover:bg-gray-200  text-black transition-colors cursor-pointer ${value === item.id || valueNew === item.id ? "bg-neutral-900 " : ""}`}>
      <div className="grow">
        <div className={`font-medium text-gray-900 text-sm   ${value === item.id || valueNew === item.id ? "text-white hover:text-black" : ""}`}>
          {index + 1}.
          <span className="ml-1">
            {item.name}
          </span>
        </div>
      <div className="flex  justify-between items-center">
          <div className="text-gray-500 text-sm ml-4">{item.formattedDuration}</div>
          <div className="bg-blue-500 p-0.5 rounded-sm text-white text-sm font-semibold">Dudas</div>
        </div>
      </div>
    </div>
  );
};
