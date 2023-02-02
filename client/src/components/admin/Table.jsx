import React from "react";
import "../../styles/admin/table.css";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, pagination, pageSize }) => {
  return (
    <div className="table">
      <div className="tableCont">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pagination]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default Table;
