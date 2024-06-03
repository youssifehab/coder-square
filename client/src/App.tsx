import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListPosts } from "./pages/list-posts";
import { ViewPost } from "./pages/view-post";
import { NavBar } from "./components/navbar";

export const App = () => {
  return (
    <>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPosts />} />
          <Route path="/p/:id" element={<ViewPost />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
