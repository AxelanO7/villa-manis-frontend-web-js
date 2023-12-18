import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";

interface Transactions {
  date: string;
  total_debit: number;
  total_credit: number;
  detail_input: DetailIncome[];
  detail_output: DetalExpenditure[];
}

interface Income {
  ID: number | null;
  no_input: string;
  date_input: string;
  status_input: string;
}

interface DetailIncome {
  ID: number | null;
  input_information: string;
  quantity: number;
  total_price: number;
  status_cart: number;
  input_date: string;
  id_input: number;
  input: Income;
  id_account: number;
  account: Account;
  id_category: number;
  category: Category;
}

interface Expenditure {
  ID: number | null;
  no_output: string;
  date_output: string;
  status_output: string;
}

interface DetalExpenditure {
  ID: number | null;
  id_cash: number;
  output_information: string;
  quantity: number;
  total_price: number;
  status_cart: number;
  output_date: string;
  id_account: number;
  account: Account;
  id_category: number;
  category: Category;
  id_output: number;
  output: Expenditure;
}

interface Account {
  ID: number | null;
  code: string;
  name_account: string;
  character: string;
  id_category: number;
  category: Category;
}

interface Category {
  ID: number | null;
  name_category: string;
}

export default function GeneralJournalPage() {
  const [transactions, setTransactions] = useState<Transactions[]>([]);
  const itemsBreadcrumb = ["Home", "Laporan Jurnal Umum"];
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transaction/date/group${
          startDate ? `?start_date=${startDate}` : ""
        }${endDate ? `&end_date=${endDate}` : ""}`
      );
      if (response.status === 200) {
        const data = response.data.data.group_date;
        setTransactions(data);
      }
    } catch (error) {
      setTransactions([]);
      console.log(error);
    }
  };

  const handleFilterByDate = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetchTransactions();
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
            {transactions.length === 0 && (
              <tr>
                <td className="border py-2" colSpan={5}>
                  Data tidak ada
                </td>
              </tr>
            )}
            {transactions.map((transaction, index) => {
              return (
                <>
                  <tr key={index}>
                    <td
                      className="border py-2"
                      rowSpan={
                        transaction.detail_input.length +
                        transaction.detail_output.length +
                        2
                      }
                    >
                      {transaction.date}
                    </td>
                  </tr>
                  {transaction.detail_input.map((detail, index) => {
                    return (
                      <tr key={index}>
                        <td className="border py-2">
                          {detail.account.name_account}
                        </td>
                        <td className="border py-2">{detail.input.no_input}</td>
                        <td className="border py-2">{detail.total_price}</td>
                        <td className="border py-2">-</td>
                      </tr>
                    );
                  })}
                  {transaction.detail_output.map((detail, index) => {
                    return (
                      <tr key={index}>
                        <td className="border py-2">
                          {detail.account.name_account}
                        </td>
                        <td className="border py-2">
                          {detail.output.no_output}
                        </td>
                        <td className="border py-2">-</td>
                        <td className="border py-2">{detail.total_price}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td className="border py-2">Total</td>
                    <td className="border py-2">-</td>
                    <td className="border py-2">{transaction.total_debit}</td>
                    <td className="border py-2">{transaction.total_credit}</td>
                  </tr>
                </>
              );
            })}
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
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
