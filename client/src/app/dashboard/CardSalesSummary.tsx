import { useGetDashboardMetricsQuery } from "@/state/api";
import { TrendingUp } from "lucide-react";
import React, { useState } from "react";
const CardSalesSummary = () => {
  const { data, isLoading, isError } = useGetDashboardMetricsQuery();
  console.log(`📣 %cCardSalesSummary.tsx:6 - data`, 'font-weight:bold; background:#20df00;color:#fff;'); //DELETEME:
  console.log(data); // DELETEME:
  const salesData = data?.salesSummary || [];

  const [timeframe, setTimeframe] = useState("weekly");

  const totalValueSum = salesData.reduce((acc, curr) => {
    return acc + curr.totalValue
  }, 0) || 0;
  console.log(`🛣️%cCardSalesSummary.tsx:13 - totalValueSum`, 'font-weight:bold; background:#40bf00;color:#fff;'); //DELETEME:
  console.log(totalValueSum); // DELETEME:

  const averageChangePercentage = salesData.reduce((acc, curr, _, array) => {
    return acc + curr.changePercentage! / array.length;
  }, 0) || 0;
  console.log(`👅%cCardSalesSummary.tsx:17 - averageChangePercentage`, 'font-weight:bold; background:#4fb000;color:#fff;'); //DELETEME:
  console.log(averageChangePercentage); // DELETEME:

  if (isError) {
    return <div className="m-5">Failed to fetch data</div>;
  }

  return (
    <div className="row-span-3 xl:row-span-5 bg-sky-50 shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <div><h2 className="text-lg font-semibold mb-2 px-7 pt-5">Sales Summary</h2></div>

          {/* NOTE: BODY*/}
          <div>
            {/* NOTE: BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Value</p>
              </div>
              <span className="text-2xl font-extrabold">
                ${(totalValueSum / 1_000_000).toLocaleString("en", {
                  maximumFractionDigits: 2,
                })}m
              </span>
              <span className="text-green-500 text-sm ml-2">
                <TrendingUp className="inline w-4 h-4 mr-1" />
                {averageChangePercentage.toFixed(2)}%
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardSalesSummary;
