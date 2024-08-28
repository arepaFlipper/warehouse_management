import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export interface Product {
  productId: string;
  name: string;
  price: number;
  rating: string;
  stockQuantity: number;
}

export interface SalesSummary {
  salesSUmmaryId: string;
  totalValue: number;
  chagePercentage?: number;
  date: string;
}

export interface PurchaseSummary {
  purcahseSummaryId: string;
  totalPucahsed: number;
  chagePercentage?: number;
  date: string;
}

export interface ExpenseSummary {
  expenseSummarId: string;
  totalExpenses: number;
  date: string;
}

export interface ExpenseByCategorySummary {
  expnseByCategorySummaryId: string;
  category: string;
  amount: string;
  date: string;
}

export interface DashboardMetrics {
  popularProducts: Product[];
  salesSummary: SalesSummary[];
  purchaseSummary: PurchaseSummary[];
  expenseSummary: ExpenseSummary[];
  expenseByCategorySummary: ExpenseByCategorySummary[];
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics"],
  endpoints: (build) => {
    return {
      getDashboardMethics: build.query<DashboardMetrics, void>({
        query: () => "/dashboard",
        providesTags: ["DashboardMetrics"],
      }),
    }
  },
});

export const { } = api;
