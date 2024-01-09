import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

interface CashFlow {
  groups: Groups[];
  totals: number;
}

interface Groups {
  name_group: string;
  accounts: Accounts[];
  total_group: number;
}

interface Accounts {
  name_account: string;
  total_account: number;
}

interface Income {
  ID: number | null;
  no_input: string;
  date_input: string;
  status_input: string;
}

interface DetailIncome {
  ID: number | null;
  input_information: string;
  quantity: number;
  total_price: number;
  status_cart: number;
  input_date: string;
  id_input: number;
  input: Income;
  id_account: number;
  account: Account;
  id_category: number;
  category: Category;
}

interface Expenditure {
  ID: number | null;
  no_output: string;
  date_output: string;
  status_output: string;
}

interface DetalExpenditure {
  ID: number | null;
  id_cash: number;
  output_information: string;
  quantity: number;
  total_price: number;
  status_cart: number;
  output_date: string;
  id_account: number;
  account: Account;
  id_category: number;
  category: Category;
  id_output: number;
  output: Expenditure;
}

interface Account {
  ID: number | null;
  code: string;
  name_account: string;
  character: string;
  id_category: number;
  category: Category;
}

interface Category {
  ID: number | null;
  name_category: string;
}

export default function CashFlowPage() {
  const [CashFlow, setCashFlow] = useState<CashFlow>();
  const [Operational, setOperational] = useState<Groups>();
  const [Investation, setInvestation] = useState<Groups>();
  const [Financing, setFinancing] = useState<Groups>();
  const itemsBreadcrumb = ["Home", "Laporan Arus Kas"];
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const conponentPDF = React.useRef<HTMLTableElement>(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transaction/cash-flow${
          startDate ? `?start_date=${startDate}` : ""
        }${endDate ? `&end_date=${endDate}` : ""}`
      );
      if (response.status === 200) {
        const data = response.data.data;
        setCashFlow(data);
        setOperational(data.groups[0]);
        setInvestation(data.groups[1]);
        setFinancing(data.groups[2]);
      }
    } catch (error: any) {
      if (
        error.response.data.message === "Detail Input \u0026 Output not found"
      ) {
        setCashFlow({
          groups: [],
          totals: 0,
        });
        setOperational({
          name_group: "",
          accounts: [],
          total_group: 0,
        });
        setInvestation({
          name_group: "",
          accounts: [],
          total_group: 0,
        });
        setFinancing({
          name_group: "",
          accounts: [],
          total_group: 0,
        });
      }
      console.log(error);
    }
  };

  const handleFilterByDate = () => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetchTransactions();
  };

  const handlePrint = useReactToPrint({
    content: () => conponentPDF.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 12mm 12mm 12mm 12mm;
      }
      @media print {
        body {
          margin: 0;
          padding: 0;
        }
      }
    `,
    documentTitle: "Laporan Arus Kas",
    onAfterPrint: () => alert("Data tersimpan"),
  });

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Laporan Arus Kas"
        paddingHorizontal={32}
      />
      <div className="flex flex-col bg-white rounded m-8 shadow">
        <div className="flex pt-4 pb-8 items-end px-6 space-x-4">
          <div>
            <label>Dari Tanggal</label>
            <div className="h-1" />
            <input
              type="date"
              className="border bg-white px-4"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label>Ke Tanggal</label>
            <div className="h-1" />
            <input
              type="date"
              className="border bg-white px-4"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <button
            className="bg-red-400 text-white px-4 h-min"
            onClick={handleFilterByDate}
          >
            Cari
          </button>
          <button
            className="bg-success text-white px-4 h-min"
            onClick={() => handlePrint()}
          >
            Print
          </button>
        </div>
      </div>
      <div className="flex flex-col bg-white rounded shadow mx-8 p-6 text-center">
        <div ref={conponentPDF} className="text-center">
          <p className="border py-1 bg-slate-100 font-semibold">Villa Manis</p>
          <p className="border py-1 bg-slate-100 font-semibold">ARUS KAS</p>
          <p className="border py-1 bg-slate-100 font-semibold">
            Periode Juni 2023
          </p>
          <table className="table-fixed w-full text-left">
            <tr>
              <th className="border py-2 px-4">Akun</th>
              <th className="border py-2 px-4">Total</th>
            </tr>
            <tr>
              <th className="border py-2 px-4">SALDO AWAL KAS</th>
              <th className="border py-2 px-4">Rp. 0</th>
            </tr>
            <tr>
              <th className="border py-2 px-4" colSpan={2}>
                A. Arus Kas Dari Kegiatan Operasional
              </th>
            </tr>
            {Operational?.accounts.length === 0 && (
              <tr>
                <td className="border py-2 px-4" colSpan={2}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
            {Operational?.accounts.map((account, index) => {
              return (
                <>
                  <tr key={index}>
                    <td className="border py-2 px-4">{account.name_account}</td>
                    <td className="border py-2 px-4">
                      Rp. {account.total_account}
                    </td>
                  </tr>
                  {index === Operational.accounts.length - 1 && (
                    <tr>
                      <th className="border py-2 px-4">
                        Jumlah {Operational.name_group}
                      </th>
                      <th className="border py-2 px-4">
                        Rp. {Operational.total_group}
                      </th>
                    </tr>
                  )}
                </>
              );
            })}
            {/* {Operational.map((operational, index) => {
                return (
                  <>
                    <tr key={index}></tr>
                    {operational.accounts.map((account, index) => {
                      return (
                        <tr key={index}>
                          <td className="border py-2 px-4">
                            {account.name_account}
                          </td>
                          <td className="border py-2 px-4">
                            Rp. {account.total_account}
                          </td>
                          {index === operational.accounts.length - 1 && (
                            <tr>
                              <th className="border py-2 px-4">
                                Jumlah {operational.name_group}
                              </th>
                              <th className="border py-2 px-4">
                                Rp. {operational.total_group}
                              </th>
                            </tr>
                          )}
                        </tr>
                      );
                    })}
                  </>
                );
              })} */}
            <tr>
              <th className="border py-2 px-4" colSpan={2}>
                B. Arus Kas Dari Kegiatan Investasi
              </th>
            </tr>
            {Investation?.accounts.length === 0 && (
              <tr>
                <td className="border py-2 px-4" colSpan={2}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
            {Investation?.accounts.map((account, index) => {
              return (
                <>
                  <tr key={index}>
                    <td className="border py-2 px-4">{account.name_account}</td>
                    <td className="border py-2 px-4">
                      Rp. {account.total_account}
                    </td>
                  </tr>
                  {index === Investation.accounts.length - 1 && (
                    <tr>
                      <th className="border py-2 px-4">
                        Jumlah {Investation.name_group}
                      </th>
                      <th className="border py-2 px-4">
                        Rp. {Investation.total_group}
                      </th>
                    </tr>
                  )}
                </>
              );
            })}
            {/* {Investation.map((investation, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className="border py-2 px-4">
                        {investation.name_group}
                      </td>
                      <td className="border py-2 px-4">
                        Rp. {investation.total_group}
                      </td>
                    </tr>
                    {investation.accounts.map((account, index) => {
                      return (
                        <tr key={index}>
                          <td className="border py-2 px-4">
                            {account.name_account}
                          </td>
                          <td className="border py-2 px-4">
                            Rp. {account.total_account}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })} */}
            <tr>
              <th className="border py-2 px-4" colSpan={2}>
                C. Arus Kas Dari Kegiatan Pendanaan
              </th>
            </tr>
            {Financing?.accounts.length === 0 && (
              <tr>
                <td className="border py-2 px-4" colSpan={2}>
                  Data tidak ditemukan
                </td>
              </tr>
            )}
            {Financing?.accounts.map((account, index) => {
              return (
                <>
                  <tr key={index}>
                    <td className="border py-2 px-4">{account.name_account}</td>
                    <td className="border py-2 px-4">
                      Rp. {account.total_account}
                    </td>
                  </tr>
                  {index === Financing.accounts.length - 1 && (
                    <tr>
                      <th className="border py-2 px-4">
                        Jumlah {Financing.name_group}
                      </th>
                      <th className="border py-2 px-4">
                        Rp. {Financing.total_group}
                      </th>
                    </tr>
                  )}
                </>
              );
            })}
            {/* {Financing.map((financing, index) => {
                return (
                  <>
                    <tr key={index}>
                      <td className="border py-2 px-4">
                        {financing.name_group}
                      </td>
                      <td className="border py-2 px-4">
                        Rp. {financing.total_group}
                      </td>
                    </tr>
                    {financing.accounts.map((account, index) => {
                      return (
                        <tr key={index}>
                          <td className="border py-2 px-4">
                            {account.name_account}
                          </td>
                          <td className="border py-2 px-4">
                            Rp. {account.total_account}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                );
              })} */}
            <tr>
              <th className="border py-2 px-4">
                PERGERAKAN BERSIH KAS (A+B+C)
              </th>
              <th className="border py-2 px-4">Rp. {CashFlow?.totals}</th>
            </tr>
            <tr>
              <th className="border py-2 px-4">SALDO AKHIR KAS</th>
              <th className="border py-2 px-4">Rp. 0</th>
            </tr>
          </table>
        </div>
        <div className="h-2" />
        <div className="flex">
          <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
            Previous
          </button>
          <button className="bg-success rounded px-4 py-1 text-white">1</button>
          <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
            Next
          </button>
        </div>
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
