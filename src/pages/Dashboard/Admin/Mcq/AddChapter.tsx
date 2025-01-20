/* eslint-disable @typescript-eslint/no-explicit-any */
import { AllMcqChapter } from "@/components/dashboard/admin/Mcq/AllChapter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCreateMcqChapterMutation, useUpdateMcqChapterMutation } from "@/redux/features/quiz/mcq/chapterApi";
import { useGetAllMcqSubjectesQuery } from "@/redux/features/quiz/mcq/subjectApi";
import { TResponse } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area"
import { setLoading } from "@/redux/features/global/globalSlice";
import { useDispatch } from "react-redux";



interface ICommon {
  id: string;
  name: string;
}

export const AddChapterPage = () => {
  const [chapterName, setChapterName] = useState("");
  const [chapterSlug, setChapterSlug] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [chapterId, setChapterId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false)
  const [createMcqChapter] = useCreateMcqChapterMutation();
  const [updateMcqChapter] = useUpdateMcqChapterMutation();
  const dispatch = useDispatch();

  // Fetch all categories
  const {
    data: subjectData,
    isFetching: isFetching,
    isError: isError,
  } = useGetAllMcqSubjectesQuery("");


  // Memoize categories to avoid unnecessary recalculations
  const subject = useMemo<ICommon[]>(
    () =>
      subjectData?.data?.map((item) => ({
        id: item._id,
        name: item.name,
      })) || [],
    [subjectData]
  );

  // Handle category change
  const handleSubjectChange = useCallback((value: string) => {
    setSelectedSubject(value);
  }, []);

  // Handler for creating a category
  const createHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Creating...");

    if (!chapterName) {
      return toast.error("Chapter name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const chapterData = { name: chapterName, slug: chapterSlug, subject: selectedSubject };
    try {
      const res = (await createMcqChapter(chapterData)) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Chapter added successfully", {
          id: toastId,
          duration: 1000,
        });
        setChapterName("");
        setChapterSlug("");
        setSelectedSubject("")
        setIsVisible(false)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  // Handler for updating a category
  const updateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating...");

    if (!chapterName || chapterId === null) {
      return toast.error("Chapter ID and name required", {
        id: toastId,
        duration: 1500,
      });
    }

    const chapterData = { name: chapterName, slug: chapterSlug, subject: selectedSubject };

    try {
      const res = (await updateMcqChapter({
        id: chapterId,
        data: chapterData,
      })) as TResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 1500 });
      } else {
        toast.success("Chapter updated successfully", {
          id: toastId,
          duration: 1000,
        });
        setChapterName("");
        setChapterSlug("");
        setChapterId(null);
        setSelectedSubject("")
        setIsVisible(false)
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(`Error: ${err.message}`, { id: toastId, duration: 1500 });
      } else {
        toast.error("Something went wrong", { id: toastId, duration: 1500 });
      }
    }
  };

  useEffect(() => {
    dispatch(setLoading(isFetching));
  }, [isFetching, dispatch]);

  const resetChapterFields = useCallback(() => {
    setChapterId(null);
    setChapterName("");
    setChapterSlug("");
    setSelectedSubject("");
  }, []);

  const handleVisible = () => {
    setIsVisible((prevState) => !prevState);
  };

  const handleClose = useCallback(() => {
    setIsVisible((prevState) => !prevState);
    resetChapterFields();
  }, [resetChapterFields]);



  return (
    <div>
      <div className="flex items-end justify-end my-4">

        {
          isVisible ? <Button onClick={handleClose} className="bg-red-600 hover:bg-red-500">
            Close Chapter
          </Button> :
            <Button onClick={handleVisible} className="bg-BgPrimary hover:bg-BgPrimaryHover">
              Add Chapter
            </Button>
        }
      </div>

      {
        isVisible && <form onSubmit={chapterId === null ? createHandler : updateHandler}>
          <div className="grid mt-5 max-w-md mx-auto gap-2 border p-3 rounded-lg">
            <Input
              value={chapterName}
              onChange={(e) => {
                const value = e.target.value;
                setChapterName(value);
                // Automatically update slug based on category name
                setChapterSlug(value.trim().toLowerCase().replace(/ /g, "-"));
              }}
              type="text"
              name="name"
              className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
              placeholder="MCQ Chapter"
            />

            <Input
              value={chapterSlug} // Use value instead of defaultValue
              onChange={(e) => setChapterSlug(e.target.value)} // Allow manual slug modification
              type="text"
              name="slug"
              className="h-[45px] text-lg text-gray-600 placeholder:text-gray-400"
              placeholder="MCQ Chapter Slug"
            />
            <div>
              {isError && <p>Error loading subject.</p>}
              <Select
                value={selectedSubject || ""}
                onValueChange={handleSubjectChange}
              >
                <SelectTrigger
                  className="h-[50px] hind-siliguri-light"
                  aria-label="Subject"
                >
                  <SelectValue placeholder="Choose subject" />
                </SelectTrigger>
                <SelectContent>
                  {isFetching && (
                    <SelectItem value="loading" disabled>
                      Loading...
                    </SelectItem>
                  )}
                  {isError && (
                    <SelectItem value="error" disabled>
                      Error loading categories
                    </SelectItem>
                  )}
                  <ScrollArea className=" h-[200px]">
                    {subject.length > 0 ? (
                      subject.map((sub) => (
                        <SelectItem
                          className="text-lg hind-siliguri-light cursor-pointer"
                          key={sub.id}
                          value={sub.id}
                        >
                          {sub.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="null" disabled>
                        No Subject available
                      </SelectItem>
                    )}
                  </ScrollArea>
                </SelectContent>
              </Select>
            </div>

            <div className=" w-full flex items-end justify-end md:items-start md:justify-start lg:items-start lg:justify-start">
              <Button
                className={`h-[45px] ${chapterId === null ? "bg-blue-500 hover:bg-blue-600" : "bg-green-600 hover:bg-green-500"
                  }`}
              >
                {chapterId === null ? "Add MCQ Chapter" : "Update MCQ Chapter"}
              </Button>

            </div>
          </div>
        </form>
      }
      <Separator className="mt-5" />
      <div>
        <AllMcqChapter
          onSelectMcqChapter={(id, name, slug, subject) => {
            setChapterId(id);
            setChapterName(name);
            setChapterSlug(slug);
            setSelectedSubject(subject)
          }}
          handleVisible={handleVisible}
        />
      </div>
    </div>
  );
};
