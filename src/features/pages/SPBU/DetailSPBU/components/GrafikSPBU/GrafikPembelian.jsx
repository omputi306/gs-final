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
  function createDataGrafik(data) {
    const Data = [];
    data?.map((item) => {
      let obj = { tanggal: moment(item.tanggalInvoice).format("DD MMMM YYYY") };
      item.produks?.map((data) => {
        obj[data.jenisProduk] = data.jumlahLiter;
      });
      Data.push(obj);
    });
    return Data;
  }
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartBarChart
        width={500}
        height={300}
        data={createDataGrafik(data)}
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

export default function GrafikPembelian({ data, loading }) {
  return (
    <>
      <h3>Grafik Pembelian</h3>
      {!loading ? <BarChartTransaksi data={data} /> : <>Loading...</>}
    </>
  );
}
