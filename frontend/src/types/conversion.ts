export interface Conversion {
  _id: string;
  inputValue: string;
  convertedValue: string;
  conversionType: "arabic-to-roman" | "roman-to-arabic";
  createdAt: string;
}

export interface ConversionResponse {
  inputValue: number | string;
  convertedValue: string | number;
}

export interface DeleteResponse {
  message: string;
  deletedCount: number;
}

export interface ApiError {
  message: string;
}
