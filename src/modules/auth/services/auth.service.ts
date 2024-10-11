import apiClient from "@/app/api/apliclient";

export async function authLogin(request: { email: string; password: string }) {
  const response = await apiClient.post("/auth/login", request);
  return response.data;
}
export async function authRecover(email: string) {
  const response = await apiClient.post(`/auth/recoverypwd?Email=${email}`, {});
  return response.data;
}
