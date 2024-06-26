import { ChevronLeft, LogOut, Menu } from "lucide-react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { NavLink, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { Button } from "./ui/button";

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
    <aside
      className={
        expanded
          ? "h-screen py-2 pl-2 absolute sm:sticky top-0 z-50"
          : "h-16 bg-opacity-0 sm:flex sm:py-2 sm:pl-2 sm:h-screen absolute sm:sticky top-0 z-50"
      }>
      <nav
        className={
          expanded
            ? "h-full flex flex-col bg-white rounded-lg shadow-2xl"
            : "flex flex-col sm:bg-white rounded-lg shadow-2xl"
        }>
        <div
          className={
            expanded
              ? "p-4 flex justify-between items-center h-16 border-b"
              : "pl-2 sm:p-4 flex justify-start items-center h-16"
          }>
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

        <ul
          className={
            expanded ? "flex-1 px-3 py-2 " : "hidden sm:block px-3 py-2 flex-1"
          }>
          {children}
        </ul>

        <ul
          className={
            expanded
              ? "px-3 py-2 border-t"
              : "hidden sm:block px-3 py-2 border-t"
          }>
          <Logout
            icon={<LogOut size={20} />}
            text={"Logout"}
            expanded={expanded}
          />
        </ul>
      </nav>
    </aside>
  );
}

const Logout = ({ icon, text, expanded }) => {
  const navigate = useNavigate();

  return (
    <li className={"rounded-md"}>
      <Button
        key={text}
        variant="outline"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/signin");
        }}
        className="hover:bg-violet-50 text-gray-600 relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group">
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? " w-48 ml-3" : "w-0"
          }`}>
          {text}
        </span>

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6 
            bg-violet-100 text-violet-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all shadow-lg
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10
          `}>
            {text}
          </div>
        )}
      </Button>
    </li>
  );
};

export function SidebarItem({ icon, text, alert }) {
  const expanded = useRecoilValue(expandedState);

  return (
    <li className={"rounded-md"}>
      <NavLink
        key={text}
        to={text}
        className={({ isActive }) =>
          isActive
            ? "bg-gradient-to-tr from-violet-200 to-violet-100 text-violet-800 relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group"
            : "hover:bg-violet-50 text-gray-600 relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group"
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
            className={`absolute right-2 w-2 h-2 rounded bg-violet-400 ${
              expanded ? "" : "top-2"
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-6 
            bg-violet-100 text-violet-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all shadow-lg
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-10
          `}>
            {text}
          </div>
        )}
      </NavLink>
    </li>
  );
}
