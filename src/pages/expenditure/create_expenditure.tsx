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

interface Expenditure {
  ID: number | null;
  no_output: string;
  date_output: string;
  status_output: number;
}

// interface Account {
//   ID: number;
//   name_account: string;
//   address: string;
//   phone: string;
//   status_account: number;
// }

interface DetalExpenditure {
  ID: number | null;
  id_cash: number;
  output_information: string;
  quantity: number;
  total_price: number;
  status_cart: number;
  output_date: string;
  id_output: number;
  output: Expenditure;
  // id_account: number;
}

export default function CreateExpenditurePage() {
  const [expenditure, setExpenditure] = useState<Expenditure>();
  const [detailExpendituresTemp, setDetailExpendituresTemp] = useState<
    DetalExpenditure[]
  >([]);

  const [idInput, setIdInput] = useState<number>();
  const [noInput, setNoInput] = useState<string>();
  const [dateInput, setDateInput] = useState<string>();
  const [statusInput, setStatusInput] = useState<number>();

  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [manage, setManage] = useState<any>(null);

  const itemsBreadcrumb = ["Home", "Transaksi Pengeluaran"];

  // useEffect(() => {
  // fetchExpenditures();
  // }, []);

  // const fetchExpenditures = async () => {
  //   await axios
  //     .get("http://localhost:8080/api/input")
  //     .then((response) => {
  //       setExpendituresTemp(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // alert("Data gagal diambil");
  //     });
  // };

  // const createExpenditure = async () => {
  //   try {
  //     await axios.post("http://localhost:8080/api/input", {
  //       no_input: noInput,
  //       date_input: dateInput,
  //       status_input: statusInput,
  //     });
  //     alert("Data berhasil ditambahkan");
  //     handleShowModal({ show: false });
  //     fetchExpenditures();
  //   } catch (error) {
  //     alert("Data gagal ditambahkan");
  //   }
  // };

  // const updateExpenditure = async (idProp: number) => {
  //   try {
  //     await axios.put(`http://localhost:8080/api/input/${idProp}`, {
  //       no_input: noInput,
  //       date_input: dateInput,
  //       status_input: statusInput,
  //     });
  //     alert("Data berhasil diubah");
  //     handleShowModal({ show: false });
  //     fetchExpenditures();
  //   } catch (error) {
  //     alert("Data gagal diubah");
  //   }
  // };

  // const deleteAccount = async (idProp: number) => {
  //   try {
  //     await axios.delete(`http://localhost:8080/api/input/${idProp}`);
  //     alert("Data berhasil dihapus");
  //     handleShowModal({ show: false });
  //     fetchExpenditures();
  //   } catch (error) {
  //     alert("Data gagal dihapus");
  //   }
  // };

  // const handleShowModal = ({
  //   show = true,
  //   expenditure,
  //   manageProp = "create",
  // }: {
  //   show?: boolean;
  //   expenditure?: Expenditure;
  //   manageProp?: string;
  // }) => {
  //   clearInput();
  //   setShowModal(show);
  //   setManage(manageProp);
  //   if (manageProp === "update") {
  //     setIdInput(expenditure!.ID);
  //     setNoInput(expenditure!.no_input);
  //     setDateInput(expenditure!.date_input);
  //     setStatusInput(expenditure!.status_input);
  //   }
  // };

  // const clearInput = () => {
  //   setIdInput(undefined);
  //   setNoInput(undefined);
  //   setDateInput(undefined);
  //   setStatusInput(undefined);
  // };

  const validateOutput = () => {
    if (noInput === undefined || dateInput === undefined) {
      alert("Data transaksi tidak boleh kosong");
      return false;
    }
    return true;
  };

  const handleAddExpenditureList = () => {
    if (!validateOutput()) return;

    setExpenditure({
      ID: null,
      no_output: noInput!,
      date_output: dateInput!,
      status_output: statusInput!,
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
        id_output: idInput!,
        output: {
          ID: expenditure?.ID || null,
          no_output: expenditure!.no_output,
          date_output: expenditure!.date_output,
          status_output: expenditure!.status_output,
        },
      },
    ]);
  };

  const handleDeleteExpenditureList = (index: number) => {
    const newDetailExpendituresTemp = [...detailExpendituresTemp];
    newDetailExpendituresTemp.splice(index, 1);
    setDetailExpendituresTemp(newDetailExpendituresTemp);
  };

  return (
    <>
      {/* <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Tambah Pengeluaran</ModalHeader>
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
                ? () => updateExpenditure(idInput!)
                : () => createExpenditure()
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
          title="Transaksi Pengeluaran"
          paddingHorizontal={32}
        />
        <div className="flex flex-col bg-white rounded m-8 shadow">
          <h3 className="px-8 py-4">Transaksi Pengeluaran</h3>
          <hr />
          <div className="mt-4 px-8">
            <button
              className="bg-success text-white rounded px-4 py-2 w-48 flex w-max items-center"
              // onClick={() => handleShowModal({ show: true })}
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
                  <th className="w-36 border py-2">Action</th>
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
                          value={detailExpenditure.output_information}
                          onChange={(e) =>
                            (detailExpendituresTemp[index].output_information =
                              e.target.value)
                          }
                        />
                        {/* {detailExpenditure.input_information} */}
                      </td>
                      <td className="border py-2 px-4">
                        <input
                          type="text"
                          className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                          value={detailExpenditure.quantity}
                          onChange={(e) =>
                            (detailExpendituresTemp[index].quantity = parseInt(
                              e.target.value
                            ))
                          }
                        />
                        {/* {detailExpenditure.quantity} */}
                      </td>
                      <td className="border py-2 px-4">
                        <input
                          type="text"
                          className="border rounded px-2 py-1 grow bg-slate-100 w-full text-center"
                          value={detailExpenditure.total_price}
                          onChange={(e) =>
                            (detailExpendituresTemp[index].total_price =
                              parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td className="flex text-white justify-center border py-2 px-4">
                        {/* <button
                          className="bg-success rounded px-2 py-1 flex-1 flex items-center justify-center"
                          onClick={() => handleEditExpenditureList(index)}
                          // onClick={() =>
                          //   handleShowModal({
                          //     show: true,
                          //     expenditure: expenditure,
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
                          onClick={() => handleDeleteExpenditureList(index)}
                          // onClick={() => deleteAccount(expenditure.ID)}
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
                  <td className="border py-2">Rp 100</td>
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
              <button className="bg-success text-white rounded px-4 py-2">
                Save Changes
              </button>
            </div>
            <div className="h-16" />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
