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

export default function TrialBalancePage() {
  const [incomes, setIncomes] = useState<Journal[]>([]);

  const itemsBreadcrumb = ["Home", "Laporan Neraca Saldo"];

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
        title="Laporan Neraca Saldo"
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
        <p className="border py-1 bg-slate-100 font-semibold">NERACA SALDO</p>
        <p className="border py-1 bg-slate-100 font-semibold">
          Periode Juni 2023
        </p>
        <div className="text-start">
          <h6 className="border py-1 font-medium px-4">Akitivia Lancar</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Kas</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.109.400.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Peluang Usaha</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.4.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Perlengkapan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.1.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Sewa dibayar muka</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.10.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Jumlah Aktivia Lancar</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.124.400.000</p>
            </div>
          </div>
          <h6 className="border py-1 font-medium px-4">Akitivia Tetap</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Peralatan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.3.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Peluang Usaha</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.-700.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Perlengkapan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.2.300.000</p>
            </div>
          </div>
          <h6 className="border py-1 font-medium px-4">Kewajiban</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Utang Usaha</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.1.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Jumlah Kewajiban</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.1.000.000</p>
            </div>
          </div>
          <h6 className="border py-1 font-medium px-4">Modal/Ekualitas</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Modal</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.120.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Prive</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.-1.500.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Jumlah Modal/Ekulitas</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.1.118.500</p>
            </div>
          </div>
          <div className="h-4" />
        </div>
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
