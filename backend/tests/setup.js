jest.setTimeout(10000);

process.env.NODE_ENV = "test";
process.env.MONGO_URL = "mongodb://localhost:27017/num-converter-test";
process.env.PORT = 3001;
