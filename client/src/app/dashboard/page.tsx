"use client"

import CardPopularProducts from "./CardPopularProducts"

type Props = {}

const Dashboard = (props: Props) => {
  console.log(`💳%cpage.tsx:9 - process.env.NEXT_PUBLIC_API_BASE_URL`, 'font-weight:bold; background:#2fd000;color:#fff;'); //DELETEME:
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL); // DELETEME:

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <div className="bg-gray-900 row-span-3 xl:row-span-6"></div>
      <div className="bg-gray-800 row-span-3 xl:row-span-6"></div>
      <div className="bg-gray-700 row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1"></div>
      <div className="row-span-3 bg-gray-600"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-400"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-300"></div>
    </div>
  )
}

export default Dashboard;
