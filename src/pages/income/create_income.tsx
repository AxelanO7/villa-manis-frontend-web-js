import React, { useEffect, useState } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";

interface Income {
  ID: number | null;
  no_input: string;
  date_input: string;
  status_input: string;
}

interface DetalIncome {
  ID: number | null;
  input_information: string;
  quantity: number;
  total_price: number;
  status_cart: number;
  input_date: string;
  id_input: number;
  input: Income;
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

export default function CreateIncomePage() {
  const [income, setIncome] = useState<Income>();
  const [detailIncomesTemp, setDetailIncomesTemp] = useState<DetalIncome[]>([]);

  const [noInput, setNoInput] = useState<string>();
  const [dateInput, setDateInput] = useState<string>();

  const [subTotal, setSubTotal] = useState<number>();

  const itemsBreadcrumb = ["Home", "Transaksi Pemasukan"];

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchAccount();
    await fetchCategory();
  };

  const fetchAccount = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account");
      if (response.data) {
        setAccounts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category");
      if (response.data) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateInput = () => {
    if (noInput === undefined || dateInput === undefined) {
      alert("Data transaksi tidak boleh kosong");
      return false;
    }
    return true;
  };

  const handleAddIncomeList = async () => {
    if (!validateInput()) return;

    setIncome({
      ID: null,
      no_input: noInput!,
      date_input: dateInput!,
      status_input: "Draft",
    });

    setDetailIncomesTemp([
      ...detailIncomesTemp,
      {
        ID: null,
        input_information: "-",
        quantity: 0,
        total_price: 0,
        status_cart: 0,
        input_date: "",
        id_input: 0,
        input: {
          ID: income?.ID || null,

          no_input: noInput!,
          date_input: dateInput!,
          status_input: "Draft",
        },
      },
    ]);
  };

  const handleDeleteIncomeList = (index: number) => {
    const newDetailIncomesTemp = [...detailIncomesTemp];
    newDetailIncomesTemp.splice(index, 1);
    setDetailIncomesTemp(newDetailIncomesTemp);
  };

  const handleCountSubTotal = () => {
    let total = 0;
    detailIncomesTemp.forEach((detailIncome) => {
      total += detailIncome.total_price * detailIncome.quantity;
    });
    setSubTotal(total);
  };

  const handleSaveChanges = async () => {
    const masterIncome: Income = {
      ID: null,
      no_input: noInput!,
      date_input: dateInput!,
      status_input: "Draft",
    };

    try {
      const res = await axios.post("http://localhost:8080/api/input", {
        ID: null,
        no_input: masterIncome.no_input,
        date_input: masterIncome.date_input,
        status_input: masterIncome.status_input,
      });
      if (res.data) {
        masterIncome.ID = res.data.data.ID;
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat menyimpan master data pemasukan");
    }

    const newAccount = accounts[0];

    const detailIncomes = detailIncomesTemp.map((detailIncome) => {
      return {
        ID: null,
        input_information: detailIncome.input_information,
        quantity: detailIncome.quantity,
        total_price: detailIncome.total_price,
        status_cart: 0,
        input_date: "",
        id_input: masterIncome.ID,
        input: {
          ID: masterIncome.ID,
          no_input: masterIncome.no_input,
          date_input: masterIncome.date_input,
          status_input: masterIncome.status_input,
        },
        id_account: newAccount.ID,
        account: newAccount,
      };
    });

    try {
      await axios.post(
        "http://localhost:8080/api/detail-inputs",
        detailIncomes
      );
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat menyimpan detail data pemasukan");
    }
  };

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Transaksi Pemasukan"
        paddingHorizontal={32}
      />
      <div className="flex flex-col bg-white rounded m-8 shadow">
        <h3 className="px-8 py-4">Transaksi Pemasukan</h3>
        <hr />
        <div className="mt-4 px-8">
          <button
            className="bg-success text-white rounded px-4 py-2 w-48 flex w-max items-center"
            onClick={handleAddIncomeList}
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
            Tambah Data
          </button>
          <div className="h-4" />
          <table className="table-fixed text-center w-full">
            <thead>
              <tr>
                <th className="w-12 border py-2">No</th>
                <th className="border py-2">Keterangan</th>
                <th className="border py-2 w-24">Qty</th>
                <th className="border py-2 w-72">Total</th>
                <th className="w-36 border py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {detailIncomesTemp.length === 0 && (
                <tr>
                  <td className="border py-2" colSpan={5}>
                    Data tidak ditemukan, silahkan tambah data baru
                  </td>
                </tr>
              )}
              {detailIncomesTemp.map(
                (detailIncome: DetalIncome, index: number) => (
                  <tr>
                    <td className="border py-2">{index + 1}</td>
                    <td className="border py-2 px-4">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        onChange={(e) => {
                          detailIncome.input_information = e.target.value;
                        }}
                      />
                    </td>
                    <td className="border py-2 px-4">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        onChange={(e) => {
                          detailIncome.quantity = parseInt(e.target.value);
                          handleCountSubTotal();
                        }}
                      />
                    </td>
                    <td className="border py-2 px-4">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        onChange={(e) => {
                          detailIncome.total_price = parseInt(e.target.value);
                          handleCountSubTotal();
                        }}
                      />
                    </td>
                    <td className="flex text-white justify-center border py-2 px-4">
                      <button
                        className="bg-red-500 rounded px-2 py-1 flex-1 flex items-center justify-center"
                        onClick={() => handleDeleteIncomeList(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                        <div className="w-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td className="border py-2" colSpan={4}>
                  Subtotal
                </td>
                <td className="border py-2">Rp. {subTotal || 0}</td>
              </tr>
            </tbody>
          </table>
          <div className="h-12" />
          <div className="flex items-center">
            <p className="w-40">No Transaksi</p>
            <div className="w-12" />
            <input
              type="text"
              className="border rounded px-2 py-1 grow bg-slate-100"
              onChange={(e) => setNoInput(e.target.value)}
            />
          </div>
          <div className="h-8" />
          <div className="flex items-center">
            <p className="w-40">Tanggal Transaksi</p>
            <div className="w-12" />
            <input
              type="date"
              className="border rounded px-2 py-1 grow bg-slate-100"
              onChange={(e) => setDateInput(e.target.value)}
            />
          </div>
          <div className="h-12" />
          <div className="flex">
            <button className="bg-red-500 text-white rounded px-4 py-2">
              Back
            </button>
            <div className="w-2" />
            <button
              className="bg-success text-white rounded px-4 py-2"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
          <div className="h-16" />
        </div>
      </div>
    </BaseLayout>
  );
}
