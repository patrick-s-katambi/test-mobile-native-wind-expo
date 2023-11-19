import { RegisterForm2 } from "./RegisterForm2";
import "@testing-library/jest-native/extend-expect";
import { render, screen, fireEvent, act, waitFor } from "@testing-library/react-native";

const mockRegisterApiMock = jest.fn(({}) => {});
jest.mock("../../services/registerApi", () => ({
    registerApi: mockRegisterApiMock,
}));

describe("Register step 2 form > finalize registration", () => {
    it("should display the RegisterForm2 form", () => {
        render(<RegisterForm2 />);

        const container = screen.getByTestId("form-container");

        expect(container).toBeOnTheScreen();
    });

    describe("should have a username field with maxlength of 30, label of Username", () => {
        it("should be visible", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("username-field");

            expect(field).toBeOnTheScreen();
        });

        it("should have maxlength of 30", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("username-field");

            expect(field.props.maxLength).toBe(30);
        });

        it("should have label of Username", () => {
            render(<RegisterForm2 />);

            const field = screen.getByText("Username");

            expect(field).toBeOnTheScreen();
        });
    });

    describe("should have an email field, label of Email Address, maxlength 40, minlength 1", () => {
        it("should be visible", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("email-field");

            expect(field).toBeOnTheScreen();
        });

        it("should have label of Email Address", () => {
            render(<RegisterForm2 />);

            const field = screen.getByText("Email Address");

            expect(field).toBeOnTheScreen();
        });

        it("should have maxlength of 40", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("email-field");

            expect(field.props.maxLength).toBe(40);
        });

        it("should have minlength of 1", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("email-field");

            expect(field.props.minLength).toBe(1);
        });

        it("should have proper keyboard settings", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("email-field");

            expect(field.props.keyboardType).toBe("email-address");
        });
    });

    describe("should have a password field, label of Password, maxlength of 68, minlength of 6", () => {
        it("should be visible", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("password-field");

            expect(field).toBeOnTheScreen();
        });

        it("should have label of Password", () => {
            render(<RegisterForm2 />);

            const field = screen.getByText("Password");

            expect(field).toBeOnTheScreen();
        });

        it("should have maxlength of 68", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("password-field");

            expect(field.props.maxLength).toBe(68);
        });

        it("should have minlength of 6", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("password-field");

            expect(field.props.minLength).toBe(6);
        });

        it("should have proper keyboard settings", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("password-field");

            expect(field.props.secureTextEntry).toBeTruthy();
        });
    });

    describe("should have a first name field, label of First Name, maxlength of 30", () => {
        it("should be visible", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("first-name-field");

            expect(field).toBeOnTheScreen();
        });

        it("should have label of First Name", () => {
            render(<RegisterForm2 />);

            const field = screen.getByText("First Name");

            expect(field).toBeOnTheScreen();
        });

        it("should have maxlength of 30", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("first-name-field");

            expect(field.props.maxLength).toBe(30);
        });
    });

    describe("should have a last name field, label of Last Name, maxlength of 30", () => {
        it("should be visible", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("last-name-field");

            expect(field).toBeOnTheScreen();
        });

        it("should have label of Last Name", () => {
            render(<RegisterForm2 />);

            const field = screen.getByText("Last Name");

            expect(field).toBeOnTheScreen();
        });

        it("should have maxlength of 30", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("last-name-field");

            expect(field.props.maxLength).toBe(30);
        });
    });

    describe("should have a date of birth field", () => {
        it("should be visible", () => {
            render(<RegisterForm2 />);

            const field = screen.getByTestId("dob-field");

            expect(field).toBeOnTheScreen();
        });

        it("should have label of Date of Birth", () => {
            render(<RegisterForm2 />);

            const field = screen.getByText("Date of Birth");

            expect(field).toBeOnTheScreen();
        });
    });

    describe("should have a submit button", () => {
        it("should be visible", () => {
            render(<RegisterForm2 />);

            const button = screen.getByTestId("submit-button");

            expect(button).toBeOnTheScreen();
        });

        it("should have label of Submit", () => {
            render(<RegisterForm2 />);

            const button = screen.getByText("Submit");

            expect(button).toBeOnTheScreen();
        });

        it("should be disabled by default", () => {
            render(<RegisterForm2 />);

            const button = screen.getByText("Submit");

            expect(button).toBeDisabled();
        });

        it("should be disabled when all necessary fields are well entered", async () => {
            render(<RegisterForm2 />);

            const button = screen.getByText("Submit");

            expect(button).toBeDisabled();

            const emailField = screen.getByTestId("email-field");
            const passwordField = screen.getByTestId("password-field");
            const firstNameField = screen.getByTestId("first-name-field");
            const lastNameField = screen.getByTestId("last-name-field");

            const formValues = {
                username: "Jane Doe Shop",
                email: "janedoe@mail.com",
                password: "123qwe",
                firstName: "Jane",
                lastName: "Doe",
                dob: new Date(),
            };

            await act(async () => {
                fireEvent.changeText(emailField, formValues.email);
                fireEvent.changeText(passwordField, formValues.password);
                fireEvent.changeText(firstNameField, formValues.firstName);
                fireEvent.changeText(lastNameField, formValues.lastName);
            });

            await act(async () => {
                expect(button).toBeEnabled();
            });
        });

        it("should call the registerApi method when button pressed", async () => {
            render(<RegisterForm2 registerApi={mockRegisterApiMock} />);

            const emailField = screen.getByTestId("email-field");
            const passwordField = screen.getByTestId("password-field");
            const firstNameField = screen.getByTestId("first-name-field");
            const lastNameField = screen.getByTestId("last-name-field");

            const formValues = {
                username: "Jane Doe Shop",
                email: "janedoe@mail.com",
                password: "123qwe",
                firstName: "Jane",
                lastName: "Doe",
                dob: new Date(),
            };

            await act(async () => {
                fireEvent.changeText(emailField, formValues.email);
                fireEvent.changeText(passwordField, formValues.password);
                fireEvent.changeText(firstNameField, formValues.firstName);
                fireEvent.changeText(lastNameField, formValues.lastName);
            });

            const button = screen.getByTestId("submit-button");

            await act(async () => {
                fireEvent.press(button);
            });

            await act(async () => {
                expect(mockRegisterApiMock).toHaveBeenCalledTimes(1);
            });
        });
    });
});
