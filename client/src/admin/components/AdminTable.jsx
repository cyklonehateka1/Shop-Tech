import React from "react";
import "../styles/adminTable.css";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ rows, columns, pagination, pageSize, rowClickData }) => {
  const rowClickHandler = (e) => {
    rowClickData(e);
  };
  return (
    <div className="adminTable">
      <div className="tableCont">
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pagination]}
          onRowClick={rowClickHandler}
        />
      </div>
    </div>
  );
};

export default Table;
