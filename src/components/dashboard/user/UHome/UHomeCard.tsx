import { TUserProps } from "@/types/user.type";

const StatCard: React.FC<{ value: number; label: string; bg: string }> = ({
  value,
  label,
  bg,
}) => (
  <div
    className={`${bg} flex items-center justify-center flex-col p-8 rounded-lg text-gray-700`}
  >
    <h1 className="text-3xl">{value}</h1>
    <p className="text-lg font-medium capitalize">{label}</p>
  </div>
);

const UHomeCard: React.FC<TUserProps> = ({ user }) => {
  const availablePoints = user?.totalPoints || 0;
  const quizzesAttempted = user?.quizzesAttempted || 0;
  const commentsCount = user?.comments?.length || 0;
  const followersCount = user?.followers?.length || 0;
  const followingCount = user?.following?.length || 0;

  return (
    <div className="my-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        value={availablePoints}
        label="Total Points"
        bg=" bg-green-100"
      />
      <StatCard
        value={quizzesAttempted}
        label="Quiz Attempted"
        bg="bg-orange-100"
      />
      <StatCard value={commentsCount} label="Comments" bg="bg-gray-100" />
      <StatCard value={followersCount} label="Followers" bg="bg-yellow-100" />
      <StatCard value={followingCount} label="Following" bg="bg-red-100" />
    </div>
  );
};

export default UHomeCard;
