"use client";

import { InfoModal } from "@/components/ui/navbar/infoModal";
import { useClerk } from "@clerk/nextjs";
import {
  Building2,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  Settings,
  User2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const menuItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Imóveis", href: "/properties", icon: Building2 },
  { label: "Configurações", href: "/settings", icon: Settings },
];

export function NavBar() {
  const { user, signOut, openUserProfile } = useClerk();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      setIsLoading(false);
    }
  }, [user]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setIsProfileOpen(false);
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("click", handleClickOutside);
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden w-full fixed top-0 left-0 z-40 p-2 bg-blue-600 text-white flex items-center justify-between">
        {/* Logo */}
        <span className="text-2xl font-bold text-white">Kitnex</span>
        <button
          onClick={() => setIsOpen(true)}
          className=" p-2 rounded-md bg-blue-600 text-white"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex flex-col h-full">
          {/* Close Button - Mobile Only */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute right-4 top-4 p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>

          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200">
            <span className="text-2xl font-bold text-blue-600">Kitnex</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6">
            <ul className="space-y-1 px-3">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center px-3 py-2 rounded-lg text-sm font-medium
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }
                      `}
                    >
                      <Icon size={20} className="mr-3" />
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            onClick={() => setIsInfoModalOpen(true)}
            className="w-full flex items-center mb-4 px-6 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            <HelpCircle size={20} className="mr-3" />
            Informações
          </button>
          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <div
              className="border-t border-gray-200 p-4 hover:bg-gray-100 cursor-pointer transition-colors"
              onClick={() => !isLoading && setIsProfileOpen(!isProfileOpen)}
            >
              <div className="flex items-center gap-3">
                {isLoading ? (
                  <Skeleton circle width={40} height={40} />
                ) : (
                  <Image
                    src={
                      user?.imageUrl ||
                      `https://ui-avatars.com/api/?name=${
                        user?.fullName || "U"
                      }&background=E3F2FD&color=2196F3`
                    }
                    alt={user?.fullName || "User Avatar"}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1">
                  {isLoading ? (
                    <div className="space-y-2">
                      <Skeleton width={120} height={16} />
                      <Skeleton width={150} height={12} />
                    </div>
                  ) : (
                    <>
                      <p className="font-semibold text-gray-900">
                        {user?.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user?.emailAddresses[0].emailAddress}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Dropdown */}
            {!isLoading && isProfileOpen && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-[90%] mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden animate-fadeIn">
                <div className="p-1">
                  <button
                    onClick={() => {
                      openUserProfile();
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <User2 size={16} />
                    Perfil
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    Sair
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      <InfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </>
  );
}
