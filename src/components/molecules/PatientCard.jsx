import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/atoms/Card";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import { format } from "date-fns";

const PatientCard = ({ patient, searchQuery = "" }) => {
  const navigate = useNavigate();
  
  const highlightText = (text, query) => {
    if (!query) return text;
    
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <span key={index} className="search-highlight">{part}</span> : 
        part
    );
  };
  
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "active";
      case "discharged":
        return "discharged";
      case "critical":
        return "critical";
      default:
        return "default";
    }
  };
  
  const handleClick = () => {
    navigate(`/patients/${patient.Id}`);
  };
  
  return (
    <Card 
      className="patient-card cursor-pointer" 
      onClick={handleClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar
            size="md"
            fallback={`${patient.firstName?.[0] || ""}${patient.lastName?.[0] || ""}`}
            className="bg-medical-blue text-white"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 truncate">
                {highlightText(`${patient.firstName} ${patient.lastName}`, searchQuery)}
              </h3>
              <Badge variant={getStatusVariant(patient.status)}>
                {patient.status}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">
                ID: {highlightText(patient.Id.toString(), searchQuery)}
              </p>
              <p className="text-sm text-gray-600">
                Phone: {highlightText(patient.phone || "", searchQuery)}
              </p>
              {patient.lastVisit && (
                <p className="text-xs text-gray-500">
                  Last visit: {format(new Date(patient.lastVisit), "MMM dd, yyyy")}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;