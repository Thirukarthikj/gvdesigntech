// MongoDB Database Connection & Collection Manager for GV DesignTech
import { MongoClient, ObjectId } from 'mongodb';
import { mouList } from '../src/data/mous.js';
import { galleryItems } from '../src/data/gallery.js';
import { defaultPlacements, defaultLeaders, defaultCertificates } from '../src/data/contentPersistence.js';
import { blogPosts } from '../src/data/blogs.js';
import { initialAdminLeads } from '../src/data/adminInitialData.js';
import { initialCourses } from '../src/data/coursesData.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gvdesigntech';
const DB_NAME = 'gvdesigntech';

let client = null;
let db = null;

export async function connectMongo() {
  if (db) return db;
  try {
    client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`🍃 Connected to MongoDB: ${DB_NAME} (at ${MONGODB_URI})`);

    // Seed initial clean records if collections are empty
    await seedInitialData(db);

    return db;
  } catch (err) {
    console.error(`❌ MongoDB connection failed (${MONGODB_URI}):`, err.message);
    return null;
  }
}

async function seedInitialData(database) {
  try {
    // 1. MOUs Collection
    const mousCol = database.collection('mous');
    const mouCount = await mousCol.countDocuments();
    if (mouCount === 0) {
      // Remove any test names and seed genuine records
      const cleanMous = mouList.filter(m => {
        const name = (m.name || '').toLowerCase();
        return !name.includes('test') && !name.includes('rtwertert');
      }).map((m, idx) => ({
        ...m,
        id: m.id || (Date.now() - (idx * 100000)),
        createdAt: new Date().toISOString()
      }));
      await mousCol.insertMany(cleanMous);
      console.log(`✅ Seeded ${cleanMous.length} clean MOUs into MongoDB`);
    }

    // 2. Gallery Collection
    const galCol = database.collection('galleries');
    const galCount = await galCol.countDocuments();
    if (galCount === 0) {
      // Take the top 6 authentic real photo items
      const cleanGallery = galleryItems.slice(0, 6).map((g, idx) => ({
        ...g,
        id: g.id || (idx + 1),
        createdAt: new Date().toISOString()
      }));
      await galCol.insertMany(cleanGallery);
      console.log(`✅ Seeded ${cleanGallery.length} clean gallery photos into MongoDB`);
    }

    // 3. Placements Collection
    const placeCol = database.collection('placements');
    const placeCount = await placeCol.countDocuments();
    if (placeCount === 0) {
      await placeCol.insertOne({
        _id: 'default_placements',
        stats: defaultPlacements.stats,
        stories: defaultPlacements.stories,
        updatedAt: new Date().toISOString()
      });
      console.log('✅ Seeded placements data into MongoDB');
    }

    // 4. Blogs Collection
    const blogCol = database.collection('blogs');
    const blogCount = await blogCol.countDocuments();
    if (blogCount === 0) {
      const cleanBlogs = blogPosts.map(b => ({
        ...b,
        createdAt: new Date().toISOString()
      }));
      await blogCol.insertMany(cleanBlogs);
      console.log(`✅ Seeded ${cleanBlogs.length} blogs into MongoDB`);
    }

    // 5. Leaders Collection
    const leadCol = database.collection('leaders');
    const leadCount = await leadCol.countDocuments();
    if (leadCount === 0) {
      await leadCol.insertMany(defaultLeaders);
      console.log('✅ Seeded leadership team into MongoDB');
    }

    // 6. Certificates Collection
    const certCol = database.collection('certificates');
    const certCount = await certCol.countDocuments();
    if (certCount === 0) {
      const certList = Object.values(defaultCertificates);
      await certCol.insertMany(certList);
      console.log(`✅ Seeded ${certList.length} verified certificates into MongoDB`);
    }

    // 7. Student Inquiries / Leads Collection
    const leadsCol = database.collection('leads');
    const leadsCount = await leadsCol.countDocuments();
    if (leadsCount === 0) {
      const cleanLeads = initialAdminLeads.map(l => {
        const { _id, ...rest } = l;
        return rest;
      });
      await leadsCol.insertMany(cleanLeads);
      console.log(`✅ Seeded initial student inquiries into MongoDB`);
    }

    // 8. Courses & Curriculum Collection
    const courseCol = database.collection('courses');
    const courseCount = await courseCol.countDocuments();
    if (courseCount === 0) {
      const cleanCourses = initialCourses.map((c, idx) => {
        const { _id, ...rest } = c;
        return {
          ...rest,
          order: rest.order ?? idx,
          createdAt: rest.createdAt || new Date(Date.now() - (idx * 5000)).toISOString()
        };
      });
      await courseCol.insertMany(cleanCourses);
      console.log(`✅ Seeded ${cleanCourses.length} courses into MongoDB`);
    }
  } catch (seedErr) {
    console.error('Error during MongoDB initial data seeding:', seedErr);
  }
}

export function getDb() {
  return db;
}
