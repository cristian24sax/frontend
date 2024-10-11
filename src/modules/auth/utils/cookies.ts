import { cookies } from "next/headers";
export function cookiesService(): string {
  const cookiesList = cookies();
  const id = cookiesList.get("idUser")?.value;
  return id || "";
}
