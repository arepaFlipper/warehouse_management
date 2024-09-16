"use client";

import { ExpenseByCategorySummary, useGetExpensesByCategoryQuery } from "@/state/api";
import { useMemo, useState } from "react";
import Header from "../(components)/Header";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {}

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

type AggregatedData = {
  [category: string]: AggregatedDataItem
};

const Expenses = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: expensesData, isLoading, isError } = useGetExpensesByCategoryQuery();

  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    const filtered: AggregatedData = expenses.filter((data: ExpenseByCategorySummary) => {
      const matchesCategory = selectedCategory === "ALl" || data.category === selectedCategory;
      const dataDate = parseDate(data.date);
      const matchesDate = !startDate || !endDate || (dataDate >= startDate && dataDate <= endDate);
      return matchesCategory && matchesDate;
    }).reduce((acc: AggregatedData, data: ExpenseByCategorySummary) => {
      const amount = parseInt(data.amount);
      if (!acc[data.category]) {
        acc[data.category] = { name: data.category, amount: 0 };
        acc[data.category].color = `#${Math.floor(Math.random() * 16777215).toString(16)}`
        acc[data.category].amount += amount;
      }
      return acc;
    }, {});
    return Object.values(filtered);
  }, [expenses, selectedCategory, startDate, endDate]);

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

            {/* NOTE: CATEGORY */}
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

            {/* NOTE: START DATE */}
            <div>
              <label htmlFor="start_date" className={classNames.label}>Start Date</label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                className={classNames.selectInput}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </div>

            {/* NOTE: END DATE */}
            <div>
              <label htmlFor="end_date" className={classNames.label}>End Date</label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                className={classNames.selectInput}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </div>

            {/* NOTE: PIE CHART */}
            <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6 ">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={aggregatedData}
                    cx="50%"
                    cy="50%"
                    label
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="amount"
                    onMouseEnter={(_, index) => setActiveIndex(index)}
                  >
                    {aggregatedData.map((entry: AggregatedDataItem, index: number) => {
                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={(index === activeIndex) ? "rgb(29,78,216)" : entry.color}
                        />
                      )
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Expenses

