import { fetchQuestionListAdmin } from "../services";
import TableVideoComponent from "../uploadVideo/tableVideo";
import TableQuestionComponent from "./TableQuestion";

export default async function Component() {
  const { data } = await fetchQuestionListAdmin();
  return <TableQuestionComponent data={data} />;
}
