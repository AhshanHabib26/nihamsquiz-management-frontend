import { TBlogProps } from "@/types/common.data";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

interface Props extends TBlogProps {
  isLast?: boolean;
}

const PopularBlogCard: React.FC<Props> = ({ post, isLast }) => {
  return (
    <div
      className={`text-gray-300 ${isLast ? "" : "border-b border-gray-800 border-dashed"
        }`}
    >
      <div className="flex items-center justify-between">
        <div className="my-1">
          <p className="bg-gray-800 my-1 inline-block px-2 rounded text-sm hind-siliguri-light">
            {post?.category?.title ? post?.category?.title : "Uncategorised"}
          </p>
          <Link to={`/blog/${post.slug}`}>
            <h1 className="text-[16px] hind-siliguri-medium hover:text-BgPrimary">
              {post.title}
            </h1>
          </Link>
        </div>
        <div>
          <FaAngleRight className="text-gray-300" size={15} />
        </div>
      </div>
    </div>
  );
};

export default PopularBlogCard;
