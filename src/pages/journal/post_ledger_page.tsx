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

export default function PostLedgerPage() {
  const [income, setIncome] = useState<Journal>();
  const [detailIncomesTemp, setDetailIncomesTemp] = useState<DetailJournal[]>(
    []
  );

  const [idInput, setIdInput] = useState<number>();
  const [noInput, setNoInput] = useState<string>();
  const [dateInput, setDateInput] = useState<string>();
  const [statusInput, setStatusInput] = useState<number>();

  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [manage, setManage] = useState<any>(null);

  const itemsBreadcrumb = ["Home", "Posting Ke Buku Besar"];

  // useEffect(() => {
  // fetchIncomes();
  // }, []);

  // const fetchIncomes = async () => {
  //   await axios
  //     .get("http://localhost:8080/api/input")
  //     .then((response) => {
  //       setIncomesTemp(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // alert("Data gagal diambil");
  //     });
  // };

  // const createIncome = async () => {
  //   try {
  //     await axios.post("http://localhost:8080/api/input", {
  //       no_input: noInput,
  //       date_input: dateInput,
  //       status_input: statusInput,
  //     });
  //     alert("Data berhasil ditambahkan");
  //     handleShowModal({ show: false });
  //     fetchIncomes();
  //   } catch (error) {
  //     alert("Data gagal ditambahkan");
  //   }
  // };

  // const updateIncome = async (idProp: number) => {
  //   try {
  //     await axios.put(`http://localhost:8080/api/input/${idProp}`, {
  //       no_input: noInput,
  //       date_input: dateInput,
  //       status_input: statusInput,
  //     });
  //     alert("Data berhasil diubah");
  //     handleShowModal({ show: false });
  //     fetchIncomes();
  //   } catch (error) {
  //     alert("Data gagal diubah");
  //   }
  // };

  // const deleteAccount = async (idProp: number) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/input/${idProp}`);
  //     alert("Data berhasil dihapus");
  //     handleShowModal({ show: false });
  //     fetchIncomes();
  //   } catch (error) {
  //     alert("Data gagal dihapus");
  //   }
  // };

  // const handleShowModal = ({
  //   show = true,
  //   income,
  //   manageProp = "create",
  // }: {
  //   show?: boolean;
  //   income?: Income;
  //   manageProp?: string;
  // }) => {
  //   clearInput();
  //   setShowModal(show);
  //   setManage(manageProp);
  //   if (manageProp === "update") {
  //     setIdInput(income!.ID);
  //     setNoInput(income!.no_input);
  //     setDateInput(income!.date_input);
  //     setStatusInput(income!.status_input);
  //   }
  // };

  // const clearInput = () => {
  //   setIdInput(undefined);
  //   setNoInput(undefined);
  //   setDateInput(undefined);
  //   setStatusInput(undefined);
  // };

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
    <>
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Tambah Pemasukan</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4">
            {manage === "update" && (
              <Input
                label="ID"
                value={idCategory}
                type="number"
                onChange={(e) => setIdCategory(parseInt(e.target.value))}
              />
            )}
            <Input
              label="No Transaksi"
              value={noInput!}
              type="text"
              onChange={(e) => setNoInput(e.target.value)}
            />
            <Input
              label="Tanggal Transaksi"
              value={dateInput!}
              type="date"
              onChange={(e) => setDateInput(e.target.value)}
            />
            <Input
              label="Status"
              type="number"
              value={statusInput?.toString()!}
              onChange={(e) => setStatusInput(parseInt(e.target.value))}
            />
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm font-medium">Sifat</label>
              <div className="h-1" />
              <select
                className="border rounded px-4 py-1 bg-white"
                onChange={(e) => setIdCategory(parseInt(e.target.value))}
                value={idCategory!}
              >
                {categorys.map((category: Category) => (
                  <option value={category.ID}>{category.name_category}</option>
                ))}
              </select>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-success rounded px-4 py-1 text-white"
            onClick={
              manage === "update"
                ? () => updateIncome(idInput!)
                : () => createIncome()
            }
          >
            Simpan
          </button>
          <div className="w-4" />
          <button
            className="bg-red-500 rounded px-4 py-1 text-white"
            onClick={() => handleShowModal({ show: false })}
          >
            Batal
          </button>
        </ModalFooter>
      </Modal> */}

      <BaseLayout>
        <Breadcrumb
          items={itemsBreadcrumb}
          title="Posting Ke Buku Besar"
          paddingHorizontal={32}
        />
        <div className="flex flex-col bg-white rounded m-8 shadow">
          <h3 className="px-4 py-4">Generate Jurnal Umum</h3>
          <hr />
          <div className="mt-4 px-6">
            <button className="bg-success rounded px-2 py-1 flex flex items-center justify-center text-white h-max mt-2 mb-4">
              Tambah Data
            </button>
            {/* <button
              className="bg-success text-white rounded px-4 py-2 w-48 flex w-max items-center"
              // onClick={() => handleShowModal({ show: true })}
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
            </button> */}
            <div className="h-2" />
            <table className="table-fixed text-center w-full shadow-md">
              <thead>
                <tr>
                  <th className="border py-2 w-16">No</th>
                  <th className="border py-2">Keterangan</th>
                  <th className="border py-2">Debet</th>
                  <th className="border py-2">Kredit</th>
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
              </tbody>
            </table>
            <div className="h-4" />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
