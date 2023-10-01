import React, { useEffect, useState } from "react";
import "../styles/adminCharts.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { chartData } from "../utils/data";
import { getMethods } from "../../utils/protectedRoutes";

const Charts = () => {
  const [salesData, setSalesData] = useState([]);
  useEffect(() => {
    const getChartData = async () => {
      let data = [];
      try {
        const res = await getMethods("/sales/get/monthly");
        for (let i = 0; i < res.data.length; i++) {
          const item = res.data[i];
          data.push({
            name: item._id,
            amt: item.sale,
          });
        }
        setSalesData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChartData();
  }, []);
  return (
    <div className="charts">
      <div className="chartsCont">
        <h5>Sales for the past 30 days</h5>
        <div className="diagramCont">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={800}
              height={250}
              data={salesData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="uv"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
              />
              <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="amt"
                stackId="1"
                stroke="#ffc658"
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
