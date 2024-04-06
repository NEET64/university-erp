import {
  MoreHorizontal,
  MoreVertical,
  MessageSquareText,
  Bell,
} from "lucide-react";
import { Form } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

export const Header = ({ title }) => {
  return (
    <div className="pl-12 sm:pl-0 rounded-lg flex items-center justify-between w-full min-w-[515px]">
      <h1 className="text-4xl text-white font-sans">{title}</h1>

      <div className=" flex gap-1 items-center">
        {/* <form method="post" action="" className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3">
              <svg
                className="w-4 h-4 text-gray-500  "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="h-10 md:w-80 w-50 ps-10 pr-3 text-sm text-gray-900 border border-gray-300 rounded-full bg-white focus:outline-none  focus:ring-4 focus:ring-indigo-300 focus:border-indigo-400"
              placeholder="Search..."
            />
          </div>
        </form> */}

        <Icon icon={<MessageSquareText size={20} />} />
        <Icon icon={<Bell size={20} />} />

        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger>
            <img
              src="https://api.multiavatar.com/neet.svg"
              alt="student_avatar"
              className="w-12 h-12 rounded-md"
            />
          </HoverCardTrigger>
          <HoverCardContent className="w-auto p-3 mr-2">
            <div className="leading-4 text-right">
              <h4 className="font-semibold">{localStorage.getItem("name")}</h4>
              <span className="text-xs text-gray-600">
                {localStorage.getItem("role")}
              </span>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

const Icon = ({ icon }) => {
  return (
    <div className="rounded-full w-10 h-10 p-3 bg-white cursor-pointer hover:bg-indigo-100 hover:text-indigo-800 flex items-center justify-center">
      {icon}
    </div>
  );
};
