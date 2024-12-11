import CommentCard from "@/components/dashboard/admin/Comment/CommentCard";
import { PaginationCard } from "@/lib/PaginationCard";
import { useGetUserCommentSubmissionsQuery } from "@/redux/features/comment/commentApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { TComment } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const UCommentPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetUserCommentSubmissionsQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const total = data?.meta?.total ?? 0;

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Comment <span>({total})</span>
        </h1>
      </div>
      <hr className="" />
      <div>
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Comment Found</h1>
          </div>
        ) : (
          <div>
            <div className="mt-5">
              {data?.data?.map((comment: TComment) => (
                <CommentCard comment={comment} key={comment._id} />
              ))}
            </div>
            <div className="my-5 flex items-end justify-end">
              <PaginationCard
                page={page}
                limit={limit}
                total={total}
                onPageChange={(newPage) => setPage(newPage)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UCommentPage;
