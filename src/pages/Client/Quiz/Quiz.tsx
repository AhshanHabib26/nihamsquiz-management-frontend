import { useGetAllQuizQuery } from "@/redux/features/quiz/quiz/quizApi";
import { useState, useEffect } from "react";
import { PaginationCard } from "@/lib/PaginationCard";
import { TQuiz } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/global/globalSlice";
import QuizListCard from "@/components/client/Quiz/QuizListCard";
import Container from "@/lib/Container";
import SearchBtn from "@/components/client/SearchBtn";
import QuizListCategory from "@/components/client/Quiz/QuizListCategory";
import RecentQuiz from "@/components/client/Quiz/RecentQuiz";

const QuizPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useGetAllQuizQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const total = data?.meta?.total ?? 0;

  const [searchText, setSearchText] = useState("");

  // Filter the posts based on searchText
  const filteredQuiz = data?.data?.filter((quiz: TQuiz) =>
    quiz?.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div className="mt-20 lg:mt-24 min-h-screen">
      <Container>
        <div>
          {!isLoading && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8">
                <div>
                  <SearchBtn inputBelow={true} setSearchText={setSearchText} />
                  {data?.data?.length === 0 || filteredQuiz?.length === 0 ? (
                    <div className="flex items-center justify-center flex-col mt-20">
                      <HardDrive size={40} className="text-gray-400" />
                      <h1 className="text-gray-400">No Post Found</h1>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-5">
                        {(searchText ? filteredQuiz : data?.data)?.map(
                          (quiz: TQuiz) => (
                            <QuizListCard quiz={quiz} key={quiz._id} />
                          )
                        )}
                      </div>
                      {total > limit && (
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
                  )}
                </div>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <RecentQuiz />
                <QuizListCategory />
                {/* <PopularBlogs /> */}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default QuizPage;
