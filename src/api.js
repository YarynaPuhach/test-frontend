const API_BASE_URL = 'https://test-backend-g0f7.onrender.com/api';

export const fetchContractors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/contractors`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching contractors:', error);
    throw error;
  }
};

export const addContractor = async (contractor) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contractors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contractor)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding contractor:', error);
    throw error;
  }
};

export const editContractor = async (id, updatedFields) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contractors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error editing contractor:', error);
    throw error;
  }
};

export const deleteContractor = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/contractors/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error deleting contractor:', error);
    throw error;
  }
};

export const fetchDelegations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/delegations`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching delegations:', error);
    throw error;
  }
};

export const fetchEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const fetchInvoices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching invoices:', error);
    throw error;
  }
};

export const updateInvoice = async (invoice) => {
  try {
    const response = await fetch(`${API_BASE_URL}/invoices/${invoice.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoice),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
};