import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Reports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardContent className="p-12 text-center">
          <div className="p-4 bg-medical-lightBlue bg-opacity-20 rounded-full w-fit mx-auto mb-6">
            <ApperIcon name="BarChart3" className="h-12 w-12 text-medical-blue" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Healthcare Analytics & Reporting
          </h2>
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Comprehensive healthcare analytics platform with customizable reports and data visualization. 
            Generate insights on patient outcomes, operational efficiency, and financial performance for data-driven decision making.
          </p>
          
          <div className="bg-medical-gray rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Planned Features:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Interactive dashboards with real-time metrics
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Patient outcome analysis and quality metrics
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Financial performance and revenue analytics
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Operational efficiency and resource utilization reports
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Customizable report builder with export capabilities
              </li>
            </ul>
          </div>
          
          <div className="mt-8 text-sm text-gray-500">
            Coming Soon - This feature is currently under development
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;