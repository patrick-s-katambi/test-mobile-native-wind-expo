import { OtpForm } from "./OtpForm";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";

const mockValidateOtpApi = jest.fn(({}) => {});
jest.mock("../../services/validateOtpApi", () => ({
    validateOtpApi: mockValidateOtpApi,
}));

describe("OtpForm", () => {
    it("should be rendered", () => {
        render(<OtpForm />);

        const form = screen.getByTestId("form-container");

        expect(form).toBeOnTheScreen();
    });

    describe("should have otp input, maxlength 4, minlength 4", () => {
        it("should be visible", () => {
            render(<OtpForm />);

            const field = screen.getByTestId("otp-field");

            expect(field).toBeOnTheScreen();
        });

        it("should have maxlength 4 and minlength 4", () => {
            render(<OtpForm />);

            const field = screen.getByTestId("otp-field");

            expect(field.props.maxLength).toBe(4);
            expect(field.props.minLength).toBe(4);
        });

        it("should have proper keyboard settings", () => {
            render(<OtpForm />);

            const field = screen.getByTestId("otp-field");

            expect(field.props.keyboardType).toBe("number-pad");
        });
    });

    describe("should have a submit button", () => {
        it("should be visible", () => {
            render(<OtpForm />);

            const button = screen.getByTestId("submit-button");

            expect(button).toBeOnTheScreen();
        });

        it("should be disabled by default", () => {
            render(<OtpForm />);

            const button = screen.getByTestId("submit-button");

            expect(button).toBeDisabled();
        });

        it("should be enabled when otp field is entered with 4 numbers", async () => {
            render(<OtpForm />);

            const field = screen.getByTestId("otp-field");

            await act(async () => {
                fireEvent.changeText(field, "1234");
            });

            const button = screen.getByTestId("submit-button");

            await act(async () => {
                expect(button).toBeEnabled();
            });
        });

        it("should call validateOtpApi method when pressed", async () => {
            render(<OtpForm validateOtpApi={mockValidateOtpApi} />);

            const field = screen.getByTestId("otp-field");
            const button = screen.getByTestId("submit-button");

            await act(async () => {
                fireEvent.changeText(field, "1234");
            });

            await act(async () => {
                fireEvent.press(button);
            });

            await act(async () => {
                expect(mockValidateOtpApi).toHaveBeenCalledTimes(1);
            });
        });
    });
});
