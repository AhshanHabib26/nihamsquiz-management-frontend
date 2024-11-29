import Container from "@/lib/Container";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetSubmissionQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

// Define TypeScript interfaces
interface Answer {
  questionIndex: number;
  selectedOption: string;
}

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctOption: string;
  explanation: string;
}

interface QuizData {
  questions: Question[];
}

interface QuizSubmissionData {
  quiz: QuizData;
  answers: Answer[];
  totalMarks: number;
}

const QuizSubmissionPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams<string>();
  const { data, isLoading } = useGetSubmissionQuizQuery(id, {
    refetchOnMountOrArgChange: false, 
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  if (!data || !data?.data) {
    return null;
  }

  const { quiz, answers, totalMarks } = data?.data as QuizSubmissionData;
  const questions = quiz?.questions;
  const correctAnswersCount = answers?.filter((ans) => {
    const question = questions[ans?.questionIndex];
    return question && ans?.selectedOption === question?.correctOption;
  }).length;

  return (
    <div className="my-10 max-w-6xl mx-auto">
      <Container>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
            <span className="mr-2">📚</span>
            Quiz Submission Details
          </h1>

          <div className="space-y-4">
            {questions?.map((question, index) => {
              const userAnswer = answers.find(
                (ans) => ans.questionIndex === index
              );
              const isCorrect =
                userAnswer?.selectedOption === question?.correctOption;
              const isUserAnswerWrong =
                !isCorrect && userAnswer?.selectedOption;

              return (
                <div key={question?._id} className="border-b pb-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {question?.questionText}
                  </h2>
                  <ul className="list-disc pl-5">
                    {question?.options.map((option, i) => {
                      let optionClasses = "p-2 rounded cursor-pointer";
                      if (option === question?.correctOption) {
                        optionClasses += " bg-green-200 text-green-700";
                      } else if (
                        isUserAnswerWrong &&
                        option === userAnswer?.selectedOption
                      ) {
                        optionClasses += " bg-red-200 text-red-700";
                      } else {
                        optionClasses += " text-gray-700";
                      }
                      return (
                        <li key={i} className={`${optionClasses} mb-2`}>
                          {option}
                        </li>
                      );
                    })}
                  </ul>
                  {isUserAnswerWrong && (
                    <p className="text-red-600 mt-2">
                      <strong>Your answer was incorrect.</strong> The correct
                      answer is:{" "}
                      <span className="text-green-700">
                        {question?.correctOption}
                      </span>
                      .
                    </p>
                  )}
                  {question?.explanation ? (
                    <p className="mt-2 text-gray-700">
                      <strong>Explanation:</strong> {question?.explanation}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
          <div className="mt-6 bg-gray-200 p-4 rounded-md flex items-start lg:items-center lg:justify-between flex-col lg:flex-row justify-start">
            <p className="text-lg font-semibold">
              Total Questions: {questions?.length}
            </p>
            <p className="text-lg font-semibold">Total Marks: {totalMarks}</p>
            <p className="text-lg font-semibold">
              Correct Answers: {correctAnswersCount}
            </p>
          </div>
          <div className="flex items-end justify-end">
            <Link
              className=" bg-myBgPrimary hover:bg-myBgSecondary px-3 py-2 text-white rounded-sm mt-4"
              to="/"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QuizSubmissionPage;
