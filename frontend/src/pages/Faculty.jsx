import Sidebar, { SidebarItem } from "../components/Sidebar";
import {
  LayoutDashboard,
  CalendarDays,
  NotebookPen,
  Settings,
  HelpCircle,
  Send,
  Mail,
} from "lucide-react";
import { RecoilRoot } from "recoil";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export const Faculty = () => {
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
          <SidebarItem icon={<Send size={20} />} text={"Broadcast"} />
          <SidebarItem icon={<Mail size={20} />} text={"Messages"} />
          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text={"Settings"} />
          <SidebarItem icon={<HelpCircle size={20} />} text={"Help"} />
        </Sidebar>

        <div className=" h-full flex-1 my-2 mx-2">
          <Outlet />
        </div>
      </div>

      <Toaster />
    </RecoilRoot>
  );
};
