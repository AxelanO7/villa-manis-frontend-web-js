import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserPage = () => {
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [nin, setNin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // const tapAddUser = async (e) => {
  //   if (password !== repeatPassword) {
  //     alert("Password tidak sama");
  //     return;
  //   }
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:8080/api/user", {
  //       JSON: {
  //         // id_user: null,
  //         // "": name,
  //         // nin: nin,
  //         // email: email,
  //         // password: password,
  //       },
  //     });
  //     navigate("/user");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const tapAddUser = async () => {
    if (password !== repeatPassword) {
      alert("Password tidak sama");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/user", {
        JSON: {
          // id_user: null,
          // "": name,
          // nin: nin,
          // email: email,
          // password: password,
        },
      });
      navigate("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-row">
      <Link to="/">
        <button
          className="px-1 py-3 mr-1 mb-1 w-28 rounded shadow hover:shadow-lg outline-none focus:outline-none border-2 border-gray-500 font-bold uppercase text-sm"
          type="button"
        >
          Kembali
        </button>
      </Link>
      <div className="mx-2" />
      <>
        <button
          className="bg-teal-500 text-black active:bg-teal-700
      font-bold px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Tambah User
        </button>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-3xl font=semibold">Tambah User</h3>
                    <button
                      className="bg-transparent border-0 text-black float-right"
                      onClick={() => setShowModal(false)}
                    ></button>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                      <label className="block text-black text-sm font-bold mb-1">
                        Level
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        Nama Lengkap
                      </label>
                      <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" />
                      <label className="block text-black text-sm font-bold mb-1">
                        NIK
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        value={nin}
                        onChange={(e) => setNin(e.target.value)}
                      />
                      <label className="block text-black text-sm font-bold mb-1">
                        Alamat Email
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="flex flex-row">
                        <div className="column">
                          <label className="block text-black text-sm font-bold mb-1">
                            Password
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="px-5" />
                        <div className="column">
                          <label className="block text-black text-sm font-bold mb-1">
                            Repeat Password
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="p-6 border-t border-solid border-blueGray-200 rounded-b flex flex-row">
                    <button
                      className="px-6 py-3 mr-1 mb-1 w-40 rounded shadow hover:shadow-lg outline-none focus:outline-none border-2 border-teal-500 text-white bg-teal-500 font-bold uppercase text-sm"
                      type="button"
                      onClick={tapAddUser}
                    >
                      Simpan Data
                    </button>
                    <div className="mx-2" />
                    <button
                      className="px-6 py-3 mr-1 mb-1 w-40 rounded shadow hover:shadow-lg outline-none focus:outline-none border-2 border-gray-500 font-bold uppercase text-sm"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    </div>
  );
};

export default UserPage;
