import { useEffect, useState } from "react";
import { TBlog } from "@/types/common.data";
import { useGetAllPostQuery } from "@/redux/features/post/postApi";
import { PaginationCard } from "@/lib/PaginationCard";
import { HardDrive } from "lucide-react";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/features/global/globalSlice";
import SearchBtn from "@/components/client/SearchBtn";
import BlogCard from "@/components/client/Blogs/BlogCard";
import Container from "@/lib/Container";
import RecentBlogs from "@/components/client/Blogs/RecentBlogs";
import BlogCategory from "@/components/client/Category/BlogCategory";
import PopularBlogs from "@/components/client/Blogs/PopularBlogs";

const BlogPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const limit = 10;
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isFetching } = useGetAllPostQuery(
    {
      page,
      limit,
      category: selectedCategoryId || undefined,
      searchTerm: searchTerm.trim() ? searchTerm : undefined,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const total = data?.meta?.total ?? 0;

  // Dispatch global loading state based on API fetching status
  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  return (
    <div className="mt-20 lg:mt-24 min-h-screen">
      <Container>
        <div>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-8">
              <div>
                <SearchBtn inputBelow={true} setSearchTerm={setSearchTerm} />
                {data?.data?.length === 0 ? (
                  <div className="flex items-center justify-center flex-col mt-20">
                    <HardDrive size={40} className="text-gray-400" />
                    <h1 className="text-gray-400">No Post Found</h1>
                  </div>
                ) : (
                  <div>
                    <div className="mt-5">
                      {data?.data?.map((post: TBlog) => (
                        <BlogCard post={post} key={post._id} />
                      ))}
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
              <RecentBlogs />
              <BlogCategory setSelectedCategoryId={setSelectedCategoryId} />
              <PopularBlogs />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
