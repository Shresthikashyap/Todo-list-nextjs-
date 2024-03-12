// pages/api/tasks.js
import { MongoClient,ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db();
    const tasksCollection = db.collection('tasks');


    if (req.method === 'GET') {
      const tasks = await tasksCollection.find({ complete: true }).toArray();
      return res.status(200).json({ success: true, data: tasks });
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  } finally {
    await client.close();
  }

  res.status(405).json({ success: false });
}
