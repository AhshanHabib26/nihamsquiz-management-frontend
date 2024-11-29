import { TBlogProps } from "@/types/common.data";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import newImg from "../../../assets/icons/newLabel.png";
import { isNewBlog } from "@/lib/isNew";

interface Props extends TBlogProps {
  isLast?: boolean;
}

const RecentBlogsCard: React.FC<Props> = ({ post, isLast }) => {
  return (
    <div
      className={`text-gray-300 ${
        isLast ? "" : "border-b border-gray-800 border-dashed"
      }`}
    >
      <Link to={`/blog/${post.slug}`}>
        <div className="flex items-center justify-between">
          <h1 className="my-1 text-[17px] hind-siliguri-light hover:text-myBgPrimary">
            {post.title}
          </h1>
          <div>
            {post?.createdAt && (
              <div>
                {isNewBlog(post.createdAt) ? (
                  <div>
                    <img className="w-[35px]" src={newImg} alt="New Post" />
                  </div>
                ) : (
                  <div>
                    <FaAngleRight className="text-gray-300" size={15} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RecentBlogsCard;
