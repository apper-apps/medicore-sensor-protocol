import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ActivityItem from "@/components/molecules/ActivityItem";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import DashboardService from "@/services/api/DashboardService";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await DashboardService.getRecentActivity();
      setActivities(data);
    } catch (err) {
      setError("Failed to load recent activity");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadActivities();
  }, []);
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadActivities} />;
  
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {activities.length === 0 ? (
            <div className="p-6">
              <Empty 
                message="No recent activity"
                description="Activity will appear here as it happens"
              />
            </div>
          ) : (
            activities.map((activity) => (
              <ActivityItem key={activity.Id} activity={activity} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;