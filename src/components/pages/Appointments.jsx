import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Appointments = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardContent className="p-12 text-center">
          <div className="p-4 bg-medical-lightBlue bg-opacity-20 rounded-full w-fit mx-auto mb-6">
            <ApperIcon name="Calendar" className="h-12 w-12 text-medical-blue" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Appointments Management
          </h2>
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Comprehensive appointment scheduling and management system for healthcare providers. 
            Schedule, track, and manage patient appointments with integrated calendar views and automated reminders.
          </p>
          
          <div className="bg-medical-gray rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Planned Features:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Interactive calendar with appointment scheduling
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Patient appointment history and preferences
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Automated appointment reminders via SMS/email
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Resource allocation and room booking
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Integration with patient records and billing
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

export default Appointments;