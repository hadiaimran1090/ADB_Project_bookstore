import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdIncompleteCircle } from "react-icons/md";
import Loading from "../../components/Loading";
import getBaseUrl from "../../utils/baseURL";
import RevenueChart from "./RevenueChart";
import { useGetOrdersQuery } from "../../redux/features/orders/ordersApi";

const Dashboard = () => {
  const [kpi, setKpi] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setKpi(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Orders fetch
  const {
    data: ordersData = [],
    isFetching: ordersLoading,
  } = useGetOrdersQuery();

  // Array ya object dono handle
  const orders = Array.isArray(ordersData)
    ? ordersData
    : Array.isArray(ordersData.orders)
    ? ordersData.orders
    : [];

  if (loading || ordersLoading) return <Loading />;

  return (
    <>
      {/* KPI CARDS */}
      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <KpiCard color="purple" value={kpi?.totalBooks} label="Products"
                 svgPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
        <KpiCard color="green" value={`$${kpi?.totalSales}`} label="Total sales"
                 svgPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
        <KpiCard color="red" value={kpi?.trendingBooks} label="Trending books (month)"
                 svgPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
        <KpiCard color="blue" value={kpi?.totalOrders} label="Total orders"
                 Icon={<MdIncompleteCircle className="w-6 h-6" />}/>
      </section>

      {/* CHART + LATEST ORDERS */}
      <section className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Revenue chart */}
        <div className="flex flex-col bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Orders per month</div>
          <div className="flex-grow flex items-center justify-center p-6">
            <RevenueChart />
          </div>
        </div>

        {/* Latest orders list */}
        <div className="flex flex-col bg-white shadow rounded-lg">
          <div className="px-6 py-5 font-semibold border-b border-gray-100">Latest orders</div>
          <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
            <ul className="p-6 space-y-4">
              {orders.length === 0 && <li className="text-gray-500">No orders yet.</li>}
              {orders.map((order, idx) => (
                <li key={order._id} className="text-sm border-b pb-2">
                  <p className="font-medium text-gray-700">
                    #{idx + 1} — {order.name} <span className="text-gray-500">({order.email})</span>
                  </p>
                  <p className="text-gray-600">Phone: {order.phone || "—"}</p>
                  <p className="text-gray-600">
                    Products:{" "}
                    {order.products && Array.isArray(order.products)
                      ? order.products.map((p, i) => (
                          <span key={p._id || i}>
                            {p.title}{" "}
                            <span className="text-xs text-gray-500">
                              (qty {p.quantity || 1})
                            </span>
                            {i !== order.products.length - 1 && ", "}
                          </span>
                        ))
                      : `${order.productIds?.length || 0} item(s)`}
                  </p>
                  <p className="text-gray-600">
                    Total: <span className="font-semibold">
                      ${Number(order.totalPrice).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    {order.address?.city}, {order.address?.state}, {order.address?.country} {order.address?.zipcode}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

const KpiCard = ({ color, value, label, svgPath, Icon = null }) => (
  <div className="flex items-center p-8 bg-white shadow rounded-lg">
    <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full mr-6 text-${color}-600 bg-${color}-100`}>
      {Icon ? Icon : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
             className="h-6 w-6">
          <path d={svgPath} />
        </svg>
      )}
    </div>
    <div>
      <span className="block text-2xl font-bold">{value ?? "—"}</span>
      <span className="block text-gray-500 capitalize">{label}</span>
    </div>
  </div>
);

export default Dashboard;// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MdIncompleteCircle } from "react-icons/md";
// import Loading from "../../components/Loading";
// import getBaseUrl from "../../utils/baseURL";
// import RevenueChart from "./RevenueChart";
// import { useGetOrdersQuery } from "../../redux/features/orders/ordersApi";

// const Dashboard = () => {
//   const [kpi, setKpi] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${getBaseUrl()}/api/admin`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setKpi(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Orders fetch
//   const {
//     data: ordersData = [],
//     isFetching: ordersLoading,
//   } = useGetOrdersQuery();

//   // Array ya object dono handle
//   const orders = Array.isArray(ordersData)
//     ? ordersData
//     : Array.isArray(ordersData.orders)
//     ? ordersData.orders
//     : [];

//   if (loading || ordersLoading) return <Loading />;

//   return (
//     <>
//       {/* KPI CARDS */}
//       <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <KpiCard color="purple" value={kpi?.totalBooks} label="Products"
//                  svgPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
//         <KpiCard color="green" value={`$${kpi?.totalSales}`} label="Total sales"
//                  svgPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
//         <KpiCard color="red" value={kpi?.trendingBooks} label="Trending books (month)"
//                  svgPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
//         <KpiCard color="blue" value={kpi?.totalOrders} label="Total orders"
//                  Icon={<MdIncompleteCircle className="w-6 h-6" />}/>
//       </section>

//       {/* CHART + LATEST ORDERS */}
//       <section className="grid md:grid-cols-2 gap-6 mt-6">
//         {/* Revenue chart */}
//         <div className="flex flex-col bg-white shadow rounded-lg">
//           <div className="px-6 py-5 font-semibold border-b border-gray-100">Orders per month</div>
//           <div className="flex-grow flex items-center justify-center p-6">
//             <RevenueChart />
//           </div>
//         </div>

//         {/* Latest orders list */}
//         <div className="flex flex-col bg-white shadow rounded-lg">
//           <div className="px-6 py-5 font-semibold border-b border-gray-100">Latest orders</div>
//           <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
//             <ul className="p-6 space-y-4">
//               {orders.length === 0 && <li className="text-gray-500">No orders yet.</li>}
//               {orders.map((order, idx) => (
//                 <li key={order._id} className="text-sm border-b pb-2">
//                   <p className="font-medium text-gray-700">
//                     #{idx + 1} — {order.name} <span className="text-gray-500">({order.email})</span>
//                   </p>
//                   <p className="text-gray-600">Phone: {order.phone || "—"}</p>
//                   <p className="text-gray-600">
//   Products:{" "}
//   {order.products && Array.isArray(order.products)
//     ? order.products.reduce((sum, p) => sum + (p.quantity || 1), 0) + " item(s)"
//     : `${order.productIds?.length || 0} item(s)`}
// </p>
//                   <p className="text-gray-600">
//                     Total: <span className="font-semibold">
//                       ${Number(order.totalPrice).toFixed(2)}
//                     </span>
//                   </p>
//                   <p className="text-gray-600">
//                     {order.address?.city}, {order.address?.state}, {order.address?.country} {order.address?.zipcode}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// const KpiCard = ({ color, value, label, svgPath, Icon = null }) => (
//   <div className="flex items-center p-8 bg-white shadow rounded-lg">
//     <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full mr-6 text-${color}-600 bg-${color}-100`}>
//       {Icon ? Icon : (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
//              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
//              className="h-6 w-6">
//           <path d={svgPath} />
//         </svg>
//       )}
//     </div>
//     <div>
//       <span className="block text-2xl font-bold">{value ?? "—"}</span>
//       <span className="block text-gray-500 capitalize">{label}</span>
//     </div>
//   </div>
// );

// export default Dashboard;// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MdIncompleteCircle } from "react-icons/md";
// import Loading from "../../components/Loading";
// import getBaseUrl from "../../utils/baseURL";
// import RevenueChart from "./RevenueChart";
// import { useGetOrdersQuery } from "../../redux/features/orders/ordersApi";

// const Dashboard = () => {
//   const [kpi, setKpi] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${getBaseUrl()}/api/admin`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setKpi(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   // Orders fetch
//   const {
//     data: ordersData = [],
//     isFetching: ordersLoading,
//   } = useGetOrdersQuery();

//   // Array ya object dono handle
//   const orders = Array.isArray(ordersData)
//     ? ordersData
//     : Array.isArray(ordersData.orders)
//     ? ordersData.orders
//     : [];

//   if (loading || ordersLoading) return <Loading />;

//   return (
//     <>
//       {/* KPI CARDS */}
//       <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <KpiCard color="purple" value={kpi?.totalBooks} label="Products"
//                  svgPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
//         <KpiCard color="green" value={`$${kpi?.totalSales}`} label="Total sales"
//                  svgPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
//         <KpiCard color="red" value={kpi?.trendingBooks} label="Trending books (month)"
//                  svgPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
//         <KpiCard color="blue" value={kpi?.totalOrders} label="Total orders"
//                  Icon={<MdIncompleteCircle className="w-6 h-6" />}/>
//       </section>

//       {/* CHART + LATEST ORDERS */}
//       <section className="grid md:grid-cols-2 gap-6 mt-6">
//         {/* Revenue chart */}
//         <div className="flex flex-col bg-white shadow rounded-lg">
//           <div className="px-6 py-5 font-semibold border-b border-gray-100">Orders per month</div>
//           <div className="flex-grow flex items-center justify-center p-6">
//             <RevenueChart />
//           </div>
//         </div>

//         {/* Latest orders list */}
//         <div className="flex flex-col bg-white shadow rounded-lg">
//           <div className="px-6 py-5 font-semibold border-b border-gray-100">Latest orders</div>
//           <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
//             <ul className="p-6 space-y-4">
//               {orders.length === 0 && <li className="text-gray-500">No orders yet.</li>}
//               {orders.map((order, idx) => (
//                 <li key={order._id} className="text-sm border-b pb-2">
//                   <p className="font-medium text-gray-700">
//                     #{idx + 1} — {order.name} <span className="text-gray-500">({order.email})</span>
//                   </p>
//                   <p className="text-gray-600">Phone: {order.phone || "—"}</p>
//                   <p className="text-gray-600">
//                     Products: {order.productIds?.length || 0} item(s)
//                   </p>
//                   <p className="text-gray-600">
//                     Total: <span className="font-semibold">
//                       ${Number(order.totalPrice).toFixed(2)}
//                     </span>
//                   </p>
//                   <p className="text-gray-600">
//                     {order.address?.city}, {order.address?.state}, {order.address?.country} {order.address?.zipcode}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// const KpiCard = ({ color, value, label, svgPath, Icon = null }) => (
//   <div className="flex items-center p-8 bg-white shadow rounded-lg">
//     <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full mr-6 text-${color}-600 bg-${color}-100`}>
//       {Icon ? Icon : (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
//              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
//              className="h-6 w-6">
//           <path d={svgPath} />
//         </svg>
//       )}
//     </div>
//     <div>
//       <span className="block text-2xl font-bold">{value ?? "—"}</span>
//       <span className="block text-gray-500 capitalize">{label}</span>
//     </div>
//   </div>
// );

// export default Dashboard;





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { MdIncompleteCircle } from "react-icons/md";
// import Loading from "../../components/Loading";
// import getBaseUrl from "../../utils/baseURL";
// import RevenueChart from "./RevenueChart";

// // RTK-Query
// import { useGetOrdersQuery } from "../../redux/features/orders/ordersApi";

// const Dashboard = () => {
//   /* ────── KPI CARDS ────── */
//   const [kpi, setKpi] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       try {
//         const res = await axios.get(`${getBaseUrl()}/api/admin`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         setKpi(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   /* ────── Latest orders ────── */
//   const {
//     data: orders = [],
//     isFetching: ordersLoading,
//   } = useGetOrdersQuery();

//   if (loading || ordersLoading) return <Loading />;

//   return (
//     <>
//       {/* KPI CARDS */}
//       <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
//         <KpiCard color="purple" value={kpi?.totalBooks} label="Products"
//                  svgPath="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
//         <KpiCard color="green" value={`$${kpi?.totalSales}`} label="Total sales"
//                  svgPath="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
//         <KpiCard color="red" value={kpi?.trendingBooks} label="Trending books (month)"
//                  svgPath="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"/>
//         <KpiCard color="blue" value={kpi?.totalOrders} label="Total orders"
//                  Icon={<MdIncompleteCircle className="w-6 h-6" />}/>
//       </section>

//       {/* CHART + LATEST ORDERS */}
//       <section className="grid md:grid-cols-2 gap-6 mt-6">
//         {/* Revenue chart */}
//         <div className="flex flex-col bg-white shadow rounded-lg">
//           <div className="px-6 py-5 font-semibold border-b border-gray-100">Orders per month</div>
//           <div className="flex-grow flex items-center justify-center p-6">
//             <RevenueChart />
//           </div>
//         </div>

//         {/* Latest orders list */}
//         <div className="flex flex-col bg-white shadow rounded-lg">
//           <div className="px-6 py-5 font-semibold border-b border-gray-100">Latest orders</div>
//           <div className="overflow-y-auto" style={{ maxHeight: "24rem" }}>
//             <ul className="p-6 space-y-4">
//               {orders.length === 0 && <li className="text-gray-500">No orders yet.</li>}

//               {orders.map((order, idx) => (
//                 <li key={order._id} className="text-sm border-b pb-2">
//                   <p className="font-medium text-gray-700">
//                     #{idx + 1} — {order.name} <span className="text-gray-500">({order.email})</span>
//                   </p>

//                   <p className="text-gray-600">Phone: {order.phone || "—"}</p>

//                   <p className="text-gray-600">
//                     Products: {order.productIds?.length || 0} item(s)
//                   </p>

//                   <p className="text-gray-600">
//                     Total: <span className="font-semibold">
//                       ${Number(order.totalPrice).toFixed(2)}
//                     </span>
//                   </p>

//                   <p className="text-gray-600">
//                     {order.address?.city}, {order.address?.state}, {order.address?.country} {order.address?.zipcode}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// /* Reusable KPI card */
// const KpiCard = ({ color, value, label, svgPath, Icon = null }) => (
//   <div className="flex items-center p-8 bg-white shadow rounded-lg">
//     <div className={`inline-flex h-16 w-16 items-center justify-center rounded-full mr-6 text-${color}-600 bg-${color}-100`}>
//       {Icon ? Icon : (
//         <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
//              strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
//              className="h-6 w-6">
//           <path d={svgPath} />
//         </svg>
//       )}
//     </div>
//     <div>
//       <span className="block text-2xl font-bold">{value ?? "—"}</span>
//       <span className="block text-gray-500 capitalize">{label}</span>
//     </div>
//   </div>
// );

// export default Dashboard;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import Loading from '../../components/Loading';
// import getBaseUrl from '../../utils/baseURL';
// import { MdIncompleteCircle } from 'react-icons/md'
// import RevenueChart from './RevenueChart';

// const Dashboard = () => {
//     const [loading, setLoading] = useState(true);
//     const [data, setData] = useState({});
//     // console.log(data)
//     const navigate = useNavigate()
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response =  await axios.get(`${getBaseUrl()}/api/admin`, {
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'application/json',
//                     },
//                 })

//                 setData(response.data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
//         }

//         fetchData();
//     }, []);

//     // console.log(data)

//     if(loading) return <Loading/>

//   return (
//     <>
//      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
//               <div className="flex items-center p-8 bg-white shadow rounded-lg">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
//                 <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                   </svg>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold">{data?.totalBooks}</span>
//                   <span className="block text-gray-500">Products</span>
//                 </div>
//               </div>
//               <div className="flex items-center p-8 bg-white shadow rounded-lg">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
//                   <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//                   </svg>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold">${data?.totalSales}</span>
//                   <span className="block text-gray-500">Total Sales</span>
//                 </div>
//               </div>
//               <div className="flex items-center p-8 bg-white shadow rounded-lg">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
//                   <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
//                   </svg>
//                 </div>
//                 <div>
//                   <span className="inline-block text-2xl font-bold">{data?.trendingBooks}</span>
//                   <span className="inline-block text-xl text-gray-500 font-semibold">(13%)</span>
//                   <span className="block text-gray-500">Trending Books in This Month</span>
//                 </div>
//               </div>
//               <div className="flex items-center p-8 bg-white shadow rounded-lg">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
//                 <MdIncompleteCircle className='size-6'/>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold">{data?.totalOrders}</span>
//                   <span className="block text-gray-500">Total Orders</span>
//                 </div>
//               </div>
//             </section>
//             <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6">
//               <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
//                 <div className="px-6 py-5 font-semibold border-b border-gray-100">The number of orders per month</div>
//                 <div className="p-4 flex-grow">
//                   <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
//                   <RevenueChart />
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center p-8 bg-white shadow rounded-lg">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
//                   <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
//                     <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
//                     <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
//                   </svg>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold">02</span>
//                   <span className="block text-gray-500">Orders left</span>
//                 </div>
//               </div>
//               <div className="flex items-center p-8 bg-white shadow rounded-lg">
//                 <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
//                   <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div>
//                   <span className="block text-2xl font-bold">139</span>
//                   <span className="block text-gray-500">Website visits (last day)</span>
//                 </div>
//               </div>
//               <div className="row-span-3 bg-white shadow rounded-lg">
//                 <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
//                   <span>Users by average order</span>
//                   <button type="button" className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600" id="options-menu" aria-haspopup="true" aria-expanded="true">
//                     Descending
//                     <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </button>
    
//                 </div>
//                 <div className="overflow-y-auto" style={{maxHeight: '24rem'}}>
//                   <ul className="p-6 space-y-6">
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="data:image/jpeg;base64,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" alt="Annette Watson profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Ayesha gul</span>
//                       <span className="ml-auto font-semibold">9.3</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbnn0BUDxao82xFZcvu8Xn6i1bxVgpfO8gpQ&s" alt="Calvin Steward profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Ali Hassan</span>
//                       <span className="ml-auto font-semibold">8.9</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7eEyjFjs0LQvDkkFvhQtTidqf-KxCwx-6kw&s" alt="Ralph Richards profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Ahmad</span>
//                       <span className="ml-auto font-semibold">8.7</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMcurCPRPk2o3O5usdqWn3hVPfgDiX0-0VEA&s" alt="Bernard Murphy profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Amna</span>
//                       <span className="ml-auto font-semibold">8.2</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPLMtHetLolJLAzD8sEa0BHNPYlkW7vBFGJA&s" alt="Arlene Robertson profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Abdullah</span>
//                       <span className="ml-auto font-semibold">8.2</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRISaUk0_zc1fXi4V9xKxVtCoMK_mU7IWPe2Q&s" alt="Jane Lane profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Abdur rehman</span>
//                       <span className="ml-auto font-semibold">8.1</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV7E2dZ5YszppWGW6xMuAzDbzouzO2AnMP5A&s" alt="Pat Mckinney profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Fatima</span>
//                       <span className="ml-auto font-semibold">7.9</span>
//                     </li>
//                     <li className="flex items-center">
//                       <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
//                         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzKU-gZYK_nMLLugy0F8KGpHg5O4S8HzDfmA&s" alt="Norman Walters profile picture"/>
//                       </div>
//                       <span className="text-gray-600">Rimsha</span>
//                       <span className="ml-auto font-semibold">7.7</span>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//               {/* <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
//                 <div className="px-6 py-5 font-semibold border-b border-gray-100">Students by type of studying</div>
//                 <div className="p-4 flex-grow">
//                   <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">Chart</div>
//                 </div>
//               </div> */}
//             </section>
//             {/* <section className="text-right font-semibold text-gray-500">
//               <a href="#" className="text-purple-600 hover:underline">Recreated on Codepen</a> with <a href="https://tailwindcss.com/" className="text-teal-400 hover:underline">Tailwind CSS</a> by Azri Kahar, <a href="https://dribbble.com/shots/10711741-Free-UI-Kit-for-Figma-Online-Courses-Dashboard" className="text-purple-600 hover:underline">original design</a> made by Chili Labs
//             </section> */}
//     </>
//   )
// }

// export default Dashboard