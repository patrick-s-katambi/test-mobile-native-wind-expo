import { useOtpForm } from "./useOtpForm";
import { act, renderHook } from "@testing-library/react-native";

describe("useOtpForm hook", () => {
    it("should have a returned value", () => {
        const { result } = renderHook(useOtpForm, { initialProps: {} });

        expect(result.current).toBeDefined();
    });

    it("should have empty form values by default", () => {
        const { result } = renderHook(useOtpForm, { initialProps: {} });

        const input = result.current.form.otp;

        expect(input).toEqual("");
    });

    it("should have updated form values when onChangeText function is called", async () => {
        const { result } = renderHook(useOtpForm, { initialProps: {} });
        const otpCode = "1234";

        await act(async () => {
            result.current.onChangeText("otp", otpCode);
        });

        await act(async () => {
            const otp = result.current.form.otp;
            expect(otp).toBe(otpCode);
        });
    });
});
