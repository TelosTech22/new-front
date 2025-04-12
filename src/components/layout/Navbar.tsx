"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  if (isAuthenticated) {
    return (
      <nav className="bg-white shadow-sm border-b w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-medico-600 font-bold text-xl">T.Elos</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-sm border-b w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <span className="text-medico-600 font-bold text-xl">T.Elos</span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/communities"
                className="border-transparent text-gray-500 hover:border-medico-500 hover:text-medico-600 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Comunidades
              </Link>
            </div>
          </div>

          <div className="hidden sm:flex sm:items-center">
            <div className="flex space-x-4">
              <Button asChild>
                <Link href="/login" className="flex items-center">Entrar</Link>
              </Button>
              <Button asChild>
                <Link href="/register" className="flex items-center">Cadastrar</Link>
              </Button>
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              className="-mr-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                href="/communities"
                className="text-gray-600 hover:bg-gray-50 hover:border-medico-500 hover:text-medico-600 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              >
                Comunidades
              </Link>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="space-y-1">
                <Link
                  href="/login"
                  className="text-gray-600 hover:bg-gray-50 hover:border-medico-500 hover:text-medico-600 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Entrar
                </Link>
                <Link
                  href="/register"
                  className="text-gray-600 hover:bg-gray-50 hover:border-medico-500 hover:text-medico-600 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Cadastrar
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
