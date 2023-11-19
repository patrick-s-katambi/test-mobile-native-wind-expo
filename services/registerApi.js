import { axiosInstance } from "../config/axiosInstance";

export async function registerApi(payload) {
    console.log(payload);
    return axiosInstance.post("auth/register-buyer-seller/", payload);
}

export default registerApi;
