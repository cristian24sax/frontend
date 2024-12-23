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

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta:", errorText);
    
    if (response.status === 401) {

      return await 401;
    }
  }

  try {
    return await response.json();
  } catch (err) {
    const rawResponse = await response.text();
    console.error("Respuesta no es un JSON válido:", rawResponse);
    throw new Error("La respuesta no es un JSON válido");
  }
}


export async function fetchMostViewedCourses() {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/most-viewed`, headersFetch);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta:", errorText);

    if (response.status === 401) {
      return 401;
    }
  }

  try {
    return await response.json();
  } catch (err) {
    const rawResponse = await response.text();
    console.error("Respuesta no es un JSON válido:", rawResponse);
    throw new Error("La respuesta no es un JSON válido");
  }
}

export async function fetchUserWatchingCourses() {
  const { id } = cookiesService();
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/lesson/user-watching?UserPersonId=${id}`, headersFetch);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta:", errorText);

    if (response.status === 401) {
      return 401;
    }
  }

  try {
    return await response.json();
  } catch (err) {
    const rawResponse = await response.text();
    console.error("Respuesta no es un JSON válido:", rawResponse);
    throw new Error("La respuesta no es un JSON válido");
  }
}

export async function fetchCourseDetail(id: number) {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/get?LessonId=${id}`, headersFetch);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta:", errorText);

    if (response.status === 401) {
      return 401 ;  // Retorna un objeto con el código de estado 401
    }
  }

  try {
    return await response.json();
  } catch (err) {
    const rawResponse = await response.text();
    console.error("Respuesta no es un JSON válido:", rawResponse);
    throw new Error("La respuesta no es un JSON válido");
  }
}

export async function fetchCourseVideo(id: number) {
  const headersFetch = headers();
  const { id: idUser } = cookiesService();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/video/list?UserPersonId=${idUser}&LessonId=${id}`, headersFetch);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta:", errorText);

    if (response.status === 401) {
      return 401;
    }
  }

  try {
    return await response.json();
  } catch (err) {
    const rawResponse = await response.text();
    console.error("Respuesta no es un JSON válido:", rawResponse);
    throw new Error("La respuesta no es un JSON válido");
  }
}

export async function fetchCourseList() {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/list`, headersFetch);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta:", errorText);

    if (response.status === 401) {
      return 401;
    }
  }

  try {
    return await response.json();
  } catch (err) {
    const rawResponse = await response.text();
    console.error("Respuesta no es un JSON válido:", rawResponse);
    throw new Error("La respuesta no es un JSON válido");
  }
}

export async function fetchCourseListAdmin() {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/course/list/admin`, headersFetch);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error en la respuesta:", errorText);

    if (response.status === 401) {
      return 401;
    }
  }

  try {
    return await response.json();
  } catch (err) {
    const rawResponse = await response.text();
    console.error("Respuesta no es un JSON válido:", rawResponse);
    throw new Error("La respuesta no es un JSON válido");
  }
}

export async function fetchQuestionListAdmin() {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/video/question/list`, headersFetch);
  return response.json();
}
export async function fetchSurveysResolve() {
  const headersFetch = headers();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/lesson/surveys/list/surveys-resolve`, headersFetch);
  return response.json();
}

export const dynamic = 'force-dynamic';
