import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function headers() {
  const { token } = cookiesService();

  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
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

async function fetchWithInterceptor(url: any, options?: any) {
  const { token } = cookiesService();

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    ...options?.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      console.error("No autorizado, limpiando sesión y redirigiendo al login...");
      redirect("/auth/login");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en la respuesta: ${errorText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error en la solicitud:", error.message);
    throw error;
  }
}

export async function fetchNewlyUploadedCourses() {
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/newly-uploaded`);
}

export async function fetchMostViewedCourses() {
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/most-viewed`);
}

export async function fetchUserWatchingCourses() {
  const { id } = cookiesService();
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/user-watching?UserPersonId=${id}`);
}

export async function fetchCourseDetail(id: number) {
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/get?LessonId=${id}`);
}

export async function fetchCourseVideo(id: number) {
  const { id: idUser } = cookiesService();
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/video/list?UserPersonId=${idUser}&LessonId=${id}`);
}

export async function fetchCourseList() {
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/list`);
}

export async function fetchCourseListAdmin() {
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/list/admin`);
}

export async function fetchQuestionListAdmin() {
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/question/list`);
}
export async function fetchSurveysResolve() {
  return fetchWithInterceptor(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/surveys/list/surveys-resolve`);
}

