import { apiService } from './api';

interface InternDTOBackend {
  id: number;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  school: string;
  department: string;
  startDate: string;
  endDate: string;
  status: string;
  encadreurId: number;
  encadreurName?: string;
  projectId: number | null;
  cv: string | null;
  notes: string | null;
}

export interface InternDTO {
  id: number;
  userId: number;
  email: string;
  nom: string;
  prenom: string;
  phone: string;
  school: string;
  department: string;
  startDate: string;
  endDate: string;
  status: string;
  encadreurId: number;
  encadreurNom?: string;
  encadreurPrenom?: string;
  projectId: number | null;
  cv: string | null;
  notes: string | null;
}

function mapBackendToFrontend(backend: InternDTOBackend): InternDTO {
  return {
    id: backend.id,
    userId: backend.userId,
    email: backend.email,
    nom: backend.lastName,
    prenom: backend.firstName,
    phone: backend.phone,
    school: backend.school,
    department: backend.department,
    startDate: backend.startDate,
    endDate: backend.endDate,
    status: backend.status,
    encadreurId: backend.encadreurId,
    projectId: backend.projectId,
    cv: backend.cv,
    notes: backend.notes,
  };
}

export interface EncadreurDTO {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  phone: string;
  department: string;
  role: string;
  accountStatus: string;
  avatar: string | null;
}

export interface UpdateEncadreurRequest {
  nom?: string;
  prenom?: string;
  phone?: string;
  department?: string;
}

export const encadreurService = {
  async getAllEncadreurs(): Promise<EncadreurDTO[]> {
    return apiService.get<EncadreurDTO[]>('/encadreurs');
  },

  async getEncadreurById(id: number): Promise<EncadreurDTO> {
    return apiService.get<EncadreurDTO>(`/encadreurs/${id}`);
  },

  async getEncadreurByUserId(userId: number): Promise<EncadreurDTO> {
    return apiService.get<EncadreurDTO>(`/encadreurs/by-user/${userId}`);
  },

  async getEncadreurInterns(id: number): Promise<InternDTO[]> {
    const backendData = await apiService.get<InternDTOBackend[]>(`/encadreurs/${id}/interns`);
    return backendData.map(mapBackendToFrontend);
  },

  async getEncadreurInternCount(id: number): Promise<number> {
    return apiService.get<number>(`/encadreurs/${id}/intern-count`);
  },

  async updateEncadreur(id: number, request: UpdateEncadreurRequest): Promise<EncadreurDTO> {
    return apiService.put<EncadreurDTO>(`/encadreurs/${id}`, request);
  },

  async deleteEncadreur(id: number): Promise<void> {
    return apiService.delete<void>(`/encadreurs/${id}`);
  }
};
