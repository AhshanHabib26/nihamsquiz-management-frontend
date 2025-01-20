import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqBoard: builder.mutation({
      query: (data) => ({
        url: "/board",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Board"],
    }),
    getAllMcqBoards: builder.query({
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
          url: `/board?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Board"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqBoard: builder.mutation({
      query: ({ id, data }) => ({
        url: `/board/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Board"],
    }),
    deleteMcqBoard: builder.mutation({
      query: (id) => ({
        url: `/board/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Board"],
    }),
    getSingleMcqBoard: builder.query({
      query: (id) => ({
        url: `/board/${id}`,
        method: "GET",
      }),
      providesTags: ["Board"],
    }),
  }),
});

export const {
  useCreateMcqBoardMutation,
  useDeleteMcqBoardMutation,
  useGetAllMcqBoardsQuery,
  useGetSingleMcqBoardQuery,
  useUpdateMcqBoardMutation
} = mcqBoardApi;
