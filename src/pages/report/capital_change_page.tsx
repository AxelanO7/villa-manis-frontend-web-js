import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

interface CapitalChange {
  beginning_capital: number;
  net_income: number;
  prive: number;
  additional_capital: number;
  ending_capital: number;
}

export default function CapitalChangePage() {
  const [capitalChange, setCapitalChange] = useState<CapitalChange>();

  const itemsBreadcrumb = ["Home", "Laporan Perubahan Modal"];
  const conponentPDF = React.useRef<HTMLTableElement>(null);

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    fetchCapitalChange();
  }, []);

  const fetchCapitalChange = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transaction/capital-change${
          startDate ? `?start_date=${startDate}` : ""
        }${endDate ? `&end_date=${endDate}` : ""}`
      );
      setCapitalChange(response.data.data);
    } catch (error) {
      console.log(error);
      // alert("Data gagal diambil");
    }
  };

  const handleFilterByDate = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetchCapitalChange();
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

  const getPeriod = () => {
    const startDatePeriod =
      startDate === ""
        ? ""
        : new Date(startDate).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
          });
    const endDatePeriod =
      endDate === ""
        ? ""
        : new Date(endDate).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
          });
    if (startDatePeriod === "" && endDatePeriod === "") {
      return "Semua Waktu";
    }
    if (startDatePeriod !== "" || endDatePeriod !== "") {
      if (startDatePeriod === endDatePeriod) return startDatePeriod;
      if (startDatePeriod !== endDatePeriod) {
        return `${startDatePeriod}  ${
          startDatePeriod === "" || endDatePeriod === "" ? "" : " - "
        }
            ${endDatePeriod}`;
      }
    }
  };

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
            <input
              type="date"
              className="border bg-white px-4"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label>Ke Tanggal</label>
            <div className="h-1" />
            <input
              type="date"
              className="border bg-white px-4"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            className="bg-red-400 text-white px-4 h-min"
            onClick={handleFilterByDate}
          >
            Cari
          </button>
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
            Periode {getPeriod()}
          </p>
          <div className="text-start">
            <div className="flex">
              <p className="border py-1 w-full px-4">Modal Awal</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4">
                  Rp.{" "}
                  {(capitalChange?.beginning_capital || 0).toLocaleString(
                    "id-ID"
                  ) + ",00"}
                </p>
                <p className="border py-1 w-full px-4"></p>
              </div>
            </div>
            <div className="flex">
              <p className="border py-1 w-full px-4">Laba Bersih</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4">
                  Rp.{" "}
                  {(capitalChange?.net_income || 0).toLocaleString("id-ID") +
                    ",00"}
                </p>
                <p className="border py-1 w-full px-4"></p>
              </div>
            </div>
            <div className="flex">
              <p className="border py-1 w-full px-4">Pengambilan Prive</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4">
                  Rp.{" "}
                  {(capitalChange?.prive || 0).toLocaleString("id-ID") + ",00"}
                </p>
                <p className="border py-1 w-full px-4"></p>
              </div>
            </div>
            {/* <div className="flex">
              <p className="border py-1 w-full px-4">Penambahan Modal</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4"></p>
                <p className="border py-1 w-full px-4">
                  Rp.
                  {(capitalChange?.additional_capital || 0).toLocaleString(
                    "id-ID"
                  ) + ",00"}
                </p>
              </div>
            </div> */}
            <div className="flex">
              <p className="border py-1 w-full px-4">Modal Akhir</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4"></p>
                <p className="border py-1 w-full px-4">
                  Rp.
                  {(capitalChange?.ending_capital || 0).toLocaleString(
                    "id-ID"
                  ) + ",00"}
                </p>
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
