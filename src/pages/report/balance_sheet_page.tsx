// import React, { useState, useEffect } from "react";
// import BaseLayout from "../../layouts/base";
// import { Breadcrumb } from "../../components/breadcrumb";
// import axios from "axios";
// import { useReactToPrint } from "react-to-print";

// interface Transactions {
//   date: string;
//   total_debit: number;
//   total_credit: number;
//   detail_input: DetailIncome[];
//   detail_output: DetalExpenditure[];
// }

// interface Income {
//   ID: number | null;
//   no_input: string;
//   date_input: string;
//   status_input: string;
// }

// interface DetailIncome {
//   ID: number | null;
//   input_information: string;
//   quantity: number;
//   total_price: number;
//   status_cart: number;
//   input_date: string;
//   id_input: number;
//   input: Income;
//   id_account: number;
//   account: Account;
//   id_category: number;
//   category: Category;
// }

// interface Expenditure {
//   ID: number | null;
//   no_output: string;
//   date_output: string;
//   status_output: string;
// }

// interface DetalExpenditure {
//   ID: number | null;
//   id_cash: number;
//   output_information: string;
//   quantity: number;
//   total_price: number;
//   status_cart: number;
//   output_date: string;
//   id_account: number;
//   account: Account;
//   id_category: number;
//   category: Category;
//   id_output: number;
//   output: Expenditure;
// }

// interface Account {
//   ID: number | null;
//   code: string;
//   name_account: string;
//   character: string;
//   id_category: number;
//   category: Category;
// }

// interface Category {
//   ID: number | null;
//   name_category: string;
// }

// export default function CashFlowPage() {
//   const [transactions, setTransactions] = useState<Transactions[]>([]);
//   const itemsBreadcrumb = ["Home", "Laporan Neraca Saldo"];
//   const [startDate, setStartDate] = useState<string>("");
//   const [endDate, setEndDate] = useState<string>("");
//   const conponentPDF = React.useRef<HTMLTableElement>(null);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8080/api/transaction/date/group${
//           startDate ? `?start_date=${startDate}` : ""
//         }${endDate ? `&end_date=${endDate}` : ""}`
//       );
//       if (response.status === 200) {
//         const data = response.data.data.group_date;
//         setTransactions(data);
//       }
//     } catch (error) {
//       setTransactions([]);
//       console.log(error);
//     }
//   };

//   const handleFilterByDate = () => {
//     setStartDate(startDate);
//     setEndDate(endDate);
//     fetchTransactions();
//   };

//   const handlePrint = useReactToPrint({
//     content: () => conponentPDF.current,
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 12mm 12mm 12mm 12mm;
//       }
//       @media print {
//         body {
//           margin: 0;
//           padding: 0;
//         }
//       }
//     `,
//     documentTitle: "Laporan Neraca Saldo",
//     onAfterPrint: () => alert("Data tersimpan"),
//   });

//   return (
//     <BaseLayout>
//       <Breadcrumb
//         items={itemsBreadcrumb}
//         title="Laporan Neraca Saldo"
//         paddingHorizontal={32}
//       />
//       <div className="flex flex-col bg-white rounded m-8 shadow">
//         <div className="flex pt-4 pb-8 items-end px-6 space-x-4">
//           <div>
//             <label>Dari Tanggal</label>
//             <div className="h-1" />
//             <input
//               type="date"
//               className="border bg-white px-4"
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>

//           <div>
//             <label>Ke Tanggal</label>
//             <div className="h-1" />
//             <input
//               type="date"
//               className="border bg-white px-4"
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
//           <button
//             className="bg-red-400 text-white px-4 h-min"
//             onClick={handleFilterByDate}
//           >
//             Cari
//           </button>
//           <button
//             className="bg-success text-white px-4 h-min"
//             onClick={() => handlePrint()}
//           >
//             Print
//           </button>
//         </div>
//       </div>
//       <div className="flex flex-col bg-white rounded shadow mx-8 p-6 text-center">
//         <div ref={conponentPDF} className="text-center">
//           <p className="border py-1 bg-slate-100 font-semibold">Villa Manis</p>
//           <p className="border py-1 bg-slate-100 font-semibold">NERACA Saldo</p>
//           <p className="border py-1 bg-slate-100 font-semibold">
//             Periode Juni 2023
//           </p>
//           <table className="table-fixed text-center w-full">
//             <thead>
//               <tr>
//                 <th className="border py-2">Tanggal</th>
//                 <th className="border py-2">Nama Akun</th>
//                 <th className="border py-2">Keterangan</th>
//                 <th className="border py-2 w-32">REF</th>
//                 <th className="border py-2">Debet</th>
//                 <th className="border py-2">Kredit</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.length === 0 && (
//                 <tr>
//                   <td className="border py-2" colSpan={6}>
//                     Data tidak ada
//                   </td>
//                 </tr>
//               )}
//               {transactions.map((transaction, index) => {
//                 return (
//                   <>
//                     {/* <tr key={index}>
//                     <td
//                       className="border py-2"
//                       rowSpan={
//                         transaction.detail_input.length +
//                         transaction.detail_output.length +
//                         2
//                       }
//                     >
//                       {transaction.date}
//                     </td>
//                   </tr> */}
//                     {transaction.detail_input.map((detail, index) => {
//                       return (
//                         <tr key={index}>
//                           <td className="border py-2">{transaction.date}</td>
//                           <td className="border py-2">
//                             {detail.account.name_account}
//                           </td>
//                           <td className="border py-2">
//                             {detail.input_information}
//                           </td>
//                           <td className="border py-2">
//                             {detail.input.no_input}
//                           </td>
//                           <td className="border py-2">{detail.total_price}</td>
//                           <td className="border py-2">-</td>
//                         </tr>
//                       );
//                     })}
//                     {transaction.detail_output.map((detail, index) => {
//                       return (
//                         <tr key={index}>
//                           <td className="border py-2">{transaction.date}</td>
//                           <td className="border py-2">
//                             {detail.account.name_account}
//                           </td>
//                           <td className="border py-2">
//                             {detail.output_information}
//                           </td>
//                           <td className="border py-2">
//                             {detail.output.no_output}
//                           </td>
//                           <td className="border py-2">-</td>
//                           <td className="border py-2">{detail.total_price}</td>
//                         </tr>
//                       );
//                     })}
//                     {/* <tr>
//                     <td className="border py-2">Total</td>
//                     <td className="border py-2">-</td>
//                     <td className="border py-2">{transaction.total_debit}</td>
//                     <td className="border py-2">{transaction.total_credit}</td>
//                   </tr> */}
//                   </>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//         <div className="h-2" />
//         <div className="flex">
//           <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
//             Previous
//           </button>
//           <button className="bg-success rounded px-4 py-1 text-white">1</button>
//           <button className="bg-white border border-gray-300 rounded px-4 py-1 text-gray-500 w-24">
//             Next
//           </button>
//         </div>
//       </div>
//       <div className="h-8" />
//     </BaseLayout>
//   );
// }

import React, { useState, useEffect } from "react";
import BaseLayout from "../../layouts/base";
import { Breadcrumb } from "../../components/breadcrumb";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

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
  id_category: number;
  category: Category;
  id_account: number;
  account: Account;
  id_input: number;
  input: Income;
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
  id_category: number;
  category: Category;
  id_account: number;
  account: Account;
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

interface GroupCategory {
  ID: number | null;
  name_category: string;
  accounts: GroupAccount[];
  total_debit: number;
  total_credit: number;
}

interface GroupAccount {
  ID: number | null;
  name_account: string;
  debit: number;
  credit: number;
  detail_input: DetailIncome[];
  detail_output: DetalExpenditure[];
}

export default function BalanceSheetPage() {
  const itemsBreadcrumb = ["Home", "Laporan Neraca Saldo"];

  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const [groupByCategory, setGroupByCategory] = useState<GroupCategory[]>([]);

  const conponentPDF = React.useRef<HTMLTableElement>(null);

  useEffect(() => {
    fetchGroupByCategory();
  }, []);

  const fetchGroupByCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/transaction/group${
          startDate ? `?start_date=${startDate}` : ""
        }${endDate ? `&end_date=${endDate}` : ""}`
      );
      if (response.data.data.group_category) {
        setGroupByCategory(response.data.data.group_category);
        console.log(response.data.data.group_category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterByDate = async () => {
    setStartDate(startDate);
    setEndDate(endDate);
    fetchGroupByCategory();
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
    documentTitle: "Laporan Neraca Saldo",
    onAfterPrint: () => alert("Data tersimpan"),
  });

  return (
    <BaseLayout>
      <Breadcrumb
        items={itemsBreadcrumb}
        title="Laporan Neraca Saldo"
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
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>

          <div>
            <label>Ke Tanggal</label>
            <div className="h-1" />
            <input
              type="date"
              className="border bg-white px-4"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
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
          <p className="border py-1 bg-slate-100 font-semibold">Neraca Saldo</p>
          <p className="border py-1 bg-slate-100 font-semibold">
            Periode Juni 2023
          </p>
          <div className="text-start">
            {/* {groupByCategory.length === 0 && (
            <tr>
              <td className="border py-2" colSpan={5}>
                Data tidak ada
              </td>
            </tr>
          )} */}
            {groupByCategory.map((item) => {
              return (
                <div>
                  <p className="border py-1 w-full px-4 font-semibold">
                    {item.name_category}
                  </p>
                  {item.accounts &&
                    item.accounts.map((account) => {
                      return (
                        <div className="flex">
                          <p className="border py-1 w-full px-4">
                            {account.name_account}
                          </p>
                          <div className="flex w-full">
                            <p className="border py-1 w-full px-4">
                              Rp. {account.debit}
                            </p>
                            <p className="border py-1 w-full px-4">
                              Rp. {account.credit}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  <div className="flex w-full">
                    <p className="border py-1 w-full px-4">
                      Jumlah {item.name_category}
                    </p>
                    <div className="flex w-full">
                      <p className="border py-1 w-full px-4">
                        Rp. {item.total_debit}
                      </p>
                      <p className="border py-1 w-full px-4">
                        Rp. {item.total_credit}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* add total debit and credit */}
            <div className="flex">
              <p className="border py-1 w-full px-4">Total</p>
              <div className="flex w-full">
                <p className="border py-1 w-full px-4">
                  Rp.{" "}
                  {groupByCategory.reduce((acc, curr) => {
                    return acc + curr.total_debit;
                  }, 0)}
                </p>
                <p className="border py-1 w-full px-4">
                  Rp.{" "}
                  {groupByCategory.reduce((acc, curr) => {
                    return acc + curr.total_credit;
                  }, 0)}
                </p>
              </div>
            </div>

            {/* <div className="h-20"></div>
          <h6 className="border py-1 font-medium px-4">Akitivia Lancar</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Kas</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.109.400.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Peluang Usaha</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.4.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Perlengkapan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.1.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Sewa dibayar muka</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.10.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Jumlah Aktivia Lancar</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.124.400.000</p>
            </div>
          </div>
          <h6 className="border py-1 font-medium px-4">Akitivia Tetap</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Peralatan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.3.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Peluang Usaha</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.-700.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Perlengkapan</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.2.300.000</p>
            </div>
          </div>
          <h6 className="border py-1 font-medium px-4">Kewajiban</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Utang Usaha</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.1.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Jumlah Kewajiban</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.1.000.000</p>
            </div>
          </div>
          <h6 className="border py-1 font-medium px-4">Modal/Ekualitas</h6>
          <div className="flex">
            <p className="border py-1 w-full px-4">Modal</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.120.000.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Prive</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4">Rp.-1.500.000</p>
              <p className="border py-1 w-full px-4"></p>
            </div>
          </div>
          <div className="flex">
            <p className="border py-1 w-full px-4">Jumlah Modal/Ekulitas</p>
            <div className="flex w-full">
              <p className="border py-1 w-full px-4"></p>
              <p className="border py-1 w-full px-4">Rp.1.118.500</p>
            </div>
          </div> */}
          </div>
          <div className="h-4" />
        </div>
      </div>
      <div className="h-8" />
    </BaseLayout>
  );
}
