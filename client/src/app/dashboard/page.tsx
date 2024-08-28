"use client"

type Props = {}

const Dashboard = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <div className="bg-gray-500 row-span-3 xl:row-span-6"></div>
    </div>
  )
}

export default Dashboard;
