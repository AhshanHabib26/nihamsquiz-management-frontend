import { TCommentProps } from "@/types/common.data";
import { Trash2 } from "lucide-react";
import moment from "moment";

const CommentCard: React.FC<TCommentProps> = ({ comment, deleteHandler }) => {
  return (
    <div className=" border border-gray-200 p-2 rounded-md mb-3">
      <div className="flex items-center gap-2">
        <div>
          <h1 className=" w-[35px] h-[35px]  rounded-full flex items-center justify-center bg-BgPrimary text-white font-medium">
            {comment?.user?.initials ? comment?.user?.initials : "AN"}
          </h1>
        </div>
        <div className=" w-full">
          <div className="flex items-center gap-3 w-full">
            <p className="text-TextPrimary font-medium text-lg">
              {comment?.user?.fullname ? comment?.user?.fullname : "Anonymous"}
            </p>
            <span className="text-sm font-medium text-gray-500">
              Commented on
            </span>
            <p className="text-TextPrimary font-medium text-lg">
              {comment?.post?.title}
            </p>
          </div>
          <div>
            <h1>{comment?.description}</h1>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-end gap-3">
        <p className="text-sm text-gray-500">
          {" "}
          {moment(comment?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        <Trash2
          onClick={() => deleteHandler?.(comment?._id)}
          size={18}
          className="text-red-500 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default CommentCard;
