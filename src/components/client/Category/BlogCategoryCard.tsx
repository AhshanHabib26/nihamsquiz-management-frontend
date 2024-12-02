import { TCategoryProps } from "@/types/common.data";
import { Tags } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCategoryCard: React.FC<TCategoryProps> = ({ category }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Tags size={20} className="text-gray-300" />
        <Link className=" hover:text-TextPrimary" to={`/blog/category/${category?.title}`}>
          <p className="text-lg hind-siliguri-light">{category?.title}</p>
        </Link>
      </div>
    </div>
  );
};

export default BlogCategoryCard;
