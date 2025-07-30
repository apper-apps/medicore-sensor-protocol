import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon, 
  trend 
}) => {
  const getChangeColor = (type) => {
    switch (type) {
      case "positive":
        return "text-medical-success";
      case "negative":
        return "text-medical-error";
      default:
        return "text-gray-500";
    }
  };
  
  const getTrendIcon = (trend) => {
    if (trend > 0) return "TrendingUp";
    if (trend < 0) return "TrendingDown";
    return "Minus";
  };
  
  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change && (
                <div className={`flex items-center gap-1 ${getChangeColor(changeType)}`}>
                  <ApperIcon 
                    name={getTrendIcon(trend)} 
                    className="h-3 w-3" 
                  />
                  <span className="text-xs font-medium">{change}</span>
                </div>
              )}
            </div>
          </div>
          {icon && (
            <div className="p-3 bg-medical-blue bg-opacity-10 rounded-full">
              <ApperIcon 
                name={icon} 
                className="h-6 w-6 text-medical-blue" 
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;