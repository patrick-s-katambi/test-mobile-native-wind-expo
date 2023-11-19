import { axiosInstance } from "../config/axiosInstance";

export async function validateOtpApi(payload) {
    return axiosInstance.post("auth/validate-otp/", payload);
}

export default validateOtpApi;
