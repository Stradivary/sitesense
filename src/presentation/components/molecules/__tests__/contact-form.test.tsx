import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "../contact-form";

// Explicitly mock the required modules
jest.mock("lucide-react");
jest.mock("uuid", () => ({
  v4: () => "test-uuid-1234",
}));

// Mock the components used in ContactForm
jest.mock("@/presentation/sections/terms-condition-button", () => {
  return {
    __esModule: true,
    default: ({ children }: React.PropsWithChildren) => (
      <a href="#" data-testid="terms-condition-link">
        {children}
      </a>
    ),
  };
});

jest.mock("@/presentation/components/atoms/ReCaptcha", () => ({
  ReCaptcha: jest.fn().mockImplementation(({}) => {
    return null;
  }),
}));

// Variable to control recaptcha response in tests
let mockRecaptchaSuccess = true;

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => {
    // Return a function that returns translations based on key
    const translations: Record<string, string> = {
      description: "Contact form description",
      "form.fullName": "Full Name",
      "form.email": "Email",
      "form.businessName": "Business Name",
      "form.submit": "Submit",
      "form.agreement": "I agree to the terms and conditions",
    };

    const translationFn = (key: string) => translations[key] || key;
    translationFn.rich = (key: string) => {
      return key;
    };

    return translationFn;
  },
}));

jest.mock("@/presentation/components/providers/ReCaptchaProvider", () => ({
  useReCaptcha: () => ({
    recaptchaRef: {
      current: {
        executeAsync: jest.fn(() =>
          mockRecaptchaSuccess
            ? Promise.resolve("recaptcha-token-1234")
            : Promise.resolve(null),
        ),
        reset: jest.fn(),
      },
    },
  }),
}));

jest.mock("uuid", () => ({
  v4: () => "test-uuid-1234",
}));

// Mock fetch API
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  }),
);

describe("ContactForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRecaptchaSuccess = true;
  });

  it("renders all form fields correctly", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Business Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("8xxxxxxxxx")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("shows validation errors for empty fields", async () => {
    render(<ContactForm />);

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 2 characters/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/please enter a valid email address/i),
      ).toBeInTheDocument();
      expect(screen.getByText(/company name is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/phone number must start with 8/i),
      ).toBeInTheDocument();
    });
  });

  it("validates email format", async () => {
    render(<ContactForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter a valid email address/i),
      ).toBeInTheDocument();
    });

    fireEvent.change(emailInput, { target: { value: "valid@email.com" } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.queryByText(/please enter a valid email address/i),
      ).not.toBeInTheDocument();
    });
  });

  it("submits the form with valid data", async () => {
    render(<ContactForm />);

    // Fill in form fields
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Business Name"), {
      target: { value: "ACME Corp" },
    });

    fireEvent.change(screen.getByPlaceholderText("8xxxxxxxxx"), {
      target: { value: "81234567890" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Check that API was called with correct data
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Recaptcha-Token": "recaptcha-token-1234",
        },
        body: JSON.stringify({
          TransactionID: "test-uuid-1234",
          Name: "John Doe",
          Email: "john@example.com",
          Company: "ACME Corp",
          RecordType: "Consultative",
          MobilePhone: "6281234567890",
          LeadSource: "Website Potloc",
          SendEmail: "true",
          Description: "Potloc",
        }),
      });
    });

    // Check that success dialog is shown
    await waitFor(() => {
      expect(screen.getAllByText("Permintaan berhasil dikirim")).toBeDefined();
    });
  });

  it("handles reCAPTCHA verification failure", async () => {
    // Simulate reCAPTCHA verification failure
    mockRecaptchaSuccess = false;

    render(<ContactForm />);

    // Fill in form fields with valid data
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Business Name"), {
      target: { value: "ACME Corp" },
    });

    fireEvent.change(screen.getByPlaceholderText("8xxxxxxxxx"), {
      target: { value: "81234567890" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Check that error message about reCAPTCHA is displayed
    await waitFor(() => {
      expect(
        screen.getByText((text) =>
          text.includes("reCAPTCHA verification failed"),
        ),
      ).toBeInTheDocument();
    });

    // Verify that the API was not called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("handles API errors correctly", async () => {
    // Mock API untuk mengembalikan error
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "API error message" }),
      }),
    );

    render(<ContactForm />);

    // Isi data form yang valid
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Business Name"), {
      target: { value: "ACME Corp" },
    });
    fireEvent.change(screen.getByPlaceholderText("8xxxxxxxxx"), {
      target: { value: "81234567890" },
    });

    // Simulasikan klik Submit
    fireEvent.click(screen.getByText("Submit"));

    // Periksa bahwa pesan error API muncul
    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent("API error message");
    });
  });

  it("handles API response without error details", async () => {
    // Mock API to return an error without specific error message
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        text: () => Promise.resolve("{}"),
      }),
    );

    render(<ContactForm />);

    // Fill in form fields with valid data
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Business Name"), {
      target: { value: "ACME Corp" },
    });

    fireEvent.change(screen.getByPlaceholderText("8xxxxxxxxx"), {
      target: { value: "81234567890" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Check that default error message is displayed
    const error = screen.queryByText((text) =>
      text.includes("Failed to create lead"),
    );
    if (error) {
      expect(error).toBeInTheDocument();
    }
  });

  it("handles unexpected errors during form submission", async () => {
    // Mock a non-Error object thrown during fetch
    (global.fetch as jest.Mock).mockImplementationOnce(() => {
      // Create a non-Error object that should trigger the "An unexpected error occurred" branch
      const nonErrorObj = { custom: "error object" };
      throw nonErrorObj;
    });

    render(<ContactForm />);

    // Fill in form fields with valid data
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Business Name"), {
      target: { value: "ACME Corp" },
    });

    fireEvent.change(screen.getByPlaceholderText("8xxxxxxxxx"), {
      target: { value: "81234567890" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Check that generic error message is displayed
    await waitFor(() => {
      expect(
        screen.getByText("An unexpected error occurred"),
      ).toBeInTheDocument();
    });
  });

  it("closes success dialog when clicking close button", async () => {
    render(<ContactForm />);

    // Fill in form fields with valid data
    fireEvent.change(screen.getByPlaceholderText("Full Name"), {
      target: { value: "John Doe" },
    });

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "john@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Business Name"), {
      target: { value: "ACME Corp" },
    });

    fireEvent.change(screen.getByPlaceholderText("8xxxxxxxxx"), {
      target: { value: "81234567890" },
    });

    // Submit the form
    fireEvent.click(screen.getByText("Submit"));

    // Wait for success dialog to appear
    await waitFor(() => {
      expect(screen.getAllByText("Permintaan berhasil dikirim")).toBeDefined();
    });

    // Click the close button
    fireEvent.click(screen.getByText("Tutup"));

    // Check that success dialog is no longer visible
    await waitFor(() => {
      expect(screen.queryByText("Permintaan berhasil dikirim")).toBeNull();
    });
  });
});
