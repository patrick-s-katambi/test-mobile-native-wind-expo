import { useCallback, useState } from "react";
import { Alert } from "react-native";

export default function useRegisterForm1({ sendOtpApi = async () => {}, goToNextStep }) {
    const [form, setForm] = useState({ phone: "" });
    const [loading, setLoading] = useState(false);
    const onChangeText = useCallback(({ formKey, text }) => setForm({ ...form, [formKey]: text }), [form]);
    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);
            const phoneNumber = `0${form.phone}`;
            const response = await sendOtpApi({ phone: phoneNumber });

            if (response?.data?.status) {
                goToNextStep({ phone: phoneNumber });
            } else {
                Alert.alert("Error requesting Otp", response?.data?.detail);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, [form.phone, goToNextStep]);
    return { form, onChangeText, onSubmit, loading };
}
