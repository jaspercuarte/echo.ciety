import { useQuery } from "@tanstack/react-query";
import type { Post } from "./PostList";
import supabase from "../supabase-client";
import PostItem from "./PostItem";

interface Props {
  communityId: number;
}

interface PostWithCommunity extends Post {
  communities: {
    name: string;
  };
}

export const fetchCommunityPost = async (
  communityId: number
): Promise<PostWithCommunity[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*, communities(name)")
    .eq("community_id", communityId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as PostWithCommunity[];
};

const CommunityDisplay = ({ communityId }: Props) => {
  const { data, error, isLoading } = useQuery<PostWithCommunity[], Error>({
    queryKey: ["communityPost", communityId],
    queryFn: () => fetchCommunityPost(communityId),
  });

  if (isLoading)
    return <div className="text-center py-4">Loading communities...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-4">
        Error: {error.message}
      </div>
    );
  return (
    <div className="pb-16">
      <h2 className="font-mono text-3xl font-semibold italic mb-3 md:mb-1">
        {">> community_posts "}
        {data?.[0]?.communities?.name && (
          <span className="text-blue-400">[{data[0].communities.name}]</span>
        )}
      </h2>

      {data && data.length > 0 ? (
        <div className="flex flex-wrap gap-6 justify-center mt-8">
          {data.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">
          No posts in this community yet.
        </p>
      )}
    </div>
  );
};

export default CommunityDisplay;
