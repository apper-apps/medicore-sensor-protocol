import { useState, useEffect } from "react";
import PatientCard from "@/components/molecules/PatientCard";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import PatientService from "@/services/api/PatientService";

const PatientList = ({ onAddPatient }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  
  const loadPatients = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await PatientService.getAll();
      setPatients(data);
      setFilteredPatients(data);
    } catch (err) {
      setError("Failed to load patients. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadPatients();
  }, []);
  
  useEffect(() => {
    if (!searchQuery) {
      setFilteredPatients(patients);
      return;
    }
    
    const filtered = patients.filter(patient => {
      const searchLower = searchQuery.toLowerCase();
      return (
        patient.firstName?.toLowerCase().includes(searchLower) ||
        patient.lastName?.toLowerCase().includes(searchLower) ||
        patient.Id.toString().includes(searchQuery) ||
        patient.phone?.includes(searchQuery)
      );
    });
    
    setFilteredPatients(filtered);
  }, [searchQuery, patients]);
  
  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadPatients} />;
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Patients ({filteredPatients.length})
        </h2>
        <Button 
          onClick={onAddPatient}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          Add Patient
        </Button>
      </div>
      
      <div className="mb-4">
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search by name, ID, or phone..."
          className="w-full"
        />
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
        {filteredPatients.length === 0 ? (
          <Empty 
            message="No patients found"
            description={searchQuery ? "Try adjusting your search criteria" : "Add your first patient to get started"}
            actionLabel={searchQuery ? "Clear Search" : "Add Patient"}
            onAction={searchQuery ? () => setSearchQuery("") : onAddPatient}
          />
        ) : (
          filteredPatients.map((patient) => (
            <PatientCard 
              key={patient.Id} 
              patient={patient} 
              searchQuery={searchQuery}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PatientList;