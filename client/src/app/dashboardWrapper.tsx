import Navbar from "./(components)/Navbar";

type Props = {
  children: React.ReactNode;
}

const DashboardWrapper = ({ children }: Props) => {
  return (
    <div className={`light flex bg-gray-50 text-gray-900 w-full min-h-screen`}>
      Sidebar
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  )
}

export default DashboardWrapper
