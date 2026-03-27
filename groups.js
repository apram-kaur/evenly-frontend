import axios from "axios";

const API = "http://localhost:5000/api/groups";

export const createGroup = async (data) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(`${API}/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getGroups = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteGroup = async (groupId) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(`${API}/${groupId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const sendInvite = async (groupId, email) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/${groupId}/invite`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};