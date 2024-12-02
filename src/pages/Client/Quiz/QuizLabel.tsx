
import QuizListCard from "@/components/client/Quiz/QuizListCard";
import QuizListCategory from "@/components/client/Quiz/QuizListCategory";
import Container from "@/lib/Container";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import { TQuiz } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const QuizLabelPage = () => {
  const dispatch = useDispatch();
  const { tag } = useParams();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllQuizQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const selectedTags = data?.data?.filter(
    (item) => tag && item?.tags?.includes(tag)
  );

  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className=" min-h-screen">
      <div className=" mt-16 lg:mt-20">
        <Container>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl hind-siliguri-semibold text-gray-300">
                    Label -{" "}
                  </h1>
                  <p className="text-2xl font-medium text-TextPrimary capitalize">{tag}</p>
                </div>
                <hr className=" my-2 border-[0.5] border-dashed border-gray-800" />
                <div>
                  <div>
                    {selectedTags && selectedTags?.length === 0 ? (
                      <div className="flex items-center justify-center flex-col mt-20">
                        <HardDrive size={40} className=" text-gray-400" />
                        <h1 className="text-gray-400">No Quiz Found!</h1>
                      </div>
                    ) : (
                      <>
                        <div>
                          <div className="mt-5">
                            {selectedTags &&
                              selectedTags?.map((quiz: TQuiz) => (
                                <QuizListCard quiz={quiz} key={quiz._id} />
                              ))}
                          </div>
                          {selectedTags && selectedTags.length > limit && (
                            <div className="my-5 flex items-end justify-end">
                              <PaginationCard
                                page={page}
                                limit={limit}
                                total={total}
                                onPageChange={(newPage) => setPage(newPage)}
                              />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <QuizListCategory />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default QuizLabelPage;
