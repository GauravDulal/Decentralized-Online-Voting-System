import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const register = (username, password) =>
  axios.post(`${BASE_URL}/register/`, { username, password });

export const login = (username, password) =>
  axios.post(`${BASE_URL}/token/`, { username, password });

export const addCandidate = (token, name) =>
  axios.post(`${BASE_URL}/add-candidate/`, { name }, {
    headers: { Authorization: `Bearer ${token}` }
  });

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

