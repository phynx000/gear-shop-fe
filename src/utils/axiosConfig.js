import axios from 'axios';
import authService from './authService';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if ((error.response.status === 403 || error.response.status === 405)   && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            return new Promise(function (resolve, reject) {
                authService.refreshToken().then(({ token }) => {
                    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    processQueue(null, token);
                    resolve(axios(originalRequest));
                }).catch((err) => {
                    processQueue(err, null);
                    if (err.response && (err.response.status === 500 || err.response.status === 405)) {
                        authService.logout();
                        alert('Session expired due to server error. Please log in again.');
                        window.location.href = '/login';
                    }
                    reject(err);
                }).then(() => {
                    isRefreshing = false;
                });
            });
        }

        return Promise.reject(error);
    }
);