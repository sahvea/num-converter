const { romanToArabic, arabicToRoman } = require("../utils/converter");

describe("Roman and Arabic number converter", () => {
  describe("arabicToRoman", () => {
    test("should convert Arabic numbers to Roman numerals", () => {
      expect(arabicToRoman(1)).toBe("I");
      expect(arabicToRoman(5)).toBe("V");
      expect(arabicToRoman(10)).toBe("X");
      expect(arabicToRoman(50)).toBe("L");
      expect(arabicToRoman(100)).toBe("C");
      expect(arabicToRoman(500)).toBe("D");
      expect(arabicToRoman(1000)).toBe("M");
    });

    test("should convert complex numbers", () => {
      expect(arabicToRoman(4)).toBe("IV");
      expect(arabicToRoman(9)).toBe("IX");
      expect(arabicToRoman(40)).toBe("XL");
      expect(arabicToRoman(90)).toBe("XC");
      expect(arabicToRoman(400)).toBe("CD");
      expect(arabicToRoman(900)).toBe("CM");
      expect(arabicToRoman(3999)).toBe("MMMCMXCIX");
    });

    test("should return null for invalid numbers", () => {
      expect(arabicToRoman(0)).toBeNull();
      expect(arabicToRoman(-1)).toBeNull();
      expect(arabicToRoman(4000)).toBeNull();
      expect(arabicToRoman(1.5)).toBeNull();
    });
  });

  describe("romanToArabic", () => {
    test("should convert Roman numerals to Arabic numbers", () => {
      expect(romanToArabic("I")).toBe(1);
      expect(romanToArabic("V")).toBe(5);
      expect(romanToArabic("X")).toBe(10);
      expect(romanToArabic("L")).toBe(50);
      expect(romanToArabic("C")).toBe(100);
      expect(romanToArabic("D")).toBe(500);
      expect(romanToArabic("M")).toBe(1000);
    });

    test("should convert complex Roman numerals", () => {
      expect(romanToArabic("IV")).toBe(4);
      expect(romanToArabic("IX")).toBe(9);
      expect(romanToArabic("XL")).toBe(40);
      expect(romanToArabic("XC")).toBe(90);
      expect(romanToArabic("CD")).toBe(400);
      expect(romanToArabic("CM")).toBe(900);
      expect(romanToArabic("MMMCMXCIX")).toBe(3999);
    });

    test("should work with different cases", () => {
      expect(romanToArabic("i")).toBe(1);
      expect(romanToArabic("v")).toBe(5);
      expect(romanToArabic("x")).toBe(10);
      expect(romanToArabic("iv")).toBe(4);
    });

    test("should return null for invalid Roman numerals", () => {
      expect(romanToArabic("A")).toBeNull();
      expect(romanToArabic("123")).toBeNull();
      expect(romanToArabic("IIII")).toBeNull();
      expect(romanToArabic("VV")).toBeNull();
      expect(romanToArabic("")).toBeNull();
    });
  });

  describe("Reverse conversion", () => {
    test("should work correctly for reverse conversion", () => {
      for (let i = 1; i <= 3999; i++) {
        const roman = arabicToRoman(i);
        const arabic = romanToArabic(roman);
        expect(arabic).toBe(i);
      }
    });
  });
});
