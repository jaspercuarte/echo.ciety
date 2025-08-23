import { type ChangeEvent, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import supabase from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import { type Community, fetchCommunities } from "./CommunityList";
import { FaUpload } from "react-icons/fa";

interface PostInput {
  title: string;
  content: string;
  user_avatar_url: string | null;
  community_id?: number | null;
}

const createPost = async (post: PostInput, imageFile: File) => {
  const filePath = `${post.title}-${Date.now()}-${imageFile.name}`;

  const { error: uploadError } = await supabase.storage
    .from("post-images")
    .upload(filePath, imageFile);

  if (uploadError) throw new Error(uploadError.message);

  const { data: publicURLData } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  const { data, error } = await supabase
    .from("posts")
    .insert({ ...post, image_url: publicURLData.publicUrl });

  if (error) throw new Error(error.message);

  return data;
};

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [communityId, setCommunityId] = useState<number | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { user } = useAuth();

  const { data: communities } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: { post: PostInput; imageFile: File }) => {
      return createPost(data.post, data.imageFile);
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    if (!selectedFile) return;
    mutate({
      post: {
        title,
        content,
        user_avatar_url: user?.user_metadata.avatar_url || null,
        community_id: communityId,
      },
      imageFile: selectedFile,
    });
  };

  const handleCommunityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCommunityId(value ? Number(value) : null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="font-mono max-w-2xl mx-auto space-y-4"
    >
      <div>
        <label htmlFor="title" className="block mb-2 text-lg font-semibold">
          title
        </label>
        <input
          type="text"
          id="title"
          placeholder="add_your_title_here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-slate-100/20 bg-transparent p-2 rounded-sm transition-all duration-300 focus:bg-slate-600"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block mb-2 text-lg font-semibold">
          content
        </label>
        <textarea
          id="content"
          value={content}
          placeholder="add_your_post_content_here"
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded-sm transition-all duration-300 focus:bg-slate-600"
          rows={5}
          required
        />
      </div>

      <div>
        <label className="block mb-2 text-lg font-semibold">
          selectCommunity
        </label>
        <select
          id="community"
          onChange={handleCommunityChange}
          className="w-full border border-white/10 bg-transparent p-2 rounded-sm transition-all duration-300 focus:bg-slate-600"
        >
          <option value={""}>choose_a_community</option>
          {communities?.map((community, key) => (
            <option key={key} value={community.id}>
              {community.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="image" className="block mb-2 text-lg font-semibold">
          uploadImage
        </label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex items-center gap-3">
          <label
            htmlFor="image"
            className="flex gap-2 items-center border border-white/10 bg-transparent p-3 rounded-sm transition-all duration-300 active:bg-slate-600"
          >
            <FaUpload />
            choose_file
          </label>
          <span className="text-sm text-gray-300">
            uploaded_file: {selectedFile ? selectedFile.name : "no_file_chosen"}
          </span>
        </div>
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 rounded-sm text-base font-medium bg-slate-900 outline-slate-200 outline scale-100 active:scale-95 active:bg-gray-800 transition-all duration-300 cursor-pointer"
      >
        {isPending ? "Creating..." : "CREATE POST"}
      </button>

      {isError && <p className="text-red-500"> Error creating post.</p>}
    </form>
  );
};

export default CreatePost;
