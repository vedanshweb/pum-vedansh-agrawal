let baseURL;

if (process.env.NODE_ENV === 'development') {
    baseURL = 'https://reqres.in/api/';
}

if (process.env.NODE_ENV === 'production') {
    baseURL = 'https://reqres.in/api/';
}

export const BASE_URL = baseURL;