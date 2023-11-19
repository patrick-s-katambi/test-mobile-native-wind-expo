import { axiosInstance } from "../config/axiosInstance";

export async function loginApi(payload) {
    return axiosInstance.post("auth/login-buyer-seller/", payload);
}

export default loginApi;
