import { useState } from "react";
import PatientList from "@/components/organisms/PatientList";
import PatientForm from "@/components/organisms/PatientForm";

const Patients = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const handleAddPatient = () => {
    setSelectedPatient(null);
    setShowForm(true);
  };
  
  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setShowForm(true);
  };
  
  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPatient(null);
  };
  
  const handleSavePatient = (savedPatient) => {
    setShowForm(false);
    setSelectedPatient(null);
    // The patient list will reload automatically
  };
  
  return (
    <div className="h-full animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">
        {/* Patient List */}
        <div className={`${showForm ? 'lg:col-span-4' : 'lg:col-span-12'} transition-all duration-300`}>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 h-full">
            <PatientList onAddPatient={handleAddPatient} />
          </div>
        </div>
        
        {/* Patient Form */}
        {showForm && (
          <div className="lg:col-span-8">
            <PatientForm
              patient={selectedPatient}
              onCancel={handleCloseForm}
              onSave={handleSavePatient}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Patients;