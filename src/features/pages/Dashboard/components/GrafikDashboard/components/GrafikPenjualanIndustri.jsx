import moment from "moment";
import React, { PureComponent } from "react";
import {
  BarChart as RechartBarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function BarChartTransaksi({ data }) {
  console.log("penjualan Industri", data);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartBarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tanggal" />
        {/* <YAxis /> */}
        <YAxis
          label={{
            value: "Jumlah Liter",
            angle: -90,
            position: "insideLeft",
            textAnchor: "middle",
          }}
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="Pertamax" fill="#8884d8" />
        <Bar dataKey="Pertalite" fill="#82ca9d" />
        <Bar dataKey="Dexlite" fill="#82ca33" />
      </RechartBarChart>
    </ResponsiveContainer>
  );
}

export default function GrafikPenjualanIndustri({ data, loading }) {
  return (
    <>
      <h3>Grafik Penjualan Industri</h3>
      {!loading ? (
        data?.length > 0 ? (
          <BarChartTransaksi data={data} />
        ) : (
          <>Tidak ada Data</>
        )
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
