import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqClassApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqClass: builder.mutation({
      query: (data) => ({
        url: "/classes",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Class"],
    }),
    getAllMcqClasses: builder.query({
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
          url: `/classes?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Class"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqClass: builder.mutation({
      query: ({ id, data }) => ({
        url: `/classes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Class"],
    }),
    deleteMcqClass: builder.mutation({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Class"],
    }),
    getSingleMcqClass: builder.query({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "GET",
      }),
      providesTags: ["Class"],
    }),
  }),
});

export const {
  useCreateMcqClassMutation,
  useDeleteMcqClassMutation,
  useGetAllMcqClassesQuery,
  useGetSingleMcqClassQuery,
  useUpdateMcqClassMutation
} = mcqClassApi;
