# Roman & Arabic Numeral Converter API

A small Node.js REST API server for converting Roman numerals to Arabic and the other way around.

## Features

- Convert Arabic numbers (1-3999) to Roman numerals
- Convert Roman numerals to Arabic numbers
- Caching of conversion results in MongoDB
- Retrieve all stored conversions
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

## Getting Started

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file:
   ```bash
   cp env.example .env
   ```
3. Start MongoDB locally or use MongoDB Atlas.
4. Start the app:
   ```bash
   # Development mode
   npm run dev
   # Production mode
   npm start
   ```

### Docker

1. Build and run with Docker Compose:
   ```bash
   docker-compose up --build
   ```
2. The app will be available at http://localhost:3000

## Testing

- Run unit and API tests:
  ```bash
  npm test
  ```
- Run tests in watch mode:
  ```bash
  npm run test:watch
  ```
