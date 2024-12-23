import { UPostCard } from "@/components/dashboard/user/Blog/UPostCard";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { TBlog } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export const UPostPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllPostQuery(
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
    <div className="mt-4">
       <div className="mb-2">
        <h1 className="text-xl font-semibold text-gray-700">
          Post <span>({total})</span>
        </h1>
      </div>
      <hr className="mb-4" />
      {data?.data?.length === 0 ? (
        <div className="flex items-center justify-center flex-col mt-20">
          <HardDrive size={40} className=" text-gray-400" />
          <h1 className="text-gray-400">No Post Found</h1>
        </div>
      ) : (
        <div>
          <div>
            {data?.data?.map((post: TBlog) => (
              <UPostCard post={post} key={post._id} />
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
  );
};
