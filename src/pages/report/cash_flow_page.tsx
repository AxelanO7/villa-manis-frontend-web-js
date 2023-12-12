import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";

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

export default function CashFlowPage() {
  const itemsBreadcrumb = ["Home", "Laporan Arus Kas"];

  const [detailIncome, setDetailIncome] = useState<DetailIncome[]>([]);
  const [detailExpenditure, setDetailExpenditure] = useState<
    DetalExpenditure[]
  >([]);

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const [typeCategory, setTypeCategory] = useState<string>();
  const [typeAccount, setTypeAccount] = useState<string>();

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/transactions"
      );
      if (response.data.data.detail_input) {
        setDetailIncome(response.data.data.detail_input);
      }
      if (response.data.data.detail_output) {
        setDetailExpenditure(response.data.data.detail_output);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchByDate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transactions?start_date=${startDate}&end_date=${endDate}`
      );
      if (response.data.data.detail_input) {
        setDetailIncome(response.data.data.detail_input);
      }
      if (response.data.data.detail_output) {
        setDetailExpenditure(response.data.data.detail_output);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filterIncome = detailIncome.filter((item) => {
    return item.input.status_input === "Lunas";
  });

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Laporan Arus Kas"
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
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Ke Tanggal</label>
            <div className="h-1" />
            <input
              type="date"
              className="border bg-white px-4"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </div>
          <button
            className="bg-red-400 text-white px-4 h-min"
            onClick={handleSearchByDate}
          >
            Cari
          </button>
          <button className="bg-success text-white px-4 h-min">Print</button>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded shadow mx-8 p-6 text-center">
        <p className="border py-1 bg-slate-100 font-semibold">Villa Manis</p>
        <p className="border py-1 bg-slate-100 font-semibold">ARUS KAS</p>
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
