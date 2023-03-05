import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import { findSession } from "../lib/session";

export default function Create() {
  const navigate = useNavigate();

  document.title = "Create";

  useEffect(() => {
    if(!findSession()){
      navigate("/login")
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Editor />
    </div>
  );
}
