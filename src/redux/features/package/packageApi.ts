import { baseApi } from "../../api/baseApi";

const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Package"],
    }),
    getAllPackage: builder.query({
      query: () => ({
        url: "/packages",
        method: "GET",
      }),
      providesTags: ["Package"],
      keepUnusedDataFor: 600,
    }),
    updatePackage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Package"],
    }),
    getSinglePackage: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "GET",
      }),
      providesTags: ["Package"],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Package"],
    }),
  }),
});

export const {
  useCreatePackageMutation,
  useGetAllPackageQuery,
  useUpdatePackageMutation,
  useGetSinglePackageQuery,
  useDeletePackageMutation,
} = packageApi;
