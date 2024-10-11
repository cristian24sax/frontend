import apiClient from "@/app/api/apliclient";

export async function filterCourses(search: string) {
  const response = await apiClient.get(`course/lesson/list?Name=${search}`);
  return response.data;
}
export async function filterCoursesMenu(valueMenu: number | null) {
  const response = await apiClient.get(`course/lesson?CourseId=${valueMenu}`);
  return response.data;
}
export async function fetchNewlyUploadedCourses() {
  const response = await apiClient.get(`/course/lesson/newly-uploaded`);
  return response.data;
}
export async function fetchMostViewedCourses() {
  const response = await apiClient.get(`/course/lesson/most-viewed`);
  return response.data;
}

export async function fetchUserWatchingCourses(id: string) {
  const response = await apiClient.get(`/course/lesson/user-watching?UserPersonId=${id}`);
  return response.data;
}
export async function fetchCourseDetail(id: number) {
  const response = await apiClient.get(`/lesson/get?LessonId=${id}`);
  return response.data;
}
// export async function fetchCourseVideo(id: number) {
//   const response = await apiClient.get(`/lesson/video/list?UserPersonId=${cookiesService}&LessonId=${id}`);
//   return response.data;
// }
export async function fetchCourseList() {
  const response = await apiClient.get(`/course/list`);
  return response.data;
}
export async function fetchCourseListAdmin() {
  const response = await apiClient.get(`/course/list/admin`);
  return response.data;
}
export async function fetchQuestionListAdmin() {
  const response = await apiClient.get(`/video/question/list`);
  return response.data;
}
export async function fetchSurveysResolve() {
  const response = await apiClient.get(`/lesson/surveys/list/surveys-resolve`);
  return response.data;
}
export async function fetchUploadSastifaction(request: FormData) {
  const response = await apiClient.post(`/lesson/upload-satisfaction-survey-resolve`, request);
  return response.data;
}
export async function fetchCourseVideoget(lessonId: number) {
  const response = await apiClient.get(`/lesson/video/list?LessonId=${lessonId}`);
  return response.data;
}
export async function fetchGetEvaluation(lessonId: number) {
  const response = await apiClient.get(`/lesson/evaluations/get/${lessonId}`);

  return response.data;
}
export async function fetchGetSurvey(lessonId: number) {
  const response = await apiClient.get(`/lesson/survey/get/${lessonId}`);
  return response.data;
}

export const dynamic = "force-dynamic";
