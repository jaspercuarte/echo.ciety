import { useParams } from "react-router";
import CommunityDisplay from "../components/CommunityDisplay";

const CommunityPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="pt-4 pb-16 px-16">
      <CommunityDisplay communityId={Number(id)} />
    </div>
  );
};

export default CommunityPage;
