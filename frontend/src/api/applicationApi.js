import api from "./axios";

export const getApplications = (params) => {
  return api.get("/applications", { params });
}; 

export const getApplicationStats = () => {
  return api.get("/applications/stats");
};

export const getApplication = (id) => {
  return api.get(`/applications/${id}`); 
};

export const createApplication = (data) => {
  return api.post("/applications", data);
};

export const updateApplication = (id, data) => {
  return api.put(`/applications/${id}`, data);
};

export const deleteApplication = (id) => {
  return api.delete(`/applications/${id}`);
}; 