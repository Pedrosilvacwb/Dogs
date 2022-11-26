export const baseUrl = 'https://dogsapi.origamid.dev/json';

export function TOKEN_POST(body) {
  return {
    url: baseUrl + '/jwt-auth/v1/token',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function TOKEN_AUTH_POST(token) {
  return {
    url: baseUrl + '/jwt-auth/v1/token/validate',
    options: {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  };
}

export function USER_GET(token) {
  return {
    url: baseUrl + '/api/user',
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    },
  };
}

export function USER_POST(body) {
  return {
    url: baseUrl + '/api/user',
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function PHOTO_POST(formData, token) {
  return {
    url: baseUrl + '/api/photo',
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    },
  };
}
