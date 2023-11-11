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
            className="bg-success text-white rounded px-4 py-2 w-36 mx-6"
            onClick={() => handleShowModal({ show: true })}
          >
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
                  <th className="w-12">No</th>
                  <th>Nama</th>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Photo</th>
                  <th>Level</th>
                  <th className="w-44">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 && (
                  <tr>
                    <td className="text-center" colSpan={7}>
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
                {users.length === 0 && (
                  <tr>
                    <td className="text-center" colSpan={7}>
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
                {users.map((user: UserProps, index: number) => (
                  <tr key={user.ID}>
                    <td>{index + 1}</td>
                    <td>{user.name_user}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.photo}</td>
                    <td>{user.level}</td>
                    <td className="flex text-white justify-center">
                      <button
                        className="bg-success rounded px-2 py-1 flex items-center justify-center w-24"
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
                        className="bg-red-500 rounded px-2 py-1 flex items-center justify-center w-24"
                        onClick={() => deleteUser(user.ID)}
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
          </div>
        </div>
      </BaseLayout>
    </>
  );
}
