import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Avatar from "@/components/atoms/Avatar";
import FormField from "@/components/molecules/FormField";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import PatientService from "@/services/api/PatientService";
import { format, differenceInYears } from "date-fns";

const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  
  const loadPatient = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await PatientService.getById(parseInt(id));
      setPatient(data);
      setFormData(data);
    } catch (err) {
      setError("Failed to load patient details");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadPatient();
  }, [id]);
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSave = async () => {
    try {
      const updatedPatient = await PatientService.update(parseInt(id), formData);
      setPatient(updatedPatient);
      setEditMode(false);
      toast.success("Patient updated successfully");
    } catch (error) {
      toast.error("Failed to update patient");
    }
  };
  
  const handleCancel = () => {
    setFormData(patient);
    setEditMode(false);
  };
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPatient} />;
  if (!patient) return <Error message="Patient not found" />;
  
  const age = patient.dateOfBirth ? differenceInYears(new Date(), new Date(patient.dateOfBirth)) : null;
  
const tabs = [
    { id: "personal", label: "Personal Info", icon: "User" },
    { id: "medical", label: "Medical History", icon: "FileText" },
    { id: "medications", label: "Current Medications", icon: "Pill" },
    { id: "timeline", label: "Timeline", icon: "Clock" },
    { id: "emergency", label: "Emergency Contacts", icon: "Phone" }
  ];
  
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
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/patients")}
          >
            <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
            Back to Patients
          </Button>
          <div className="h-6 w-px bg-gray-300" />
          <div className="flex items-center gap-3">
            <Avatar
              size="lg"
              fallback={`${patient.firstName?.[0] || ""}${patient.lastName?.[0] || ""}`}
              className="bg-medical-blue text-white"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.firstName} {patient.lastName}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>ID: {patient.Id}</span>
                {age && <span>Age: {age}</span>}
                <Badge variant={getStatusVariant(patient.status)}>
                  {patient.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <ApperIcon name="Edit" className="h-4 w-4 mr-2" />
              Edit Patient
            </Button>
          )}
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-medical-blue text-medical-blue"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <ApperIcon name={tab.icon} className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      <Card>
        <CardContent className="p-6">
          {activeTab === "personal" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField label="First Name">
                  {editMode ? (
                    <input
                      type="text"
                      className="medical-input"
                      value={formData.firstName || ""}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.firstName}</p>
                  )}
                </FormField>
                
                <FormField label="Last Name">
                  {editMode ? (
                    <input
                      type="text"
                      className="medical-input"
                      value={formData.lastName || ""}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.lastName}</p>
                  )}
                </FormField>
                
                <FormField label="Date of Birth">
                  {editMode ? (
                    <input
                      type="date"
                      className="medical-input"
                      value={formData.dateOfBirth || ""}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">
                      {patient.dateOfBirth ? format(new Date(patient.dateOfBirth), "MMMM dd, yyyy") : "Not provided"}
                    </p>
                  )}
                </FormField>
                
                <FormField label="Gender">
                  {editMode ? (
                    <select
                      className="medical-input"
                      value={formData.gender || ""}
                      onChange={(e) => handleInputChange("gender", e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 capitalize">{patient.gender || "Not specified"}</p>
                  )}
                </FormField>
                
                <FormField label="Blood Type">
                  {editMode ? (
                    <select
                      className="medical-input"
                      value={formData.bloodType || ""}
                      onChange={(e) => handleInputChange("bloodType", e.target.value)}
                    >
                      <option value="">Select Blood Type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{patient.bloodType || "Not specified"}</p>
                  )}
                </FormField>
                
                <FormField label="Phone">
                  {editMode ? (
                    <input
                      type="tel"
                      className="medical-input"
                      value={formData.phone || ""}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.phone}</p>
                  )}
                </FormField>
                
                <FormField label="Email">
                  {editMode ? (
                    <input
                      type="email"
                      className="medical-input"
                      value={formData.email || ""}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  ) : (
                    <p className="text-gray-900">{patient.email || "Not provided"}</p>
                  )}
                </FormField>
              </div>
              
              {patient.address && (
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Address</h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-900">
                      {patient.address.street && `${patient.address.street}, `}
                      {patient.address.city && `${patient.address.city}, `}
                      {patient.address.state && `${patient.address.state} `}
                      {patient.address.zipCode}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {activeTab === "medical" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Medical History</h3>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Allergies</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {patient.allergies && patient.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="warning">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No known allergies</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Medical Conditions</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  {patient.medicalHistory && patient.medicalHistory.length > 0 ? (
                    <div className="space-y-2">
                      {patient.medicalHistory.map((condition, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                          <span className="text-gray-900">{condition.condition}</span>
                          <span className="text-sm text-gray-500">{condition.diagnosedDate}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No medical history recorded</p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "medications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                {patient.currentMedications && patient.currentMedications.length > 0 ? (
                  <div className="space-y-3">
                    {patient.currentMedications.map((medication, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded border">
                        <div>
                          <h4 className="font-medium text-gray-900">{medication.name}</h4>
                          <p className="text-sm text-gray-600">{medication.dosage}</p>
                          <p className="text-xs text-gray-500">{medication.frequency}</p>
                        </div>
                        <Badge variant="info">Active</Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No current medications</p>
                )}
              </div>
            </div>
          )}
          
          {activeTab === "emergency" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                {patient.emergencyContacts && patient.emergencyContacts.length > 0 ? (
                  <div className="space-y-4">
                    {patient.emergencyContacts.map((contact, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white rounded border">
                        <div>
                          <h4 className="font-medium text-gray-900">{contact.name}</h4>
                          <p className="text-sm text-gray-600">{contact.relationship}</p>
                          <p className="text-sm text-medical-blue">{contact.phone}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <ApperIcon name="Phone" className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No emergency contacts registered</p>
                )}
              </div>
            </div>
)}
          
          {activeTab === "timeline" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Medical Timeline</h3>
              
              <div className="relative">
                {(() => {
                  // Collect all timeline events
                  const timelineEvents = [];
                  
                  // Add medical history events
                  if (patient.medicalHistory && patient.medicalHistory.length > 0) {
                    patient.medicalHistory.forEach(condition => {
                      timelineEvents.push({
                        date: condition.diagnosedDate,
                        type: 'diagnosis',
                        title: `Diagnosed with ${condition.condition}`,
                        description: `Status: ${condition.status}`,
                        icon: 'Stethoscope',
                        color: 'bg-red-100 text-red-600'
                      });
                    });
                  }
                  
                  // Add medication events
                  if (patient.currentMedications && patient.currentMedications.length > 0) {
                    patient.currentMedications.forEach(medication => {
                      if (medication.prescribedDate) {
                        timelineEvents.push({
                          date: medication.prescribedDate,
                          type: 'medication',
                          title: `Started ${medication.name}`,
                          description: `${medication.dosage} - ${medication.frequency}`,
                          icon: 'Pill',
                          color: 'bg-blue-100 text-blue-600'
                        });
                      }
                    });
                  }
                  
                  // Add last visit event
                  if (patient.lastVisit) {
                    timelineEvents.push({
                      date: patient.lastVisit,
                      type: 'visit',
                      title: 'Last Visit',
                      description: 'Regular checkup and consultation',
                      icon: 'Calendar',
                      color: 'bg-green-100 text-green-600'
                    });
                  }
                  
                  // Sort events by date (most recent first)
                  timelineEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
                  
                  if (timelineEvents.length === 0) {
                    return (
                      <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <ApperIcon name="Clock" className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No timeline events available</p>
                      </div>
                    );
                  }
                  
                  return (
                    <div className="space-y-6">
                      {timelineEvents.map((event, index) => (
                        <div key={index} className="relative flex items-start space-x-4">
                          {/* Timeline line */}
                          {index < timelineEvents.length - 1 && (
                            <div className="absolute left-5 top-12 w-0.5 h-16 bg-gray-200"></div>
                          )}
                          
                          {/* Event icon */}
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full ${event.color} flex items-center justify-center`}>
                            <ApperIcon name={event.icon} className="h-5 w-5" />
                          </div>
                          
                          {/* Event content */}
                          <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">{event.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              </div>
                              <span className="text-sm text-gray-500 font-medium">
                                {format(new Date(event.date), "MMM dd, yyyy")}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetail;