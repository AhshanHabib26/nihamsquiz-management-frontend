import { TBlogProps } from "@/types/common.data";
import userImg from "../../../assets/icons/profile.png";
import moment from "moment";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaEye, FaThumbsUp } from "react-icons/fa6";
import { toast } from "sonner";
import { useLikePostMutation } from "@/redux/features/post/postApi";
import {
  selectCurrentUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import newImg from "../../../assets/icons/new.png";
import { isNewBlog } from "@/lib/isNew";

const BlogCard: React.FC<TBlogProps> = ({ post }) => {
  const shareUrl = window.location.href;
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const userId = user?.userId;
  const liked = userId ? post.likes.includes(userId) : false;
  const [likePost, { isLoading }] = useLikePostMutation();

  const handleLike = async () => {
    if (userId && liked) {
      toast.info("You've already liked this post!");
      return;
    }
    try {
      await likePost(post._id).unwrap();
    } catch {
      toast.error("Error liking the post");
    }
  };

  return (
    <div className="text-gray-300 border border-gray-800 mb-4 p-3 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img className="w-[35px]" src={userImg} alt="Admin" />
          <div>
            <h1 className="text-[16px] hind-siliguri-medium">
              {post?.user?.fullname}
            </h1>
            <p className="text-sm hind-siliguri-medium">
              {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
          </div>
        </div>
        <div>
          <div>
            {post?.createdAt && isNewBlog(post.createdAt) && (
              <div>
                <img
                  className="w-[35px]"
                  src={newImg}
                  alt="New Post"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-2">
        <Link className="hover:text-TextPrimary" to={`/blog/${post.slug}`}>
          {" "}
          <h1 className="text-lg hind-siliguri-semibold">{post.title}</h1>
        </Link>
        <p
          className=" text-[16px] hind-siliguri-light"
          dangerouslySetInnerHTML={{
            __html: `${post.description.slice(0, 100)}.....`,
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            {token ? (
              <FaThumbsUp
                size={18}
                onClick={handleLike}
                className={`cursor-pointer ${
                  liked ? "text-blue-500" : "text-gray-300"
                }`}
              />
            ) : (
              <FaThumbsUp size={18} className=" cursor-not-allowed" />
            )}
            <span className="ml-1  select-none">
              {isLoading ? "..." : post.likesCount}
            </span>
          </div>
          <div className="flex items-center">
            <FaEye size={18} className=" cursor-pointer" />
            <span className="ml-1 select-none">{post.viewsCount}</span>
          </div>
          <div className="flex items-center">
            <IoChatbubbleEllipsesSharp className=" cursor-pointer" size={18} />
            <span className="ml-1 select-none">
              {Array.isArray(post.comments)
                ? post.comments.length
                : post.comments}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={28} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl}>
            <TwitterIcon size={28} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={28} round />
          </LinkedinShareButton>
          <PinterestShareButton url={shareUrl} media={userImg}>
            <PinterestIcon size={28} round />
          </PinterestShareButton>
          <WhatsappShareButton url={shareUrl}>
            <WhatsappIcon size={28} round />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
