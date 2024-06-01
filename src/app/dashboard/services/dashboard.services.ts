import { cookies } from "next/headers";
function headers() {
  const { token } = cookiesService();

  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}
`,
      "Content-Type": "application/json",
    },
  };
}
function cookiesService() {
  const cookiesList = cookies();
  const token = cookiesList.get("token")?.value;
  const id = cookiesList.get("idUser")?.value;
  return { token, id };
}
export async function fetchNewlyUploadedCourses() {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/newly-uploaded`, headersFetch);
  return response.json();
}
export async function fetchMostViewedCourses() {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/most-viewed`, headersFetch);
  return response.json();
}

export async function fetchUserWatchingCourses() {
  const { id } = cookiesService();
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/user-watching?UserPersonId=${id}`, headersFetch);
  return response.json();
}
