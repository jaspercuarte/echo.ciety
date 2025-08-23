import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import supabase from "../supabase-client";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { useAuth } from "../context/AuthContext";

interface Props {
  postId: number;
}

const fetchPostById = async (id: number): Promise<Post> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as Post;
};

const PostDetail = ({ postId }: Props) => {
  const { data, error, isLoading } = useQuery<Post, Error>({
    queryKey: ["post", postId],
    queryFn: () => fetchPostById(postId),
  });

  if (isLoading) {
    return <div> Loading posts...</div>;
  }

  if (error) {
    return <div> Error: {error.message}</div>;
  }

  return (
    <div className="font-mono space-y-6">
      <h2 className="text-3xl font-semibold italic mb-3 md:mb-1">
        {">> post_details "}
        {data?.title && <span className="text-blue-400">[{data.title}]</span>}
      </h2>

      {/* {i will still fix this part (it register the name of the users name not the original author)} */}
      <div className="italic">
        user/{data?.user_username}
        {">"}
      </div>
      {data?.image_url && (
        <div className="md-p-10">
          <img
            src={data.image_url}
            alt={data?.title}
            className="mt-4 rounded object-cover w-full h-full"
          />
        </div>
      )}
      <p className="text-gray-400">{data?.content}</p>
      <p className="text-gray-500 text-sm">
        posted_on: {new Date(data!.created_at).toLocaleDateString()}
      </p>

      <LikeButton postId={postId} />
      <CommentSection postId={postId} />
    </div>
  );
};

export default PostDetail;
