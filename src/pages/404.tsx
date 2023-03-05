import Navbar from "../components/Navbar";

export default function NotFound() {
    document.title = "Not Found"
    return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />
        <main className="flex place-content-center">
            <div className="mt-[16%] font-medium text-2xl">
                404 | Not Found
            </div>
        </main>
      </div>
    );
  }