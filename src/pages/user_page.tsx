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

interface UserProps {
  ID: number;
  name_user: string;
  username: string;
  password: string;
  photo: string;
  level: number;
}

export default function UserPage() {
  const [users, setUsers] = useState<UserProps[]>([]);

  const [idUser, setIdUser] = useState<any>();
  const [name, setName] = useState<any>();
  const [username, setUsername] = useState<any>();
  const [password, setPassword] = useState<any>();
  const [photo, setPhoto] = useState<any>();
  const [level, setLevel] = useState<any>();

  const [showModal, setShowModal] = useState<boolean>(false);

  const [manage, setManage] = useState<any>(null);

  const itemsBreadcrumb = ["Home", "Management User"];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/user");
      setUsers(response.data.data);
      console.log(response.data);
    } catch (error) {
      alert("Data gagal diambil");
    }
  };

  const createUser = async () => {
    try {
      await axios.post("http://localhost:8080/api/user", {
        name_user: name,
        username: username,
        password: password,
        photo: photo,
        level: level,
      });
      alert("Data berhasil ditambahkan");
      handleShowModal({ show: false });
      fetchUsers();
    } catch (error) {
      alert("Data gagal ditambahkan");
    }
  };

  const updateUser = async (idProp: number) => {
    try {
      await axios.put(`http://localhost:8080/api/user/${idProp}`, {
        ID: idUser,
        name_user: name,
        username: username,
        password: password,
        photo: photo,
        level: level,
      });
      alert("Data berhasil diubah");
      handleShowModal({ show: false });
      fetchUsers();
    } catch (error) {
      alert("Data gagal diubah");
    }
  };

  const deleteUser = async (idProp: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/user/${idProp}`);
      alert("Data berhasil dihapus");
      handleShowModal({ show: false });
      fetchUsers();
    } catch (error) {
      alert("Data gagal dihapus");
    }
  };

  const handleShowModal = ({
    show = true,
    user,
    manageProp = "create",
  }: {
    show?: boolean;
    user?: UserProps;
    manageProp?: string;
  }) => {
    setShowModal(show);
    setManage(manageProp);
    if (manageProp === "create") {
      clearInput();
    } else if (manageProp === "update") {
      setIdUser(user?.ID);
      setName(user?.name_user);
      setUsername(user?.username);
      setPassword(user?.password);
      setPhoto(user?.photo);
      setLevel(user?.level);
    }
  };

  const clearInput = () => {
    setName(null);
    setUsername(null);
    setPassword(null);
    setPhoto(null);
    setLevel(null);
  };

  return (
    <>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalHeader>Tambah User</ModalHeader>
        <ModalBody>
          <div className="flex flex-col space-y-4">
            {/* {manage === "update" && (
              <Input
                label="ID"
                value={idUser}
                type="number"
                onChange={(e) => setIdUser(parseInt(e.target.value))}
              />
            )} */}
            <Input
              label="Nama"
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Username"
              value={username}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label="Photo"
              value={photo}
              type="text"
              onChange={(e) => setPhoto(e.target.value)}
            />
            <Input
              label="Level"
              value={level}
              type="number"
              onChange={(e) => setLevel(parseInt(e.target.value))}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-success rounded px-4 py-1 text-white"
            onClick={
              manage === "update"
                ? () => updateUser(idUser)
                : () => createUser()
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
          title="Management User"
          paddingHorizontal={32}
        />
        <div className="h-8" />
        <div className="flex flex-col bg-slate-50 rounded mx-8 shadow">
          <div className="h-4" />
          <button
            className="bg-success text-white rounded px-4 py-2 mx-6 flex items-center w-max"
            onClick={() => handleShowModal({ show: true })}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                clipRule="evenodd"
              />
            </svg>
            <div className="w-2" />
            Tambah User
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
                  <th className="w-12 border py-2">No</th>
                  <th className="border py-2">Nama</th>
                  <th className="border py-2">Username</th>
                  <th className="border py-2">Password</th>
                  <th className="border py-2">Photo</th>
                  <th className="border py-2">Level</th>
                  <th className="w-60 border py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td className="text-center border" colSpan={7}>
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
                {users.map((user: UserProps, index: number) => (
                  <tr key={user.ID}>
                    <td className="border py-2">{index + 1}</td>
                    <td className="border py-2">{user.name_user}</td>
                    <td className="border py-2">{user.username}</td>
                    <td className="border py-2">{user.password}</td>
                    <td className="border py-2">{user.photo}</td>
                    <td className="border py-2">{user.level}</td>
                    <td className="flex text-white justify-center border py-2 px-4">
                      <button
                        className="bg-success rounded px-2 py-1 flex items-center justify-center flex-1"
                        onClick={() =>
                          handleShowModal({
                            show: true,
                            user: user,
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
                        className="bg-red-500 rounded px-2 py-1 flex items-center justify-center flex-1"
                        onClick={() => deleteUser(user.ID)}
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
