/* eslint-disable @typescript-eslint/no-explicit-any */
import { PostCard } from "@/components/dashboard/admin/Blog/PostCard";
import { Separator } from "@/components/ui/separator";
import { PaginationCard } from "@/lib/PaginationCard";
import { setLoading } from "@/redux/features/global/globalSlice";
import {
  useDeletePostMutation,
  useGetAllPostQuery,
} from "@/redux/features/post/postApi";
import { TResponse } from "@/types";
import { TBlog } from "@/types/common.data";
import { HardDrive, ListPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const PostPage = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, isLoading } = useGetAllPostQuery(
    { page, limit },
    {
      refetchOnMountOrArgChange: false, 
    }
  );
  const total = data?.meta?.total ?? 0;
  const [deletePost] = useDeletePostMutation();

  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this post?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleting...",
        text: "Please wait while the post is being deleted",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
      });

      try {
        const res = (await deletePost(id)) as TResponse<any>;

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
            text: "Post deleted successfully",
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
        text: "Post deletion was cancelled",
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
      <div className="flex items-end justify-end">
        <Link
          to="/admin/dashboard/create-post"
          className="flex items-center bg-BgPrimary hover:bg-BgPrimaryHover text-white px-4 py-3 gap-2 rounded-lg text-md mt-4"
        >
          <ListPlus />
          New Post
        </Link>
      </div>
      <div>
        <Separator className="my-5" />

        {data?.data?.length === 0 ? (
          <div className="flex items-center justify-center flex-col mt-20">
            <HardDrive size={40} className=" text-gray-400" />
            <h1 className="text-gray-400">No Post Found</h1>
          </div>
        ) : (
          <div>
            <div>
              {data?.data?.map((post: TBlog) => (
                <PostCard
                  post={post}
                  key={post._id}
                  deleteHandler={deleteHandler}
                />
              ))}
            </div>
            <div className="my-5">
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
