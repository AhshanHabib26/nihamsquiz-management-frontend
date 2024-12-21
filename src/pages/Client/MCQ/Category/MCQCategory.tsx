
import { TMcq } from "@/types/common.data";
import { useEffect } from "react";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";
import { Tags } from "lucide-react";
import { useGetAllMcqCategoriesQuery } from "@/redux/features/quiz/mcq/categoryApi";

type MCQCategoryProps = {
  setSelectedCategoryId: (id: string) => void;
};

const MCQCategory: React.FC<MCQCategoryProps> = ({
  setSelectedCategoryId,
}) => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAllMcqCategoriesQuery(
    {},
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="shadow-md border-[0.5px] border-gray-800 rounded-md">
      <div className="bg-gray-900 rounded-t-md text-gray-300 p-2 shadow-sm">
        <h1 className="text-lg font-semibold ml-2">MCQ Category</h1>
      </div>
      <div className="p-4">
        <div>
          {data?.data?.map((category: TMcq) => (
            <div className="flex items-center gap-2 mb-1">
              <Tags size={20} className="text-gray-300" />
              <p
                onClick={() => setSelectedCategoryId(category?._id)}
                className="text-[16px] font-light hover:text-TextPrimary cursor-pointer"
              >
                {category?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MCQCategory;
