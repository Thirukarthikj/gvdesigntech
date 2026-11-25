import { MongoClient } from 'mongodb';
import { initialCourses } from '../src/data/coursesData.js';

async function seedCourses() {
  const uri = 'mongodb://127.0.0.1:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db('gvdesigntech');
    const collection = db.collection('courses');

    // Wipe out old data and seed the full catalog
    await collection.deleteMany({});
    console.log('Cleared old courses collection');

    const cleanCourses = initialCourses.map((c, idx) => ({
      ...c,
      order: c.order ?? idx,
      createdAt: c.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    const result = await collection.insertMany(cleanCourses);
    console.log(`Successfully seeded ${result.insertedCount} courses into MongoDB!`);

    const count = await collection.countDocuments();
    console.log(`Verified total count in MongoDB: ${count}`);

    const depts = await collection.distinct('department');
    console.log('Departments represented:', depts);
  } catch (err) {
    console.error('Error seeding courses:', err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedCourses();
