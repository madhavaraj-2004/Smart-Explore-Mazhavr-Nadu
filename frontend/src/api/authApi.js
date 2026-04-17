import apiClient from './client';

export async function signupUser(payload) {
  const normalizedDob = String(payload.dateOfBirth || '').trim().slice(0, 10);

  const body = {
    first_name: payload.firstName.trim(),
    last_name: payload.lastName.trim(),
    dob: normalizedDob,
    mobile: payload.mobileNumber.trim(),
    email: payload.email.trim(),
    address: payload.location.trim(),
    password: payload.password,
  };

  const { data } = await apiClient.post('/signup', body);
  return data;
}

export async function loginUser(payload) {
  const body = {
    email: payload.email.trim(),
    password: payload.password,
  };

  const { data } = await apiClient.post('/login', body);
  return data;
}
