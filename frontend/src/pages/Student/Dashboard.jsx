import { Header } from "@/components/ui/Header";

export const StudentDashboard = () => {
  return (
    <div className="w-full pr-2">
      <Header title="Dashboard" />
      <div className="grid grid-cols-11 grid-rows-8 gap-2">
        <div className="bg-white p-9 rounded-lg col-span-2"></div>
        <div className="bg-white p-9 rounded-lg col-span-2 col-start-3"></div>
        <div className="bg-white p-9 rounded-lg col-span-2 col-start-5"></div>
        <div className="bg-white p-9 rounded-lg col-span-2 col-start-7"></div>
        <div className="bg-white p-9 rounded-lg col-span-5 row-span-4 col-start-1 row-start-2"></div>
        <div className="bg-white p-9 rounded-lg col-span-3 row-span-4 col-start-6 row-start-2"></div>
        <div className="bg-white p-9 rounded-lg col-span-3 row-span-3 col-start-9 row-start-1"></div>
        <div className="bg-white p-9 rounded-lg col-span-8 row-span-3 col-start-1 row-start-6"></div>
        <div className="bg-white p-9 rounded-lg col-span-3 row-span-5 col-start-9 row-start-4"></div>
      </div>
    </div>
  );
};
