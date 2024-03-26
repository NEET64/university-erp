import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isToday,
  startOfMonth,
  subMonths,
} from "date-fns";
import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ events, belongsTo }) => {
  const [dayOffset, setDayOffset] = useState(0);
  const currentDate =
    dayOffset < 0
      ? subMonths(new Date(), Math.abs(dayOffset))
      : addMonths(new Date(), dayOffset);
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
      if (!obj[dateKey]) obj[dateKey] = [];
      obj[dateKey].push(event);
    });
    return obj;
  }, [events]);

  return (
    <div className="my-2 grow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white pr-2">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <div>
          <button
            className="m-2 p-1 rounded-md bg-white"
            onClick={() => {
              setDayOffset(dayOffset - 1);
            }}>
            <ChevronLeft />
          </button>
          <button
            className="m-2 p-1 rounded-md bg-white"
            onClick={() => {
              setDayOffset(dayOffset + 1);
            }}>
            <ChevronRight />
          </button>
        </div>
      </div>

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
                  ? "bg-blue-200 border text-center rounded p-2"
                  : "border text-center rounded p-2"
              }>
              <div className="flex justify-end pr-2">{format(day, "d")}</div>
              {todaysEvent.map((event, index) => {
                return (
                  <Popover key={event.date + "" + index}>
                    <PopoverTrigger className="block w-full">
                      <div className="rounded my-0.5 p-2 bg-green-400">
                        {event.course.name}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      {console.log(event)}
                      <div>Course: {event.course.name}</div>
                      <div>Faculty: {event.faculty.name}</div>
                      <div>Lecture: {event.lecture}</div>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
