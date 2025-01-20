import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqSchoolApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqSchool: builder.mutation({
      query: (data) => ({
        url: "/school",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["School"],
    }),
    getAllMcqSchools: builder.query({
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
          url: `/school?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["School"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqSchool: builder.mutation({
      query: ({ id, data }) => ({
        url: `/school/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["School"],
    }),
    deleteMcqSchool: builder.mutation({
      query: (id) => ({
        url: `/school/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["School"],
    }),
    getSingleMcqSchool: builder.query({
      query: (id) => ({
        url: `/school/${id}`,
        method: "GET",
      }),
      providesTags: ["School"],
    }),
  }),
});

export const {
  useCreateMcqSchoolMutation,
  useDeleteMcqSchoolMutation,
  useGetAllMcqSchoolsQuery,
  useGetSingleMcqSchoolQuery,
  useUpdateMcqSchoolMutation
} = mcqSchoolApi;
