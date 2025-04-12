"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import {
  Home,
  Users,
  UserCircle,
  LogOut,
  Menu,
  ChevronLeft,
  UsersRound,
  Calendar,
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { href: "/", label: "Início", icon: Home },
    { href: "/communities", label: "Comunidades", icon: Users },
    { href: "#", label: "Meu Time", icon: UsersRound },
    { href: "#", label: "Agenda", icon: Calendar },
    { href: "/profile", label: "Perfil", icon: UserCircle },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r transition-all duration-300",
        isExpanded ? "w-64" : "w-20",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {isExpanded && (
          <Link href="/" className="text-xl font-bold text-medico-600">
            T.Elos
          </Link>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          {isExpanded ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-medico-50 text-medico-600"
                      : "text-gray-600 hover:bg-gray-100",
                    !isExpanded && "justify-center"
                  )}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {isExpanded && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          className={cn(
            "w-full flex items-center space-x-2",
            !isExpanded && "justify-center"
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {isExpanded && <span>Sair</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar; 