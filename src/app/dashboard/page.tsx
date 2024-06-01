import { fetchMostViewedCourses, fetchNewlyUploadedCourses, fetchUserWatchingCourses } from "./services";
import Main from "./main";

async function Dashboard() {
  const { data: dataUpdoadCourses } = await fetchNewlyUploadedCourses();
  const { data: dataMostViewed } = await fetchMostViewedCourses();
  const { data: dataUserWatchingCourses } = await fetchUserWatchingCourses();
  return (
    <main>
      <Main dataMostViewed={dataMostViewed} dataUpdoadCourses={dataUpdoadCourses} dataUserWatchingCourses={dataUserWatchingCourses} />
    </main>
  );
}

export default Dashboard;
