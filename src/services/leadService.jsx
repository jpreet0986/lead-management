import axios from "axios";
const APIURL = "http://localhost:8000/leads/";

export const getLeadList = async () => {
  try {
    const res = await axios.get(APIURL);
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export const getLead = async lead_id => {
  try {
    const url = `${APIURL}${lead_id}`;
    const res = await axios.get(url);
    return res.data;
  } catch (e) {
    return e.message;
  }
};

export const deleteLead = async lead => {
  try {
    const url = `${APIURL}${lead.id}`;
    const res = await axios.delete(url);

    return res.data;
  } catch (e) {
    return e.message;
  }
};

export function addLead(lead) {
  const url = APIURL;
  return axios
    .post(url, lead)
    .then(function(response) {
      return response.data;
    })
    .catch(function(e) {
      return e.message;
    });
}

export function editLead(lead, lead_id) {
  const url = `${APIURL}${lead_id}/`;
  return axios
    .patch(url, {
      ...lead
    })
    .then(function(response) {
      return response.data;
    })
    .catch(function(e) {
      return e.message;
    });
}
