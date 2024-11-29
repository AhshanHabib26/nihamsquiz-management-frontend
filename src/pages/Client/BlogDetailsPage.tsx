import CommentsCard from "@/components/client/Blogs/CommentsCard";
import PopularBlogs from "@/components/client/Blogs/PopularBlogs";
import SingleBlogCard from "@/components/client/Blogs/SingleBlogCard";
import SingleBlogCommentBox from "@/components/client/Blogs/SingleBlogCommentBox";
import Container from "@/lib/Container";
import { setLoading } from "@/redux/features/global/globalSlice";
import { useGetSinglePostQuery } from "@/redux/features/post/postApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const BlogDetailsPage = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const { data, isLoading } = useGetSinglePostQuery(slug, {
      refetchOnMountOrArgChange: false,
    });
  
    useEffect(() => {
      dispatch(setLoading(isLoading));
    }, [isLoading, dispatch]);
  
    return (
      <div>
        <div className="mt-20 lg:mt-24">
          <Container>
            <div>
              {!isLoading && (
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 lg:col-span-8">
                    <div>
                      {" "}
                      <SingleBlogCard post={data?.data} />
                      <div>
                        <SingleBlogCommentBox postId={data?.data?._id} />
                        <CommentsCard post={data?.data} />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 lg:col-span-4">
                    <PopularBlogs />
                  </div>
                </div>
              )}
            </div>
          </Container>
        </div>
      </div>
    );
}

export default BlogDetailsPage