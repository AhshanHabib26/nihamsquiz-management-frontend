import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux } from "@/types";
import { TMcq } from "@/types/common.data";

const mcqTopicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMcqTopic: builder.mutation({
      query: (data) => ({
        url: "/topic",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Topic"],
    }),
    getAllMcqTopices: builder.query({
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
          url: `/topic?${params.toString()}`,
          method: "GET",
        };
      },
      keepUnusedDataFor: 600,
      providesTags: ["Topic"],
      transformResponse: (response: TResponseRedux<TMcq[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),

    updateMcqTopic: builder.mutation({
      query: ({ id, data }) => ({
        url: `/topic/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Topic"],
    }),
    deleteMcqTopic: builder.mutation({
      query: (id) => ({
        url: `/topic/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Topic"],
    }),
    getSingleMcqTopic: builder.query({
      query: (id) => ({
        url: `/topic/${id}`,
        method: "GET",
      }),
      providesTags: ["Topic"],
    }),
  }),
});

export const {
  useCreateMcqTopicMutation,
  useDeleteMcqTopicMutation,
  useGetAllMcqTopicesQuery,
  useGetSingleMcqTopicQuery,
  useUpdateMcqTopicMutation
} = mcqTopicApi;
