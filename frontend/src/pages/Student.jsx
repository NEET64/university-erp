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
import { Outlet } from "react-router-dom";

export const Student = () => {
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

        <div className="flex-1 my-2 mx-2 flex flex-col">
          <Outlet />
        </div>
      </div>
    </RecoilRoot>
  );
};
