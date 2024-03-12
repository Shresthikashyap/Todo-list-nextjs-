// pages/api/tasks.js
import { MongoClient,ObjectId } from 'mongodb';

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
      await tasksCollection.insertOne({ name,complete:false });
      return res.status(201).json({ success: true });
    }

    if (req.method === 'GET') {
      const tasks = await tasksCollection.find({ complete: false }).toArray();
      return res.status(200).json({ success: true, data: tasks });
    }

    if (req.method === 'PUT') {
      
      const { taskId } = req.query;
      const result = await tasksCollection.updateOne(
        { _id: new ObjectId(taskId) }, 
        { $set: { complete: true } } 
      );
  
      if (result.modifiedCount === 0) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
  
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      
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
