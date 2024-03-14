// import axios from 'axios';
// import { useToast } from '@/components/ui/use-toast';

// const axiosClient = axios.create();

// // Replace this with your backend base URL
// axiosClient.defaults.baseURL = 'https://api.example.org/';

// axiosClient.defaults.headers.common['Content-Type'] = 'application/json';
// axiosClient.defaults.headers.common['Accept'] = 'application/json';

// axiosClient.interceptors.request.use(
//   async (config) => {
//     const token = localStorage.getItem('access-token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalConfig = error.config;
//     const { toast } = useToast();

//     if (originalConfig.url !== '/user/login' && error.response) {
//       // Access Token was expired
//       if (error.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const rs = await axios.post('https://api.example.org/user/refresh', {}, {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem('refresh-token')}`
//             }
//           });

//           const access = rs.data.data['access-token'];
//           const refresh = rs.data.data['refresh-token'];

//           localStorage.setItem('access-token', access);
//           localStorage.setItem('refresh-token', refresh);

//           return axiosClient(originalConfig);
//         } catch (_error) {
//           toast({
//             title: 'Session time out. Please login again.',
//             description: 'sessionTimeOut'
//           });

//           // Logging out the user by removing all the tokens from local
//           localStorage.removeItem('access-token');
//           localStorage.removeItem('refresh-token');
//           // Redirecting the user to the landing page
//           window.location.href = window.location.origin;
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;
