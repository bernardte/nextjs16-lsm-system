import type { LucideIcon } from "lucide-react";
import { BookOpen, Home, LayoutDashboard } from "lucide-react";

interface NavigationItems {
  label: string;
  link: string;
}

interface DropDownItems {
  Icon: LucideIcon;
  label: string;
  link: string;
}
interface FeaturesItems {
  title: string;
  description: string;
  icon: string;
}

export const navigationItems: NavigationItems[] = [
  { label: "Home", link: "/" },
  { label: "Courses", link: "/courses" },
  { label: "Dashboard", link: "/admin" }
];

export const dropDownItems: DropDownItems[] = [
  { Icon: Home, label: "Home", link: "/" },
  { Icon: BookOpen, label: "Courses", link: "/courses" },
  { Icon: LayoutDashboard, label: "Dashboard", link: "/admin" },
];

export const features: FeaturesItems[] = [
  {
    title: "Comprehensive Courses",
    description:
      "Access a wide range of carefully curated courses designed by industry experts to enhance your skills and knowledge",
    icon: "📚"
  },
  {
    title: "Interactive Learning",
    description:
      "Engage with interactive content, quizzes, and assignments to enhance your learning experience.",
    icon: "🎮"
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your progress and achievements with detailed analytics and personalized dashboards.",
    icon: "📊"
  },
  {
    title: "Comunity Support",
    description:
      "Join a vibrant community of learners and instructors to collaborate and share knowledge.",
    icon: "👥"
  }
];
