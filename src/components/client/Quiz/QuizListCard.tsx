import { TQuizProps } from "@/types/common.data";
import QuizImg from "../../../assets/images/quizImg.jpg";
import {
  AlarmClock,
  BookCheck,
  FileQuestion,
  Gem,
  Layers3,
  SquareBottomDashedScissors,
} from "lucide-react";
import { IoPricetagsOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const UQuizListCard: React.FC<TQuizProps> = ({ quiz }) => {
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!token) {
      navigate("/login");
    }
  };
  return (
    <div onClick={handleClick}>
      {" "}
      <Link to={token ? `/quiz/quiz-details/${quiz._id}` : "#"}>
        {" "}
        <div className="border border-gray-800 shadow hover:shadow-xl p-3 mb-3 rounded-md relative">
          <div className="flex gap-2">
            <div>
              <img
                src={QuizImg}
                className="w-[140px] hidden md:block lg:block rounded-md"
                alt=""
              />
            </div>
            <div className=" w-full">
              <div className="flex gap-1 items-start lg:items-center">
                <BookCheck className=" text-gray-300" size={18} />
                <h1 className=" text-gray-300 hover:text-TextPrimary text-md hind-siliguri-semibold">
                  {quiz?.title}
                </h1>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                  <FileQuestion className=" text-gray-300" size={18} />
                  <h1 className="text-gray-300">
                    Question:{" "}
                    {quiz?.questions?.length ? quiz?.questions?.length : 0}
                  </h1>
                </div>
                <div className="flex gap-1 items-center">
                  <AlarmClock className=" text-gray-300" size={18} />
                  <h1 className="text-gray-300">
                    Duration: {quiz?.duration} Minutes
                  </h1>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <IoPricetagsOutline className=" text-gray-300" size={18} />
                  <p
                    className={`text-md hind-siliguri-light ${
                      quiz.difficultyLevel === "Easy"
                        ? "text-orange-500"
                        : quiz.difficultyLevel === "Medium"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {quiz.difficultyLevel}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <SquareBottomDashedScissors
                    className=" text-gray-300"
                    size={18}
                  />
                  <p className="text-red-500">
                    Error Penalty: {quiz.penaltyPerIncorrectAnswer}
                  </p>
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <Gem className=" text-gray-300" size={18} />
                <h1 className="text-gray-300">
                  Points Required: {quiz?.pointsRequired}
                </h1>
              </div>
              <div className="flex gap-1 items-center">
                <Layers3 className=" text-gray-300" size={18} />
                <div className="flex items-center flex-wrap gap-1">
                  {quiz?.tags?.map((t: string, index: number) => (
                    <div
                      key={index}
                      className="border-[0.5px] border-dashed px-3 py-[2px] text-sm border-gray-700 rounded-sm hover:text-TextPrimary hover:border-blue-700 cursor-pointer"
                    >
                      <p className="hind-siliguri-light">{t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UQuizListCard;
