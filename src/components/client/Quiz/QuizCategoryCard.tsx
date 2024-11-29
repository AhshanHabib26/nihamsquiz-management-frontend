import { TQuizCategoryProps } from "@/types/common.data";
import { useState } from "react";
import { Link } from "react-router-dom";

const bgColor = [
  "bg-red-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-gray-100",
  "bg-orange-100",
  "bg-blue-100",
  "bg-teal-100",
  "bg-pink-100",
  "bg-purple-100",
];

const bgHoverColor = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-gray-500",
  "bg-orange-500",
  "bg-blue-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-purple-500",
];

const QuizCategoryCard: React.FC<TQuizCategoryProps> = ({
  category,
  index,
}) => {
  const [hovered, setHovered] = useState(false);
  const bgColorIndex = (index ?? 0) % bgColor.length;
  const bgHoverColorIndex = (index ?? 0) % bgHoverColor.length;

  return (
    <div>
      <Link to={`/quiz/category/${category.name}`}>
        <div
          className={`flex items-center justify-between p-4 poppins-regular rounded-lg cursor-pointer ${
            hovered ? bgHoverColor[bgHoverColorIndex] : bgColor[bgColorIndex]
          }`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            className="w-[30px] h-[30px]"
            src={category.imageUrl}
            alt={category.name}
          />{" "}
          <h1
            className={`text-lg ${hovered ? "text-white" : "text-[#001D25]"}`}
          >
            {category.name}
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default QuizCategoryCard;
