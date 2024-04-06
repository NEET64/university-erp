import { Header } from "@/components/Header";
import { PlanTable } from "@/components/PlanTable";
import { FeesColumns } from "./feesColumns";

export function Fees() {
  const paymentData = [
    {
      sem: 1,
      term: 1,
      emi: 1,
      mode: "Online",
      date: "2021-09-26T12:24:55.000Z",
      amount: 40750,
      details: "Pay Type : Gateway",
      remarks: "SUCCESS 96",
      print: "Print",
    },
    {
      sem: 1,
      term: 1,
      emi: 2,
      mode: "Offline",
      date: "2022-02-01T12:22:16.000Z",
      amount: 10000,
      details: "Pay Type : ca",
      remarks: "AMOUNT REC",
      print: "Print",
    },
    {
      sem: 2,
      term: 1,
      emi: 1,
      mode: "Online",
      date: "2022-03-23T10:55:22.000Z",
      amount: 50750.5,
      details: "Pay Type : Gateway",
      remarks: "Payment Su",
      print: "Print",
    },
    {
      sem: 1,
      term: 1,
      emi: 3,
      mode: "Offline",
      date: "2022-03-24T12:27:18.000Z",
      amount: 10000,
      details: "Pay Type : ca",
      remarks: "AMOUNT REC",
      print: "Print",
    },
    {
      sem: 3,
      term: 1,
      emi: 1,
      mode: "Offline",
      date: "2022-07-25T15:26:16.000Z",
      amount: 50750.5,
      details: "Pay Type : NEFT/RTGS",
      bankName: "Easebuzz",
      refId: "EFBC1M0FCX",
      remarks: "-",
    },
    {
      sem: 4,
      term: 1,
      emi: 1,
      mode: "Offline",
      date: "2022-12-20T03:47:56.000Z",
      amount: 11624.5,
      details: "Pay Type : ca",
      remarks: "partner sc",
      print: "Print",
    },
    {
      sem: 4,
      term: 1,
      emi: 2,
      mode: "Online",
      date: "2023-01-09T16:05:36.000Z",
      amount: 39126,
      details: "Pay Type : Gateway",
      remarks: "Payment Su",
      print: "Print",
    },
    {
      sem: 5,
      term: 1,
      emi: 1,
      mode: "Online",
      date: "2023-07-13T20:26:41.000Z",
      amount: 44937,
      details: "Pay Type : Gateway",
      remarks: "Payment Su",
      print: "Print",
    },
    {
      sem: 6,
      term: 1,
      emi: 1,
      mode: "Online",
      date: "2024-01-01T17:40:40.000Z",
      amount: 44937,
      details: "Pay Type : Gateway",
      remarks: "SUCCESS IN",
      print: "Print",
    },
    {
      sem: 6,
      term: 1,
      emi: 1,
      mode: "Online",
      date: "2024-03-01T17:40:40.000Z",
      amount: 44937,
      details: "Pay Type : Gateway",
      remarks: "SUCCESS IN",
      print: "Print",
    },
  ];

  return (
    <>
      <Header title={"Dashboard"} />
      <PlanTable data={paymentData} columns={FeesColumns} />
      <div className="bg-red-200 grow rounded-md mt-2 flex items-center justify-center text-xl text-slate-600">
        Fees collection closed on date 31-12-2023 for Year/Sem: 1 Session: June
        2021 - Dec 2021
      </div>
    </>
  );
}
