import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  const navigationItems = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Patients", href: "/patients", icon: "Users" },
    { name: "Appointments", href: "/appointments", icon: "Calendar" },
    { name: "Staff", href: "/staff", icon: "UserCheck" },
    { name: "Inventory", href: "/inventory", icon: "Package" },
    { name: "Billing", href: "/billing", icon: "CreditCard" },
    { name: "Reports", href: "/reports", icon: "BarChart3" },
  ];
  
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-700">
        <div className="p-2 bg-medical-cyan rounded-lg">
          <ApperIcon name="Heart" className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">MediCore Pro</h1>
          <p className="text-xs text-gray-400">Hospital Management</p>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? "bg-gray-700 text-white border-r-2 border-medical-cyan"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            <ApperIcon name={item.icon} className="h-5 w-5" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-700 rounded-full">
            <ApperIcon name="User" className="h-4 w-4 text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Dr. Admin</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-800">
        <SidebarContent />
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={onClose}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800 transform transition-transform">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full text-white hover:bg-white hover:bg-opacity-10"
              >
                <ApperIcon name="X" className="h-6 w-6" />
              </Button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;