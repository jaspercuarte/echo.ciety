import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import supabase from "../supabase-client";
import { useAuth } from "../context/AuthContext";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from "react-icons/fa";
import ScrollToHashElement from "./ScrollToHashElement";

interface Props {
  postId: number;
}

interface Vote {
  id: number;
  post_id: number;
  user_id: string;
  vote: number;
}

const vote = async (voteValue: number, postId: number, userId: string) => {
  const { data: existingVote } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle();

  if (existingVote) {
    // Liked -> 0, Like -> -1
    if (existingVote.vote === voteValue) {
      const { error } = await supabase
        .from("votes")
        .delete()
        .eq("id", existingVote.id);

      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase
        .from("votes")
        .update({ vote: voteValue })
        .eq("id", existingVote.id);

      if (error) throw new Error(error.message);
    }
  } else {
    const { error } = await supabase
      .from("votes")
      .insert({ post_id: postId, user_id: userId, vote: voteValue });
    if (error) throw new Error(error.message);
  }
};

const fetchVotes = async (postId: number): Promise<Vote[]> => {
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .eq("post_id", postId);

  if (error) throw new Error(error.message);
  return data as Vote[];
};

const LikeButton = ({ postId }: Props) => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const {
    data: votes,
    isLoading,
    error,
  } = useQuery<Vote[], Error>({
    queryKey: ["votes", postId],
    queryFn: () => fetchVotes(postId),
    refetchInterval: 5000,
  });

  const { mutate } = useMutation({
    mutationFn: (voteValue: number) => {
      if (!user) throw new Error("You must be logged in to Vote!");
      return vote(voteValue, postId, user.id);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["votes", postId] });
    },
  });

  if (isLoading) {
    return <div> Loading votes...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  const likes = votes?.filter((v) => v.vote === 1).length || 0;
  const dislikes = votes?.filter((v) => v.vote === -1).length || 0;
  const userVote = votes?.find((v) => v.user_id === user?.id)?.vote;

  return (
    <>
      {" "}
      <ScrollToHashElement />
      <div className="flex items-center space-x-4 my-4" id="votes">
        <button
          onClick={() => mutate(1)}
          className={`flex items-center justify-center outline gap-1 h-16 w-16 cursor-pointer rounded-full active:scale-110 transition-all duration-200 hover:bg-slate-600 ${
            userVote === 1
              ? "outline-slate-200 text-slate-200"
              : "text-slate-200/50 outline-slate-200/50"
          }`}
        >
          {userVote === 1 ? <FaThumbsUp /> : <FaRegThumbsUp />} {likes}
        </button>
        <button
          onClick={() => mutate(-1)}
          className={`flex items-center justify-center outline gap-1 h-16 w-16 cursor-pointer rounded-full active:scale-110 transition-all duration-200 hover:bg-slate-600 ${
            userVote === 1
              ? "text-slate-200/50 outline-slate-200/50"
              : "outline-slate-200 text-slate-200"
          }`}
        >
          {userVote === 1 ? <FaRegThumbsDown /> : <FaThumbsDown />} {dislikes}
        </button>
      </div>
    </>
  );
};

export default LikeButton;
