import { Link } from "react-router";
import type { Post } from "./PostList";
import { FaVoteYea } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import Tooltip from "./Tooltip";
import { useAuth } from "../context/AuthContext";

interface Props {
  post: Post;
}

const limitWords = (text: string, count: number) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > count ? words.slice(0, count).join(" ") + "..." : text;
};

const PostItem = ({ post }: Props) => {
  const { user } = useAuth();

  return (
    <div className="relative group">
      <div className="flex flex-col justify-between h-108 md:w-md w-md rounded-sm p-3 bg-slate-800/80 backdrop-blur-lg border border-slate-200/20 shadow-lg">
        <Link
          to={`/post/${post.id}`}
          className="block relative z-10 h-86 p-2 rounded-sm transition-all 
          outline-slate-200/10 hover:bg-slate-900 hover:outline-slate-200/30 outline scale-100 active:scale-95 active:bg-gray-800 duration-300 font-light"
        >
          <div>
            {/* Header: Avatar and Title */}
            <div className="flex items-center space-x-2 rounded-full outline outline-slate-200/10">
              {post.user_avatar_url ? (
                <img
                  src={post.user_avatar_url}
                  alt="User Avatar"
                  className="w-[35px] h-[35px] rounded-full object-cover outline outline-slate-200/10"
                />
              ) : (
                <div className="w-[35px] h-[35px] rounded-full bg-zinc-900 outline outline-slate-200/10" />
              )}
              <Tooltip text={"description: " + limitWords(post.content, 3)}>
                <div className="flex flex-col flex-1 font-mono italic ">
                  {/* {i will still fix this part (it register the name of the users name not the original author)} */}

                  <div>
                    user/{user?.user_metadata.user_name || user?.email}
                    {">"}
                  </div>
                </div>
              </Tooltip>
            </div>

            <div className="text-[20px] leading-[22px] font-mono mt-2">
              {post.title}
            </div>
            {/* Image Banner */}
            <div className="mt-2 flex-1">
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full rounded-sm bg-slate-500 object-cover max-h-[250px] mx-auto outline outline-slate-200/10"
              />
            </div>
          </div>
        </Link>
        <div className="flex justify-around items-center ">
          <Link
            to={`/post/${post.id}#votes`}
            className="block cursor-pointer h-10 px-1  italic p-2 rounded-sm transition-all w-[48%] outline-slate-200/10 hover:text-white hover:bg-slate-900 hover:outline-slate-200/20 outline scale-100 active:scale-95 active:bg-gray-800 duration-300 font-light"
          >
            <span className="flex items-center justify-center">
              <FaVoteYea />{" "}
              <span className="ml-2">
                {post?.like_count ?? 0}{" "}
                {post?.like_count === 1 ? "vote" : "votes"}
              </span>
            </span>
          </Link>

          <Link
            to={`/post/${post.id}#comments`}
            className="block cursor-pointer h-10 px-1  italic p-2 rounded-sm transition-all w-[48%] outline-slate-200/10 hover:text-white hover:bg-slate-900 hover:outline-slate-200/20 outline scale-100 active:scale-95 active:bg-gray-800 duration-300 font-light"
          >
            <span className="flex items-center justify-center">
              <FaRegComment />
              <span className="ml-2">{post.comment_count ?? 0} comments</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
