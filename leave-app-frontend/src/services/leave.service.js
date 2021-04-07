import axios from 'axios';

import { apiEndPoint, configHeader } from '../Config';

const API_ENDPOINT = apiEndPoint();
const config = configHeader();

export const addNewLeave = async (leaveData) => {
  const response = await axios.post(
    `${API_ENDPOINT}/leaves/add`,
    leaveData,
    config
  );
  return response;
};

export const getAllLeaves = async () => {
  const response = await axios.get(`${API_ENDPOINT}/leaves`, config);
  return response;
};

export const editLeave = async (id, leaveData) => {
  const response = await axios.put(
    `${API_ENDPOINT}/leaves/${id}`,
    leaveData,
    config
  );
  return response;
};

export const deleteLeave = async (id) => {
  const response = await axios.delete(`${API_ENDPOINT}/leaves/${id}`, config);
  return response;
};

export const approveLeave = async (id) => {
  const response = await axios.put(
    `${API_ENDPOINT}/leaves/mark-leave/${id}`,
    config
  );
  return response;
};
