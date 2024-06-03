import { ListPostsRequest, ListPostsResponse } from "../../shared";

const HOST = "http://localhost:8090";

export const listPosts = async (
  req: ListPostsRequest
): Promise<ListPostsResponse> => {
  const res = await fetch(`${HOST}/v1/posts`);
  if (!res.ok) {
    const { error } = await res.json();
    throw error;
  }
  return res.json().then((response) => {
    console.log(response.posts);
    return response.posts;
  });
};
