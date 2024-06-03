import { useQuery } from "react-query";
import { ListPostsResponse } from "../../shared";
import { listPosts } from "./client";

export const App = () => {
  const { data, error, isLoading } = useQuery<ListPostsResponse>(
    ["list-posts"],
    listPosts
  );
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>error in Loading posts</div>;
  }

  return (
    <div>
      posts:
      {<div>{JSON.stringify(data)}</div>}
    </div>
  );
};
