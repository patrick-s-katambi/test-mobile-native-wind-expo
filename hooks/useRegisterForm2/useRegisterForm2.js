import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { date, object, string } from "yup";

export function useRegisterForm2({ registerApi, phoneParam, onErrorNsvigate = () => {} }) {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        dob: undefined,
    });

    const [loading, setLoading] = useState(false);

    const onChangeFormValue = useCallback((formKey, value) => {
        setForm((state) => {
            state = { ...state, [formKey]: value };
            return state;
        });
    }, []);

    const schema = useMemo(
        () =>
            object({
                username: string().max(30),
                email: string().email().required(),
                password: string().max(68).min(6),
                firstName: string().max(30).min(1),
                lastName: string().max(30).min(1),
                dob: date().nullable(),
            }),
        []
    );
    const canProceed = useMemo(() => validate(schema, form) ?? false, [form]);

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);
            const response = await registerApi({
                username: form.username,
                email: form.email,
                role: 3,
                password: form.password,
                first_name: form.firstName,
                last_name: form.lastName,
                date_of_birth: ((date) => {
                    if (!date) return undefined;

                    const year = date.getFullYear();
                    const month = date.getMonth() + 1;
                    const day = date.getDate();
                    return `${year}-${month}-${day}`;
                })(form.dob),
                phone: phoneParam,
            });

            if (response?.data?.status) {
                console.log("we can proceed to nect step");
            } else {
                console.log(response?.data);
                Alert.alert(
                    "Error requesting Otp",
                    response?.data?.detail,
                    [{ text: "OK", onPress: undefined /**onErrorNsvigate**/ }],
                    {}
                );
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [form]);

    return { form, onChangeFormValue, canProceed, onSubmit, loading };
}

function validate(schema, formData) {
    return schema.isValidSync(formData);
}
