import { Link } from "react-router";
import type { Post } from "./PostList";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

interface Props {
  post: Post;
}

const PostItem = ({ post }: Props) => {
  return (
    <div className="relative group">
      <div className="flex flex-col justify-between h-96 md:w-md w-lg rounded-sm p-3 bg-slate-800/80 backdrop-blur-lg border border-slate-200/20 shadow-lg">
        <Link
          to={`/post/${post.id}`}
          className="block relative z-10 h-78 p-2 rounded-sm transition-all 
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
              <div className="flex flex-col flex-1">
                <div className="text-[20px] leading-[22px] font-mono mt-2">
                  {post.title}
                </div>
              </div>
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
          <span
            className="cursor-pointer h-10 px-1 flex items-center justify-center italic p-2 rounded-sm transition-all w-[48%] 
          outline-slate-200/20 hover:text-white hover:bg-slate-900 hover:outline-slate-200/20 outline scale-100 active:scale-95 active:bg-gray-800 duration-300 font-light"
          >
            <FaRegThumbsUp />{" "}
            <span className="ml-2">{post.like_count ?? 0} likes</span>
          </span>
          <div className="cursor-pointer h-10 px-1  italic p-2 rounded-sm transition-all w-[48%] outline-slate-200/10 hover:text-white hover:bg-slate-900 hover:outline-slate-200/20 outline scale-100 active:scale-95 active:bg-gray-800 duration-300 font-light">
            <Link to={`/post/${post.id}#comments`}>
              <span className="flex items-center justify-center">
                <FaRegComment />
                <span className="ml-2">{post.comment_count ?? 0} comments</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
