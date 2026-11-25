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
    // 1. MOUs Collection - kept empty for admin to insert real MOUs
    // 2. Gallery Collection - kept empty for admin to insert real photos
    // 3. Placements Collection - baseline stats, empty stories
    const placeCol = database.collection('placements');
    const placeCount = await placeCol.countDocuments();
    if (placeCount === 0) {
      await placeCol.insertOne({
        _id: 'default_placements',
        stats: defaultPlacements.stats,
        stories: [],
        updatedAt: new Date().toISOString()
      });
      console.log('✅ Seeded clean placements baseline into MongoDB');
    }

    // 4. Blogs Collection - kept empty for admin to publish real articles
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

    // 9. Site Config Collection (Demo Video, Recent Activities, Stats, Showcase Images)
    const siteConfigCol = database.collection('site_config');
    const configExists = await siteConfigCol.findOne({ _id: 'main' });
    if (!configExists) {
      await siteConfigCol.insertOne({
        _id: 'main',
        demoVideo: {
          videoUrl: 'https://www.youtube-nocookie.com/embed/videoseries?list=UCSTvrgSrwwi5hx3mdkXLX5A',
          title: 'Watch How We Shape the Future of CAD & Engineering Design Education',
          description: 'Take a guided virtual tour through our state-of-the-art CAD workstations, hands-on 3D printing & prototyping labs, BIM coordination studios, and placement training sessions at GV DesignTech.'
        },
        recentActivity: {
          badge: 'NEW',
          title: 'Recent Activities',
          desc: "See what's happening at GV DesignTech.",
          thumb: '/assets/recent-activity/ai-workshop-2.jpg',
          items: [
            { id: 2, src: '/assets/recent-activity/ai-workshop-2.jpg', alt: 'CAD Training Classroom' },
            { id: 3, src: '/assets/recent-activity/ai-workshop-3.jpg', alt: 'CAD Workshop Mentorship' }
          ]
        },
        stats: [
          { id: 'stat-1', count: 8500, suffix: '+', title: 'Professionals Worldwide Choose Us' },
          { id: 'stat-2', count: 3, suffix: '+', title: 'Years of Training Excellence' },
          { id: 'stat-3', count: 250, suffix: '+', title: 'Alumni Placed Globally' },
          { id: 'stat-4', count: 25, suffix: '+', title: 'Industry Awards & Accreditations' }
        ],
        showcaseImages: {
          image1: '/assets/cad-lab-classroom.jpg',
          alt1: 'CAD Design Classroom and Workshop at GV DesignTech',
          image2: '/assets/cad-lab-students.jpg',
          alt2: 'Students Practicing 2D and 3D CAD Modeling at GV DesignTech'
        },
        updatedAt: new Date().toISOString()
      });
      console.log('✅ Seeded initial site_config into MongoDB');
    }
  } catch (seedErr) {
    console.error('Error during MongoDB initial data seeding:', seedErr);
  }
}

export function getDb() {
  return db;
}
