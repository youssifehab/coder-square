import { useQuery } from "react-query";
import { ListPostsResponse } from "../../../shared";
import { listPosts } from "../client";
import { PostCard } from "../components/post-card";

export const ListPosts = () => {
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
      {!!data?.posts &&
        data.posts.map((post, id) => <PostCard key={id} {...post} />)}
    </div>
  );
};
