import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqYearApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqYear: builder.mutation({
      query: (data) => ({
        url: "/year",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Year"],
    }),
    getAllMcqYear: builder.query({
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
          url: `/year?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Year"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqYear: builder.mutation({
      query: ({ id, data }) => ({
        url: `/year/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Year"],
    }),
    deleteMcqYear: builder.mutation({
      query: (id) => ({
        url: `/year/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Year"],
    }),
    getSingleMcqYear: builder.query({
      query: (id) => ({
        url: `/year/${id}`,
        method: "GET",
      }),
      providesTags: ["Year"],
    }),
  }),
});

export const {
  useCreateMcqYearMutation,
  useDeleteMcqYearMutation,
  useGetAllMcqYearQuery,
  useGetSingleMcqYearQuery,
  useUpdateMcqYearMutation
} = mcqYearApi;
