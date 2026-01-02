import { LucideIcon } from "lucide-react";
import { BookOpen, Home, LayoutDashboard } from "lucide-react";

//* Navigation
interface DropDownItems {
  Icon: LucideIcon;
  label: string;
  link: string;
}

export const dropDownItems: DropDownItems[] = [
  { Icon: Home, label: "Home", link: "/" },
  { Icon: BookOpen, label: "Courses", link: "/admin/courses" },
  { Icon: LayoutDashboard, label: "Dashboard", link: "/admin" }
];

//* Create course
export const courseLevels = ["Beginner", "Intermediate", "Advanced"] as const;
export const courseStatus = ["Draft", "Published", "Archived"] as const;

export const courseCategories = [
  "Development",
  "Business",
  "Finance",
  "IT & Software",
  "Office Productivity",
  "Personal Development",
  "Design",
  "Marketing",
  "Health & Fitness",
  "Music",
  "Teaching & Academics"
] as const;
