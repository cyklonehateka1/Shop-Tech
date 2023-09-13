import { Avatar } from "@mui/material";
export const productsPageCol = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "profileImg",
    headerName: "img",
    width: 90,
    renderCell: (params) => <Avatar src={`/uploads/${params.value}`} />,
  },
  {
    field: "name",
    headerName: "Product Name",
    width: 130,
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 90,
  },
  {
    field: "model",
    headerName: "Model",
    width: 90,
  },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: 90,
  },
  {
    field: "quantity",
    headerName: "Qty",
    width: 90,
  },

  {
    field: "colors",
    headerName: "Colors",
    width: 90,
  },
  {
    field: "onDiscount",
    headerName: "On Discount",
    width: 90,
    type: "boolean",
  },
];
