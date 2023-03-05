import Editor from "../components/Editor";
import Navbar from "../components/Navbar";

export default function Create() {
  document.title = "Create";
  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Editor />
    </div>
  );
}
