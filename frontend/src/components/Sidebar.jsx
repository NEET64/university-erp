import { ChevronLeft, LogOut, Menu } from "lucide-react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { NavLink } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const expandedState = atom({
  key: "expandedState",
  default: true,
});

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useRecoilState(expandedState);
  const isMedium = useMediaQuery({ maxWidth: 991 });

  useEffect(() => {
    if (isMedium) {
      setExpanded(false);
    } else setExpanded(true);
  }, [isMedium, setExpanded]);

  return (
    <aside className="h-screen p-2 sticky top-0 z-50">
      <nav
        className="h-full flex flex-col
        bg-white rounded-lg shadow-2xl">
        <div className="p-4 flex justify-between items-center h-16 border-b">
          <img
            src="https://img.logoipsum.com/218.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt="logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
            {expanded ? <ChevronLeft /> : <Menu />}
          </button>
        </div>

        <ul className="flex-1 px-3 py-2">{children}</ul>

        <ul className="px-3 py-2 border-t">
          <SidebarItem
            icon={<LogOut size={20} />}
            text={"Logout"}
            className="m-3"
          />
        </ul>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, alert }) {
  const expanded = useRecoilValue(expandedState);

  return (
    <li className={"rounded-md"}>
      <NavLink
        key={text}
        to={text}
        className={({ isActive }) =>
          isActive
            ? " bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group"
            : "hover:bg-indigo-50 text-gray-600 relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group"
        }>
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? " w-48 ml-3" : "w-0"
          }`}>
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6 
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10
          `}>
            {text}
          </div>
        )}
        {/* 
        {!expanded && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>{text}</TooltipTrigger>
              <TooltipContent>
                <p>Add to library</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )} */}
      </NavLink>
    </li>
  );
}
