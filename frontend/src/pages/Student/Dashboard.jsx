import { Header } from "@/components/Header";

export const StudentDashboard = () => {
  return (
    <>
      <Header title="Dashboard" />
      <div className="grid grid-cols-11 grid-rows-7 gap-2 grow mt-2">
        <div className="bg-white rounded-lg col-span-2"></div>
        <div className="bg-white rounded-lg col-span-2 col-start-3"></div>
        <div className="bg-white rounded-lg col-span-2 col-start-5"></div>
        <div className="bg-white rounded-lg col-span-3 row-span-3 col-start-9 row-start-1"></div>
        <div className="bg-white rounded-lg col-span-2 col-start-7 row-start-1"></div>
        <div className="bg-white rounded-lg col-span-5 row-span-4 row-start-2"></div>
        <div className="bg-white rounded-lg col-span-3 row-span-4 col-start-6 row-start-2"></div>
        <div className="bg-white rounded-lg col-span-3 row-span-5 col-start-9 row-start-4"></div>
        <div className="bg-white rounded-lg col-span-8 row-span-3 row-start-6"></div>
      </div>
    </>
  );
};
