"use client"

import CardPopularProducts from "./CardPopularProducts"
import CardPurchaseSummary from "./CardPurchaseSummary"
import CardSalesSummary from "./CardSalesSummary"

type Props = {}

const Dashboard = (props: Props) => {
  console.log(`💳%cpage.tsx:9 - process.env.NEXT_PUBLIC_API_BASE_URL`, 'font-weight:bold; background:#2fd000;color:#fff;'); //DELETEME:
  console.log(process.env.NEXT_PUBLIC_API_BASE_URL); // DELETEME:

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <CardPopularProducts />
      <CardSalesSummary />
      <CardPurchaseSummary />
      <div className="row-span-3 bg-gray-600"></div>
      <div className="md:row-span-1 xl:row-span-3 bg-gray-500"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-400"></div>
      <div className="md:row-span-1 xl:row-span-2 bg-gray-300"></div>
    </div>
  )
}

export default Dashboard;
