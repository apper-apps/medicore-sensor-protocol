import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Header from "@/components/organisms/Header";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/patients":
        return "Patients";
      case "/appointments":
        return "Appointments";
      case "/staff":
        return "Staff";
      case "/inventory":
        return "Inventory";
      case "/billing":
        return "Billing";
      case "/reports":
        return "Reports";
      default:
        if (pathname.startsWith("/patients/")) {
          return "Patient Details";
        }
        return "Dashboard";
    }
  };
  
  return (
    <div className="min-h-screen bg-medical-gray">
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      <div className="lg:pl-64">
        <Header 
          onMenuClick={() => setSidebarOpen(true)}
          title={getPageTitle(location.pathname)}
        />
        
        <main className="px-4 lg:px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;