import CommunityList from "../components/CommunityList";

const CommunitiesPage = () => {
  return (
    <div className="pt-4 pb-16 md:px-20">
      <div className="p-8 rounded-sm bg-slate-800/80 backdrop-blur-lg border-y md:border border-slate-200 shadow-lg">
        <h2 className="font-mono text-3xl font-semibold italic mb-3 md:mb-1">
          {">> dir"}
        </h2>
        <CommunityList />
      </div>
    </div>
  );
};

export default CommunitiesPage;
