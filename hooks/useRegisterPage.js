import { useCallback, useMemo, useState } from "react";
import { object, string } from "yup";
import * as yup from "yup";

export default function useRegisterScreen() {
    const [formValues, setFormValues] = useState({ phone: "" });
    const onChangeText = useCallback(
        (inputKey, text) => setFormValues({ ...formValues, [inputKey]: text }),
        [formValues]
    );

    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async ({ schema, formData, sendOtpApi }) => {
        try {
            setLoading(true);
            const formatedData = { ...formData, phone: `255${formData.phone}` };
            await checkValidation({ schema, formData: formatedData });
            const response = await handleApi({ schema, formData, sendOtpApi });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, []);

    const schema = useMemo(() => object({ phone: string().length(12) }), []);

    return { onChangeText, onSubmit, formValues, schema, loading };
}

async function checkValidation({ schema, formData }) {
    const isValid = await schema.isValid(formData);

    if (!isValid) {
        const errorObj = schema.validate(formData)["_j"];

        const path = errorObj["path"];
        const errors = errorObj["errors"];
        displayErrors({ errors, path });
        throw new Error(JSON.stringify({ path, errors }));
    }
}

async function handleApi({ formData, sendOtpApi }) {
    const response = await sendOtpApi({ phone: formData.phone });
    console.log(response.data);
    return response;
}

function displayErrors({ errors, path = "" }) {
    errors.forEach((error) => {
        console.log(`error message in ${path}: `, error);
    });
}
