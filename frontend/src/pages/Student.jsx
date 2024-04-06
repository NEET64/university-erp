import Sidebar, { SidebarItem } from "../components/Sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  HandCoins,
  NotebookPen,
  Settings,
  HelpCircle,
} from "lucide-react";
import { RecoilRoot } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Student = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token || token.split(" ")[0] !== "Student") {
        navigate("/signin");
        return;
      }
    };

    fetchData();
  }, []);
  return (
    <RecoilRoot>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text={"Dashboard"}
          />
          <SidebarItem icon={<CalendarDays size={20} />} text={"Attendance"} />
          <SidebarItem icon={<NotebookPen size={20} />} text={"Assignment"} />
          <SidebarItem icon={<HandCoins size={20} />} text={"Fees"} />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text={"Settings"} />
          <SidebarItem icon={<HelpCircle size={20} />} text={"Help"} />
        </Sidebar>

        <div className="flex-1 my-2 px-2 flex flex-col">
          <Outlet />
        </div>
      </div>
    </RecoilRoot>
  );
};
