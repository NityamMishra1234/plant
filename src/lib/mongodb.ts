// src/lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Extend the global object type to include _mongoClientPromise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default clientPromise;
