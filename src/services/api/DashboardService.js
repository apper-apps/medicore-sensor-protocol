import { toast } from "react-toastify";

class DashboardService {
  static apperClient = null;
  
  static getApperClient() {
    if (!this.apperClient) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
    return this.apperClient;
  }
  
  static async getMetrics() {
    try {
      const client = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "totalPatients" } },
          { field: { Name: "todayAppointments" } },
          { field: { Name: "bedOccupancy" } },
          { field: { Name: "pendingBills" } },
          { field: { Name: "activeStaff" } },
          { field: { Name: "lastUpdated" } }
        ],
        orderBy: [
          {
            fieldName: "lastUpdated",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 1,
          offset: 0
        }
      };
      
      const response = await client.fetchRecords('dashboard_metric', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        // Return default metrics if API fails
        return {
          totalPatients: 0,
          todayAppointments: 0,
          bedOccupancy: 0,
          pendingBills: 0,
          activeStaff: 0,
          lastUpdated: new Date().toISOString()
        };
      }
      
      // Return the first record if available, otherwise default values
      if (response.data && response.data.length > 0) {
        return response.data[0];
      } else {
        return {
          totalPatients: 0,
          todayAppointments: 0,
          bedOccupancy: 0,
          pendingBills: 0,
          activeStaff: 0,
          lastUpdated: new Date().toISOString()
        };
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching dashboard metrics:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      // Return default metrics on error
      return {
        totalPatients: 0,
        todayAppointments: 0,
        bedOccupancy: 0,
        pendingBills: 0,
        activeStaff: 0,
        lastUpdated: new Date().toISOString()
      };
    }
  }
  
  static async getRecentActivity() {
    try {
      const client = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "type" } },
          { field: { Name: "description" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "userId" } },
          { field: { Name: "patientId" } }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 20,
          offset: 0
        }
      };
      
      const response = await client.fetchRecords('recent_activity', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching recent activity:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
  
  static async createActivity(activityData) {
    try {
      const client = this.getApperClient();
      
      const dbActivity = {
        Name: activityData.description || '',
        type: activityData.type || '',
        description: activityData.description || '',
        timestamp: activityData.timestamp || new Date().toISOString(),
        userId: activityData.userId || '',
        patientId: activityData.patientId || ''
      };
      
      const params = {
        records: [dbActivity]
      };
      
      const response = await client.createRecord('recent_activity', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create activity ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating activity:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
}

export default DashboardService;