import { Avatar } from "@mui/material";

export const chartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export const tableColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 130,
    renderCell: (params) => (
      <Avatar src="https://i.ibb.co/mymMxyv/download-2.png" />
    ),
  },
  // { field: "products", headerName: "Products", width: 230, type: "array" },/
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 90,
  },
  {
    field: "address",
    headerName: "Address",
    type: "number",
  },
];

export const tableRows = [
  {
    id: 1,
    customerName: "Snow",
    products: ["Garri", "Condom", "Paracetamol"],
    amount: 305,
    address: "Accra, Airpot City",
  },
  {
    id: 2,
    customerName: "Eric Bosomtwe",
    products: ["Beef", "Cheevon", "Mutton"],
    amount: 705,
    address: "Accra, East Legon",
  },
  {
    id: 3,
    customerName: "Maik Young",
    products: ["Selfie stick", "Turtle Neck", "Fake Chainz"],
    amount: 25,
    address: "Accra, Airpot City",
  },
  {
    id: 1,
    customerName: "Snow",
    products: ["Garri", "Condom", "Paracetamol"],
    amount: 305,
    address: "Accra, Airpot City",
  },
  {
    id: 2,
    customerName: "Eric Bosomtwe",
    products: ["Beef", "Cheevon", "Mutton"],
    amount: 705,
    address: "Accra, East Legon",
  },
];

export const ordersPageColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "customerName",
    headerName: "Customer Name",
    width: 130,
  },
  { field: "products", headerName: "Products", width: 230, type: "array" },
  {
    field: "amount",
    headerName: "Amount",
    type: "number",
    width: 90,
  },
  {
    field: "address",
    headerName: "Address",
    type: "number",
  },
];

export const ordersPageRows = [
  {
    id: 1,
    customerName: "Snow",
    products: ["Garri", "Condom", "Paracetamol"],
    amount: 305,
    address: "Accra, Airpot City",
  },
  {
    id: 2,
    customerName: "Eric Bosomtwe",
    products: ["Beef", "Cheevon", "Mutton"],
    amount: 705,
    address: "Accra, East Legon",
  },
  {
    id: 3,
    customerName: "Maik Young",
    products: ["Selfie stick", "Turtle Neck", "Fake Chainz"],
    amount: 25,
    address: "Accra, Airpot City",
  },
  {
    id: 4,
    customerName: "Snow",
    products: ["Garri", "Condom", "Paracetamol"],
    amount: 305,
    address: "Accra, Airpot City",
  },
  {
    id: 5,
    customerName: "Eric Bosomtwe",
    products: ["Beef", "Cheevon", "Mutton"],
    amount: 705,
    address: "Accra, East Legon",
  },
  {
    id: 6,
    customerName: "Maik Young",
    products: ["Selfie stick", "Turtle Neck", "Fake Chainz"],
    amount: 25,
    address: "Accra, Airpot City",
  },
  {
    id: 7,
    customerName: "Eric Bosomtwe",
    products: ["Beef", "Cheevon", "Mutton"],
    amount: 705,
    address: "Accra, East Legon",
  },
  {
    id: 8,
    customerName: "Eric Bosomtwe",
    products: ["Beef", "Cheevon", "Mutton"],
    amount: 705,
    address: "Accra, East Legon",
  },
  {
    id: 9,
    customerName: "Maik Young",
    products: ["Selfie stick", "Turtle Neck", "Fake Chainz"],
    amount: 25,
    address: "Accra, Airpot City",
  },
  {
    id: 10,
    customerName: "Eric Bosomtwe",
    products: ["Beef", "Cheevon", "Mutton"],
    amount: 705,
    address: "Accra, East Legon",
  },
  {
    id: 11,
    customerName: "Maik Young",
    products: ["Selfie stick", "Turtle Neck", "Fake Chainz"],
    amount: 25,
    address: "Accra, Airpot City",
  },
];

export const orderProductsCol = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "img",
    headerName: "img",
    width: 90,
    renderCell: (params) => (
      <Avatar src="https://i.ibb.co/mymMxyv/download-2.png" />
    ),
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 130,
  },
  {
    field: "quantity",
    headerName: "Qty",
    width: 90,
  },
  // { field: "products", headerName: "Products", width: 230, type: "array" },/
  {
    field: "Price",
    headerName: "Price",
    type: "number",
    width: 90,
  },

  {
    field: "color",
    headerName: "Color",
    width: 90,
  },
  {
    field: "size",
    headerName: "Size",
    width: 90,
  },
];

export const orderProductRow = [
  {
    id: 1,
    img: 305,
    productName: "Snow",
    price: "$25",
    quantity: 8,
    color: "Yello",
    size: "m",
  },
  {
    id: 2,
    img: "https://sneakernews.com/wp-content/uploads/2022/02/Nike-Air-Max-90-DH4619-003-6.jpg",
    productName: "Airmax",
    price: "$125",
    quantity: 1,
    color: "Green",
    size: "xxxl",
  },
  {
    id: 3,
    img: "https://cf.shopee.ph/file/4aec028a1c574b473ab8563f1cab0549",
    productName: "Vans",
    price: "$273",
    quantity: 18,
    color: "Green",
    size: "xxxl",
  },
  {
    id: 4,
    img: "https://reapp.com.gh/wp-content/uploads/2022/03/hn1.jpg",
    productName: "Chrome Book Laptop",
    price: "$780",
    quantity: 1,
    color: "Grey",
    size: "19 inches",
  },
  {
    id: 5,
    img: "https://reapp.com.gh/wp-content/uploads/2022/03/hn1.jpg",
    productName: "Chrome Book Laptop",
    quantity: 1,
    price: "$780",
    color: "Grey",
    size: "19 inches",
  },
  {
    id: 6,
    img: "https://kpakpakpamarket.com/wp-content/uploads/2022/05/HUAWEI-MATEBOOK-X-PRO-2021-I7-16GB-1TB-MX250-TOUCH-SPACE-GRAY-FREE-FREE-BT-MOUSE-BAND-4-BACKPACK-SPEAKER-jpg.webp",
    productName: "Huawei MateBook Pro",
    quantity: 1,
    price: "$980",
    color: "Grey",
    size: "13.1 inches",
  },
  {
    id: 7,
    img: "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_07/3225886/200211-broomstick-stock-cs-131p.jpg",
    productName: "Broom",
    quantity: 1,
    price: "$2",
    color: "Yellow",
    size: "4ft high",
  },
  {
    id: 8,
    img: "https://m.media-amazon.com/images/I/61kW0uboBzL._SL1500_.jpg",
    productName: "Mop Bucket",
    quantity: 1,
    price: "$20",
    color: "Red",
    size: "20 liters",
  },
  {
    id: 9,
    img: "https://lzd-img-global.slatic.net/g/p/1c66311e221b12311d06deebfd9b8f7a.jpg_1200x1200q80.jpg_.webp",
    productName: "Nokia 6500",
    quantity: 3,
    price: "$720",
    color: "Black",
    size: "4inches",
  },
  {
    id: 10,
    img: "https://m.media-amazon.com/images/I/919ZMTHDPBL.jpg",
    productName: "JavaScript Book",
    quantity: 1,
    price: "$80",
    color: "White",
    size: "700 pages",
  },
  {
    id: 11,
    img: "https://media.ed.edmunds-media.com/land-rover/range-rover-sport/2021/oem/2021_land-rover_range-rover-sport_4dr-suv_p525-hse-dynamic_fq_oem_1_600.jpg",
    productName: "Range Rover Sport",
    quantity: 1,
    price: "$150k",
    color: "Black",
    size: "L",
  },
];
