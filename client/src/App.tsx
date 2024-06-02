import React, { useEffect, useState } from "react";
import { Post } from "../../shared";

export const App = () => {
  const [posts, setPosts] = useState<Post[]>();
  useEffect(() => {
    fetch("http://localhost:8090/v1/posts").then((res) => {
      res.json().then((response) => setPosts(response.posts));
    });
  }, []);
  return (posts?.length || 0) > 0 ? (
    <div>{JSON.stringify(posts)}</div>
  ) : (
    <div>no posts</div>
  );
};
