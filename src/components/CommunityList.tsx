import { useQuery } from "@tanstack/react-query";
import supabase from "../supabase-client";
import { Link } from "react-router";

export interface Community {
  id: number;
  name: string;
  description: string;
  created_at: string;
}
export const fetchCommunities = async (): Promise<Community[]> => {
  const { data, error } = await supabase
    .from("communities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data as Community[];
};

const CommunityList = () => {
  const { data, error, isLoading } = useQuery<Community[], Error>({
    queryKey: ["communities"],
    queryFn: fetchCommunities,
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
    <div className="max-w-5xl mx-auto space-y-4 mt-12">
      {data?.map((community) => (
        <div key={community.id} className="mb-8">
          <Link
            to={`/community/${community.id}`}
            className="text-2xl font-bold"
          >
            <div className="w-full px-3 py-2 rounded-sm text-2xl font-semibold bg-slate-900 outline-slate-200 outline scale-100 active:scale-95 active:bg-gray-800 transition-all duration-300 cursor-pointer font-mono">
              community: {community.name}
              <p className="text-gray-400 text-lg italic ml-3 mt-2">
                {community.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CommunityList;
