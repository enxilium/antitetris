const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('torontoGo');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();

app.post('/api/data', async (req, res) => {
  try {
    const result = await db.collection('deliveries').insertOne(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error adding data' });
  }
});

app.get('/api/data', async (req, res) => {
  try {
    const result = await db.collection('deliveries').find().toArray();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.put('/api/data/:id', async (req, res) => {
  try {
    const result = await db.collection('deliveries').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error updating data' });
  }
});

app.delete('/api/data/:id', async (req, res) => {
  try {
    const result = await db.collection('deliveries').deleteOne({
      _id: new ObjectId(req.params.id),
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error deleting data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
