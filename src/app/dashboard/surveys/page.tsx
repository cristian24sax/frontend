import { fetchSurveysResolve } from "../services";
import TableSurveysComponent from "./tableSurveysResolve";

export default async function Component() {
  const { data } = await fetchSurveysResolve();
  return <TableSurveysComponent data={data} />;
}
