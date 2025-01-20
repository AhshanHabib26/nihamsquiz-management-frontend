import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqSubjectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqSubject: builder.mutation({
      query: (data) => ({
        url: "/subject",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Subject"],
    }),
    getAllMcqSubjectes: builder.query({
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
          url: `/subject?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Subject"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqSubject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/subject/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Subject"],
    }),
    deleteMcqSubject: builder.mutation({
      query: (id) => ({
        url: `/subject/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Subject"],
    }),
    getSingleMcqSubject: builder.query({
      query: (id) => ({
        url: `/subject/${id}`,
        method: "GET",
      }),
      providesTags: ["Subject"],
    }),
  }),
});

export const {
  useCreateMcqSubjectMutation,
  useDeleteMcqSubjectMutation,
  useGetAllMcqSubjectesQuery,
  useGetSingleMcqSubjectQuery,
  useUpdateMcqSubjectMutation
} = mcqSubjectApi;
