import { TUserProps } from "@/types/user.type";


const StatCard: React.FC<{ value: number; label: string }> = ({
  value,
  label,
}) => (
  <div className="border border-gray-300 flex items-center justify-center flex-col p-8 rounded-lg text-gray-700">
    <h1 className="text-3xl">{value}</h1>
    <p className="text-lg font-medium capitalize">{label}</p>
  </div>
);

const UHomeCard: React.FC<TUserProps> = ({ user }) => {
  const quizzesAttempted = user?.quizzesAttempted || 0;
  const commentsCount = user?.comments?.length || 0;
  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;

  return (
    <div className="my-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard value={quizzesAttempted} label="Quiz Attempted" />
      <StatCard value={commentsCount} label="Comments" />
      <StatCard value={followersCount} label="Followers" />
      <StatCard value={followingCount} label="Following" />
    </div>
  );
};

export default UHomeCard;
