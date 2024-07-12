import {
    ChevronLeftSquare,
    ChevronRightSquare,
    Home,
    Plus,
    Video,
  } from "lucide-react";

export const sidebarLinks = [
    {
      route: "/",
      icon: Home,
      lable: "Home",
    },
    {
      route: "/upcoming",
      icon: ChevronRightSquare,
      lable: "Upcoming",
    },
    {
      route: "/previous",
      icon: ChevronLeftSquare,
      lable: "Previous",
    },
    {
      route: "/recordings",
      icon: Video,
      lable: "Recordings",
    },
    {
      route: "/my-rooms",
      icon: Plus,
      lable: "My Room",
    },
  ];