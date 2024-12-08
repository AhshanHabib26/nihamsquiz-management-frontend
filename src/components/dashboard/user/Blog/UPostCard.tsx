import { TBlogProps } from "@/types/common.data";
import { Book, Eye, MessageSquareMore, Tags, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

export const UPostCard: React.FC<TBlogProps> = ({ post }) => {
  return (
    <div className="flex items-start gap-4 shadow border text-gray-800 p-2 mb-3 rounded-lg">
      <div className="w-full">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <Book size={18} />
            <Link className="hover:text-TextPrimary" to={`/blog/${post.slug}`}>
              {" "}
              <h1 className="text-lg font-medium">{post.title}</h1>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Tags size={20} />
            <Link
              className=" hover:text-TextPrimary"
              to={`/blog/category/${post?.category?.title}`}
            >
              <p className=" font-light">{post?.category?.title}</p>
            </Link>
          </div>
          <div className="flex items-center justify-between gap-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye size={20} />
                <p>{post.viewsCount}</p>
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp size={20} />
                <p>{post.likesCount}</p>
              </div>
              <div className="flex items-center gap-1">
                <MessageSquareMore size={20} />
                <p>{post?.comments?.length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
