import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  message = "No data available", 
  description = "There's nothing to display right now.",
  actionLabel,
  onAction,
  icon = "FileX"
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="p-3 bg-gray-100 rounded-full">
        <ApperIcon name={icon} className="h-8 w-8 text-gray-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{message}</h3>
        <p className="text-gray-600 max-w-md">{description}</p>
      </div>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;