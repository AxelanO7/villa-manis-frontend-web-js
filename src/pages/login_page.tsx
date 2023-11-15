import axios from "axios";
import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const tapLogin = async () => {
    const response = await axios.post("http://localhost:8080/api/login", {
      username: username,
      password: password,
    });
    if (response.status === 200) {
      alert("Login berhasil");
      window.location.href = "/main-page";
    } else {
      alert("Login gagal");
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-slate-50 justify-center items-center">
        <div className="bg-white bg-white rounded-xl shadow text-center p-8 w-96">
          <h2 className="text-lg font-medium text-gray-500">Welcome to</h2>
          <div className="h-6" />
          <h3 className="text-2xl font-medium	text-gray-500">Villa Manis</h3>
          <div className="h-6" />
          <input
            className="border border-gray-300 rounded px-4 py-1 w-full"
            placeholder="Alamat Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="h-4" />
          <input
            className="border border-gray-300 rounded px-4 py-1 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="h-4" />
          <button
            className="bg-success text-white rounded px-4 py-2 w-full items-center flex justify-center"
            onClick={tapLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            <div className="w-2" />
            Login
          </button>
          <div className="h-4" />
          <button
            className="bg-white border border-gray-300 rounded px-4 py-2 w-full text-gray-700 items-center flex justify-center"
            onClick={tapLogin}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
            <div className="w-2" />
            Forgot password?
          </button>
        </div>
      </div>
    </>
  );
}
