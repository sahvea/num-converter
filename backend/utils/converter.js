const romanToArabic = (roman) => {
  const romanNumerals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  const romanRegex = /^[IVXLCDM]+$/i;
  if (!romanRegex.test(roman)) {
    return null;
  }

  const upperRoman = roman.toUpperCase();
  let result = 0;
  let prevValue = 0;

  for (let i = upperRoman.length - 1; i >= 0; i--) {
    const currentValue = romanNumerals[upperRoman[i]];

    if (currentValue >= prevValue) {
      result += currentValue;
    } else {
      result -= currentValue;
    }

    prevValue = currentValue;
  }

  const validRoman = arabicToRoman(result);
  if (validRoman.toUpperCase() !== upperRoman) {
    return null;
  }

  return result;
};

const arabicToRoman = (num) => {
  if (num <= 0 || num > 3999 || !Number.isInteger(num)) {
    return null;
  }

  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";
  let remaining = num;

  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
};

module.exports = {
  romanToArabic,
  arabicToRoman,
};
