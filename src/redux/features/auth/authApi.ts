import { TResponseRedux } from "@/types";
import { baseApi } from "../../api/baseApi";
import { TUser } from "./authSlice";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUsers: builder.query({
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
          url: `/auth/users?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: ["User"],
      transformResponse: (response: TResponseRedux<TUser[]>) => ({
        data: response.data,
        meta: response.meta,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetAllUsersQuery } =
  authApi;
