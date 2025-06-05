import axios from "axios";
const API_BASE_URL = "/";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authUser"))?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMDFKV1hIQjlQR1k3NDVZWTVIMTRHWjdWWksiLCJ0ZW5hbnRfaWQiOiJjODU1OWRiNjViMTJiMDczNGNhMTE5MTMyODRlYmE1NmQ1NzFiMjE1NDhiMTM5OTZmZDFhYTc5NGY1YjA1YjAyIiwiaW50ZXJuYWxfc2VjcmV0IjoiOGNhMWM2MzEtOTI2Mi00Yzk1LWExMDQtMGUzZTk0ZDU2MjdiIn0.HEqdjMWwhrWfsie9rIXb7oYc_mz1Z7RRNfeVdWNTSzc

export default apiClient;
