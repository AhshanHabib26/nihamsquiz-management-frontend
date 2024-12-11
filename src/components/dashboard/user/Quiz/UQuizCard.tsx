import { TProgressProps } from "@/types/common.data";

const StatCard: React.FC<{ value: number; label: string; bg: string }> = ({
  value,
  label,
  bg,
}) => (
  <div
    className={`${bg} flex items-center justify-center flex-col p-4 lg:p-8 rounded-lg text-gray-700`}
  >
    <h1 className="text-2xl">{value}</h1>
    <p className="text-lg font-medium capitalize">{label}</p>
  </div>
);

const UQuizCard: React.FC<TProgressProps> = ({ progress }) => {
  const totalMarks = progress?.totalMarks || 0;
  const totalQuizzes = progress?.totalQuizzes || 0;
  const totalCorrectAnswers = progress?.totalCorrectAnswers || 0;
  const totalWrongAnswers = progress?.totalWrongAnswers || 0;


  console.log(progress)

  return (
    <div className="my-5 grid grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard value={totalMarks} label="Total Marks" bg="bg-green-300" />
      <StatCard
        value={totalQuizzes}
        label="Quizs Attempted"
        bg="bg-orange-300"
      />
      <StatCard
        value={totalCorrectAnswers}
        label="Correct Answer"
        bg="bg-gray-300"
      />
      <StatCard
        value={totalWrongAnswers}
        label="Wrong Answer"
        bg="bg-red-300"
      />
    </div>
  );
};

export default UQuizCard;
