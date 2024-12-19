import React from "react";
import { Eye, EyeOff, SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaQuestion } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { IMCQProps } from "@/types/common.data";
import { MathJax } from "better-react-mathjax";

export const MCQCard: React.FC<IMCQProps> = ({ mcq, deleteHandler, isActive, toggleShowDetails }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/dashboard/create-mcq/${mcq?._id}`);
  };

  return (
    <div className=" border p-3 rounded-lg mb-2">
      <div className="flex justify-between items-center">
        <div className=" flex items-center gap-1">
          <FaQuestion color="red" />
          <p className=" cursor-pointer hover:text-TextPrimary" onClick={toggleShowDetails}>
            <MathJax inline>{mcq?.questions?.questionText}</MathJax>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {
            isActive ? <Eye onClick={toggleShowDetails} size={20} className="cursor-pointer" /> : <EyeOff className=" cursor-pointer" onClick={toggleShowDetails} size={20} />
          }
          <SquarePen
            onClick={handleEdit}
            size={20}
            className=" cursor-pointer"
          />
          <Trash2
            onClick={() => {
              if (deleteHandler) {
                deleteHandler(mcq?._id);
              }
            }}
            size={20}
            className="cursor-pointer"
          />
        </div>
      </div>
      {/* Conditionally render answer details if isActive is true */}
      {isActive && (
        <div>
          <Separator className="my-3" />
          <ul>
            {mcq?.questions?.options?.map((option, index) => (
              <li key={index}>
                <label>
                  <input
                    className="mr-2"
                    type="radio"
                    name="mcq-option"
                    value={option}
                    checked={mcq?.questions?.correctOption ? mcq?.questions?.correctOption === option : false}
                  />
                  <MathJax inline>{option}</MathJax>
                </label>
              </li>
            ))}
          </ul>
          <p className=" text-green-600"><strong>Correct Answer:</strong> <MathJax inline>{mcq?.questions?.correctOption}</MathJax> </p>
          <p className="text-gray-700"><strong>Explanation:</strong> <MathJax inline>{mcq?.questions?.explanation}</MathJax> </p>
        </div>
      )}
    </div>
  );
};
