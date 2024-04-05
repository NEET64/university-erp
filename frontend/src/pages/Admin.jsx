import Sidebar, { SidebarItem } from "../components/Sidebar";
import {
  LayoutDashboard,
  Settings,
  HelpCircle,
  Send,
  Mail,
  Notebook,
  Users,
  UsersRound,
  HandCoins,
  AlignVerticalJustifyStart,
  BookOpen,
} from "lucide-react";
import { RecoilRoot } from "recoil";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

export const Admin = () => {
  return (
    <RecoilRoot>
      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text={"Dashboard"}
          />
          <SidebarItem icon={<Users size={20} />} text={"Faculties"} />
          <SidebarItem icon={<BookOpen size={20} />} text={"Classes"} />
          <SidebarItem icon={<UsersRound size={20} />} text={"Students"} />
          <SidebarItem icon={<Notebook size={20} />} text={"Courses"} />
          <SidebarItem icon={<Send size={20} />} text={"Broadcast"} />
          <SidebarItem icon={<Mail size={20} />} text={"Messages"} />
          <SidebarItem icon={<HandCoins size={20} />} text={"Fees"} />

          <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text={"Settings"} />
          <SidebarItem icon={<HelpCircle size={20} />} text={"Help"} />
        </Sidebar>

        <div className="h-full flex-1 my-2 px-2">
          <Outlet />
        </div>

        <Toaster />
      </div>
    </RecoilRoot>
  );
};
