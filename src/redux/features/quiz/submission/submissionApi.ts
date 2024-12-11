import { baseApi } from "@/redux/api/baseApi";

const submissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    reservePointsQuiz: builder.mutation({
      query: (id) => ({
        url: `/submission/reserve-points/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Quiz"],
    }),
    submitQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/submission/submit-quiz/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Submission"],
    }),
    getSubmissionQuiz: builder.query({
      query: (id) => ({
        url: `/submission/get-quiz-result/${id}`,
        method: "GET",
      }),
      providesTags: ["Submission"],
    }),
    getUserQuizSubmissions: builder.query({
      query: () => ({
        url: "/submission/quiz-submissions",
        method: "GET",
      }),
      providesTags: ["Submission"],
    }),
    getUserQuizProgressReport: builder.query({
      query: () => ({
        url: "/submission/user-progress-report",
        method: "GET",
      }),
      providesTags: ["Submission"],
    }),
  }),
});

export const {
  useGetSubmissionQuizQuery,
  useReservePointsQuizMutation,
  useGetUserQuizSubmissionsQuery,
  useSubmitQuizMutation,
  useGetUserQuizProgressReportQuery,
} = submissionApi;
