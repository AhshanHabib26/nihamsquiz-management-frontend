/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useState, useMemo, useCallback, useEffect, ChangeEvent } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  useCreatePostMutation,
  useGetSinglePostQuery,
  useUpdatePostMutation,
} from "@/redux/features/post/postApi";
import { TResponse } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import { DashboardLoader } from "@/loader/DashboardLoader";
import { CategoryLoader } from "@/loader/CategoryLoader";

// Define the types for API responses and form data
interface Category {
  id: string;
  title: string;
}

export const CreatePostPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [postId, setPostId] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Fetch single post data if ID is available
  const { data: post, isFetching: isFetchingPost } = useGetSinglePostQuery(
    id || "",
    {
      skip: !id,
    }
  );

  // Fetch all categories
  const {
    data: categoriesData,
    isFetching: isFetchingCategories,
    isError: isErrorCategories,
  } = useGetAllCategoriesQuery("");

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  // Memoize categories to avoid unnecessary recalculations
  const categories = useMemo<Category[]>(
    () =>
      categoriesData?.data?.map((item) => ({
        id: item._id,
        title: item.title,
      })) || [],
    [categoriesData]
  );

  // Set form fields when post data is fetched
  useEffect(() => {
    if (post) {
      setTitle(post?.data?.title || "");
      setSlug(post?.data?.slug || "");
      setDescription(post?.data?.description || "");
      setSelectedCategory(post?.data?.category?._id || "");
      setPostId(post?.data?._id || null);

      // Handle tags
      const tagsArray = Array.isArray(post?.data?.tags) ? post?.data?.tags : [];
      setTags(tagsArray);
      setInput(tagsArray.join(", "));
    }
  }, [post]);

  // Handle category change
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
  }, []);

  // Quill editor modules
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const convertInputToArray = (inputString: string) => {
    return inputString
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    const tagsArray = convertInputToArray(value);
    setTags(tagsArray);
  };


 
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    setSlug(convertToSlug(newTitle));
  };

  const convertToSlug = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\u0980-\u09FF-]+/g, '') // Allow Bangla characters and hyphens
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };



  if (isFetchingPost) {
    return <DashboardLoader />;
  }

  // Handle form submission
  const handleSubmit = async () => {
    if (!title || !description || !selectedCategory) {
      toast.error("Please fill in all required fields");
      return;
    }

    const userData = {
      title,
      description,
      category: selectedCategory,
      tags,
      slug,
    };

    const toastId = toast.loading(
      postId ? "Post updating..." : "Post creating..."
    );

    try {
      const response = postId
        ? ((await updatePost({ id: postId, data: userData })) as TResponse<any>)
        : ((await createPost(userData)) as TResponse<any>);

      if (response.error) {
        toast.error(response.error.data.message, {
          id: toastId,
          duration: 1500,
        });
      } else {
        toast.success(
          postId ? "Post updated successfully" : "Post created successfully",
          {
            id: toastId,
            duration: 1000,
          }
        );
        resetForm();
        navigate("/dashboard/all-post");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      toast.error(`Error: ${errorMessage}`, { id: toastId, duration: 1500 });
    }
  };

  // Reset form fields
  const resetForm = () => {
    setDescription("");
    setTitle("");
    setSelectedCategory("");
    setPostId(null);
    setSlug("");
    setTags([])
  };

  return (
    <div className="text-gray-700">
      <div className="my-4 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Input
          className="h-[50px] text-lg"
          type="text"
          placeholder="Enter your title"
          aria-label="Title"
          value={title}
          onChange={handleTitleChange}
        />
         <Input
          className="h-[50px] text-lg"
          type="text"
          placeholder="Enter your slug"
          aria-label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>
      <div>
        {isErrorCategories && <p>Error loading categories.</p>}

        {isFetchingCategories ? (
          <CategoryLoader />
        ) : (
          <Select
            value={selectedCategory || ""}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="h-[50px] text-lg" aria-label="Category">
              <SelectValue placeholder="Choose category" />
            </SelectTrigger>
            <SelectContent>
              {isFetchingCategories && (
                <SelectItem value="loading" disabled>
                  Loading...
                </SelectItem>
              )}
              {isErrorCategories && (
                <SelectItem value="error" disabled>
                  Error loading categories
                </SelectItem>
              )}
              {categories.length > 0 ? (
                categories.map((category) => (
                  <SelectItem
                    className="text-lg"
                    key={category.id}
                    value={category.id}
                  >
                    {category.title}
                  </SelectItem>
                ))
              ) : (
                <SelectItem value="null" disabled>
                  No categories available
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        )}
      </div>
      <div className="my-4">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter tags separated by commas"
          className="h-[50px] text-lg hind-siliguri-light"
        />
      </div>
      <div>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={description}
          onChange={setDescription}
          className="h-[300px] flex flex-1 flex-col"
        />
      </div>
      <div className="mt-5">
        <Button
          type="button"
          onClick={handleSubmit}
          className="text-lg"
          size="lg"
        >
          {postId ? "Update Post" : "Add Post"}
        </Button>
      </div>
    </div>
  );
};
