import React, { useState, useEffect } from "react";
import BaseLayout from "../layouts/base";
import { Breadcrumb } from "../components/breadcrumb";
import axios from "axios";
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "../components/modal";
import { Input } from "../components/input";

interface Expenditure {
  ID: number;
  no_output: string;
  date_output: string;
  status_output: number;
}

export default function IncomePage() {
  const [expenditure, setExpenditure] = useState<Expenditure[]>([]);

  const [idOutput, setIdOutput] = useState<number>();
  const [noOutput, setNoOutput] = useState<string>();
  const [dateOutput, setDateOutput] = useState<string>();
  const [statusOutput, setStatusOutput] = useState<number>();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [manage, setManage] = useState<any>(null);

  const itemsBreadcrumb = ["Home", "Transaksi Pengeluaran"];

  useEffect(() => {
    fetchExpenditure();
  }, []);

  const fetchExpenditure = async () => {
    await axios
      .get("http://localhost:8080/api/output")
      .then((response) => {
        setExpenditure(response.data.data);
      })
      .catch((error) => {
        if (error.response.data.message !== "Outputs not found") {
          alert("Data gagal diambil");
        }
      });
  };

  const createExpenditure = async () => {
    try {
      await axios.post("http://localhost:8080/api/output", {
        no_output: noOutput,
        date_output: dateOutput,
        status_output: statusOutput,
      });
      alert("Data berhasil ditambahkan");
      handleShowModal({ show: false });
      fetchExpenditure();
    } catch (error) {
      alert("Data gagal ditambahkan");
    }
  };

  const updateExpenditure = async (idProp: number) => {
    try {
      await axios.put(`http://localhost:8080/api/output/${idProp}`, {
        no_output: noOutput,
        date_output: dateOutput,
        status_output: statusOutput,
      });
      alert("Data berhasil diubah");
      handleShowModal({ show: false });
      fetchExpenditure();
    } catch (error) {
      alert("Data gagal diubah");
    }
  };

  const deleteExpenditure = async (idProp: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/output/${idProp}`);
      alert("Data berhasil dihapus");
      handleShowModal({ show: false });
      fetchExpenditure();
    } catch (error) {
      alert("Data gagal dihapus");
    }
  };

  const handleShowModal = ({
    show = true,
    expenditure,
    manageProp = "create",
  }: {
    show?: boolean;
    expenditure?: Expenditure;
    manageProp?: string;
  }) => {
    clearOutput();
    setShowModal(show);
    setManage(manageProp);
    if (manageProp === "update") {
      setIdOutput(expenditure!.ID);
      setNoOutput(expenditure!.no_output);
      setDateOutput(expenditure!.date_output);
      setStatusOutput(expenditure!.status_output);
    }
  };

  const clearOutput = () => {
    setIdOutput(undefined);
    setNoOutput(undefined);
    setDateOutput(undefined);
    setStatusOutput(undefined);
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Tambah Pengeluaran</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4">
            {/* {manage === "update" && (
              <Input
                label="ID"
                value={idCategory}
                type="number"
                onChange={(e) => setIdCategory(parseInt(e.target.value))}
              />
            )} */}
            {/* <Input
              label="No Transaksi"
              value={noOutput!}
              type="text"
              onChange={(e) => setNoOutput(e.target.value)}
            /> */}
            todo: generate no transaksi
            <div className="form-group flex flex-col">
              <label className="text-gray-600 text-sm font-medium pb-1">
                No Transaksi
              </label>
              <input
                type="text"
                className="form-control border rounded px-2 py-1 bg-white"
                value={
                  "TRX" +
                  Math.floor(Math.random() * 10000000000000000) +
                  1 +
                  Math.floor(Math.random() * 10000000000000000) +
                  1
                }
                disabled
              />
            </div>
            <Input
              label="Tanggal Transaksi"
              value={dateOutput!}
              type="date"
              onChange={(e) => setDateOutput(e.target.value)}
            />
            {/* <Input
              label="Status"
              type="number"
              value={statusOutput?.toString()!}
              onChange={(e) => setStatusOutput(parseInt(e.target.value))}
            /> */}
            <div className="form-group flex flex-col">
              <label className="text-gray-600 text-sm font-medium pb-1">
                Status
              </label>
              <input
                type="text"
                className="form-control border rounded px-2 py-1 bg-white"
                value="kredit"
                disabled
              />
            </div>
            {/* <div className="flex flex-col">
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
            </div> */}
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-success rounded px-4 py-1 text-white"
            onClick={
              manage === "update"
                ? () => updateExpenditure(idOutput!)
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
      </Modal>

      <BaseLayout>
        <Breadcrumb
          items={itemsBreadcrumb}
          title="Transaksi Pengeluaran"
          paddingHorizontal={32}
        />
        <div className="flex flex-col bg-white rounded m-8 shadow">
          <div className="pt-8 px-6">
            <button
              className="bg-success text-white rounded px-4 py-2 w-48 flex w-max items-center"
              onClick={() => handleShowModal({ show: true })}
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
              Tambah Pengeluaran
            </button>
            <div className="h-2" />
            <h3 className="text-center">Data Transaksi Pengeluaran</h3>
            <div className="h-4" />
          </div>
          <hr />
          <div className="px-8">
            <div className="h-8" />
            <div className="flex items-center">
              <p>Show</p>
              <select className="border rounded mx-2 px-4 py-1 bg-white">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <p>entries</p>
              <div className="grow" />
              <p>Search</p>
              <div className="w-4" />
              <input className="border rounded px-4 py-1 bg-white" />
            </div>
            <div className="h-4" />
            <p className="text-gray-500">Showing 1 to 3 of 3 enteries</p>
            <div className="h-2" />
            <table className="table-fixed text-center w-full">
              <thead>
                <tr>
                  <th className="w-12 border py-2">No</th>
                  <th className="border py-2">Bulan Transaksi</th>
                  <th className="border py-2">Status</th>
                  <th className="w-64 border py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {expenditure.map((output: Expenditure, index: number) => (
                  <tr>
                    <td className="border py-2">{index + 1}</td>
                    <td className="border py-2">{output.date_output}</td>
                    <td className="border py-2">{output.status_output}</td>
                    <td className="flex text-white justify-center border py-2 px-4">
                      <button
                        className="bg-success rounded px-2 py-1 flex-1 flex items-center justify-center"
                        onClick={() =>
                          handleShowModal({
                            show: true,
                            expenditure: output,
                            manageProp: "update",
                          })
                        }
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
                      <div className="w-4" />
                      <button
                        className="bg-red-500 rounded px-2 py-1 flex-1 flex items-center justify-center"
                        onClick={() => deleteExpenditure(output.ID)}
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
                ))}
              </tbody>
            </table>
            <div className="h-2" />
            <div className="flex">
              <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
                Previous
              </button>
              <button className="bg-success rounded px-4 py-1 text-white">
                1
              </button>
              <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
                Next
              </button>
            </div>
            <div className="h-16" />
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
