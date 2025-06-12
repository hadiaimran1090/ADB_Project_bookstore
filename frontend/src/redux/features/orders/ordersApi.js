import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrderByEmail: builder.query({
      query: (email) => `/orders/email/${email}`,
      providesTags: ["Orders"],
    }),
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Orders"],
    }),
    // Add getNotifications for admin notifications
    getNotifications: builder.query({
      query: () => "/notifications",
      providesTags: ["Orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderByEmailQuery,
  useGetOrdersQuery,
  useGetNotificationsQuery, // <-- add this for notifications
} = ordersApi;

export default ordersApi;
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import getBaseUrl from "../../../utils/baseURL";

// const ordersApi = createApi({
//   reducerPath: "ordersApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${getBaseUrl()}/api`,
//     credentials: "include",
//     prepareHeaders: (headers) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   tagTypes: ["Orders"],
//   endpoints: (builder) => ({
//     createOrder: builder.mutation({
//       query: (newOrder) => ({
//         url: "/orders",
//         method: "POST",
//         body: newOrder,
//       }),
//       invalidatesTags: ["Orders"],
//     }),
//     getOrderByEmail: builder.query({
//       query: (email) => `/orders/email/${email}`,
//       providesTags: ["Orders"],
//     }),
//     getOrders: builder.query({
//       query: () => "/orders",
//       providesTags: ["Orders"],
//     }),
//   }),
// });

// export const {
//   useCreateOrderMutation,
//   useGetOrderByEmailQuery,
//   useGetOrdersQuery,
// } = ordersApi;

// export default ordersApi;
// 
// 









// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import getBaseUrl from "../../../utils/baseURL";

// const ordersApi = createApi({
//   reducerPath: "ordersApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: `${getBaseUrl()}/api`, // ✅ FIXED: now it’s just /api
//     credentials: "include",
//   }),
//   tagTypes: ["Orders"],
//   endpoints: (builder) => ({
//     /* ── Create a new order ───────────────────── */
//     createOrder: builder.mutation({
//       query: (newOrder) => ({
//         url: "/orders", // ✅ POST to /api/orders
//         method: "POST",
//         body: newOrder,
//       }),
//       invalidatesTags: ["Orders"],
//     }),

//     /* ── Get orders by email ──────────────────── */
//     getOrderByEmail: builder.query({
//       query: (email) => `/orders/email/${email}`, // ✅ GET /api/orders/email/:email
//       providesTags: ["Orders"],
//     }),

//     /* ── Get all orders (for admin) ───────────── */
//     getOrders: builder.query({
//       query: () => "/orders", // ✅ GET /api/orders
//       providesTags: ["Orders"],
//     }),
//   }),
// });

// export const {
//   useCreateOrderMutation,
//   useGetOrderByEmailQuery,
//   useGetOrdersQuery,
// } = ordersApi;

// export default ordersApi;

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import getBaseUrl from "../../../utils/baseURL";


// const ordersApi = createApi({
//     reducerPath: 'ordersApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: `${getBaseUrl()}/api/orders`,
//         credentials: 'include'
//     }),
//     tagTypes: ['Orders'],
//     endpoints: (builder) => ({
//         createOrder: (builder.mutation) ({
//             query: (newOrder) => ({
//                 url: "/",
//                 method: "POST",
//                 body: newOrder,
//                 credentials: 'include',
//             })
//         }),
//         getOrderByEmail: (builder.query) ({
//             query: (email) => ({
//                 url: `/email/${email}`
//             }),
//             providesTags: ['Orders']
//         })
//     })
// })

// export const {useCreateOrderMutation, useGetOrderByEmailQuery} = ordersApi;

// export default ordersApi;