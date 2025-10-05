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

export interface CreateInternRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  school: string;
  department: string;
  startDate: string;
  endDate: string;
  encadreurId: number;
}

export interface UpdateInternRequest {
  phone?: string;
  school?: string;
  department?: string;
  startDate?: string;
  endDate?: string;
  encadreurId?: number;
}

export interface UpdateInternStatusRequest {
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
}

export const internService = {
  async getAllInterns(params?: { encadreurId?: number; encadreurUserId?: number; department?: string; status?: string }): Promise<InternDTO[]> {
    const query = new URLSearchParams();
    if (params?.encadreurId) query.append('encadreurId', params.encadreurId.toString());
    if (params?.encadreurUserId) query.append('encadreurUserId', params.encadreurUserId.toString());
    if (params?.department) query.append('department', params.department);
    if (params?.status) query.append('status', params.status);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const backendData = await apiService.get<InternDTOBackend[]>(`/interns${queryString}`);
    return backendData.map(mapBackendToFrontend);
  },

  async getInternById(id: number): Promise<InternDTO> {
    const backendData = await apiService.get<InternDTOBackend>(`/interns/${id}`);
    return mapBackendToFrontend(backendData);
  },

  async createIntern(request: CreateInternRequest): Promise<InternDTO> {
    const backendData = await apiService.post<InternDTOBackend>('/interns', request);
    return mapBackendToFrontend(backendData);
  },

  async updateIntern(id: number, request: UpdateInternRequest): Promise<InternDTO> {
    const backendData = await apiService.put<InternDTOBackend>(`/interns/${id}`, request);
    return mapBackendToFrontend(backendData);
  },

  async updateInternStatus(id: number, status: UpdateInternStatusRequest): Promise<InternDTO> {
    const backendData = await apiService.patch<InternDTOBackend>(`/interns/${id}/status`, status);
    return mapBackendToFrontend(backendData);
  },

  async deleteIntern(id: number): Promise<void> {
    return apiService.delete<void>(`/interns/${id}`);
  }
};
