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

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Fragment, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HoverCardArrow } from "@radix-ui/react-hover-card";
import { NavLink } from "react-router-dom";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ events, belongsTo, isSmall }) => {
  const [dayOffset, setDayOffset] = useState(0);
  const currentDate = useMemo(() => {
    return dayOffset < 0
      ? subMonths(new Date(), Math.abs(dayOffset))
      : addMonths(new Date(), dayOffset);
  }, [dayOffset]);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const startingDayIndex = getDay(firstDayOfMonth);

  const eventsByDate = useMemo(() => {
    const obj = {};
    events.forEach((event) => {
      const dateKey = format(event.date, "yyyy-MM-dd");
      if (!obj[dateKey]) obj[dateKey] = [];
      obj[dateKey].push(event);
    });
    return obj;
  }, [events]);

  return (
    <>
      <div className={`grow ${isSmall ? "small" : ""}`}>
        {!isSmall ? (
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white pr-2">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <div>
              <button
                className="p-1 rounded-md bg-white"
                onClick={() => setDayOffset(dayOffset - 1)}>
                <ChevronLeft />
              </button>
              <button
                className="p-1 ml-2 my-2 rounded-md bg-white"
                onClick={() => setDayOffset(dayOffset + 1)}>
                <ChevronRight />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-around mt-2">
            <button
              className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 transition"
              onClick={() => setDayOffset(dayOffset - 1)}>
              <ChevronLeft />
            </button>
            <h2 className="text-md font-semibold text-black">
              {format(currentDate, "MMMM yyyy")}
            </h2>
            <button
              className="p-1 rounded-md bg-slate-100 hover:bg-slate-200 transition"
              onClick={() => setDayOffset(dayOffset + 1)}>
              <ChevronRight />
            </button>
          </div>
        )}

        <div className="grid grid-cols-7 p-3 bg-white rounded-md">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className={
                isSmall ? "text-center text-xs" : "text-center font-md"
              }>
              {day}
            </div>
          ))}
          {Array.from({ length: startingDayIndex }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className={!isSmall && "border text-center p-2"}></div>
          ))}

          {daysInMonth.map((day, index) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const todaysEvent = eventsByDate[dateKey] || [];
            return (
              <Fragment key={format(day, "yyyy-MM-dd")}>
                {!isSmall ? (
                  <DayWithEvents
                    day={day}
                    isToday={isToday(day)}
                    todaysEvent={todaysEvent}
                    belongsTo={belongsTo}
                  />
                ) : (
                  <DayWithHoverCard
                    day={day}
                    isToday={isToday(day)}
                    todaysEvent={todaysEvent}
                    belongsTo={belongsTo}
                  />
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
};

const DayWithEvents = ({ day, isToday, todaysEvent, belongsTo }) => (
  <div
    className={
      isToday ? "bg-blue-200 border text-center p-2" : "border text-center p-2"
    }>
    <div className="flex justify-end pr-2">{format(day, "d")}</div>
    {todaysEvent.map((event, index) =>
      belongsTo === "student" ? (
        <StudentAttendanceEntry event={event} key={event.date + index} />
      ) : (
        <FacultyAttendanceEntry event={event} key={event.date + index} />
      )
    )}
  </div>
);

const DayWithHoverCard = ({ day, isToday, todaysEvent, belongsTo }) => (
  <HoverCard openDelay={200} closeDelay={200}>
    <HoverCardTrigger>
      <div className="flex justify-center items-center">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center m-1 place-items-center hover:bg-indigo-200 transition ${
            isToday && "bg-indigo-200"
          }`}
          style={{ aspectRatio: "1 / 1", width: "2rem" }}>
          <span className="text-center">{format(day, "d")}</span>
        </div>
      </div>
    </HoverCardTrigger>
    {todaysEvent.length > 0 && (
      <HoverCardContent className="w-auto p-0.5">
        {todaysEvent.map((event, index) =>
          belongsTo === "student" ? (
            <StudentAttendanceEntry event={event} key={event.date + index} />
          ) : (
            <FacultyAttendanceEntry event={event} key={event.date + index} />
          )
        )}
      </HoverCardContent>
    )}
  </HoverCard>
);

// StudentAttendanceEntry and FacultyAttendanceEntry remain unchanged

const StudentAttendanceEntry = ({ event }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        {event.status === "absent" ? (
          <div className="rounded my-0.5 p-2 bg-red-400 cursor-pointer text-sm">
            {event.course.name}
          </div>
        ) : (
          <div className="rounded my-0.5 p-2 bg-green-400 cursor-pointer text-xs sm:text-sm">
            {event.course.name}
          </div>
        )}
      </HoverCardTrigger>
      <HoverCardContent className="w-auto text-left">
        <div className="text-lg font-bold mb-2">
          Course: {event.course.name}
        </div>
        <div>Faculty: {event.faculty.name}</div>
        <div>Lecture: {event.lecture}</div>
        <div>Time: {event.date}</div>
        <div
          className={`text-sm ${
            event.status === "present" ? "text-green-500" : "text-red-500"
          }`}>
          Status: {event.status}
        </div>
        <HoverCardArrow style={{ fill: "white" }} />
      </HoverCardContent>
    </HoverCard>
  );
};

const FacultyAttendanceEntry = ({ event }) => {
  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger>
        <div className="rounded my-0.5 p-2 bg-green-400 cursor-pointer text-sm">
          {event.course.name}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto">
        <div>Lecture: {event.lecture}</div>
        <div>Course: {event.course.name}</div>
        <div>Faculty: {event.faculty.name}</div>
        <HoverCardArrow style={{ fill: "white" }} />
      </HoverCardContent>
    </HoverCard>
  );
};
