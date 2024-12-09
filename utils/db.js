import mongodb from 'mongodb';
// eslint-disable-next-line no-unused-vars
const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;

    this.client = new MongoClient(uri);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected successfully to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const database = this.client.db();
    const collection = database.collection('users');
    const count = await collection.countDocuments();
    return count;
  }

  async nbFiles() {
    const database = this.client.db();
    const collection = database.collection('files');
    const count = await collection.countDocuments();
    return count;
  }
}

const dbClient = new DBClient();
dbClient.connect();

module.exports = dbClient;
