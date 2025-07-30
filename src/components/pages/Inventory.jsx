import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Inventory = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardContent className="p-12 text-center">
          <div className="p-4 bg-medical-lightBlue bg-opacity-20 rounded-full w-fit mx-auto mb-6">
            <ApperIcon name="Package" className="h-12 w-12 text-medical-blue" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Medical Inventory Management
          </h2>
          
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Comprehensive medical inventory tracking system for pharmaceuticals, medical equipment, and supplies. 
            Monitor stock levels, expiration dates, and automated reordering with full audit trails.
          </p>
          
          <div className="bg-medical-gray rounded-lg p-6 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold text-gray-900 mb-3">Planned Features:</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Real-time inventory tracking with barcode scanning
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Expiration date monitoring and alerts
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Automated reordering based on minimum stock levels
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Vendor management and purchase order tracking
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Check" className="h-4 w-4 text-medical-success" />
                Cost analysis and inventory optimization reports
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

export default Inventory;