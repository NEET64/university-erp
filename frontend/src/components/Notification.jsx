import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const NotificationList = () => {
  const notifications = [
    {
      image: "faculty1",
      facultyName: "Dr. Patel",
      message: "DBMS Assignment is due soon.",
      time: "2 hours ago",
    },
    {
      image: "faculty2",
      facultyName: "Prof. Garcia",
      message: "Statistics and Probability Project update.",
      time: "3 hours ago",
    },
    {
      image: "faculty3",
      facultyName: "Dr. Carter",
      message: "JavaScript Coding Challenge deadline approaching.",
      time: "4 hours ago",
    },
  ];

  return (
    <div className="">
      <div className="text-lg border-b font-semibold flex justify-between items-center m-2 p-2 max-h-fit">
        <span>Notification</span>
        <Button asChild variant="outline">
          <Link
            className=" h-6 w-14 text-xs text-slate-400"
            to="/student/attendance">
            View All
          </Link>
        </Button>
      </div>
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          src={`https://api.multiavatar.com/${notification.image}.svg`}
          facultyName={notification.facultyName}
          message={notification.message}
          time={notification.time}
        />
      ))}
    </div>
  );
};

const Notification = ({ src, facultyName, message, time }) => {
  return (
    <div className="flex items-center bg-white rounded-md p-4">
      <img src={src} alt="Faculty" className="w-10 h-10 rounded-full mr-4" />
      <div>
        <p className="font-semibold">{facultyName}</p>
        <p className="text-gray-600 text-sm">{message}</p>
        <p className="text-gray-500 text-xs">{time}</p>
      </div>
    </div>
  );
};
