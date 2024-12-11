import { Separator } from "@/components/ui/separator";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetUserQuizSubmissionsQuery } from "@/redux/features/quiz/submission/submissionApi";
import { MathJax } from "better-react-mathjax";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Define the structure of the quiz question and result
interface IQuizQuestion {
  questionText: string;
  options: string[];
  correctOption: string;
  explanation?: string;
}

interface IQuizResult {
  questionText: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
}

interface IQuizSubmission {
  quizId: string;
  quizTitle: string;
  totalMarks: number;
  correctCount: number;
  wrongCount: number;
  questions: IQuizQuestion[];
  results: IQuizResult[];
  submittedAt: string;
}

const QuizSubmissions = () => {
  const { data, isLoading } = useGetUserQuizSubmissionsQuery({});
  const dispatch = useDispatch();
  const [expandedQuizId, setExpandedQuizId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);


  const toggleDetails = (quizId: string) => {
    setExpandedQuizId((prevId) => (prevId === quizId ? null : quizId)); 
  };

  console.log(data?.data)

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700">
        My Quiz Submissions
      </h2>
      <Separator className="my-3" />

      {data && data?.data?.length === 0 ? (
        <div className="flex items-center justify-center flex-col mt-20">
          <HardDrive size={40} className="text-gray-400" />
          <h1 className="text-gray-400">No quiz submissions found</h1>
        </div>
      ) : (
        <ul>
          {data?.data?.map((submission: IQuizSubmission) => (
            <li
              key={submission?.quizId}
              className="border rounded-lg mb-3 p-4 hover:shadow-md"
            >
              <Link
                className=" hover:text-TextPrimary"
                to={`/quiz/quiz-details/${submission?.quizId}`}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {submission?.quizTitle}
                </h3>
              </Link>
              <div className="flex items-center justify-between flex-wrap">
                <p className=" font-medium text-gray-800 ">
                  Total Marks: {submission?.totalMarks}
                </p>
                <p className=" font-medium text-green-600">
                  Correct Answers: {submission?.correctCount}
                </p>
                <p className=" font-medium text-red-600">
                  Wrong Answers: {submission?.wrongCount}
                </p>
              </div>
              <p className=" font-medium text-gray-800">
                Submitted At:{" "}
                {new Date(submission?.submittedAt).toLocaleString()}
              </p>

              {expandedQuizId === submission?.quizId && (
                <Separator className="mt-3" />
              )}

              {/* Show detailed results when the button is clicked */}
              {expandedQuizId === submission?.quizId && (
                <div className="mt-4">
                  {submission?.questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-4">
                      <h4 className="font-medium">
                        Question {qIndex + 1}: <MathJax inline>{question?.questionText}</MathJax>
                      </h4>
                      <form>
                        {question?.options?.map((option, oIndex) => {
                          const isCorrect =
                            option ===
                            submission?.results[qIndex]?.correctAnswer;
                          const isUserAnswer =
                            option === submission.results[qIndex]?.userAnswer;

                          return (
                            <div key={oIndex} className="mb-2">
                              <label
                                style={{
                                  color: isUserAnswer
                                    ? isCorrect
                                      ? "green"
                                      : "red"
                                    : isCorrect
                                    ? "green"
                                    : "black",
                                }}
                              >
                                <input
                                  type="radio"
                                  name={`question-${qIndex}`}
                                  value={option}
                                  checked={isUserAnswer}
                                  disabled
                                  className="mr-2"
                                />
                                <MathJax inline> {option}</MathJax>
                              </label>
                            </div>
                          );
                        })}
                      </form>

                      {/* Explanation if available */}
                      {submission.results[qIndex]?.explanation && (
                        <p>
                          <strong>Explanation:</strong>{" "}
                          <MathJax inline>
                            {" "}
                            {submission.results[qIndex].explanation}
                          </MathJax>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Show summary and details button */}
              <div className="flex items-center justify-end mt-2">
                <button
                  className={`${
                    expandedQuizId === submission.quizId
                      ? "bg-red-500 hover:bg-red-700"
                      : "bg-BgPrimary hover:bg-BgPrimaryHover"
                  } text-white px-3 py-2 rounded-md`}
                  onClick={() => toggleDetails(submission.quizId)}
                >
                  {expandedQuizId === submission.quizId
                    ? "Hide Details"
                    : "Show Details"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizSubmissions;
