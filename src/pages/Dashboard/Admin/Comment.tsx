/* eslint-disable @typescript-eslint/no-explicit-any */
import CommentCard from "@/components/dashboard/admin/Comment/CommentCard";
import { PaginationCard } from "@/lib/PaginationCard";
import {
  useDeleteCommentMutation,
  useGetAllCommentQuery,
} from "@/redux/features/comment/commentApi";
import { setLoading } from "@/redux/features/global/globalSlice";
import { TResponse } from "@/types";
import { TComment } from "@/types/common.data";
import { HardDrive } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export const CommentPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 5;
  const { data, isLoading } = useGetAllCommentQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false,
    }
  );
  const total = data?.meta?.total ?? 0;

  const [deleteComment] = useDeleteCommentMutation();

  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while the comment is being deleted",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deleteComment(id)) as TResponse<any>;

        if (res.error) {
          Swal.fire({
            title: "Error!",
            text: res.error.data.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Deleted!",
            text: "Comment deleted successfully",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
          });
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? `Error: ${err.message}`
            : "Something went wrong";
        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      Swal.fire({
        title: "Cancelled",
        text: "Comment deletion was cancelled",
        icon: "info",
        timer: 1000,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return (
    <div>
      <div className="my-4">
        <h1 className="text-xl font-semibold text-gray-700">
          Comment <span>({total})</span>
        </h1>
      </div>
      <hr className="" />
      <div>
        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Comment Found</h1>
          </div>
        ) : (
          <div>
            <div className="mt-5">
              {data?.data?.map((comment: TComment) => (
                <CommentCard
                  comment={comment}
                  key={comment._id}
                  deleteHandler={deleteHandler}
                />
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
    </div>
  );
};
