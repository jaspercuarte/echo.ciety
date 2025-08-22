import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import supabase from "../supabase-client";

interface CommunityInput {
  name: string;
  description: string;
}
const createCommunity = async (community: CommunityInput) => {
  const { error, data } = await supabase.from("communities").insert(community);

  if (error) throw new Error(error.message);
  return data;
};

const CreateCommunity = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createCommunity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communities"] });
      navigate("/communities");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ name, description });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="font-mono max-w-2xl mx-auto space-y-4"
    >
      <div>
        <label htmlFor="name" className="block mb-2 text-lg font-semibold">
          communityName
        </label>
        <input
          type="text"
          id="name"
          placeholder="add_your_community_name_here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-slate-100/20 bg-transparent p-2 rounded-sm transition-all duration-300 focus:bg-slate-600"
          required
        />
      </div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-lg font-semibold"
        >
          communityDescription
        </label>
        <textarea
          id="description"
          value={description}
          placeholder="add_your_community_description_here"
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-white/10 bg-transparent p-2 rounded-sm transition-all duration-300 focus:bg-slate-600"
          rows={8}
        />
      </div>
      <button
        type="submit"
        className="w-full px-3 py-2 rounded-sm text-base font-medium bg-slate-900 outline-slate-200 outline scale-100 active:scale-95 active:bg-gray-800 transition-all duration-300 cursor-pointer"
      >
        {isPending ? "Creating..." : "CREATE COMMUNITY"}
      </button>
      {isError && <p className="text-red-500">Error creating community.</p>}
    </form>
  );
};

export default CreateCommunity;
