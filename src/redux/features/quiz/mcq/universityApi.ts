import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqUniversityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqUniversity: builder.mutation({
      query: (data) => ({
        url: "/university",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["University"],
    }),
    getAllMcqUniversities: builder.query({
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
          url: `/university?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["University"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqUniversity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/university/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["University"],
    }),
    deleteMcqUniversity: builder.mutation({
      query: (id) => ({
        url: `/university/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["University"],
    }),
    getSingleMcqUniversity: builder.query({
      query: (id) => ({
        url: `/university/${id}`,
        method: "GET",
      }),
      providesTags: ["University"],
    }),
  }),
});

export const {
  useCreateMcqUniversityMutation,
  useDeleteMcqUniversityMutation,
  useGetAllMcqUniversitiesQuery,
  useGetSingleMcqUniversityQuery,
  useUpdateMcqUniversityMutation
} = mcqUniversityApi;
