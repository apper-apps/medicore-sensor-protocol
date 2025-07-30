import patientData from "@/services/mockData/patients.json";

class PatientService {
  static patients = [...patientData];
  
  static async getAll() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.patients];
  }
  
  static async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const patient = this.patients.find(p => p.Id === id);
    if (!patient) {
      throw new Error("Patient not found");
    }
    return { ...patient };
  }
  
  static async create(patientData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Find the highest existing Id and add 1
    const maxId = Math.max(...this.patients.map(p => p.Id), 0);
    const newPatient = {
      ...patientData,
      Id: maxId + 1,
      lastVisit: new Date().toISOString().split('T')[0],
      status: patientData.status || "active"
    };
    
    this.patients.push(newPatient);
    return { ...newPatient };
  }
  
  static async update(id, patientData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const index = this.patients.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    
    const updatedPatient = {
      ...this.patients[index],
      ...patientData,
      Id: id // Ensure Id is not changed
    };
    
    this.patients[index] = updatedPatient;
    return { ...updatedPatient };
  }
  
  static async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.patients.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Patient not found");
    }
    
    this.patients.splice(index, 1);
    return true;
  }
}

export default PatientService;