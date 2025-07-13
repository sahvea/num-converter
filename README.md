# Numeral Converter

A full-featured web application for converting Roman numerals to Arabic and the other way around.

## Features

- Roman to Arabic conversion
- Arabic to Roman conversion
- Conversion history
- Input validation

## Quick Start with Docker Compose

### 1. Clone the repository

```bash
git clone https://github.com/sahvea/num-converter.git
cd num-converter
```

### 2. Start with Docker Compose

```bash
docker-compose up -d
```

The application will be available at: **http://localhost**

### 3. Stop the application

```bash
docker-compose down
```

## Local Development

### Backend

1. **Install dependencies:**

```bash
cd backend
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env file if needed
```

3. **Start MongoDB:**

```bash
# Make sure MongoDB is running locally or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:6.0
```

4. **Start the server:**

```bash
npm run dev
```

Backend will be available at: **http://localhost:3000**

### Frontend

1. **Install dependencies:**

```bash
cd frontend
npm install
```

2. **Start the application:**

```bash
npm start
```

Frontend will be available at: **http://localhost:3001**
