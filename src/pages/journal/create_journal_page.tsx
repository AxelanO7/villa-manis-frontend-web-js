import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "../../components/modal";
import { Input } from "../../components/input";

interface Journal {
  ID: number | null;
  no_input: string;
  date_input: string;
  status_input: number;
}

// interface Account {
//   ID: number;
//   name_account: string;
//   address: string;
//   phone: string;
//   status_account: number;
// }

interface DetailJournal {
  ID: number | null;
  journal_information: string;
  ref_journal: string;
  debit: number;
  credit: number;
  date_transaction: string;
  status_post: number;
  id_general_journal: number;
  general_journal: Journal;
  // id_account: number;
  // account: Account;
}

export default function CreateJournalPage() {
  const [income, setIncome] = useState<Journal>();
  const [detailIncomesTemp, setDetailIncomesTemp] = useState<DetailJournal[]>(
    []
  );

  const [idInput, setIdInput] = useState<number>();
  const [noInput, setNoInput] = useState<string>();
  const [dateInput, setDateInput] = useState<string>();
  const [statusInput, setStatusInput] = useState<number>();

  const itemsBreadcrumb = ["Home", "Tambah Jurnal"];

  const validateInput = () => {
    if (noInput === undefined || dateInput === undefined) {
      alert("Data transaksi tidak boleh kosong");
      return false;
    }
    return true;
  };

  const handleAddIncomeList = () => {
    if (!validateInput()) return;

    setIncome({
      ID: null,
      no_input: noInput!,
      date_input: dateInput!,
      status_input: statusInput!,
    });

    setDetailIncomesTemp([
      ...detailIncomesTemp,
      {
        ID: null,
        journal_information: "-",
        status_post: 0,
        credit: 0,
        debit: 0,
        ref_journal: "-",
        date_transaction: "-",
        id_general_journal: idInput!,
        general_journal: {
          ID: income?.ID || null,
          no_input: income!.no_input,
          date_input: income!.date_input,
          status_input: income!.status_input,
        },
      },
    ]);
  };

  const handleDeleteIncomeList = (index: number) => {
    const newDetailIncomesTemp = [...detailIncomesTemp];
    newDetailIncomesTemp.splice(index, 1);
    setDetailIncomesTemp(newDetailIncomesTemp);
  };

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Tambah Jurnal Umum"
        paddingHorizontal={32}
      />
      <div className="flex flex-col bg-white rounded m-8 shadow">
        <h3 className="px-4 py-4">Tambah Jurnal Umum</h3>
        <hr />
        <div className="mt-4 px-6">
          <div className="border flex p-6 space-x-16 rounded">
            <div className="flex-1 space-y-2">
              <p>Tanggal Rekap</p>
              <input type="date" className="border p-2 w-full" />
            </div>
            <div className="flex-1 space-y-2">
              <p>No Transaksi</p>
              <input type="text" className="border p-2 w-full" />
            </div>
          </div>
          <div className="h-2" />
          <table className="table-fixed text-center w-full shadow-md">
            <thead>
              <tr>
                <th className="border py-2">Akun</th>
                <th className="border py-2">Tanggal Transaksi</th>
                <th className="border py-2">Keterangan</th>
                <th className="border py-2">Debet</th>
                <th className="border py-2">Kredit</th>
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
                (detailIncome: DetailJournal, index: number) => (
                  <tr>
                    <td className="border py-2">{index + 1}</td>
                    <td className="border py-2 px-4">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        value={detailIncome.journal_information}
                        onChange={(e) =>
                          (detailIncomesTemp[index].journal_information =
                            e.target.value)
                        }
                      />
                      {/* {detailIncome.input_information} */}
                    </td>
                    <td className="border py-2 px-4">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        // value={detailIncome.}
                        // onChange={(e) =>
                        //   (detailIncomesTemp[index].quantity = parseInt(
                        //     e.target.value
                        //   ))
                        // }
                      />
                      {/* {detailIncome.quantity} */}
                    </td>
                    <td className="border py-2 px-4">
                      <input
                        type="text"
                        className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                        // value={detailIncome.total_price}
                        // onChange={(e) =>
                        //   (detailIncomesTemp[index].total_price = parseInt(
                        //     e.target.value
                        //   ))
                        // }
                      />
                    </td>
                    <td className="flex text-white justify-center border py-2 px-4">
                      {/* <button
                          className="bg-success rounded px-2 py-1 flex-1 flex items-center justify-center"
                          onClick={() => handleEditIncomeList(index)}
                          // onClick={() =>
                          //   handleShowModal({
                          //     show: true,
                          //     income: income,
                          //     manageProp: "update",
                          //   })
                          // }
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
                          Edit
                        </button>
                        <div className="w-4" /> */}
                      <button
                        className="bg-red-500 rounded px-2 py-1 flex-1 flex items-center justify-center"
                        onClick={() => handleDeleteIncomeList(index)}
                        // onClick={() => deleteAccount(income.ID)}
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
            </tbody>
          </table>
          <div className="flex bg-slate-50 p-4">
            <button className="bg-success rounded px-2 py-1 flex items-center justify-center text-white h-max mt-2">
              Tambah Data
            </button>
            <div className="w-36" />
            <div className="space-y-2">
              <p>Total Debet</p>
              <input
                type="number"
                className="border rounded px-2 py-1 grow bg-slate-200"
                disabled
                value={detailIncomesTemp.reduce(
                  (total, detailIncome) => total + detailIncome.debit,
                  0
                )}
              />
            </div>
            <div className="w-12" />
            <div className="space-y-2">
              <p>Total Kredit</p>
              <input
                type="number"
                className="border rounded px-2 py-1 grow bg-slate-200"
                disabled
                value={detailIncomesTemp.reduce(
                  (total, detailIncome) => total + detailIncome.credit,
                  0
                )}
              />
            </div>
          </div>
          <div className="flex">
            <div className="grow" />
            <button className="bg-blue-500 rounded px-4 py-1 text-white mt-4">
              Simpan
            </button>
          </div>
          <div className="h-4" />
        </div>
      </div>
    </BaseLayout>
  );
}
