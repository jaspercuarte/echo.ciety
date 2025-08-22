import CreateCommunity from "../components/CreateCommunity";

const CreateCommunityPage = () => {
  return (
    <div className="md:px-24 md:py-2">
      <div className="p-8 rounded-sm bg-slate-800/80 backdrop-blur-lg border-y md:border border-slate-200 shadow-lg">
        <h2 className="font-mono text-3xl font-semibold italic mb-3 md:mb-1">
          {">> mkdir"}
        </h2>

        <CreateCommunity />
      </div>
    </div>
  );
};

export default CreateCommunityPage;
