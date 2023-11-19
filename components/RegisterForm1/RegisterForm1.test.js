import { render, screen, fireEvent, act, waitFor } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { RegisterForm1 } from "./RegisterForm1";

const mockSendOtpApi = jest.fn(async ({ phone }) => {});
jest.mock("../../services/sendOtpApi", () => ({
    sendOtpApi: mockSendOtpApi,
}));

describe("Register step 1 form > send otp", () => {
    it("should render the login page", () => {
        render(<RegisterForm1 />);

        const container = screen.getByTestId("form-container");

        expect(container).toBeOnTheScreen();
    });

    it("should display a phone input field and a button", () => {
        render(<RegisterForm1 />);

        const phoneInput = screen.getByTestId("phone-input");
        const submitButton = screen.getByText("Submit");

        expect(phoneInput).toBeOnTheScreen();
        expect(submitButton).toBeOnTheScreen();
    });

    it("submit button should be disabled by default", () => {
        render(<RegisterForm1 />);

        const submitButton = screen.getByText("Submit");

        expect(submitButton).toBeDisabled();
    });

    it("submit button should be enabled if phone input has 9 numbers", async () => {
        render(<RegisterForm1 />);
        const phoneNumber = "748392837";
        const phoneInput = screen.getByTestId("phone-input");
        const submitButton = screen.getByTestId("submit-button");

        await act(async () => {
            fireEvent.changeText(phoneInput, phoneNumber);
        });

        await act(async () => {
            expect(phoneInput.props.value).toEqual(phoneNumber);
            expect(submitButton).toBeEnabled();
        });
    });

    it("submit button should be disabled if phone input has less than 9 numbers", async () => {
        render(<RegisterForm1 />);
        const phoneNumber = "7483928";
        const phoneInput = screen.getByTestId("phone-input");
        const submitButton = screen.getByTestId("submit-button");

        await act(async () => {
            fireEvent.changeText(phoneInput, phoneNumber);
        });

        await act(async () => {
            expect(phoneInput.props.value).toEqual(phoneNumber);
            expect(submitButton).toBeDisabled();
        });
    });

    it("should have proper keyboard settings", () => {
        render(<RegisterForm1 />);

        const field = screen.getByTestId("phone-input");

        expect(field.props.keyboardType).toBe("number-pad");
    });

    it("phone input should only contain 9 numbers even if more numbers are entered", async () => {
        render(<RegisterForm1 />);
        const phoneNumberExpected = "748392845";
        const phoneNumberEntered = `${phoneNumberExpected}74839`;
        const phoneInput = screen.getByTestId("phone-input");

        await act(async () => {
            fireEvent.changeText(phoneInput, phoneNumberEntered);
        });

        await act(async () => {
            expect(phoneInput.props.value).toEqual(phoneNumberExpected);
        });
    });

    it("submit button should call submit method from props", async () => {
        render(<RegisterForm1 sendOtpApi={mockSendOtpApi} goToNextStep={() => {}} />);
        const phoneNumber = "748392837";
        const phoneInput = screen.getByTestId("phone-input");
        const submitButton = screen.getByTestId("submit-button");

        await act(async () => {
            fireEvent.changeText(phoneInput, phoneNumber);
        });

        await act(async () => {
            fireEvent.press(submitButton);
        });

        await act(async () => {
            expect(phoneInput.props.value).toEqual(phoneNumber);
            expect(mockSendOtpApi).toHaveBeenCalledTimes(1);
            expect(mockSendOtpApi).toHaveBeenCalledWith({ phone: `0${phoneNumber}` });
        });
    });
});
