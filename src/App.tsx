import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import CreatePostPage from "./pages/CreatePostPage";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-gray-100 transition-opacity duration-700 pt-20">
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePostPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
