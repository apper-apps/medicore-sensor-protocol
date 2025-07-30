import Avatar from "@/components/atoms/Avatar";
import ApperIcon from "@/components/ApperIcon";
import { formatDistanceToNow } from "date-fns";

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "patient_admission":
        return "UserPlus";
      case "patient_discharge":
        return "UserMinus";
      case "appointment_scheduled":
        return "Calendar";
      case "medication_prescribed":
        return "Pill";
      case "test_ordered":
        return "FileText";
      default:
        return "Activity";
    }
  };
  
  const getActivityColor = (type) => {
    switch (type) {
      case "patient_admission":
        return "text-green-600 bg-green-100";
      case "patient_discharge":
        return "text-blue-600 bg-blue-100";
      case "appointment_scheduled":
        return "text-purple-600 bg-purple-100";
      case "medication_prescribed":
        return "text-orange-600 bg-orange-100";
      case "test_ordered":
        return "text-cyan-600 bg-cyan-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  
  return (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
      <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
        <ApperIcon 
          name={getActivityIcon(activity.type)} 
          className="h-4 w-4" 
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity.description}</p>
        <p className="text-xs text-gray-500 mt-1">
          {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;