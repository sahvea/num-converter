import { useState, useCallback } from "react";

import { convertRomanToArabic, convertArabicToRoman } from "../services/api";
import { ConversionResponse } from "../types/conversion";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type ConverterProps = {
  type: "roman-to-arabic" | "arabic-to-roman";
};

export const Converter = ({ type }: ConverterProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const validateInput = useCallback(
    (value: string): boolean => {
      if (!value.trim()) {
        setError("Please enter a value");
        return false;
      }

      if (type === "roman-to-arabic") {
        const romanRegex = /^[IVXLCDM]+$/i;
        if (!romanRegex.test(value.toUpperCase())) {
          setError("Please enter a valid Roman numeral (I, V, X, L, C, D, M)");
          return false;
        }
      } else {
        const num = parseInt(value);
        if (isNaN(num) || num < 1 || num > 3999) {
          setError("Please enter a valid Arabic number between 1 and 3999");
          return false;
        }
      }

      setError("");
      return true;
    },
    [type]
  );

  const handleConversion = useCallback(async () => {
    if (!validateInput(inputValue)) return;

    setIsLoading(true);
    setError("");

    try {
      let response: ConversionResponse;

      if (type === "roman-to-arabic") {
        response = await convertRomanToArabic(inputValue.toUpperCase());
      } else {
        response = await convertArabicToRoman(parseInt(inputValue));
      }

      setResult(String(response.convertedValue));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Conversion failed");
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, type, validateInput]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleConversion();
      }
    },
    [handleConversion]
  );

  const handleClear = useCallback(() => {
    setInputValue("");
    setResult("");
    setError("");
  }, []);

  const isInputValid = inputValue.trim() !== "" && error === "";

  return (
    <section className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder={
            type === "roman-to-arabic"
              ? "Enter Roman numeral (e.g., XIV)"
              : "Enter Arabic number (e.g., 14)"
          }
          value={inputValue}
          disabled={isLoading}
          className="w-full"
          onKeyDown={handleKeyPress}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="flex gap-2">
        <Button
          disabled={!isInputValid || isLoading}
          className="flex-1"
          onClick={handleConversion}
        >
          {isLoading ? "Converting..." : "Convert"}
        </Button>

        <Button variant="outline" disabled={isLoading} onClick={handleClear}>
          Clear
        </Button>
      </div>

      {result && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Result:</p>
          <p className="text-lg font-semibold text-green-800">{result}</p>
        </div>
      )}
    </section>
  );
};
