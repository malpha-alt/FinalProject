import { MongoClient } from "mongodb";

// Get the MongoDB connection string from the environment variables
const uri = process.env.MONGO_URI!;
if (!uri) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

// config object for MongoClient
const options = {};

// instance of MongoClient
let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

// Function to get the MongoClient instance
async function getMongoClient(): Promise<MongoClient> {
  if (!clientPromise) {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
  return clientPromise;
}

// Helper to connect to MongoDB and return the "pokemon" databse
export async function connectToDB() {
  const client = await getMongoClient();
  return client.db("pokemon");
}

export default MongoClient;
