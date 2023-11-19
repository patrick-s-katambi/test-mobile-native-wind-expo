import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";

import * as yup from "yup";

export function useOtpForm({ validateOtpApi, goToNextStep, phone, onErrorNsvigate = () => {} }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ otp: "" });

    const onChangeText = useCallback((formKey, value) => setForm({ ...form, [formKey]: value }), [form]);

    const schema = useMemo(
        () =>
            yup.object({
                otp: yup
                    .string()
                    .max(4)
                    .min(4)
                    .matches(/^[0-9]{4}$/),
            }),
        []
    );
    const canProceed = useMemo(() => schema.isValidSync(form), [form]);

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);
            const response = await validateOtpApi({ ...form, phone });

            if (response?.data?.status) {
                goToNextStep();
            } else {
                Alert.alert("Error requesting Otp", response?.data?.detail, [
                    { text: "OK", onPress: undefined /**onErrorNsvigate**/ },
                ]);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, [form, phone]);

    return { form, onChangeText, canProceed, onSubmit, loading };
}
