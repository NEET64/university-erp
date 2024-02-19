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

        {/* <div className="flex-1 p-2 mr-2 pb-2 ">
          <Outlet />
        </div> */}
        <div className="flex-1 grid grid-cols-8 grid-rows-9 mr-2 pb-2 ">
          <Outlet />
          <div className="col-span-6 row-span-8 row-start-2 bg-white rounded-lg mr-2"></div>
          <div className="col-span-2 row-span-8 col-start-7 row-start-2 bg-white rounded-lg"></div>
        </div>
      </div>
    </RecoilRoot>
  );
};
