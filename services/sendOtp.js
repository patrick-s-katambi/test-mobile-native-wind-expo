import { axiosInstance } from "../config/axiosInstance";

export async function sendOtpApi({ phone }) {
    return axiosInstance.post("auth/send-otp/", { phone });
}
