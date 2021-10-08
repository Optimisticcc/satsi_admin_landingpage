import axiosClient from './axiosClient';

const getDataApi = {
  getCollaborates: (params) => {
    const url = 'api/collaborator';
    return axiosClient.get(url, { params });
  },
  getOnlineRegisters: (params) => {
    const url = 'api/pre-qualification-user-air';
    return axiosClient.get(url, { params });
  },
  getRegisterProgram: (params) => {
    const url = 'api/user-satsi';
    return axiosClient.get(url, {
      params,
      // baseURL: process.env.REACT_APP_API_URL_S,
    });
  },
  getRegisterInfo: (params) => {
    const url = 'api/user-air-satsi';
    return axiosClient.get(url, { params });
  },
  getUserByCollaborator: (id) => {
    const url = `api/collaborator/${id}`;
    return axiosClient.get(url);
  },
  updateElectStatus: (id, data) => {
    const url = `api/pre-qualification-user-air/update-status/${id}`;
    return axiosClient.patch(url, data);
  },
};
export default getDataApi;
