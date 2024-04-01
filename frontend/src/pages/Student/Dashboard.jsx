import { Header } from "@/components/Header";
import { Chart } from "./Chart";

export const StudentDashboard = () => {
  return (
    <>
      <Header title="Dashboard" />

      <div className="mt-2 grow grid grid-cols-4 grid-rows-12 gap-2 sm:grid-cols-8 md:grid-cols-11 md:grid-rows-8">
        <div className="bg-white rounded-md col-span-2">1</div>
        <div className="bg-white rounded-md col-span-2 col-start-3 sm:col-start-3">
          2
        </div>
        <div className="bg-white rounded-md col-span-2 row-start-2 sm:col-start-5 sm:row-start-1">
          3
        </div>
        <div className="bg-white rounded-md col-span-2 col-start-3 row-start-2 sm:col-start-7 sm:row-start-1">
          4
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-3 sm:col-span-5 sm:row-span-4 sm:row-start-2 md:col-start-1">
          <Chart />
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-5 sm:col-span-3 sm:row-span-4 sm:col-start-6 sm:row-start-2 md:col-start-6">
          6
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-7 sm:col-span-8 sm:row-start-6 md:row-span-3 md:col-start-1">
          7
        </div>
        <div className="bg-white rounded-md col-span-4 row-span-2 row-start-9 sm:row-span-5 sm:row-start-8 md:col-span-3 md:row-span-4 md:col-start-9 md:row-start-1">
          8
        </div>
        <div
          className="bg-white rounded-md col-span-4 row-span-2 row-start-11 sm:row-span-5 sm:col-start-5 sm:row-start-8
        md:col-span-3 md:row-span-4 md:col-start-9 md:row-start-5">
          9
        </div>
      </div>
    </>
  );
};
