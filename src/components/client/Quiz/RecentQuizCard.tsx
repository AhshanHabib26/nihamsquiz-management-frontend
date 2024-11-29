import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import newImg from "../../../assets/icons/newLabel.png";
import { isNewBlog } from "@/lib/isNew";
import { TQuizProps } from "@/types/common.data";

interface Props extends TQuizProps {
  isLast?: boolean;
}

const RecentQuizCard: React.FC<Props> = ({ quiz, isLast }) => {
  return (
    <div
      className={`text-gray-300 ${
        isLast ? "" : "border-b border-gray-800 border-dashed"
      }`}
    >
      <Link to={`/quiz/quiz-details/${quiz._id}`}>
        <div className="flex items-center justify-between">
          <h1 className="my-1 text-[17px] hind-siliguri-light hover:text-myBgPrimary">
            {quiz.title}
          </h1>
          <div>
            {quiz?.createdAt && (
              <div>
                {isNewBlog(quiz.createdAt) ? (
                  <div>
                    <img className="w-[35px]" src={newImg} alt="New Post" />
                  </div>
                ) : (
                  <div>
                    <FaAngleRight className="text-gray-300" size={15} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecentQuizCard;
