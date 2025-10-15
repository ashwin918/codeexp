const API_BASE_URL = 'http://localhost:3000/api'; // Change to your backend URL if deployed

// Generic API call function
const apiCall = async (url, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API call error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
};

//////////////////////////////
// 🔹 User APIs
//////////////////////////////

export const registerUser = (userData) => apiCall('/users/register', 'POST', userData);

export const loginUser = (userData) => apiCall('/users/login', 'POST', userData);

export const getUserProfile = () => apiCall('/users/profile', 'GET');


//////////////////////////////
// 🔹 Viewer APIs
//////////////////////////////

export const getAllViewers = () => apiCall('/viewers');

export const getViewerById = (id) => apiCall(`/viewers/${id}`);

export const createViewerLog = async () => {
  const ip = await fetch('https://api64.ipify.org?format=json')
    .then((res) => res.json())
    .then((data) => data.ip)
    .catch(() => 'unknown');

 return await apiCall('/viewers', 'POST', {
  ip_address: ip,
  user_agent: navigator.userAgent,
});

};


export const updateViewer = (id, viewerData) => apiCall(`/viewers/${id}`, 'PUT', viewerData);

export const deleteViewer = (id) => apiCall(`/viewers/${id}`, 'DELETE');


//////////////////////////////
// 🔹 Ticket APIs
//////////////////////////////


export const getAllTickets = () => apiCall('/tickets');

export const getTicketsByUserId = (userId) => apiCall(`/tickets/user/${userId}`, 'GET');

export const getTicketById = (id) => apiCall(`/tickets/${id}`);

export const createTicket = (ticketData) => apiCall('/tickets', 'POST', ticketData);

export const updateTicket = (id, updatedData) => {
  return apiCall(`/tickets/${id}`, 'PUT', updatedData);
};




export const deleteTicket = (id) => apiCall(`/tickets/${id}`, 'DELETE');


//////////////////////////////
// 🔹 Admin Log APIs
//////////////////////////////

export const getAllAdminLogs = () => apiCall('/admin-logs');

export const getAdminLogById = (id) => apiCall(`/admin-Logs/${id}`);

export const createAdminLog = (logData) => apiCall('/admin-Logs', 'POST', logData);

export const deleteAdminLog = (id) => apiCall(`/admin-Logs/${id}`, 'DELETE');

