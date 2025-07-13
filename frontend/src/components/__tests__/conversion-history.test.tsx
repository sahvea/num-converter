import { render, screen, waitFor } from "@testing-library/react";
import { ConversionHistory } from "../conversion-history";
import * as api from "../../services/api";

jest.mock("../../services/api");
const mockApi = api as jest.Mocked<typeof api>;

describe("ConversionHistory Component", () => {
  const mockConversions = [
    {
      _id: "1",
      inputValue: "XIV",
      convertedValue: "14",
      conversionType: "roman-to-arabic" as const,
      createdAt: "2025-01-01T10:00:00Z",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<ConversionHistory />);
    expect(screen.getByText("Conversion History")).toBeInTheDocument();
  });

  it("shows loading state initially", () => {
    mockApi.getConversionHistory.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve(mockConversions), 100)
        )
    );

    render(<ConversionHistory />);
    expect(screen.getByText("Loading history...")).toBeInTheDocument();
  });

  it("loads and displays conversion history", async () => {
    mockApi.getConversionHistory.mockResolvedValue(mockConversions);

    render(<ConversionHistory />);

    await waitFor(() => {
      expect(screen.getByText("XIV")).toBeInTheDocument();
    });

    expect(screen.getByText("14")).toBeInTheDocument();
  });

  it("shows empty state when no history", async () => {
    mockApi.getConversionHistory.mockResolvedValue([]);

    render(<ConversionHistory />);

    await waitFor(() => {
      expect(
        screen.getByText("No conversion history found")
      ).toBeInTheDocument();
    });
  });

  it("handles API errors when loading history", async () => {
    mockApi.getConversionHistory.mockRejectedValue(new Error("Failed to load"));

    render(<ConversionHistory />);

    await waitFor(() => {
      expect(screen.getByText("Failed to load")).toBeInTheDocument();
    });
  });
});
