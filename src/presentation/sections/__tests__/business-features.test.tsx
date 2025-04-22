import { render, screen } from "@testing-library/react";
import { BusinessFeaturesSection } from "./../business-features";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      title: "Fitur Unggulan Bisnis",
      "features.0.title": "Fitur Bisnis A",
      "features.0.description": "Deskripsi A",
      "features.1.title": "Fitur Bisnis B",
      "features.1.description": "Deskripsi B",
      "features.2.title": "Fitur Bisnis C",
      "features.2.description": "Deskripsi C",
      cta: "Jadwalkan Demo",
    };
    return translations[key] || key;
  },
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || "image"} />;
  },
}));

describe("BusinessFeaturesSection", () => {
  it("renders section title, all features, and CTA button", () => {
    render(<BusinessFeaturesSection />);

    // Cek judul section
    expect(screen.getByText("Fitur Unggulan Bisnis")).toBeInTheDocument();

    // Cek setiap fitur
    expect(screen.getByText("Fitur Bisnis A")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi A")).toBeInTheDocument();

    expect(screen.getByText("Fitur Bisnis B")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi B")).toBeInTheDocument();

    expect(screen.getByText("Fitur Bisnis C")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi C")).toBeInTheDocument();

    // Cek tombol CTA
    const ctaButton = screen.getByRole("link", { name: "Jadwalkan Demo" });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "#schedule-demo");
  });
});
