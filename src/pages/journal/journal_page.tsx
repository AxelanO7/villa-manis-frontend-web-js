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

export default function JournalPage() {
  const [incomes, setIncomes] = useState<Journal[]>([]);

  const itemsBreadcrumb = ["Home", "Generate Jurnal Umum"];

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
        title="Generate Jurnal Umum"
        paddingHorizontal={32}
      />
      <div className="flex flex-col bg-white rounded m-8 shadow">
        <div className="pt-8 px-6">
          <button
            className="bg-success text-white rounded px-4 py-2 w-48 flex w-max items-center"
            onClick={handleCreateJournal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            <div className="w-2" />
            Tambah Jurnal
          </button>
          <div className="h-2" />
          <h3 className="text-center">Data Jurnal Umum</h3>
          <div className="h-4" />
        </div>
        <hr />
        <div className="flex pt-4 pb-8 items-end px-6 space-x-4">
          <div>
            <label>Bulan</label>
            <div className="h-1" />
            <select className="border bg-white px-4">
              <option>Januari</option>
              <option>Februari</option>
              <option>Maret</option>
              <option>April</option>
              <option>Mei</option>
              <option>Juni</option>
              <option>Juli</option>
              <option>Agustus</option>
              <option>September</option>
              <option>Oktober</option>
              <option>November</option>
              <option>Desember</option>
            </select>
          </div>

          <div>
            <label>Tahun</label>
            <div className="h-1" />
            <select className="border bg-white px-4">
              <option>2020</option>
              <option>2021</option>
              <option>2022</option>
              <option>2023</option>
            </select>
          </div>
          <button className="bg-red-400 text-white px-4 h-min">Cari</button>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded mx-8 shadow">
        <div className="h-12" />
        <hr />
        <div className="m-4 bg-slate-100 px-12">
          <div className="h-8" />
          <div className="flex items-center">
            <p>Show</p>
            <select className="border rounded mx-2 px-4 py-1 bg-white">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <p>entries</p>
            <div className="grow" />
            <p>Search</p>
            <div className="w-4" />
            <input className="border rounded px-4 py-1 bg-white" />
          </div>
          <div className="h-4" />
          <p className="text-gray-500">Showing 1 to 3 of 3 enteries</p>
          <div className="h-2" />
          <table className="table-fixed text-center w-full">
            <thead>
              <tr>
                <th className="w-12 border py-2">No</th>
                <th className="border py-2">Tanggal Transaksi</th>
                <th className="border py-2">Status</th>
                <th className="w-40 border py-2">Aksi</th>
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
                  <td className="border py-2">{index + 1}</td>
                  <td className="border py-2">{income.date_journal}</td>
                  <td className="border py-2">{income.status_journal}</td>
                  <td className="flex text-white justify-center border py-2 px-4">
                    <button className="bg-success rounded px-2 py-1 flex-1 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="w-1" />
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="h-2" />
          <div className="flex">
            <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
              Previous
            </button>
            <button className="bg-success rounded px-4 py-1 text-white">
              1
            </button>
            <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
              Next
            </button>
          </div>
          <div className="h-16" />
        </div>
      </div>
    </BaseLayout>
  );
}
