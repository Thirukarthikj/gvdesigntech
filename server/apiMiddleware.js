// Express Router for MongoDB Endpoints in GV DesignTech
import express from 'express';
import cors from 'cors';
import { connectMongo, getDb } from './db.js';
import { ObjectId } from 'mongodb';

export const apiRouter = express.Router();

// Middleware
apiRouter.use(cors());
apiRouter.use(express.json({ limit: '50mb' }));
apiRouter.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure DB is connected for every request
apiRouter.use(async (req, res, next) => {
  const db = await connectMongo();
  if (!db) {
    return res.status(503).json({ error: 'MongoDB service unavailable on 127.0.0.1:27017' });
  }
  req.db = db;
  next();
});

// Helper to match string ID or number ID or MongoDB ObjectId
function buildIdQuery(idParam) {
  const queries = [{ id: idParam }];
  const num = Number(idParam);
  if (!isNaN(num)) {
    queries.push({ id: num });
  }
  try {
    if (ObjectId.isValid(idParam)) {
      queries.push({ _id: new ObjectId(idParam) });
    }
  } catch {}
  return { $or: queries };
}

/* ==========================================
   1. MOUs (Memorandum of Understanding)
   ========================================== */
apiRouter.get('/mous', async (req, res) => {
  try {
    const list = await req.db.collection('mous')
      .find({})
      .sort({ createdAt: -1, id: -1, _id: -1 })
      .toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/mous/sync', async (req, res) => {
  try {
    const list = req.body;
    if (Array.isArray(list)) {
      await req.db.collection('mous').deleteMany({});
      if (list.length > 0) {
        const now = Date.now();
        const cleanList = list.map((item, idx) => {
          const { _id, ...clean } = item;
          return {
            ...clean,
            id: clean.id || (now - (idx * 1000)),
            order: idx,
            createdAt: clean.createdAt || new Date(now - (idx * 1000)).toISOString(),
            updatedAt: new Date().toISOString()
          };
        });
        await req.db.collection('mous').insertMany(cleanList);
      }
    }
    res.json({ success: true, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/mous', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || Date.now(),
      createdAt: new Date().toISOString()
    };
    const result = await req.db.collection('mous').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/mous/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('mous').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/mous/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('mous').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   2. Campus Gallery Photos
   ========================================== */
apiRouter.get('/gallery', async (req, res) => {
  try {
    const items = await req.db.collection('galleries')
      .find({})
      .sort({ order: 1, createdAt: -1, id: -1, _id: -1 })
      .toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/gallery/sync', async (req, res) => {
  try {
    const list = req.body;
    if (Array.isArray(list)) {
      await req.db.collection('galleries').deleteMany({});
      if (list.length > 0) {
        const now = Date.now();
        const cleanList = list.map((item, idx) => {
          const { _id, ...clean } = item;
          return {
            ...clean,
            id: clean.id || (now - (idx * 1000)),
            order: idx,
            createdAt: clean.createdAt || new Date(now - (idx * 1000)).toISOString(),
            updatedAt: new Date().toISOString()
          };
        });
        await req.db.collection('galleries').insertMany(cleanList);
      }
    }
    res.json({ success: true, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/gallery', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || Date.now(),
      createdAt: new Date().toISOString()
    };
    const result = await req.db.collection('galleries').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/gallery/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('galleries').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/gallery/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('galleries').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   3. Placements & Student Success Stories
   ========================================== */
apiRouter.get('/placements', async (req, res) => {
  try {
    const doc = await req.db.collection('placements').findOne({ _id: 'default_placements' });
    if (doc) {
      res.json({ stats: doc.stats, stories: doc.stories });
    } else {
      res.json({ stats: [], stories: [] });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/placements', async (req, res) => {
  try {
    const data = {
      stats: req.body.stats || [],
      stories: req.body.stories || [],
      updatedAt: new Date().toISOString()
    };
    await req.db.collection('placements').updateOne(
      { _id: 'default_placements' },
      { $set: data },
      { upsert: true }
    );
    res.json({ success: true, ...data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   4. Technical Blogs
   ========================================== */
apiRouter.get('/blogs', async (req, res) => {
  try {
    const posts = await req.db.collection('blogs')
      .find({})
      .sort({ createdAt: -1, id: -1, _id: -1 })
      .toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/blogs/sync', async (req, res) => {
  try {
    const list = req.body;
    if (Array.isArray(list)) {
      await req.db.collection('blogs').deleteMany({});
      if (list.length > 0) {
        const cleanList = list.map((item, idx) => {
          const { _id, ...clean } = item;
          return {
            ...clean,
            order: idx,
            updatedAt: new Date().toISOString()
          };
        });
        await req.db.collection('blogs').insertMany(cleanList);
      }
    }
    res.json({ success: true, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/blogs', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || Date.now(),
      createdAt: new Date().toISOString()
    };
    const result = await req.db.collection('blogs').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/blogs/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('blogs').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/blogs/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('blogs').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   5. Leadership & Founders
   ========================================== */
apiRouter.get('/leaders', async (req, res) => {
  try {
    const list = await req.db.collection('leaders').find({}).toArray();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/leaders', async (req, res) => {
  try {
    const leaders = Array.isArray(req.body) ? req.body : [req.body];
    await req.db.collection('leaders').deleteMany({});
    await req.db.collection('leaders').insertMany(leaders);
    res.json({ success: true, count: leaders.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   6. Certificate Verification Registry
   ========================================== */
apiRouter.get('/certificates', async (req, res) => {
  try {
    const list = await req.db.collection('certificates').find({}).toArray();
    // Return both map by certId and array
    const map = {};
    list.forEach(c => {
      const key = c.certId || c.id;
      if (key) map[key] = c;
    });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/certificates/sync', async (req, res) => {
  try {
    const registry = req.body;
    const certs = Object.values(registry);
    await req.db.collection('certificates').deleteMany({});
    if (certs.length > 0) {
      await req.db.collection('certificates').insertMany(certs);
    }
    res.json({ success: true, count: certs.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/certificates', async (req, res) => {
  try {
    const cert = {
      ...req.body,
      updatedAt: new Date().toISOString()
    };
    const key = cert.certId || cert.id;
    await req.db.collection('certificates').updateOne(
      { $or: [{ certId: key }, { id: key }] },
      { $set: cert },
      { upsert: true }
    );
    res.json({ success: true, cert });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/certificates/:id', async (req, res) => {
  try {
    const key = req.params.id;
    const result = await req.db.collection('certificates').deleteOne(
      { $or: [{ certId: key }, { id: key }] }
    );
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   7. Inquiries & Student Leads
   ========================================== */
apiRouter.get('/leads', async (req, res) => {
  try {
    const leads = await req.db.collection('leads')
      .find({})
      .sort({ date: -1, _id: -1 })
      .toArray();
    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/leads/sync', async (req, res) => {
  try {
    const leads = req.body;
    if (Array.isArray(leads)) {
      await req.db.collection('leads').deleteMany({});
      if (leads.length > 0) {
        const clean = leads.map(l => {
          const { _id, ...rest } = l;
          return rest;
        });
        await req.db.collection('leads').insertMany(clean);
      }
    }
    res.json({ success: true, count: leads.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/leads', async (req, res) => {
  try {
    const lead = {
      ...req.body,
      id: req.body.id || `lead-${Date.now()}`,
      date: req.body.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    const result = await req.db.collection('leads').insertOne(lead);
    res.status(201).json({ ...lead, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/leads/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('leads').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/leads/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('leads').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   8. MongoDB Health & Stats
   ========================================== */
apiRouter.get('/health', async (req, res) => {
  try {
    const collections = await req.db.listCollections().toArray();
    const counts = {};
    for (const c of collections) {
      counts[c.name] = await req.db.collection(c.name).countDocuments();
    }
    res.json({
      status: 'connected',
      database: 'gvdesigntech',
      host: '127.0.0.1:27017',
      collections: collections.map(c => c.name),
      counts
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});
