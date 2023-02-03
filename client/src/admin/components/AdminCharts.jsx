import React from "react";
import "../styles/adminCharts.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import { chartData } from "../utils/data";
const Charts = () => {
  return (
    <div className="charts">
      <div className="chartsCont">
        <h5>Revenue from last 12 months</h5>
        <div className="diagramCont">
          <LineChart
            width={800}
            height={250}
            data={chartData}
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
            <Legend />
            <Line
              type="monotone"
              dataKey="pv"
              stroke="green"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="uv" stroke="red" />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Charts;
