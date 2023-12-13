import React, { useEffect, useState } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";

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

export default function CreateExpenditurePage() {
  const [expenditure, setExpenditure] = useState<Expenditure>();
  const [detailExpendituresTemp, setDetailExpendituresTemp] = useState<
    DetalExpenditure[]
  >([]);

  const [noOutput, setNoOutput] = useState<string>();
  const [dateOutput, setDateInput] = useState<string>();

  const [subTotal, setSubTotal] = useState<number>(0);

  const itemsBreadcrumb = ["Home", "Transaksi Pengeluaran"];

  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account");
      if (response.data) {
        setAccounts(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateOutput = () => {
    if (noOutput === undefined || dateOutput === undefined) {
      alert("Data transaksi tidak boleh kosong");
      return false;
    }
    return true;
  };

  const handleAddExpenditureList = async () => {
    if (!validateOutput()) return;

    setExpenditure({
      ID: null,
      no_output: noOutput!,
      date_output: dateOutput!,
      status_output: "Draft",
    });

    setDetailExpendituresTemp([
      ...detailExpendituresTemp,
      {
        ID: null,
        id_cash: 0,
        output_information: "-",
        quantity: 0,
        total_price: 0,
        status_cart: 0,
        output_date: "",
        id_output: 0,
        output: {
          ID: expenditure?.ID || null,
          no_output: noOutput!,
          date_output: dateOutput!,
          status_output: "Draft",
        },
        id_account: 0,
        account: {
          ID: null,
          code: "",
          name_account: "",
          character: "",
          id_category: 0,
          category: {
            ID: null,
            name_category: "",
          },
        },
        id_category: 0,
        category: {
          ID: null,
          name_category: "",
        },
      },
    ]);
  };

  const handleDeleteExpenditureList = (index: number) => {
    const newDetailExpendituresTemp = [...detailExpendituresTemp];
    newDetailExpendituresTemp.splice(index, 1);
    setDetailExpendituresTemp(newDetailExpendituresTemp);
  };

  const handleCountSubTotal = () => {
    let total = 0;
    detailExpendituresTemp.forEach((detailExpenditure) => {
      total += detailExpenditure.total_price * detailExpenditure.quantity;
    });
    setSubTotal(total);
  };

  const handleSaveChanges = async () => {
    const masterExpanditure: Expenditure = {
      ID: null,
      no_output: noOutput!,
      date_output: dateOutput!,
      status_output: "Draft",
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/output",
        masterExpanditure
      );
      if (res.data) {
        masterExpanditure.ID = res.data.data.ID;
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat menyimpan master data pengeluaran");
    }

    const newAccount = accounts[0];

    const detailExpenditures: DetalExpenditure[] = detailExpendituresTemp.map(
      (detailExpenditure) => {
        return {
          ID: null,
          id_cash: 0,
          output_information: "-",
          quantity: 0,
          total_price: 0,
          status_cart: 0,
          output_date: "",
          id_output: masterExpanditure.ID!,
          output: masterExpanditure,
          id_account: newAccount.ID!,
          account: newAccount,
          id_category: newAccount.id_category,
          category: newAccount.category,
        };
      }
    );

    try {
      const res = await axios.post(
        "http://localhost:8080/api/detail-outputs",
        detailExpenditures
      );
      if (res.data) {
        alert("Data pengeluaran berhasil disimpan");
      }
    } catch (error) {
      console.log(error);
      alert("Terjadi kesalahan saat menyimpan detail data pengeluaran");
    }
  };

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Transaksi Pengeluaran"
        paddingHorizontal={32}
      />
      <div className="flex flex-col bg-white rounded m-8 shadow">
        <h3 className="px-8 py-4">Transaksi Pengeluaran</h3>
        <hr />
        <div className="mt-4 px-8">
          <button
            className="bg-success text-white rounded px-4 py-2 w-48 flex w-max items-center"
            onClick={handleAddExpenditureList}
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
              {detailExpendituresTemp.length === 0 && (
                <tr>
                  <td className="border py-2" colSpan={5}>
                    Data tidak ditemukan, silahkan tambah data baru
                  </td>
                </tr>
              )}
              {detailExpendituresTemp.map(
                (detailExpenditure: DetalExpenditure, index: number) => (
                  <tr>
                    <td className="border py-2">{index + 1}</td>
                    <td className="border py-2 px-4">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        onChange={(e) => {
                          detailExpenditure.output_information = e.target.value;
                        }}
                      />
                    </td>
                    <td className="border py-2 px-4">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        onChange={(e) => {
                          detailExpenditure.quantity = parseInt(e.target.value);
                          handleCountSubTotal();
                        }}
                      />
                    </td>
                    <td className="border py-2 px-4">
                      <input
                        type="number"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        onChange={(e) => {
                          detailExpenditure.total_price = parseInt(
                            e.target.value
                          );
                          handleCountSubTotal();
                        }}
                      />
                    </td>
                    <td className="flex text-white justify-center border py-2 px-4">
                      <button
                        className="bg-red-500 rounded px-2 py-1 flex-1 flex items-center justify-center"
                        onClick={() => handleDeleteExpenditureList(index)}
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
              onChange={(e) => setNoOutput(e.target.value)}
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
