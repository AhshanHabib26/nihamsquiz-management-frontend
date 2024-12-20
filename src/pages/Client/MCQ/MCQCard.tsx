import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { FaQuestion } from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import { IMCQProps } from "@/types/common.data";
import { MathJax } from "better-react-mathjax";

export const MCQCard: React.FC<IMCQProps> = ({ mcq, isActive, toggleShowDetails }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  // Reset showAnswer state when isActive changes
  useEffect(() => {
    if (!isActive) {
      setShowAnswer(false);
    }
  }, [isActive]);

  return (
    <div className="border border-gray-800 p-3 rounded-lg mb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <FaQuestion color="red" />
          <p
            className="text-lg font-light cursor-pointer hover:text-TextPrimary"
            onClick={toggleShowDetails}
          >
            <MathJax inline>{mcq?.questions?.questionText}</MathJax>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isActive ? (
            <Eye onClick={toggleShowDetails} size={20} className="cursor-pointer" />
          ) : (
            <EyeOff onClick={toggleShowDetails} size={20} className="cursor-pointer" />
          )}
        </div>
      </div>

      {/* Conditionally render question details if isActive is true */}
      {isActive && (
        <div>
          <Separator className="my-3 bg-gray-800" />
          <ul>
            {mcq?.questions?.options?.map((option, index) => (
              <li key={index}>
                <label className="text-lg font-light">
                  <input
                    className="mr-2"
                    type="radio"
                    name="mcq-option"
                    value={option}
                    checked={
                      showAnswer && option === mcq?.questions?.correctOption
                    }
                    readOnly
                  />
                  <MathJax inline>{option}</MathJax>
                </label>
              </li>
            ))}
          </ul>

          {/* Button with icons to toggle answer visibility */}

          <div className=" flex items-end justify-end">
            <button
              className=" flex mt-3 items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setShowAnswer((prev) => !prev)}
            >
              {showAnswer ? (
                <>
                  <EyeOff size={20} />
                  Hide Answer
                </>
              ) : (
                <>
                  <Eye size={20} />
                  Show Answer
                </>
              )}
            </button>
          </div>
          {/* Conditionally render answer and explanation */}
          {showAnswer && (
            <>
              <Separator className=" my-3 bg-gray-800" />
              <p className="text-green-600">
                <strong>Correct Answer:</strong>{" "}
                <MathJax inline>{mcq?.questions?.correctOption}</MathJax>
              </p>
              <p className="text-gray-400">
                <strong>Explanation:</strong>{" "}
                {mcq?.questions?.explanation ? (
                  <MathJax inline>{mcq?.questions?.explanation}</MathJax>
                ) : (
                  "No explanation available."
                )}
              </p>

            </>
          )}
        </div>
      )}
    </div>
  );
};
