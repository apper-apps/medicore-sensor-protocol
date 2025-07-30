import { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import PatientService from "@/services/api/PatientService";

const PatientForm = ({ patient, onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || "",
    lastName: patient?.lastName || "",
    dateOfBirth: patient?.dateOfBirth || "",
    gender: patient?.gender || "",
    bloodType: patient?.bloodType || "",
    phone: patient?.phone || "",
    email: patient?.email || "",
    address: {
      street: patient?.address?.street || "",
      city: patient?.address?.city || "",
      state: patient?.address?.state || "",
      zipCode: patient?.address?.zipCode || ""
    },
    emergencyContacts: patient?.emergencyContacts || [
      { name: "", relationship: "", phone: "" }
    ],
    allergies: patient?.allergies || [],
    status: patient?.status || "active"
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };
  
  const handleAddressChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };
  
  const handleEmergencyContactChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) => 
        i === index ? { ...contact, [field]: value } : contact
      )
    }));
  };
  
  const addEmergencyContact = () => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: [
        ...prev.emergencyContacts,
        { name: "", relationship: "", phone: "" }
      ]
    }));
  };
  
  const removeEmergencyContact = (index) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index)
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }
    
    try {
      setLoading(true);
      
      let savedPatient;
      if (patient?.Id) {
        savedPatient = await PatientService.update(patient.Id, formData);
        toast.success("Patient updated successfully");
      } else {
        savedPatient = await PatientService.create(formData);
        toast.success("Patient created successfully");
      }
      
      onSave(savedPatient);
    } catch (error) {
      toast.error("Failed to save patient");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <ApperIcon name="UserPlus" className="h-5 w-5" />
            {patient?.Id ? "Edit Patient" : "Add New Patient"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <ApperIcon name="X" className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="h-full overflow-y-auto custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="First Name"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                error={errors.firstName}
              />
              
              <FormField
                label="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                error={errors.lastName}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                label="Date of Birth"
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                error={errors.dateOfBirth}
              />
              
              <FormField
                label="Gender"
                value={formData.gender}
                onChange={(e) => handleInputChange("gender", e.target.value)}
              >
                <select 
                  className="medical-input"
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </FormField>
              
              <FormField
                label="Blood Type"
                value={formData.bloodType}
                onChange={(e) => handleInputChange("bloodType", e.target.value)}
              >
                <select 
                  className="medical-input"
                  value={formData.bloodType}
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
              </FormField>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={errors.phone}
              />
              
              <FormField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Address</h4>
              <FormField
                label="Street Address"
                value={formData.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  label="City"
                  value={formData.address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                />
                
                <FormField
                  label="State"
                  value={formData.address.state}
                  onChange={(e) => handleAddressChange("state", e.target.value)}
                />
                
                <FormField
                  label="Zip Code"
                  value={formData.address.zipCode}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                />
              </div>
            </div>
          </div>
          
          {/* Emergency Contacts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Emergency Contacts</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addEmergencyContact}
              >
                <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
                Add Contact
              </Button>
            </div>
            
            {formData.emergencyContacts.map((contact, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Contact {index + 1}</h4>
                  {formData.emergencyContacts.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEmergencyContact(index)}
                    >
                      <ApperIcon name="Trash2" className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    label="Name"
                    value={contact.name}
                    onChange={(e) => handleEmergencyContactChange(index, "name", e.target.value)}
                  />
                  
                  <FormField
                    label="Relationship"
                    value={contact.relationship}
                    onChange={(e) => handleEmergencyContactChange(index, "relationship", e.target.value)}
                  />
                  
                  <FormField
                    label="Phone"
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => handleEmergencyContactChange(index, "phone", e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <ApperIcon name="Save" className="h-4 w-4 mr-2" />
                  {patient?.Id ? "Update Patient" : "Create Patient"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientForm;