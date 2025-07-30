import metricsData from "@/services/mockData/dashboardMetrics.json";
import activityData from "@/services/mockData/recentActivity.json";

class DashboardService {
  static async getMetrics() {
    await new Promise(resolve => setTimeout(resolve, 250));
    return { ...metricsData };
  }
  
  static async getRecentActivity() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...activityData];
  }
}

export default DashboardService;