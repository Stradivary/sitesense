import { render, screen } from "@testing-library/react";
import { FeaturesSection } from "./../features-section.v2";

// Mock next-intl
jest.mock("next-intl", () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      "title": "Fitur Unggulan",
      "features.0.title": "Fitur A",
      "features.0.description": "Deskripsi A",
      "features.1.title": "Fitur B",
      "features.1.description": "Deskripsi B",
      "features.2.title": "Fitur C",
      "features.2.description": "Deskripsi C",
    };
    return translations[key] || key;
  },
}));

describe("FeaturesSection", () => {
  it("renders the section with translated title and all features", () => {
    render(<FeaturesSection />);

    // Cek judul utama
    expect(screen.getByText("Fitur Unggulan")).toBeInTheDocument();

    // Cek semua feature title & description
    expect(screen.getByText("Fitur A")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi A")).toBeInTheDocument();

    expect(screen.getByText("Fitur B")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi B")).toBeInTheDocument();

    expect(screen.getByText("Fitur C")).toBeInTheDocument();
    expect(screen.getByText("Deskripsi C")).toBeInTheDocument();
  });
});
