//by matheus alpha U63492196


import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

export default clientPromise;
