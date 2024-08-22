import { useParams } from "react-router-dom";

export default function GOLine() {
  const params = useParams();

  return <div>{params.lineId}</div>;
}
