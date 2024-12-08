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
  const limit = 10;

  const { data, isFetching } = useGetAllPostQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false, // Prevent refetching on revisit
    }
  );

  const total = data?.meta?.total ?? 0;
  const [searchText, setSearchText] = useState("");

  // Dispatch global loading state based on API fetching status
  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  // Filter the posts based on searchText
  const filteredPosts = data?.data?.filter((post: TBlog) =>
    post?.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="mt-20 lg:mt-24 min-h-screen">
      <Container>
        <div>
          {!isFetching && (
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8">
                <div>
                  <SearchBtn inputBelow={true} setSearchText={setSearchText} />
                  {data?.data?.length === 0 || filteredPosts?.length === 0 ? (
                    <div className="flex items-center justify-center flex-col mt-20">
                      <HardDrive size={40} className="text-gray-400" />
                      <h1 className="text-gray-400">No Post Found</h1>
                    </div>
                  ) : (
                    <div>
                      <div className="mt-5">
                        {(searchText ? filteredPosts : data?.data)?.map(
                          (post: TBlog) => (
                            <BlogCard post={post} key={post._id} />
                          )
                        )}
                      </div>
                      {filteredPosts?.length === 0 ? null : (
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
                <BlogCategory />
                <PopularBlogs />
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default BlogPage;
