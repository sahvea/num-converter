import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Converter } from "../converter";
import * as api from "../../services/api";

jest.mock("../../services/api");
const mockApi = api as jest.Mocked<typeof api>;

describe("Converter Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Roman to Arabic conversion", () => {
    it("renders input field with correct placeholder", () => {
      render(<Converter type="roman-to-arabic" />);

      const input = screen.getByPlaceholderText(
        /Enter Roman numeral \(e\.g\., XIV\)/i
      );
      expect(input).toBeInTheDocument();
    });

    it("validates Roman numeral input", async () => {
      render(<Converter type="roman-to-arabic" />);

      const input = screen.getByPlaceholderText(
        /Enter Roman numeral \(e\.g\., XIV\)/i
      );
      const convertButton = screen.getByText("Convert");

      fireEvent.change(input, { target: { value: "ABC" } });
      fireEvent.click(convertButton);

      await waitFor(() => {
        expect(
          screen.getByText(/Please enter a valid Roman numeral/i)
        ).toBeInTheDocument();
      });
    });

    it("converts valid Roman numeral successfully", async () => {
      mockApi.convertRomanToArabic.mockResolvedValue({
        inputValue: "XIV",
        convertedValue: 14,
      });

      render(<Converter type="roman-to-arabic" />);

      const input = screen.getByPlaceholderText(
        /Enter Roman numeral \(e\.g\., XIV\)/i
      );
      const convertButton = screen.getByText("Convert");

      fireEvent.change(input, { target: { value: "XIV" } });
      fireEvent.click(convertButton);

      await waitFor(() => {
        expect(screen.getByText("14")).toBeInTheDocument();
      });
    });

    it("handles API errors", async () => {
      mockApi.convertRomanToArabic.mockRejectedValue(new Error("API Error"));

      render(<Converter type="roman-to-arabic" />);

      const input = screen.getByPlaceholderText(
        /Enter Roman numeral \(e\.g\., XIV\)/i
      );
      const convertButton = screen.getByText("Convert");

      fireEvent.change(input, { target: { value: "XIV" } });
      fireEvent.click(convertButton);

      await waitFor(() => {
        expect(screen.getByText("API Error")).toBeInTheDocument();
      });
    });

    it("clears form when clear button is clicked", () => {
      render(<Converter type="roman-to-arabic" />);

      const input = screen.getByPlaceholderText(
        /Enter Roman numeral \(e\.g\., XIV\)/i
      );
      const clearButton = screen.getByText("Clear");

      fireEvent.change(input, { target: { value: "XIV" } });
      fireEvent.click(clearButton);

      expect(input).toHaveValue("");
    });
  });

  describe("Arabic to Roman conversion", () => {
    it("renders input field with correct placeholder", () => {
      render(<Converter type="arabic-to-roman" />);

      const input = screen.getByPlaceholderText(
        /Enter Arabic number \(e\.g\., 14\)/i
      );
      expect(input).toBeInTheDocument();
    });

    it("validates Arabic number input", async () => {
      render(<Converter type="arabic-to-roman" />);

      const input = screen.getByPlaceholderText(
        /Enter Arabic number \(e\.g\., 14\)/i
      );
      const convertButton = screen.getByText("Convert");

      fireEvent.change(input, { target: { value: "5000" } });
      fireEvent.click(convertButton);

      await waitFor(() => {
        expect(
          screen.getByText(
            /Please enter a valid Arabic number between 1 and 3999/i
          )
        ).toBeInTheDocument();
      });
    });

    it("converts valid Arabic number successfully", async () => {
      mockApi.convertArabicToRoman.mockResolvedValue({
        inputValue: 14,
        convertedValue: "XIV",
      });

      render(<Converter type="arabic-to-roman" />);

      const input = screen.getByPlaceholderText(
        /Enter Arabic number \(e\.g\., 14\)/i
      );
      const convertButton = screen.getByText("Convert");

      fireEvent.change(input, { target: { value: "14" } });
      fireEvent.click(convertButton);

      await waitFor(() => {
        expect(screen.getByText("XIV")).toBeInTheDocument();
      });
    });
  });

  describe("Loading states", () => {
    it("shows loading state during conversion", async () => {
      mockApi.convertRomanToArabic.mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(
              () => resolve({ inputValue: "X", convertedValue: 10 }),
              100
            )
          )
      );

      render(<Converter type="roman-to-arabic" />);

      const input = screen.getByPlaceholderText(
        /Enter Roman numeral \(e\.g\., XIV\)/i
      );
      const convertButton = screen.getByText("Convert");

      fireEvent.change(input, { target: { value: "X" } });
      fireEvent.click(convertButton);

      expect(screen.getByText("Converting...")).toBeInTheDocument();
      expect(convertButton).toBeDisabled();
    });
  });
});
