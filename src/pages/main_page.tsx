import React, { useEffect, useState } from "react";
import BaseLayout from "../layouts/base";
import { Breadcrumb } from "../components/breadcrumb";
import axios from "axios";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { User } from "../interfaces/interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Month {
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
}

export default function MainPage() {
  const itemsBreadcrumb = ["Home", "Beranda"];
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalCreditByMonth, setTotalCreditByMonth] = useState<Month>();
  const [totalDebitByMonth, setTotalDebitByMonth] = useState<Month>();

  const [startDate, setStartDate] = useState<String>("");
  const [endDate, setEndDate] = useState<String>("");

  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetchUser();
    fetchTotalTransaction();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/user-login");
      const data: User = res.data.data;
      if (data.role !== "director") {
        alert("Anda Bukan Direktur");
        window.location.href = "/income";
      }
    } catch (error) {
      alert("Silahkan Login Terlebih Dahulu");
      window.location.href = "/";
      console.log(error);
    }
  };

  const fetchTotalTransaction = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/transaction/total-transaction
        ${startDate ? `?start_date=${startDate}` : ""}${
          endDate ? `&end_date=${endDate}` : ""
        }`
      );
      const data = res.data.data;
      setTotalIncome(data.total_debit);
      setTotalExpense(data.total_credit);
      setTotalCreditByMonth(data.total_credit_month);
      setTotalDebitByMonth(data.total_debit_month);
    } catch (error) {
      console.log(error);
    }
  };

  const lineChartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: "Pemasukan",
        data: [
          totalDebitByMonth?.january,
          totalDebitByMonth?.february,
          totalDebitByMonth?.march,
          totalDebitByMonth?.april,
          totalDebitByMonth?.may,
          totalDebitByMonth?.june,
          totalDebitByMonth?.july,
          totalDebitByMonth?.august,
          totalDebitByMonth?.september,
          totalDebitByMonth?.october,
          totalDebitByMonth?.november,
          totalDebitByMonth?.december,
        ],
        fill: false,
        borderColor: "green",
        tension: 0.4,
      },
      {
        label: "Pengeluaran",
        data: [
          totalCreditByMonth?.january,
          totalCreditByMonth?.february,
          totalCreditByMonth?.march,
          totalCreditByMonth?.april,
          totalCreditByMonth?.may,
          totalCreditByMonth?.june,
          totalCreditByMonth?.july,
          totalCreditByMonth?.august,
          totalCreditByMonth?.september,
          totalCreditByMonth?.october,
          totalCreditByMonth?.november,
          totalCreditByMonth?.december,
        ],
        fill: false,
        borderColor: "red",
        tension: 0.4,
      },
    ],
  };

  const handleFilterDate = () => {
    fetchTotalTransaction();
  };

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Beranda"
        paddingHorizontal={32}
      />
      <div className="h-8" />
      <div className="flex flex-col bg-success text-white justify-center items-center rounded mx-8 pt-8">
        <h4>Selamat Datang Di Villa Manis</h4>
        <h6>Gilang</h6>
        <div className="h-2" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="lightgray"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div className="h-8" />
        <div className="bg-white flex justify-end w-full py-4 px-4">
          <button className="bg-cyan-500 text-white rounded px-4 py-2">
            Ubah Profile
          </button>
          <div className="w-4" />
          <button className="bg-cyan-500 text-white rounded px-4 py-2">
            Ubah Password
          </button>
        </div>
      </div>
      <div className="h-4" />
      <div className="flex px-8 text-gray-700 items-center space-x-4">
        <p>Filter Berdasarkan Tanggal</p>
        <input
          type="date"
          className="border p-2"
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2"
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button
          onClick={handleFilterDate}
          className="bg-cyan-500 text-white rounded px-4 py-2"
        >
          Cari
        </button>
      </div>
      <div className="h-4" />
      <div className="flex grow px-8">
        <div className="flex-1 bg-success rounded items-center p-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-12 h-12"
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            />
            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
          </svg>
          <div className="grow" />
          <div className="text-white flex flex-col">
            <p className="text-sm text-end">Total Pengeluaran</p>
            <h6 className="text-2xl font-semibold">
              Rp. {totalExpense.toLocaleString("id-ID") + ",00"}
            </h6>
          </div>
        </div>
        <div className="w-4" />
        <div className="flex-1 bg-amber-400 rounded items-center p-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-12 h-12"
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            />
            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
          </svg>
          <div className="grow" />
          <div className="text-white flex flex-col">
            <p className="text-sm text-end">Total Pemasukan</p>
            <h6 className="text-2xl font-semibold">
              Rp. {totalIncome.toLocaleString("id-ID") + ",00"}
            </h6>
          </div>
        </div>
      </div>
      <div className="h-4" />
      <div className="w-full px-8">
        <Line
          data={lineChartData}
          options={{
            animation: {
              duration: 0,
            },
          }}
          className="mx-auto border border-gray-200 rounded shadow-sm bg-white w-full p-8"
          width={600}
          height={400}
        />
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
