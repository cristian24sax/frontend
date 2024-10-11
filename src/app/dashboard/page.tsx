import { fetchMostViewedCourses, fetchNewlyUploadedCourses, fetchUserWatchingCourses } from "@/modules/dashboard/service/dashboard.service";
import Main from "./main";
import { cookiesService } from "@/modules/auth/utils/cookies";

async function Dashboard() {
  const id: string = cookiesService();
  const { data: dataUpdoadCourses } = await fetchNewlyUploadedCourses();
  const { data: dataMostViewed } = await fetchMostViewedCourses();
  const { data: dataUserWatchingCourses } = await fetchUserWatchingCourses(id);
  return (
    <main>
      <Main dataMostViewed={dataMostViewed} dataUpdoadCourses={dataUpdoadCourses} dataUserWatchingCourses={dataUserWatchingCourses} />
    </main>
  );
}

export default Dashboard;
