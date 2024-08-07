import { fetchCourseList, fetchCourseListAdmin } from "../services";
import TableVideoComponent from "./tableVideo";

export default async function Component() {
  const { data: courseList } = await fetchCourseList();
  const { data: courseListAdmin } = await fetchCourseListAdmin();
  return <TableVideoComponent courseList={courseList} courserListAdmin={courseListAdmin} />;
}
