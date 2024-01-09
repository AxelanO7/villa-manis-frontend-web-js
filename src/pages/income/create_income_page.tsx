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
  const [detailIncomesTemp, setDetailIncomesTemp] = useState<DetailIncome[]>(
    []
  );

  const [noInput, setNoInput] = useState<string>();
  const [dateInput, setDateInput] = useState<string>();

  const [subTotal, setSubTotal] = useState<number>(0);

  const itemsBreadcrumb = ["Home", "Transaksi Pemasukan"];

  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    fetchAccounts();
    fetchIncomes();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account");
      const data = response.data.data;
      if (data) {
        setAccounts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIncomes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/input");
      const data: Income[] = response.data.data;
      const listNoInput: number[] = data.map((income: Income) =>
        parseFloat(income.no_input.substring(2))
      );
      const lastId = (Math.max(...listNoInput) + 1).toString().padStart(4, "0");
      setNoInput(lastId);
    } catch (error: any) {
      if (error.response.status === 404) {
        setNoInput("0001");
      }
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
    if (noInput?.slice(0, 2) !== "IN") {
      setNoInput("IN" + noInput);
    }

    const masterIncome: Income = {
      ID: null,
      no_input: noInput!,
      date_input: dateInput!,
      status_input: "Draft",
    };

    // try {
    //   const res = await axios.post(
    //     "http://localhost:8080/api/input",
    //     masterIncome
    //   );
    //   if (res.data) {
    //     masterIncome.ID = res.data.data.ID;
    //   }
    // } catch (error) {
    //   console.log(error);
    //   alert("Terjadi kesalahan saat menyimpan master data pemasukan");
    // }

    const detailIncomes: DetailIncome[] = detailIncomesTemp.map(
      (detailIncome) => {
        return {
          ID: null,
          input_information: detailIncome.input_information,
          quantity: detailIncome.quantity,
          total_price: detailIncome.total_price,
          status_cart: 0,
          input_date: masterIncome.date_input,
          id_input: masterIncome.ID!,
          input: masterIncome,
          id_account:
            detailIncome.id_account === 0
              ? accounts[0].ID || 0
              : detailIncome.id_account,
          account:
            detailIncome.account.ID === null
              ? accounts[0]
              : detailIncome.account,
          id_category:
            detailIncome.id_category === 0
              ? accounts[0].id_category || 0
              : detailIncome.id_category,
          category:
            detailIncome.category.ID === null
              ? accounts[0].category
              : detailIncome.category,
        };
      }
    );

    console.log(detailIncomes);
    return;

    try {
      const res = await axios.post(
        `http://localhost:8080/api/detail-inputs`,
        detailIncomes
      );
      if (res.data) {
        alert("Data pemasukan berhasil disimpan");
        window.location.href = "/income";
      }
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
            className="bg-success text-white rounded px-4 py-2 flex w-max items-center"
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
                <th className="border py-2 w-48">COA</th>
                <th className="border py-2 w-24">Qty</th>
                <th className="border py-2 w-72">Total</th>
                <th className="w-36 border py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {detailIncomesTemp.length === 0 && (
                <tr>
                  <td className="border py-2" colSpan={6}>
                    Data tidak ditemukan, silahkan tambah data baru
                  </td>
                </tr>
              )}
              {detailIncomesTemp.map(
                (detailIncome: DetailIncome, index: number) => (
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
                      <select
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        onChange={(e) => {
                          const account = accounts.find(
                            (account) => account.ID === parseInt(e.target.value)
                          );
                          detailIncome.account = account!;
                          detailIncome.category = account!.category;
                          detailIncome.id_account = account!.ID!;
                          detailIncome.id_category = account!.id_category;
                        }}
                      >
                        {accounts.map((account) => (
                          <option value={account.ID || 0}>
                            {account.name_account}
                          </option>
                        ))}
                      </select>
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
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="w-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )}
              <tr>
                <td className="border py-2" colSpan={5}>
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
              value={"IN" + noInput}
              disabled
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
