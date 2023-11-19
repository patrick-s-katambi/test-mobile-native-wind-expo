import { useRegisterForm2 } from "./useRegisterForm2";
import { act, renderHook } from "@testing-library/react-native";

describe("useRegisterForm2 hook", () => {
    it("should have a returned value", () => {
        const { result } = renderHook(useRegisterForm2, { initialProps: { registerApi: () => {} } });

        expect(result.current).toBeDefined();
    });

    it("should have empty form values by default", () => {
        const { result } = renderHook(useRegisterForm2, { initialProps: { registerApi: () => {} } });

        const { username, email, password, firstName, lastName, dob } = result.current.form;

        expect(username).toBe("");
        expect(email).toBe("");
        expect(password).toBe("");
        expect(firstName).toBe("");
        expect(lastName).toBe("");
        expect(dob).toBe(undefined);
    });

    it("should change form value when onChangeFormValue method is called", async () => {
        const { result } = renderHook(useRegisterForm2, { initialProps: { registerApi: () => {} } });

        expect(result.current.canProceed).not.toBeTruthy();

        const formValues = {
            username: "Jane Doe Shop",
            email: "janedoe@mail.com",
            password: "123qwe",
            firstName: "Jane",
            lastName: "Doe",
            dob: new Date(),
        };

        await act(async () => {
            result.current.onChangeFormValue("username", formValues.username);
            result.current.onChangeFormValue("email", formValues.email);
            result.current.onChangeFormValue("password", formValues.password);
            result.current.onChangeFormValue("firstName", formValues.firstName);
            result.current.onChangeFormValue("lastName", formValues.lastName);
            result.current.onChangeFormValue("dob", formValues.dob);
        });

        await act(async () => {
            const { username, email, password, firstName, lastName, dob } = result.current.form;
            expect(username).toBe(formValues.username);
            expect(email).toBe(formValues.email);
            expect(password).toBe(formValues.password);
            expect(firstName).toBe(formValues.firstName);
            expect(lastName).toBe(formValues.lastName);
            expect(dob).toBe(formValues.dob);

            expect(result.current.canProceed).toBeTruthy();
        });
    });
});
