import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/404";
import Create from "./pages/create";
import Edit from "./pages/edit";
import Home from "./pages/home";
import Login from "./pages/login";
import PostContent from "./pages/postContent";
import Register from "./pages/register";
import UserProfile from "./pages/userProfile";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addDefaultLocale(en);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:username" element={<UserProfile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:postId" element={<Edit />} />
        <Route path="/posts/:postId" element={<PostContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
