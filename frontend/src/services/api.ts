import {
  Conversion,
  ConversionResponse,
  DeleteResponse,
  ApiError,
} from "../types/conversion";

const API_BASE_URL = process.env.REACT_APP_API_URL || "/api";

const handleHttpError = async (response: Response): Promise<never> => {
  const errorData: ApiError = await response
    .json()
    .catch(() => ({ message: "Unknown error" }));
  throw new Error(
    errorData.message || `HTTP ${response.status}: ${response.statusText}`
  );
};

const makeRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    await handleHttpError(response);
  }

  return response.json();
};

export const convertRomanToArabic = async (
  romanNumeral: string
): Promise<ConversionResponse> => {
  return makeRequest<ConversionResponse>(
    `/roman/${romanNumeral.toUpperCase()}`
  );
};

export const convertArabicToRoman = async (
  arabicNumber: number
): Promise<ConversionResponse> => {
  return makeRequest<ConversionResponse>(`/arabic/${arabicNumber}`);
};

export const getConversionHistory = async (): Promise<Conversion[]> => {
  return makeRequest<Conversion[]>("/all");
};

export const deleteConversionHistory = async (): Promise<DeleteResponse> => {
  return makeRequest<DeleteResponse>("/remove", {
    method: "DELETE",
  });
};
