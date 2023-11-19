import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import * as yup from "yup";

export function useLoginForm({ loginApi }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const schema = useMemo(
        () => yup.object({ username: yup.string().min(1), password: yup.string().min(6).max(128) }),
        []
    );
    const canProceed = useMemo(() => schema.isValidSync(form), [form]);
    const onChangeText = useCallback((formKey, value) => setForm((state) => ({ ...state, [formKey]: value })), []);
    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);
            const response = await loginApi(form);
            console.log("login response > data::", response?.data);
            if (response?.data?.status) {
                console.log("goToNextStep();");
            } else {
                Alert.alert("Error requesting Otp", response?.data?.detail);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, [form]);
    return { form, canProceed, onChangeText, onSubmit, loading };
}
