import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

interface Journal {
  ID: number;
  no_journal: string;
  date_journal: string;
  status_journal: number;
}

const handleCreateJournal = () => {
  window.location.href = "/add-journal";
};

export default function CapitalChangePage() {
  const [incomes, setIncomes] = useState<Journal[]>([]);

  const itemsBreadcrumb = ["Home", "Laporan Perubahan Modal"];
  const conponentPDF = React.useRef<HTMLTableElement>(null);

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

  const handlePrint = useReactToPrint({
    content: () => conponentPDF.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 12mm 12mm 12mm 12mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
    documentTitle: "Laporan Perubahan Modal",
    onAfterPrint: () => alert("Data tersimpan"),
  });

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Laporan Perubahan Modal"
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
          <button
            className="bg-success text-white px-4 h-min"
            onClick={() => handlePrint()}
          >
            Print
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded shadow mx-8 p-6 text-center">
        <div ref={conponentPDF} className="text-center">
          <p className="border py-1 bg-slate-100 font-semibold">Villa Manis</p>
          <p className="border py-1 bg-slate-100 font-semibold">
            Laporan Perubahan Modal
          </p>
          <p className="border py-1 bg-slate-100 font-semibold">
            Periode Juni 2023
          </p>
          <div className="text-start">
            <div className="flex">
              <p className="border py-1 w-full px-4">Modal Awal</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4">Rp.1.020.000</p>
                <p className="border py-1 w-full px-4"></p>
              </div>
            </div>
            <div className="flex">
              <p className="border py-1 w-full px-4">Laba Bersih</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4">Rp.9.200.000</p>
                <p className="border py-1 w-full px-4"></p>
              </div>
            </div>
            <div className="flex">
              <p className="border py-1 w-full px-4">Pengambilan Prive</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4">Rp.1.500.000</p>
                <p className="border py-1 w-full px-4"></p>
              </div>
            </div>
            <div className="flex">
              <p className="border py-1 w-full px-4">Penambahan Modal</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4"></p>
                <p className="border py-1 w-full px-4">Rp.0</p>
              </div>
            </div>
            <div className="flex">
              <p className="border py-1 w-full px-4">Modal Akhir</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4"></p>
                <p className="border py-1 w-full px-4">Rp.1.027.700.000</p>
              </div>
            </div>
            <div className="h-4" />
          </div>
        </div>
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
