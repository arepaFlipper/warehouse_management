import { useGetDashboardMetricsQuery, ExpenseByCategorySummary } from '@/state/api';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

const clrs = ["#00C49F", "#0088FE", "#FFBB28"]

type ExpenseSums = {
  [category: string]: number;
}

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading, isError } = useGetDashboardMetricsQuery();
  const expenseByCategorySummary = (dashboardMetrics?.expenseByCategorySummary) || [];

  const expenseSums = expenseByCategorySummary.reduce(
    (acc: ExpenseSums, item: ExpenseByCategorySummary) => {
      const category = item.category + " Expenses";
      const amount = parseInt(item.amount, 10);
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {}
  );
  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({ name, value, })
  )

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between ">
      {(isLoading) ? (
        <div className='m-5'>Loading...</div>
      ) : (
        <>
          {/* NOTE: HEADER*/}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>
          <div className="xl:flex justify-between pr-7">
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie data={expenseCategories} innerRadius={50} outerRadius={60} fill="#8884d8" dataKey="value" nameKey="name" cx="50%" cy="50%" >

                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
