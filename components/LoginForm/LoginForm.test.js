import { act, fireEvent, render, screen } from "@testing-library/react-native";
import "@testing-library/jest-native/extend-expect";
import { LoginForm } from "./LoginForm";
import { faker } from "@faker-js/faker";

const mockLoginApi = jest.fn(({}) => {});

jest.mock("../../services/loginApi", () => ({
    loginApi: mockLoginApi,
}));

describe("Login form", () => {
    it("should render a login form", () => {
        render(<LoginForm />);

        const container = screen.getByTestId("form-container");

        expect(container).toBeOnTheScreen();
    });

    it("should have a username, password field and submit button", () => {
        render(<LoginForm />);

        const usernameField = screen.getByTestId("username-field");
        const passwordField = screen.getByTestId("password-field");
        const button = screen.getByTestId("submit-button");

        expect(usernameField).toBeOnTheScreen();
        expect(passwordField).toBeOnTheScreen();
        expect(button).toBeOnTheScreen();
    });

    describe("Username field", () => {
        it("should have a label of Username", () => {
            render(<LoginForm />);

            const field = screen.getByText("Username");

            expect(field).toBeOnTheScreen();
        });
    });

    describe("Password field", () => {
        it("should have a label of Password", () => {
            render(<LoginForm />);

            const field = screen.getByText("Password");

            expect(field).toBeOnTheScreen();
        });

        it("should have a maxlength of 128", () => {
            render(<LoginForm />);

            const field = screen.getByTestId("password-field");

            expect(field.props.maxLength).toBe(128);
        });

        it("should have proper keyboard settings", () => {
            render(<LoginForm />);

            const field = screen.getByTestId("password-field");

            expect(field.props.secureTextEntry).toBeTruthy();
        });
    });

    describe("Submit button", () => {
        it("should be disabled by default", () => {
            render(<LoginForm />);

            const button = screen.getByTestId("submit-button");

            expect(button).toBeDisabled();
        });

        it("should be enabled when username and password fields are entered", async () => {
            render(<LoginForm />);

            const usernameField = screen.getByTestId("username-field");
            const passwordField = screen.getByTestId("password-field");
            const button = screen.getByTestId("submit-button");

            const formValues = {
                username: faker.person.firstName(),
                password: faker.internet.password(),
            };

            await act(() => {
                fireEvent.changeText(usernameField, formValues.username);
                fireEvent.changeText(passwordField, formValues.password);
            });

            await act(() => {
                expect(button).toBeEnabled();
            });
        });

        it("should call the loginApi method when submit button is pressed", async () => {
            render(<LoginForm loginApi={mockLoginApi} />);

            const usernameField = screen.getByTestId("username-field");
            const passwordField = screen.getByTestId("password-field");
            const button = screen.getByTestId("submit-button");

            const formValues = {
                username: faker.person.firstName(),
                password: faker.internet.password(),
            };

            await act(() => {
                fireEvent.changeText(usernameField, formValues.username);
                fireEvent.changeText(passwordField, formValues.password);
            });

            await act(() => {
                fireEvent.press(button);
            });

            await act(() => {
                expect(mockLoginApi).toHaveBeenCalledTimes(1);
            });
        });
    });
});
