import { useGetAllQuizCategoriesQuery } from "@/redux/features/quiz/category/categoryApi";
import QuizCategoryCard from "./QuizCategoryCard";
import { TQuizCategory } from "@/types/common.data";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";

const QuizCategory = () => {
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
    <div className=" mt-5">
      {!isLoading && (
        <h1 className="text-2xl text-center hind-siliguri-semibold mb-5">
          Quiz Category
        </h1>
      )}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {data?.data?.slice(0, 12).map((category: TQuizCategory, index) => (
            <QuizCategoryCard
              category={category}
              key={category._id}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizCategory;
