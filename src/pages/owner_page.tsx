import React from "react";
import BaseLayout from "../layouts/base";
import { Breadcrumb } from "../components/breadcrumb";

export default function OwnerPage() {
  const items = ["Home", "Beranda"];

  return (
    <BaseLayout>
      <div className="bg-white w-full px-8 py-4">
        <h1 className="text-3xl text-gray-500">Beranda</h1>
        <Breadcrumb items={items} />
      </div>
      <div className="h-8" />
      <div className="flex flex-col bg-success text-white justify-center items-center rounded mx-8 pt-8">
        <h4>Selamat Datang Di Villa Manis</h4>
        <h6>Ayu Suastini</h6>
        <div className="h-2" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="lightgray"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <div className="h-8" />
        <div className="bg-white flex justify-end w-full py-4 px-4">
          <button className="bg-cyan-500 text-white rounded px-4 py-2">
            Ubah Profile
          </button>
          <div className="w-4" />
          <button className="bg-cyan-500 text-white rounded px-4 py-2">
            Ubah Password
          </button>
        </div>
      </div>
      <div className="h-4" />
      <div className="flex grow px-8">
        <div className="flex-1 bg-success rounded items-center p-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-12 h-12"
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            />
            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
          </svg>
          <div className="grow" />
          <div className="text-white flex flex-col">
            <p className="text-sm text-end">Total Pengeluaran</p>
            <h6 className="text-2xl font-semibold">Rp. 185.100.000</h6>
          </div>
        </div>
        <div className="w-4" />
        <div className="flex-1 bg-amber-400 rounded items-center p-4 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-12 h-12"
          >
            <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
            <path
              fillRule="evenodd"
              d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
              clipRule="evenodd"
            />
            <path d="M2.25 18a.75.75 0 000 1.5c5.4 0 10.63.722 15.6 2.075 1.19.324 2.4-.558 2.4-1.82V18.75a.75.75 0 00-.75-.75H2.25z" />
          </svg>
          <div className="grow" />
          <div className="text-white flex flex-col">
            <p className="text-sm text-end">Total Pemasukan</p>
            <h6 className="text-2xl font-semibold">Rp. 1.041.000.000</h6>
          </div>
        </div>
      </div>
      <div className="h-8" />
      <div className="bg-white grow mx-8 py-4 px-8">
        <div className="flex">
          <select className="border rounded px-4 py-1 bg-white w-72 text-gray-500">
            <option>Pilih Tahun</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <div className="w-8" />
          <button className="bg-red-400 text-white px-2">Cari</button>
        </div>
        <div className="h-4" />
        <div className="flex items-center w-full">
          <div className="text-center justify-self-center grow">
            <h3 className="text-xl font-medium">
              Grafik Pendapatan X Pengeluaran
            </h3>
            <p>Akuntansi</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
