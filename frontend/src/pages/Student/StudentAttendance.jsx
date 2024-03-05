import { Calendar } from "@/components/Calendar";
import { addDays, subDays } from "date-fns";

export const StudentAttendance = () => {
  return (
    <div className="border border-white rounded-lg p-5">
      <p className="text-xl">This is the student attendance</p>
      <div className=" rounded-lg">
        <Calendar
          events={[
            { date: subDays(new Date(), 2), title: "event 6" },
            { date: subDays(new Date(), 1), title: "event 1" },
            { date: subDays(new Date(), 0), title: "event 2" },
            { date: addDays(new Date(), 4), title: "event 4" },
            { date: addDays(new Date(), 4), title: "event 4" },
            { date: addDays(new Date(), 4), title: "event 4" },
            { date: addDays(new Date(), 4), title: "event 4" },
          ]}
        />
      </div>
    </div>
  );
};
