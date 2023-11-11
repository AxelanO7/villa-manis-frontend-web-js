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

interface Account {
  ID: number;
  name_account: string;
  type: string;
  id_category: number;
  category: Category;
}

interface Category {
  ID: number;
  name_category: string;
}

export default function AccountPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);

  const [idAccount, setIdAccount] = useState<number | null>(null);
  const [nameAccount, setNameAccount] = useState<string | null>(null);
  const [typeAccount, setTypeAccount] = useState<string | null>(null);
  const [idCategory, setIdCategory] = useState<number | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [manage, setManage] = useState<any>(null);

  const itemsBreadcrumb = ["Home", "Management Account"];

  useEffect(() => {
    fetchAccounts();
    fetchCategorys();
  }, []);

  const fetchCategorys = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/category");
      setCategorys(response.data.data);
    } catch (error) {
      alert("Data gagal diambil");
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/account");
      setAccounts(response.data.data);
    } catch (error) {
      alert("Data gagal diambil");
    }
  };

  const createAccount = async () => {
    try {
      await axios.post("http://localhost:8080/api/account", {
        name_account: nameAccount,
        type: typeAccount,
        id_category: idCategory,
      });
      alert("Data berhasil ditambahkan");
      handleShowModal({ show: false });
      fetchAccounts();
      fetchCategorys();
    } catch (error) {
      alert("Data gagal ditambahkan");
    }
  };

  const updateAccount = async (idProp: number) => {
    try {
      await axios.put(`http://localhost:8080/api/account/${idProp}`, {
        ID: idAccount,
        name_account: nameAccount,
        type: typeAccount,
        id_category: idCategory,
      });
      alert("Data berhasil diubah");
      handleShowModal({ show: false });
      fetchAccounts();
      fetchCategorys();
    } catch (error) {
      alert("Data gagal diubah");
    }
  };

  const deleteAccount = async (idProp: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/account/${idProp}`);
      alert("Data berhasil dihapus");
      handleShowModal({ show: false });
      fetchAccounts();
      fetchCategorys();
    } catch (error) {
      alert("Data gagal dihapus");
    }
  };

  const handleShowModal = ({
    show = true,
    account,
    manageProp = "create",
  }: {
    show?: boolean;
    account?: Account;
    manageProp?: string;
  }) => {
    clearInput();
    setShowModal(show);
    setManage(manageProp);
    if (manageProp === "update") {
      setIdAccount(account!.ID);
      setNameAccount(account!.name_account);
      setTypeAccount(account!.type);
      setIdCategory(account!.id_category);
    }
  };

  const clearInput = () => {};

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Tambah Account</ModalHeader>
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
            <Input
              label="Nama Category"
              value={nameAccount!}
              type="text"
              onChange={(e) => setNameAccount(e.target.value)}
            />
            <Input
              label="Type"
              value={typeAccount!}
              type="text"
              onChange={(e) => setTypeAccount(e.target.value)}
            />
            {/* <Input
              label="Category"
              type="number"
              value={idCategory!.toString()}
              onChange={(e) => setIdCategory(parseInt(e.target.value))}
            /> */}
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
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-success rounded px-4 py-1 text-white"
            onClick={
              manage === "update"
                ? () => updateAccount(idAccount!)
                : () => createAccount()
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
          title="Management Account"
          paddingHorizontal={32}
        />
        <div className="h-8" />
        <div className="flex flex-col bg-slate-50 rounded mx-8 shadow">
          <div className="h-4" />
          <button
            className="bg-success text-white rounded px-4 py-2 w-48 mx-6"
            onClick={() => handleShowModal({ show: true })}
          >
            Tambah Account
          </button>
          <div className="h-4" />
          <div className="bg-white flex flex-col px-6 py-6 text-gray-500">
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
                  <th className="w-12">No</th>
                  <th>Nama Account</th>
                  <th>Type</th>
                  <th>Category</th>

                  <th className="w-44">Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account: Account, index: number) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{account.name_account}</td>
                    <td>{account.type}</td>
                    <td>{account.category.name_category}</td>
                    <td className="flex text-white justify-center">
                      <button
                        className="bg-success rounded px-2 py-1 flex items-center justify-center w-24"
                        onClick={() =>
                          handleShowModal({
                            show: true,
                            account: account,
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
                        className="bg-red-500 rounded px-2 py-1 flex items-center justify-center w-24"
                        onClick={() => deleteAccount(account.ID)}
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
                    </td>{" "}
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
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
