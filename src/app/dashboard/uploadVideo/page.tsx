import { fetchCourseList } from "../services";
import VideoMain from "./main";

export default async function Component() {
  const {data} = await fetchCourseList();
  return (
    <>
      <VideoMain courseList={data} />
    </>
  );
}
