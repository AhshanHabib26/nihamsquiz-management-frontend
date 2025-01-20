import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqChapterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqChapter: builder.mutation({
      query: (data) => ({
        url: "/chapter",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chapter"],
    }),
    getAllMcqChapteres: builder.query({
      query: (args = {}) => {
        const params = new URLSearchParams();

        // Only append page and limit if they are provided
        if (args.page !== undefined && args.page !== null) {
          params.append("page", args.page.toString());
        }
        if (args.limit !== undefined && args.limit !== null) {
          params.append("limit", args.limit.toString());
        }
        Object.keys(args).forEach((key) => {
          if (
            key !== "page" &&
            key !== "limit" &&
            args[key] !== undefined &&
            args[key] !== null
          ) {
            params.append(key, args[key]);
          }
        });

        return {
          url: `/chapter?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Chapter"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqChapter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/chapter/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Chapter"],
    }),
    deleteMcqChapter: builder.mutation({
      query: (id) => ({
        url: `/chapter/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Chapter"],
    }),
    getSingleMcqChapter: builder.query({
      query: (id) => ({
        url: `/chapter/${id}`,
        method: "GET",
      }),
      providesTags: ["Chapter"],
    }),
  }),
});

export const {
  useCreateMcqChapterMutation,
  useDeleteMcqChapterMutation,
  useGetAllMcqChapteresQuery,
  useGetSingleMcqChapterQuery,
  useUpdateMcqChapterMutation
} = mcqChapterApi;
