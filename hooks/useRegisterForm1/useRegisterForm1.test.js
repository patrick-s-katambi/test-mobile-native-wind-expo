import { act, renderHook } from "@testing-library/react-native";
import useRegisterForm1 from "./useRegisterForm1";

describe("useRegisterForm1", () => {
    it("should have a returned value", () => {
        const { result } = renderHook(useRegisterForm1, { initialProps: { sendOtpApi: () => {} } });

        expect(result.current).toBeDefined();
    });

    it("should have empty form values by default", () => {
        const { result } = renderHook(useRegisterForm1, { initialProps: { sendOtpApi: () => {} } });

        const phoneInputvalue = result.current.form.phone;

        expect(phoneInputvalue).toEqual("");
    });

    it("should have updated form values when onChangetext function is called", async () => {
        const { result } = renderHook(useRegisterForm1, {
            initialProps: { sendOtpApi: () => {}, goToNextStep: () => {} },
        });
        const phoneNumber = "784839283";

        await act(async () => {
            result.current.onChangeText({ formKey: "phone", text: phoneNumber });
        });

        await act(async () => {
            const phoneInputvalue = result.current.form.phone;
            expect(phoneInputvalue).toBe(phoneNumber);
        });
    });
});
