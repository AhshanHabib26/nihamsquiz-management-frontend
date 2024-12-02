import { TQuizProps } from "@/types/common.data";
import QuizImg from "../../../../assets/images/quizImg.jpg";
import { AlarmClock, BookCheck, FileQuestion } from "lucide-react";
import { IoPricetagsOutline } from "react-icons/io5";
import ClickImg from "../../../../assets/icons/click.gif";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentToken } from "@/redux/features/auth/authSlice";

const QuizCard: React.FC<TQuizProps> = ({ quiz }) => {
  const token = useAppSelector(useCurrentToken);
  return (
    <div>
      <div className="border border-gray-300 p-3 rounded-md relative">
        <div className="flex gap-2">
          <div>
            <img src={QuizImg} className="w-[10px] rounded-md" alt="" />
          </div>
          <div>
            <div className="flex gap-1 items-start lg:items-center">
              <BookCheck className=" text-customPrimary" size={18} />
              <h1 className=" text-md hind-siliguri-semibold ">{quiz.title}</h1>
            </div>
            <div className="flex gap-1 items-center">
              <FileQuestion className=" text-customPrimary" size={18} />
              <h1>
                Question:{" "}
                {quiz?.questions?.length ? quiz?.questions?.length : 0}
              </h1>
            </div>
            <div className="flex gap-1 items-center">
              <AlarmClock className=" text-customPrimary" size={18} />
              <h1>Duration: {quiz?.duration} Minutes</h1>
            </div>
            <div className=" flex items-center justify-between">
              <div className="flex items-center gap-1">
                <IoPricetagsOutline className=" text-customPrimary" size={18} />
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
            </div>
          </div>
        </div>
        <div className=" absolute bottom-0 right-0">
          {token ? (
            <Link to={`/quiz/quiz-details/${quiz._id}`}>
              <img src={ClickImg} className="w-16" alt="" />
            </Link>
          ) : (
            <Link to="/login">
              <img src={ClickImg} className="w-16" alt="" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
