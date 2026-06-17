import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const createPredictionApi = async (payload) => {
  const { data } = await axios.post(
    `${API_URL}/api/predictions`,
    payload
  );

  return data;
};

export const getPredictionsListApi = async () => {
  const { data } = await axios.get(`${API_URL}/api/predictions`);
  return data.data;
};
export const updateMatchResultApi = async (payload) => {
  const { data } = await axios.put(
    `${API_URL}/api/predictions/match-result`,
    payload
  );

  return data;
};
export const updatePaymentStatusApi = async (payload) => {
  const { data } = await axios.put(
    `${API_URL}/api/predictions/payment-status`,
    payload
  );

  return data;
};