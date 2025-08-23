import { useParams } from "react-router";
import PostDetail from "../components/PostDetail";

const PostPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-4 pb-16 px-4 md:px-16">
      <div className="flex flex-wrap gap-6 justify-center mt-16">
        <PostDetail postId={Number(id)} />
      </div>
    </div>
  );
};

export default PostPage;
