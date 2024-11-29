import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllQuizCategoriesQuery } from "@/redux/features/quiz/category/categoryApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import QuizCategoryCard from "./QuizCategoryCard";
import { TQuizCategory } from "@/types/common.data";

const QuizListCategory = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllQuizCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="shadow-md border-[0.5px] border-gray-200 rounded-md">
      <div className="bg-white rounded-t-md text-gray-600 p-2 shadow-sm">
        <h1 className="text-lg hind-siliguri-semibold ml-2">Quiz Category</h1>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {data?.data && data.data.length > 0 ? (
            data.data.map((category: TQuizCategory, index) => (
              <QuizCategoryCard
                category={category}
                key={category._id}
                index={index}
              />
            ))
          ) : (
            <p>No quiz category available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizListCategory;
