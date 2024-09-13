import { useGetDashboardMetricsQuery } from '@/state/api';

const clrs = ["#00C49F", "#0088FE", "#FFBB28"]

const CardExpenseSummary = () => {
  const { data: dashboardMetrics, isLoading, isError } = useGetDashboardMetricsQuery();
  return (
    <div className="row-span-3 bg-gray-600">
      CardExpenseSummary
    </div>
  );
};

export default CardExpenseSummary;
