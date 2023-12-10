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

export default function GeneralJournalPage() {
  const [incomes, setIncomes] = useState<Journal[]>([]);

  const itemsBreadcrumb = ["Home", "Laporan Jurnal Umum"];

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
        title="Laporan Jurnal Umum"
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
        <p className="border py-1 bg-slate-100 font-semibold">JURNAL UMUM</p>
        <p className="border py-1 bg-slate-100 font-semibold">
          Periode Juni 2023
        </p>
        <table className="table-fixed text-center w-full">
          <thead>
            <tr>
              <th className="border py-2">Tanggal</th>
              <th className="border py-2">Nama Akun</th>
              <th className="border py-2 w-32">REF</th>
              <th className="border py-2">Debet</th>
              <th className="border py-2">Kredit</th>
            </tr>
          </thead>
          <tbody>
            {incomes.length === 0 && (
              <tr>
                <td colSpan={4} className="border py-2">
                  Data tidak ditemukan
                </td>
              </tr>
            )}
            {incomes.map((income: Journal, index: number) => (
              <tr>
                <td className="border py-2">{income.date_journal}</td>
                <td className="border py-2">{income.status_journal}</td>
                <td className="border py-2">{income.status_journal}</td>
                <td className="border py-2">{income.status_journal}</td>
                <td className="border py-2">{income.status_journal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="h-2" />
        <div className="flex">
          <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
            Previous
          </button>
          <button className="bg-success rounded px-4 py-1 text-white">1</button>
          <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
            Next
          </button>
        </div>
        <div className="h-16" />
      </div>
    </BaseLayout>
  );
}
