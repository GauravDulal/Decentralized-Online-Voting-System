import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const signUp = async (username, password) => {
  const response = await axios.post('http://localhost:8000/api/register/', {
    username,
    password,
  });
  return response.data;
};

export const signIn = (username, password) =>
  axios.post(`${BASE_URL}/token/`, { username, password });

export const addCandidate = (token, name) =>
  axios.post(`${BASE_URL}/add-candidate/`, { name }, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const refreshToken = (refresh) =>
  axios.post('http://127.0.0.1:8000/api/token/refresh/', {
    refresh
  })

export const vote = (token, candidateId, wallet, privateKey) =>
  axios.post(`${BASE_URL}/vote/`, {
    candidate_id: candidateId,
    wallet,
    private_key: privateKey
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

