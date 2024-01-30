import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

interface Item {
  name: string;
  credit: number;
  debit: number;
}

interface Total {
  income: number;
  burden: number;
  balance: number;
}

interface ProfitLoss {
  income: Item[];
  burden: Item[];
  total: Total;
}

export default function ProfitLossPage() {
  const [profitLoss, setProfitLoss] = useState<ProfitLoss>();
  const [income, setIncome] = useState<Item[]>([]);
  const [burden, setBurden] = useState<Item[]>([]);
  const [total, setTotal] = useState<Total>();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const itemsBreadcrumb = ["Home", "Laporan Laba Rugi"];

  const conponentPDF = React.useRef<HTMLTableElement>(null);

  useEffect(() => {
    fetchProfitLoss();
  }, []);

  const fetchProfitLoss = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transaction/profit-loss${
          startDate ? `?start_date=${startDate}` : ""
        }${endDate ? `&end_date=${endDate}` : ""}`
      );
      if (response.status === 200) {
        const data: ProfitLoss = response.data.data;
        const income: Item[] = data.income;
        const burden: Item[] = data.burden;
        const total: Total = data.total;
        setIncome(income);
        setBurden(burden);
        setTotal(total);
      }
    } catch (error: any) {
      if (
        error.response.data.message === "Detail Input \u0026 Output not found"
      ) {
        setIncome([]);
        setBurden([]);
        setTotal({ income: 0, burden: 0, balance: 0 });
      }
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
    documentTitle: "Laporan Laba Rugi",
    onAfterPrint: () => alert("Data tersimpan"),
  });

  const handleFilterByDate = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetchProfitLoss();
  };

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
        title="Laporan Laba Rugi"
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
            Laporan Laba Rugi
          </p>
          <p className="border py-1 bg-slate-100 font-semibold">
            Periode {getPeriod()}
          </p>
          <div className="text-start">
            <h6 className="border py-1 px-4">Pendapatan</h6>
            {income.map((item, index) => (
              <div className="flex" key={index}>
                <p className="border py-1 w-full px-4">{item.name}</p>
                <div className="flex w-full">
                  <p className="border py-1 w-full px-4">
                    Rp. {item.debit.toLocaleString("id-ID") + ",00"}
                  </p>
                  <p className="border py-1 w-full px-4">
                    Rp. {item.credit.toLocaleString("id-ID") + ",00"}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex">
              <p className="border py-1 w-full px-4">Jumlah Pendapatan</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4 text-center">
                  Rp. {total?.income.toLocaleString("id-ID") + ",00"}
                </p>
              </div>
            </div>
            <p className="border py-1 w-full px-4">Beban</p>
            {burden.map((item, index) => (
              <div className="flex" key={index}>
                <p className="border py-1 w-full px-4">{item.name}</p>
                <div className="flex w-full">
                  <p className="border py-1 w-full px-4">
                    Rp. {item.debit.toLocaleString("id-ID") + ",00"}
                  </p>
                  <p className="border py-1 w-full px-4">
                    Rp. {item.credit.toLocaleString("id-ID") + ",00"}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex">
              <p className="border py-1 w-full px-4">Jumlah Beban</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4 text-center">
                  Rp. {total?.burden.toLocaleString("id-ID") + ",00"}
                </p>
              </div>
            </div>
            <div className="flex">
              <p className="border py-1 w-full px-4">Laba Bersih</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4 text-center">
                  Rp. {total?.balance.toLocaleString("id-ID") + ",00"}
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
