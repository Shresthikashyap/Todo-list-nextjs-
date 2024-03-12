// pages/api/tasks.js
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db();
    const tasksCollection = db.collection('tasks');

    if (req.method === 'POST') {
      console.log(req.body)
      const { name } = req.body;
      await tasksCollection.insertOne({ name });
      return res.status(201).json({ success: true });
    }

    if (req.method === 'GET') {
      const tasks = await tasksCollection.find().toArray();
      return res.status(200).json({ success: true, data: tasks });
    }

    if (req.method === 'DELETE') {
       console.log(req)
      const { taskId } = req.query;
     
      await tasksCollection.deleteOne({ _id: new ObjectId(taskId) });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  } finally {
    await client.close();
  }

  res.status(405).json({ success: false });
}
