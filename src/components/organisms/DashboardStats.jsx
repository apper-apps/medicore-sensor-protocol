import { useState, useEffect } from "react";
import StatCard from "@/components/molecules/StatCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import DashboardService from "@/services/api/DashboardService";

const DashboardStats = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await DashboardService.getMetrics();
      setMetrics(data);
    } catch (err) {
      setError("Failed to load dashboard metrics");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadMetrics();
  }, []);
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadMetrics} />;
  if (!metrics) return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Patients"
        value={metrics.totalPatients.toLocaleString()}
        change="+12%"
        changeType="positive"
        trend={1}
        icon="Users"
      />
      
      <StatCard
        title="Today's Appointments"
        value={metrics.todayAppointments}
        change="+5%"
        changeType="positive"
        trend={1}
        icon="Calendar"
      />
      
      <StatCard
        title="Bed Occupancy"
        value={`${metrics.bedOccupancy}%`}
        change="-3%"
        changeType="negative"
        trend={-1}
        icon="Bed"
      />
      
      <StatCard
        title="Pending Bills"
        value={`$${metrics.pendingBills.toLocaleString()}`}
        change="+8%"
        changeType="positive"
        trend={1}
        icon="CreditCard"
      />
    </div>
  );
};

export default DashboardStats;