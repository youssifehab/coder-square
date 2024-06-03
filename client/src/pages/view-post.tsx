import { useParams } from "react-router-dom";

export const ViewPost = () => {
  const { id } = useParams();
  return <div>view post {id}</div>;
};
