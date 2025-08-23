import PostList from "../components/PostList";

const Home = () => {
  return (
    <div className="pt-4 pb-16 md:px-16">
      <h2 className="font-mono text-3xl font-semibold italic mb-3 md:mb-1">
        {">> recent_posts"}
      </h2>
      <div>
        <PostList />
      </div>
    </div>
  );
};

export default Home;
