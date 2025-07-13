const request = require("supertest");

const mockConversion = {
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  deleteMany: jest.fn(),
};

jest.mock("../models/conversion", () => mockConversion);

const app = require("./test-app");

describe("API tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /roman/:inputValue", () => {
    test("should convert Arabic number to Roman numeral", async () => {
      mockConversion.findOne.mockResolvedValue(null);
      mockConversion.create.mockResolvedValue({
        inputValue: "5",
        convertedValue: "V",
        conversionType: "arabic-to-roman",
      });

      const response = await request(app).get("/api/roman/5").expect(200);

      expect(response.body).toEqual({
        inputValue: 5,
        convertedValue: "V",
      });
    });

    test("should return 400 for invalid number", async () => {
      await request(app).get("/api/roman/abc").expect(400);
    });

    test("should return 400 for number greater than 3999", async () => {
      await request(app).get("/api/roman/4000").expect(400);
    });

    test("should return cached result", async () => {
      mockConversion.findOne.mockResolvedValue({
        inputValue: "10",
        convertedValue: "X",
        conversionType: "arabic-to-roman",
      });

      const response = await request(app).get("/api/roman/10").expect(200);

      expect(response.body).toEqual({
        inputValue: 10,
        convertedValue: "X",
      });
    });
  });

  describe("GET /arabic/:inputValue", () => {
    test("should convert Roman numeral to Arabic number", async () => {
      mockConversion.findOne.mockResolvedValue(null);
      mockConversion.create.mockResolvedValue({
        inputValue: "V",
        convertedValue: "5",
        conversionType: "roman-to-arabic",
      });

      const response = await request(app).get("/api/arabic/V").expect(200);

      expect(response.body).toEqual({
        inputValue: "V",
        convertedValue: 5,
      });
    });

    test("should work with different cases", async () => {
      mockConversion.findOne.mockResolvedValue(null);
      mockConversion.create.mockResolvedValue({
        inputValue: "v",
        convertedValue: "5",
        conversionType: "roman-to-arabic",
      });

      const response = await request(app).get("/api/arabic/v").expect(200);

      expect(response.body).toEqual({
        inputValue: "v",
        convertedValue: 5,
      });
    });

    test("should return 400 for invalid Roman numeral", async () => {
      await request(app).get("/api/arabic/ABC").expect(400);
    });

    test("should return cached result", async () => {
      mockConversion.findOne.mockResolvedValue({
        inputValue: "X",
        convertedValue: "10",
        conversionType: "roman-to-arabic",
      });

      const response = await request(app).get("/api/arabic/X").expect(200);

      expect(response.body).toEqual({
        inputValue: "X",
        convertedValue: 10,
      });
    });
  });

  describe("GET /all", () => {
    test("should return all conversions", async () => {
      const mockConversions = [
        {
          _id: "1",
          inputValue: "5",
          convertedValue: "V",
          conversionType: "arabic-to-roman",
          createdAt: "2025-01-01T00:00:00.000Z",
        },
        {
          _id: "2",
          inputValue: "X",
          convertedValue: "10",
          conversionType: "roman-to-arabic",
          createdAt: "2025-01-01T00:00:00.000Z",
        },
      ];

      mockConversion.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockConversions),
      });

      const response = await request(app).get("/api/all").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);
    });

    test("should return empty array if no conversions", async () => {
      mockConversion.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue([]),
      });

      const response = await request(app).get("/api/all").expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe("DELETE /remove", () => {
    test("should delete all conversions", async () => {
      mockConversion.deleteMany.mockResolvedValue({ deletedCount: 2 });

      const response = await request(app).delete("/api/remove").expect(200);

      expect(response.body).toEqual({
        message: "All records deleted successfully.",
        deletedCount: 2,
      });
    });

    test("should return 0 if no records to delete", async () => {
      mockConversion.deleteMany.mockResolvedValue({ deletedCount: 0 });

      const response = await request(app).delete("/api/remove").expect(200);

      expect(response.body).toEqual({
        message: "All records deleted successfully.",
        deletedCount: 0,
      });
    });
  });
});
