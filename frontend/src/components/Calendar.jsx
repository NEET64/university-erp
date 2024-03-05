import {
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
} from "date-fns";
import { useMemo } from "react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ events }) => {
  const currentDate = new Date();
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const eventsByDate = useMemo(() => {
    let obj = [];
    events.forEach((event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      // console.log(dateKey);
      if (!obj[dateKey]) obj[dateKey] = [];
      obj[dateKey].push(event);
    });
    return obj;
  }, [events]);

  return (
    <div className="p-2 my-2">
      <h2>{format(currentDate, "MMMM yyyy")}</h2>

      <div className="grid grid-cols-7 gap-2 p-3 bg-white rounded-md">
        {WEEKDAYS.map((day) => {
          return (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          );
        })}
        {Array.from({ length: startingDayIndex }).map((_, index) => {
          return <div key={`empty-${index}`}></div>;
        })}
        {daysInMonth.map((day, index) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const todaysEvent = eventsByDate[dateKey] || [];
          return (
            <div
              key={index}
              className={
                isToday(day)
                  ? "bg-blue-400 border text-center rounded"
                  : "border text-center rounded"
              }>
              {format(day, "d")}
              {todaysEvent.map((event) => {
                return (
                  <div className="rounded m-2 bg-green-400" key={event.date}>
                    {event.title}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
