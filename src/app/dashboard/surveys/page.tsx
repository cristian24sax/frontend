// import { fetchSurveysResolve } from "../services";
import { fetchSurveysResolve } from "@/modules/dashboard/service/dashboard.service";
import TableSurveysComponent from "./tableSurveysResolve";

export default async function Component() {
  const { data } = await fetchSurveysResolve();
  return <TableSurveysComponent data={data} />;
}
