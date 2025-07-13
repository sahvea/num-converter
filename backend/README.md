# Roman & Arabic Numeral Converter API

A small Node.js REST API server for converting Roman numerals to Arabic and the other way around.

## Features

- Convert Arabic numbers (1-3999) to Roman numerals
- Convert Roman numerals to Arabic numbers
- Caching of conversion results in MongoDB
- Get all stored conversions
- Delete all conversions from the database

## API Endpoints

### GET /roman/:inputValue

Convert an Arabic number to a Roman numeral.

**Example:**

```
GET /roman/5
```

**Response:**

```json
{
  "inputValue": 5,
  "convertedValue": "V"
}
```

### GET /arabic/:inputValue

Convert a Roman numeral to an Arabic number.

**Example:**

```
GET /arabic/V
```

**Response:**

```json
{
  "inputValue": "V",
  "convertedValue": 5
}
```

### GET /all

Get all stored conversions.

**Response:**

```json
[
  {
    "_id": "...",
    "inputValue": "5",
    "convertedValue": "V",
    "conversionType": "arabic-to-roman",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
]
```

### DELETE /remove

Delete all conversions from the database.

**Response:**

```json
{
  "message": "All records deleted successfully.",
  "deletedCount": 5
}
```
