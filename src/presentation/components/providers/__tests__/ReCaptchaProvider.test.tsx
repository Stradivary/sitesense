import React from "react";
import { render, screen, act } from "@testing-library/react";
import { ReCaptchaProvider, useReCaptcha } from "./../ReCaptchaProvider";
import '@testing-library/jest-dom';

// Mock komponen ReCAPTCHA & ReCaptcha
jest.mock("react-google-recaptcha", () => {
  return jest.fn(() => <div data-testid="mock-recaptcha" />);
});

jest.mock("../../atoms/ReCaptcha", () => ({
  // eslint-disable-next-line react/display-name
  ReCaptcha: React.forwardRef((_, ref) => {
    React.useImperativeHandle(ref, () => ({
      executeAsync: jest.fn().mockResolvedValue("mock-token"),
    }));
    return <div data-testid="mock-ReCaptcha" />;
  }),
}));

// Komponen uji coba untuk konsumsi hook
const TestComponent = () => {
  const { executeReCaptcha } = useReCaptcha();

  React.useEffect(() => {
    executeReCaptcha().then(() => {
    });
  }, [executeReCaptcha]);

  return <div>Test Component</div>;
};

describe("ReCaptchaProvider", () => {
  it("renders children and ReCaptcha component", () => {
    render(
      <ReCaptchaProvider>
        <TestComponent />
      </ReCaptchaProvider>
    );

    expect(screen.getByText("Test Component")).toBeInTheDocument();
    expect(screen.getByTestId("mock-ReCaptcha")).toBeInTheDocument();
  });

  it("throws error when useReCaptcha is used outside provider", () => {
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

    const BrokenComponent = () => {
      useReCaptcha();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useReCaptcha must be used within a ReCaptchaProvider"
    );

    consoleError.mockRestore();
  });

  it("calls executeReCaptcha and returns token", async () => {
    let tokenResult: string | null = null;

    const ExecuteComponent = () => {
      const { executeReCaptcha } = useReCaptcha();

      React.useEffect(() => {
        executeReCaptcha().then((token) => {
          tokenResult = token;
        });
      }, [executeReCaptcha]);

      return <div>Execute</div>;
    };

    await act(async () => {
      render(
        <ReCaptchaProvider>
          <ExecuteComponent />
        </ReCaptchaProvider>
      );
    });

    expect(tokenResult).toBe("mock-token");
  });
});
