import { LucideIcon } from "lucide-react";
import { BookOpen, Home, LayoutDashboard } from "lucide-react";

interface DropDownItems {
  Icon: LucideIcon;
  label: string;
  link: string;
}

export const dropDownItems: DropDownItems[] = [
  { Icon: Home, label: "Home", link: "/" },
  { Icon: BookOpen, label: "Courses", link: "/courses" },
  { Icon: LayoutDashboard, label: "Dashboard", link: "/admin" }
];
