import { toast } from "react-toastify";

class PatientService {
  static apperClient = null;
  
  static getApperClient() {
    if (!this.apperClient) {
      const { ApperClient } = window.ApperSDK;
      this.apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
    }
    return this.apperClient;
  }
  
  static async getAll() {
    try {
      const client = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "firstName" } },
          { field: { Name: "lastName" } },
          { field: { Name: "dateOfBirth" } },
          { field: { Name: "gender" } },
          { field: { Name: "bloodType" } },
          { field: { Name: "phone" } },
          { field: { Name: "email" } },
          { field: { Name: "address_street" } },
          { field: { Name: "address_city" } },
          { field: { Name: "address_state" } },
          { field: { Name: "address_zipCode" } },
          { field: { Name: "emergencyContacts" } },
          { field: { Name: "medicalHistory" } },
          { field: { Name: "currentMedications" } },
          { field: { Name: "allergies" } },
          { field: { Name: "lastVisit" } },
          { field: { Name: "status" } }
        ],
        orderBy: [
          {
            fieldName: "lastName",
            sorttype: "ASC"
          }
        ]
      };
      
      const response = await client.fetchRecords('patient', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }
      
      // Convert flat address fields to nested object for UI compatibility
      const processedData = response.data.map(patient => ({
        ...patient,
        address: {
          street: patient.address_street || '',
          city: patient.address_city || '',
          state: patient.address_state || '',
          zipCode: patient.address_zipCode || ''
        },
        // Parse JSON strings from database if needed
        emergencyContacts: patient.emergencyContacts ? 
          (typeof patient.emergencyContacts === 'string' ? 
            JSON.parse(patient.emergencyContacts) : patient.emergencyContacts) : [],
        medicalHistory: patient.medicalHistory ? 
          (typeof patient.medicalHistory === 'string' ? 
            JSON.parse(patient.medicalHistory) : patient.medicalHistory) : [],
        currentMedications: patient.currentMedications ? 
          (typeof patient.currentMedications === 'string' ? 
            JSON.parse(patient.currentMedications) : patient.currentMedications) : [],
        allergies: patient.allergies ? 
          (typeof patient.allergies === 'string' ? 
            patient.allergies.split(',').map(a => a.trim()) : patient.allergies) : []
      }));
      
      return processedData;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching patients:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
  
  static async getById(id) {
    try {
      const client = this.getApperClient();
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "firstName" } },
          { field: { Name: "lastName" } },
          { field: { Name: "dateOfBirth" } },
          { field: { Name: "gender" } },
          { field: { Name: "bloodType" } },
          { field: { Name: "phone" } },
          { field: { Name: "email" } },
          { field: { Name: "address_street" } },
          { field: { Name: "address_city" } },
          { field: { Name: "address_state" } },
          { field: { Name: "address_zipCode" } },
          { field: { Name: "emergencyContacts" } },
          { field: { Name: "medicalHistory" } },
          { field: { Name: "currentMedications" } },
          { field: { Name: "allergies" } },
          { field: { Name: "lastVisit" } },
          { field: { Name: "status" } }
        ]
      };
      
      const response = await client.getRecordById('patient', id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      const patient = response.data;
      
      // Convert flat address fields to nested object for UI compatibility
      return {
        ...patient,
        address: {
          street: patient.address_street || '',
          city: patient.address_city || '',
          state: patient.address_state || '',
          zipCode: patient.address_zipCode || ''
        },
        // Parse JSON strings from database if needed
        emergencyContacts: patient.emergencyContacts ? 
          (typeof patient.emergencyContacts === 'string' ? 
            JSON.parse(patient.emergencyContacts) : patient.emergencyContacts) : [],
        medicalHistory: patient.medicalHistory ? 
          (typeof patient.medicalHistory === 'string' ? 
            JSON.parse(patient.medicalHistory) : patient.medicalHistory) : [],
        currentMedications: patient.currentMedications ? 
          (typeof patient.currentMedications === 'string' ? 
            JSON.parse(patient.currentMedications) : patient.currentMedications) : [],
        allergies: patient.allergies ? 
          (typeof patient.allergies === 'string' ? 
            patient.allergies.split(',').map(a => a.trim()) : patient.allergies) : []
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching patient with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
  
  static async create(patientData) {
    try {
      const client = this.getApperClient();
      
      // Convert UI format to database format - only include Updateable fields
      const dbPatient = {
        Name: `${patientData.firstName || ''} ${patientData.lastName || ''}`.trim(),
        firstName: patientData.firstName || '',
        lastName: patientData.lastName || '',
        dateOfBirth: patientData.dateOfBirth || '',
        gender: patientData.gender || '',
        bloodType: patientData.bloodType || '',
        phone: patientData.phone || '',
        email: patientData.email || '',
        address_street: patientData.address?.street || patientData.address_street || '',
        address_city: patientData.address?.city || patientData.address_city || '',
        address_state: patientData.address?.state || patientData.address_state || '',
        address_zipCode: patientData.address?.zipCode || patientData.address_zipCode || '',
        emergencyContacts: Array.isArray(patientData.emergencyContacts) ? 
          JSON.stringify(patientData.emergencyContacts) : patientData.emergencyContacts || '',
        medicalHistory: Array.isArray(patientData.medicalHistory) ? 
          JSON.stringify(patientData.medicalHistory) : patientData.medicalHistory || '',
        currentMedications: Array.isArray(patientData.currentMedications) ? 
          JSON.stringify(patientData.currentMedications) : patientData.currentMedications || '',
        allergies: Array.isArray(patientData.allergies) ? 
          patientData.allergies.join(', ') : patientData.allergies || '',
        lastVisit: patientData.lastVisit || new Date().toISOString().split('T')[0],
        status: patientData.status || 'active'
      };
      
      const params = {
        records: [dbPatient]
      };
      
      const response = await client.createRecord('patient', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create patients ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          toast.success('Patient created successfully');
          return successfulRecords[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating patient:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      toast.error('Failed to create patient');
      return null;
    }
  }
  
  static async update(id, patientData) {
    try {
      const client = this.getApperClient();
      
      // Convert UI format to database format - only include Updateable fields
      const dbPatient = {
        Id: id,
        Name: `${patientData.firstName || ''} ${patientData.lastName || ''}`.trim(),
        firstName: patientData.firstName || '',
        lastName: patientData.lastName || '',
        dateOfBirth: patientData.dateOfBirth || '',
        gender: patientData.gender || '',
        bloodType: patientData.bloodType || '',
        phone: patientData.phone || '',
        email: patientData.email || '',
        address_street: patientData.address?.street || patientData.address_street || '',
        address_city: patientData.address?.city || patientData.address_city || '',
        address_state: patientData.address?.state || patientData.address_state || '',
        address_zipCode: patientData.address?.zipCode || patientData.address_zipCode || '',
        emergencyContacts: Array.isArray(patientData.emergencyContacts) ? 
          JSON.stringify(patientData.emergencyContacts) : patientData.emergencyContacts || '',
        medicalHistory: Array.isArray(patientData.medicalHistory) ? 
          JSON.stringify(patientData.medicalHistory) : patientData.medicalHistory || '',
        currentMedications: Array.isArray(patientData.currentMedications) ? 
          JSON.stringify(patientData.currentMedications) : patientData.currentMedications || '',
        allergies: Array.isArray(patientData.allergies) ? 
          patientData.allergies.join(', ') : patientData.allergies || '',
        lastVisit: patientData.lastVisit || '',
        status: patientData.status || 'active'
      };
      
      const params = {
        records: [dbPatient]
      };
      
      const response = await client.updateRecord('patient', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }
      
      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update patients ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          toast.success('Patient updated successfully');
          return successfulUpdates[0].data;
        }
      }
      
      return null;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating patient:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      toast.error('Failed to update patient');
      return null;
    }
  }
  
  static async delete(id) {
    try {
      const client = this.getApperClient();
      
      const params = {
        RecordIds: [id]
      };
      
      const response = await client.deleteRecord('patient', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }
      
      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete patients ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulDeletions.length > 0) {
          toast.success('Patient deleted successfully');
          return true;
        }
      }
      
      return false;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting patient:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      toast.error('Failed to delete patient');
      return false;
    }
  }
}

export default PatientService;