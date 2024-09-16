"use client"

import Header from "@/app/(components)/Header";
import { useGetProductsQuery, useGetUsersQuery } from "@/state/api";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
]

const Users = () => {
  const { data: users, isError, isLoading } = useGetUsersQuery();
  console.log(`🕰️%cpage.tsx:7 - products`, 'font-weight:bold; background:#25da00;color:#fff;'); //DELETEME:
  console.log(users); // DELETEME:
  if (isLoading) {
    return (
      <div className="py-4">Loading...</div>
    );
  }

  if (isError || !users) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <Header name="Inventory" />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
