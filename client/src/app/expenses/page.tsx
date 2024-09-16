"use client";

import { useGetExpensesByCategoryQuery } from "@/state/api";
import { useMemo, useState } from "react";
import Header from "../(components)/Header";

type Props = {}

const Expenses = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: expensesData, isLoading, isError } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);
  if (isLoading) {
    return (
      <div className="py-4">Loading...</div>
    );
  };

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>
    );
  }

  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput: "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  }
  return (
    <div>
      {/* NOTE: HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* NOTE: HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 ">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="category" className={classNames.label}>Category</label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(event) => setSelectedCategory(event.target.value)}
              >
                {["All", "Office", "Professional", "Salaries"].map((opt) => {
                  return (
                    <option key={opt}>{opt}</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Expenses
