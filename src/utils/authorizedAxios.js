

import axios from 'axios';
import { toast } from 'react-toastify'

import { handleLogoutAPI, refreshTokenAPI } from '~/apis';
// Khởi tạo một đối tượng Axios 
// (authorizedAxios Instance) mục đích để custom
//  và cấu hình chung cho dự án.
let authorizedAxiosInstance = axios.create({

})
// Thời gian chờ tối đa của 1 reqquest: 10 phút
authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

// with Creden Lials: Sẽ cho phép-axios - tự động đính kèm và gửi cookie trong mỗi-request
//  - lên-BE-(phục vụ)
//  trường hợp nếu chúng - ta - sử-dụng- JWT- tokens - (refresh-&-accgs) theo cơ chế 
// - httpOnly Cookie)
authorizedAxiosInstance.defaults.withCredentials = true



// */
// Cấu hình Interceptors (Bộ đánh chặn vào giữa mọi Request & Response)
// https://axios-http.com/docs/interceptors

// Add a request interceptor : can thiệp vào giữa những cái request API
authorizedAxiosInstance.interceptors.request.use((config) => {
    // Do something before request is sent

    // Lấy accessToken từ Localstorage và đính kèm vào header.
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {

        //-Cần - thêm- "Bearer." .vì chúng - ta nên tuân thủ theo tiêu chuẩn 
        // OAuth 2.0 trong việc xác định. Loại token đang sử dụng
        // Bearer là định nghĩa Loại Token- dành cho việc xác thực và ủy quyền, 
        // tham khảo các loại token khác như: Basic-token, Digest-taken, OAuth token,...VV
        config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// Khởi tạo một cái promise cho việc gọi api refresh_token
// Mục đích tạo Promise này để khi nhận yêu cầu refresh Token đầu tiên thì 
// hold lại việc gọi API refresh_token. 
// cho tới khi xong xuôi - thì mới - retry lại - 
// những api-bị-lỗi trước đó. Thay
//  vì cứ thế gọi lại refresh TokenAPI Liên tục với mỗi request-lỗi.

let refreshTokenPromise = null
// Add a response interceptor : can thiệp vào giữa những cái response nhận về từ API
authorizedAxiosInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // /* Mọi mã http status code nằm trong khoảng 200 - 299 sẽ là success và rơi vào đây 

    // Do something with response data
    return response;
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    // /* Mọi mã http status code nằm ngoài khoảng 200 - 299 sẽ là error và rơi vào đây 
    // Do something with response error


    // 9. Cơ chế Refresh Token tự động với Axios Interceptors | JWT - Jsonwebtoken | TrungQuanDev

    // //Nếu nhận mã 401 từ BE ,thì gọi api logout luôn
    // if (error.response?.status === 401) {

    //     handleLogoutAPI().then(() => {

    //         //nếu dùng cookie thì nhớ xóa userInfo
    //         // localStorage.removeItem('userInfo')


    //         // Điều hướng tới trang Dashboard khi login thành công
    //         location.href = '/login'
    //     })
    // }


    // Nếu như : nhận mã 410 từ BE, thì sẽ gọi api refresh token để làm mới lại accessToken

    //đầu tiên cần lấy dc các req đang bị lỗi thông qua error config
    const originalRequest = error.config
    console.log(originalRequest)

    // if (error.response?.status === 410 && !originalRequest._retry) {
    if (error.response?.status === 410 &&  originalRequest ) {

        // Gán thêm một giá trị retry luôn = true trong khoảng thời gian chờ, 
        // để việc refresh token này chỉ luôn gọi 1 lần tại 1 thời điểm
        // originalRequest._retry = true


        if (!refreshTokenPromise) {

            //lấy refreshToken từ LocalStorage (cho trg hợp localStorage)
            const refreshToken = localStorage.getItem('refreshToken')

            console.log("Check refreshToken : ", refreshToken)
            refreshTokenPromise = refreshTokenAPI(refreshToken)
                .then((res) => {
                    // Lấy và gán lại accessToken vào LocalStorage (cho trg hợp localStorage)
                    const { accessToken } = res.data
                    localStorage.setItem('accessToken', accessToken)

                    authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`

                    // Đồng thời Lưu ý là accessToken cũng đã được update lại ở Cookie rồi nhé (cho trường hợp Cookie)


                })
                .catch(_error => {

                    // Nếu nhận bất kỳ lỗi nào từ api-refresh token thì cứ - Logout Luôn
                    handleLogoutAPI().then(() => {

                        //nếu dùng cookie thì nhớ xóa userInfo
                        // localStorage.removeItem('userInfo')


                        // Điều hướng tới trang Dashboard khi login thành công
                        // location.href = '/login'
                    })
                    return Promise.reject(_error)
                })
                .finally(() => {

                    //DÙ API refresh_token có thành công hay lỗi thì 
                    // vẫn luôn gắn lại cái refreshTokenPromise về null như ban đầu.
                    refreshTokenPromise = null
                })
        }


        //  Cuối cùng mới return cái refresh TokenPromise trong trường hợp success ở đây
        return refreshTokenPromise.then(() => {
            // Bước cuối cùng Quan trọng: return lại axios instance của
            //  chúng ta kết hợp cái originalConfig để gọi lại những api ban đầu bị lỗi
            return authorizedAxiosInstance(originalRequest)
        })

    }


    // Xử lý tập trung phần hiển thị thông báo lỗi trả về từ mọi API ở đây
    // (viết code một lần: Clean Code) 
    // console.log error ra là sẽ thấy cấu trúc data dẫn tới message lỗi như dưới đây
    //     1 / Dùng toastify đề hiển thị bắt kể mọi mã lỗi lên màn hình 
    // – Ngoại trừ mã 118 - GONE phục vụ việc tự động refresh lại token,
    if (error.response?.status != 410) {
        toast.error(error.response?.data?.message || error?.message)
    }

    return Promise.reject(error);
});

export default authorizedAxiosInstance