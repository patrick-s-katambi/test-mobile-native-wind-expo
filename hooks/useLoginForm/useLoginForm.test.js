import { renderHook, act } from "@testing-library/react-native";
import { useLoginForm } from "./useLoginForm";
import { faker } from "@faker-js/faker";

describe("useLoginForm hook", () => {
    it("should have a returned value", () => {
        const { result } = renderHook(useLoginForm, { initialProps: {} });

        expect(result.current).toBeDefined();
    });

    it("should have empty form values by default", () => {
        const { result } = renderHook(useLoginForm, { initialProps: {} });

        const { username, password } = result.current.form;

        expect(username).toBe("");
        expect(password).toBe("");
    });

    it("should have canProceed value to false by default", () => {
        const { result } = renderHook(useLoginForm, { initialProps: {} });

        const canProceed = result.current.canProceed;

        expect(canProceed).toBe(false);
    });

    it("should have canProceed value to true if correct form data is entered", async () => {
        const { result } = renderHook(useLoginForm, { initialProps: {} });

        const formValues = {
            username: faker.person.firstName(),
            password: faker.internet.password(),
        };
        await act(() => {
            result.current.onChangeText("username", formValues.username);
            result.current.onChangeText("password", formValues.password);
        });

        await act(() => {
            const canProceed = result.current.canProceed;
            expect(canProceed).toBe(true);
        });
    });
});
