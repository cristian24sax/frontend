import { fetchCourseList, fetchCourseListAdmin } from "@/modules/dashboard/service/dashboard.service";
import TableVideoComponent from "./tableVideo";

export default async function Component() {
  const { data: courseList } = await fetchCourseList();
  const { data: courseListAdmin } = await fetchCourseListAdmin();
  return <TableVideoComponent courseList={courseList} courserListAdmin={courseListAdmin} />;
}
