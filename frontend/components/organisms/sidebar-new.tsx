"use client"

import { NavigationItem } from "@/components/molecules/navigation-item"
import { UserProfile } from "@/components/molecules/user-profile"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps {
  selectedTab: string
  onTabSelect: (tab: string) => void
}

export function Sidebar({ selectedTab, onTabSelect }: SidebarProps) {
  const pathname = usePathname()
  
  const navigationItems = [
    { label: "Dashboard", href: "/" },
    { label: "Sales Analytics", href: "/sales-analytics" },
    { label: "Products", href: "/products" },
    { label: "Reports", href: "/reports" },
    { label: "Settings", href: "/settings" }
  ]

  return (
    <div className="w-64 bg-slate-800 h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-xl font-bold text-white">Huddle Analytics</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navigationItems.map((item, index) => (
          <Link key={index} href={item.href}>
            <NavigationItem
              label={item.label}
              isSelected={pathname === item.href}
              onClick={() => onTabSelect(item.label)}
            />
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4">
        <UserProfile name="User Name" email="Email" avatar="/placeholder.svg?height=40&width=40" />
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-slate-700">
        <NavigationItem
          label="Logout"
          isSelected={false}
          onClick={() => console.log("Logout clicked")}
        />
      </div>
    </div>
  )
}
