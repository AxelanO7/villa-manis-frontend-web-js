import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";

interface Journal {
  ID: number;
  no_journal: string;
  date_journal: string;
  status_journal: number;
}

const handleCreateJournal = () => {
  window.location.href = "/add-journal";
};

export default function ReportProfitLossPage() {
  const [incomes, setIncomes] = useState<Journal[]>([]);

  const itemsBreadcrumb = ["Home", "Laporan Laba Rugi"];

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/general-journal"
      );
      setIncomes(response.data.data);
    } catch (error) {
      console.log(error);
      // alert("Data gagal diambil");
    }
  };

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Laporan Laba Rugi"
        paddingHorizontal={32}
      />
      <div className="flex flex-col bg-white rounded m-8 shadow">
        <div className="flex pt-4 pb-8 items-end px-6 space-x-4">
          <div>
            <label>Dari Tanggal</label>
            <div className="h-1" />
            <input type="date" className="border bg-white px-4" />
          </div>

          <div>
            <label>Ke Tanggal</label>
            <div className="h-1" />
            <input type="date" className="border bg-white px-4" />
          </div>
          <button className="bg-red-400 text-white px-4 h-min">Cari</button>
          <button className="bg-success text-white px-4 h-min">Print</button>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded shadow mx-8 p-6 text-center">
        <p className="border py-1 bg-slate-100 font-semibold">Villa Manis</p>
        <p className="border py-1 bg-slate-100 font-semibold">
          Laporan Laba Rugi
        </p>
        <p className="border py-1 bg-slate-100 font-semibold">
          Periode Juni 2023
        </p>
        <div className="text-start">
          <h6 className="border py-1 px-4">Pendapatan</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Pendapatan Usaha</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.14.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Pendapatan Lain-lain</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.5.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Pendapatan dibayar muka</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.2.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Jumlah Pendapatan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.21.000.000</p>
            </div>
          </div>
          <p className="border py-1 w-full px-4">Beban</p>
          <div className="flex">
            <p className="border py-1 w-full px-4">Beban Gaji</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.10.400.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Beban Iklan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.100.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="h-4" />
        </div>
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
