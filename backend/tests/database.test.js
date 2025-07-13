const mockConversion = {
  findOne: jest.fn(),
  create: jest.fn(),
  find: jest.fn(),
  deleteMany: jest.fn(),
};

jest.mock("../models/conversion", () => mockConversion);

describe("Database operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should save conversion result to database", async () => {
    const mockConversion = {
      inputValue: "5",
      convertedValue: "V",
      conversionType: "arabic-to-roman",
      createdAt: new Date(),
    };

    mockConversion.create = jest.fn().mockResolvedValue(mockConversion);

    const result = await mockConversion.create({
      inputValue: "5",
      convertedValue: "V",
      conversionType: "arabic-to-roman",
    });

    expect(mockConversion.create).toHaveBeenCalledWith({
      inputValue: "5",
      convertedValue: "V",
      conversionType: "arabic-to-roman",
    });

    expect(result).toEqual(mockConversion);
  });

  test("should find existing conversion in database", async () => {
    const mockExistingConversion = {
      inputValue: "5",
      convertedValue: "V",
      conversionType: "arabic-to-roman",
    };

    mockConversion.findOne = jest
      .fn()
      .mockResolvedValue(mockExistingConversion);

    const result = await mockConversion.findOne({
      inputValue: "5",
      conversionType: "arabic-to-roman",
    });

    expect(mockConversion.findOne).toHaveBeenCalledWith({
      inputValue: "5",
      conversionType: "arabic-to-roman",
    });

    expect(result).toEqual(mockExistingConversion);
  });

  test("should return null when conversion not found", async () => {
    mockConversion.findOne = jest.fn().mockResolvedValue(null);

    const result = await mockConversion.findOne({
      inputValue: "9999",
      conversionType: "arabic-to-roman",
    });

    expect(result).toBeNull();
  });

  test("should get all conversions sorted by creation date", async () => {
    const mockConversions = [
      {
        inputValue: "5",
        convertedValue: "V",
        conversionType: "arabic-to-roman",
        createdAt: new Date("2025-01-02"),
      },
      {
        inputValue: "10",
        convertedValue: "X",
        conversionType: "arabic-to-roman",
        createdAt: new Date("2025-01-01"),
      },
    ];

    mockConversion.find = jest.fn().mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockConversions),
    });

    const result = await mockConversion.find({}).sort({ createdAt: -1 });

    expect(mockConversion.find).toHaveBeenCalledWith({});
    expect(result).toEqual(mockConversions);
  });

  test("should delete all conversions", async () => {
    const mockDeleteResult = { deletedCount: 3 };

    mockConversion.deleteMany = jest.fn().mockResolvedValue(mockDeleteResult);

    const result = await mockConversion.deleteMany({});

    expect(mockConversion.deleteMany).toHaveBeenCalledWith({});
    expect(result).toEqual(mockDeleteResult);
  });
});
