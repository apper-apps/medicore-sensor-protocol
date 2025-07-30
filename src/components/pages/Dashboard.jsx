import DashboardStats from "@/components/organisms/DashboardStats";
import RecentActivity from "@/components/organisms/RecentActivity";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Hospital Overview</h1>
        <p className="text-gray-600">Monitor your hospital's key performance indicators and recent activities.</p>
      </div>
      
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<button 
              onClick={() => navigate('/appointments')}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-medical-blue hover:bg-blue-50 transition-colors"
            >
              <div className="text-medical-blue font-medium">Schedule Appointment</div>
              <div className="text-sm text-gray-600 mt-1">Book a new patient appointment</div>
            </button>
            
            <button 
              onClick={() => navigate('/patients')}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-medical-blue hover:bg-blue-50 transition-colors"
            >
              <div className="text-medical-blue font-medium">Add Patient</div>
              <div className="text-sm text-gray-600 mt-1">Register a new patient</div>
            </button>
            
            <button 
              onClick={() => navigate('/reports')}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-medical-blue hover:bg-blue-50 transition-colors"
            >
              <div className="text-medical-blue font-medium">View Reports</div>
              <div className="text-sm text-gray-600 mt-1">Access hospital analytics</div>
            </button>
            
            <button 
              onClick={() => navigate('/inventory')}
              className="p-4 text-left border border-gray-200 rounded-lg hover:border-medical-blue hover:bg-blue-50 transition-colors"
            >
              <div className="text-medical-blue font-medium">Manage Inventory</div>
              <div className="text-sm text-gray-600 mt-1">Check medical supplies</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;