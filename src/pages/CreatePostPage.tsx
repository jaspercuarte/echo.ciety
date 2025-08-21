import React from "react";
import CreatePost from "../components/CreatePost";

// too lazy to continue :>
const CreatePostPage: React.FC = () => {
  return (
    <div className="pt-20">
      <h2 className="text-6xl font-bold mb-6 text-center bg-clip-text text-transparent">
        Create New Post
      </h2>
      <CreatePost />
    </div>
  );
};

export default CreatePostPage;
