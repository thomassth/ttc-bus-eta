import { SubwayClosureJson } from "../../../models/etaJson.js";

export const SubwayClosureItem = ({
  closure,
}: {
  closure: SubwayClosureJson;
}) => {
  return (
    <li>
      <h3>{closure.line}</h3>
      <p>{closure.text}</p>
    </li>
  );
};
