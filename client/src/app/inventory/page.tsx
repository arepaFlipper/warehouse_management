"use client"

import Header from "@/app/(components)/Header";
import { useGetProductsQuery } from "@/state/api";

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();
  console.log(`🕰️%cpage.tsx:7 - products`, 'font-weight:bold; background:#25da00;color:#fff;'); //DELETEME:
  console.log(products); // DELETEME:
  if (isLoading) {
    return (
      <div className="py-4">Loading...</div>
    );
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
    </div>
  );
};

export default Inventory;
