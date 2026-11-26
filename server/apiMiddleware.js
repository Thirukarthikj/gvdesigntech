// Express Router for MongoDB Endpoints in GV DesignTech
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { connectMongo, reconnectMongo, getMongoUri, getDbName, getDb } from './db.js';
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
    return res.status(503).json({ error: 'MongoDB service unavailable. Please verify your MongoDB Atlas connection URI or local MongoDB service.' });
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
   8. Courses & Curriculum Collection
   ========================================== */
apiRouter.get('/courses', async (req, res) => {
  try {
    const list = await req.db.collection('courses')
      .find({})
      .sort({ order: 1, createdAt: -1, _id: -1 })
      .toArray();
    const seen = new Set();
    const deduped = [];
    for (const item of list) {
      const key = (item.id || item.title || '').toString().trim().toLowerCase();
      if (key && !seen.has(key)) {
        seen.add(key);
        deduped.push(item);
      }
    }
    res.json(deduped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/courses/sync', async (req, res) => {
  try {
    const list = req.body;
    if (Array.isArray(list)) {
      await req.db.collection('courses').deleteMany({});
      if (list.length > 0) {
        const seen = new Set();
        const deduped = [];
        for (const item of list) {
          const key = (item.id || item.title || '').toString().trim().toLowerCase();
          if (key && !seen.has(key)) {
            seen.add(key);
            deduped.push(item);
          }
        }
        const now = Date.now();
        const cleanList = deduped.map((item, idx) => {
          const { _id, ...clean } = item;
          return {
            ...clean,
            id: clean.id || `course-${now - (idx * 1000)}`,
            order: clean.order ?? idx,
            createdAt: clean.createdAt || new Date(now - (idx * 1000)).toISOString(),
            updatedAt: new Date().toISOString()
          };
        });
        await req.db.collection('courses').insertMany(cleanList);
      }
    }
    res.json({ success: true, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/courses', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || `course-${Date.now()}`,
      order: req.body.order ?? 0,
      createdAt: req.body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const result = await req.db.collection('courses').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/courses/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('courses').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/courses/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('courses').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   9. Master Internship Programs Collection
   ========================================== */
apiRouter.get('/internship-programs', async (req, res) => {
  try {
    const list = await req.db.collection('internship_programs')
      .find({})
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    const normalized = list.map(item => ({
      ...item,
      id: item._id.toString(),
      _id: item._id.toString()
    }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/internship-programs/sync', async (req, res) => {
  try {
    const list = Array.isArray(req.body) ? req.body : [];
    if (list.length > 0) {
      await req.db.collection('internship_programs').deleteMany({});
      const cleanList = list.map((item, idx) => {
        const { _id, ...cleanItem } = item;
        let validMongoId = undefined;
        if (_id && typeof _id === 'string' && /^[0-9a-fA-F]{24}$/.test(_id)) {
          validMongoId = new ObjectId(_id);
        }
        return {
          ...(validMongoId ? { _id: validMongoId } : {}),
          ...cleanItem,
          id: cleanItem.id || `internship-${Date.now()}-${idx}`,
          order: cleanItem.order ?? (idx + 1),
          updatedAt: new Date().toISOString()
        };
      });
      await req.db.collection('internship_programs').insertMany(cleanList);
    }
    res.json({ success: true, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/internship-programs', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || `internship-${Date.now()}`,
      order: req.body.order ?? 99,
      createdAt: req.body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const result = await req.db.collection('internship_programs').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/internship-programs/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('internship_programs').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/internship-programs/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('internship_programs').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   10. Site Configuration (Demo Video, Recent Activities, Stats, Showcase Images)
   ========================================== */
apiRouter.get('/site-config', async (req, res) => {
  try {
    const config = await req.db.collection('site_config').findOne({ _id: 'main' });
    res.json(config || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/site-config', async (req, res) => {
  try {
    const { _id, ...clean } = req.body;
    clean.updatedAt = new Date().toISOString();
    await req.db.collection('site_config').updateOne(
      { _id: 'main' },
      { $set: clean },
      { upsert: true }
    );
    res.json({ success: true, ...clean });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   11. Skill Test Questions Collection
   ========================================== */
apiRouter.get('/skill-test-questions', async (req, res) => {
  try {
    const list = await req.db.collection('skill_test_questions')
      .find({})
      .sort({ order: 1, createdAt: 1 })
      .toArray();

    const normalized = list.map(item => ({
      ...item,
      id: item.id || item._id.toString(),
      _id: item._id.toString()
    }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/skill-test-questions/sync', async (req, res) => {
  try {
    const list = Array.isArray(req.body) ? req.body : [];
    if (list.length > 0) {
      await req.db.collection('skill_test_questions').deleteMany({});
      const cleanList = list.map((item, idx) => {
        const { _id, ...cleanItem } = item;
        let validMongoId = undefined;
        if (_id && typeof _id === 'string' && /^[0-9a-fA-F]{24}$/.test(_id)) {
          validMongoId = new ObjectId(_id);
        }
        return {
          ...(validMongoId ? { _id: validMongoId } : {}),
          ...cleanItem,
          id: cleanItem.id || `stq-${Date.now()}-${idx}`,
          order: cleanItem.order ?? (idx + 1),
          updatedAt: new Date().toISOString()
        };
      });
      await req.db.collection('skill_test_questions').insertMany(cleanList);
    }
    res.json({ success: true, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/skill-test-questions', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || `stq-${Date.now()}`,
      order: req.body.order ?? 99,
      createdAt: req.body.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const result = await req.db.collection('skill_test_questions').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/skill-test-questions/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('skill_test_questions').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/skill-test-questions/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('skill_test_questions').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   12. Skill Test Student Results Collection
   ========================================== */
apiRouter.get('/skill-test-results', async (req, res) => {
  try {
    const list = await req.db.collection('skill_test_results')
      .find({})
      .sort({ submittedAt: -1, _id: -1 })
      .toArray();

    const normalized = list.map(item => ({
      ...item,
      id: item.id || item._id.toString(),
      _id: item._id.toString()
    }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/skill-test-results', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || `str-${Date.now()}`,
      submittedAt: req.body.submittedAt || new Date().toISOString(),
      createdAt: new Date().toISOString()
    };
    const result = await req.db.collection('skill_test_results').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/skill-test-results/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('skill_test_results').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/skill-test-results', async (req, res) => {
  try {
    await req.db.collection('skill_test_results').deleteMany({});
    res.json({ success: true, message: 'All student test records cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   13. Student Internship Applicants Pipeline
   ========================================== */
apiRouter.get('/internship-applicants', async (req, res) => {
  try {
    const list = await req.db.collection('internship_applicants')
      .find({})
      .sort({ appliedDate: -1, _id: -1 })
      .toArray();

    const normalized = list.map(item => ({
      ...item,
      id: item.id || item._id.toString(),
      _id: item._id.toString()
    }));
    res.json(normalized);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/internship-applicants/sync', async (req, res) => {
  try {
    const list = Array.isArray(req.body) ? req.body : [];
    if (list.length > 0) {
      await req.db.collection('internship_applicants').deleteMany({});
      const cleanList = list.map((item, idx) => {
        const { _id, ...cleanItem } = item;
        let validMongoId = undefined;
        if (_id && typeof _id === 'string' && /^[0-9a-fA-F]{24}$/.test(_id)) {
          validMongoId = new ObjectId(_id);
        }
        return {
          ...(validMongoId ? { _id: validMongoId } : {}),
          ...cleanItem,
          id: cleanItem.id || `intern-${Date.now()}-${idx}`,
          appliedDate: cleanItem.appliedDate || new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString()
        };
      });
      await req.db.collection('internship_applicants').insertMany(cleanList);
    }
    res.json({ success: true, count: list.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/internship-applicants', async (req, res) => {
  try {
    const item = {
      ...req.body,
      id: req.body.id || `intern-${Date.now()}`,
      appliedDate: req.body.appliedDate || new Date().toISOString().split('T')[0],
      status: req.body.status || 'Under Review',
      createdAt: new Date().toISOString()
    };
    const result = await req.db.collection('internship_applicants').insertOne(item);
    res.status(201).json({ ...item, _id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.put('/internship-applicants/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const { _id, ...updateData } = req.body;
    updateData.updatedAt = new Date().toISOString();
    const result = await req.db.collection('internship_applicants').updateOne(query, { $set: updateData });
    res.json({ success: result.modifiedCount > 0, ...updateData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.delete('/internship-applicants/:id', async (req, res) => {
  try {
    const query = buildIdQuery(req.params.id);
    const result = await req.db.collection('internship_applicants').deleteOne(query);
    res.json({ success: result.deletedCount > 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================
   9. MongoDB Health, Atlas Cloud & Stats
   ========================================== */
apiRouter.get('/health', async (req, res) => {
  try {
    const uri = getMongoUri();
    const isAtlas = uri.includes('mongodb+srv://') || uri.includes('mongodb.net');
    const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    const collections = await req.db.listCollections().toArray();
    const counts = {};
    for (const c of collections) {
      counts[c.name] = await req.db.collection(c.name).countDocuments();
    }
    res.json({
      status: 'connected',
      type: isAtlas ? 'MongoDB Atlas Cloud' : 'Local MongoDB',
      database: req.db.databaseName,
      host: isAtlas ? 'MongoDB Atlas Cluster' : '127.0.0.1:27017',
      uri: maskedUri,
      isAtlas,
      collections: collections.map(c => c.name),
      counts
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

apiRouter.get('/settings/mongodb', async (req, res) => {
  try {
    const uri = getMongoUri();
    const isAtlas = uri.includes('mongodb+srv://') || uri.includes('mongodb.net');
    const maskedUri = uri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@');
    res.json({
      uri: maskedUri,
      rawUri: isAtlas ? uri : '',
      isAtlas,
      database: req.db ? req.db.databaseName : getDbName(),
      connected: !!req.db
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

apiRouter.post('/settings/mongodb', async (req, res) => {
  try {
    const { uri } = req.body;
    if (!uri || typeof uri !== 'string') {
      return res.status(400).json({ error: 'Please provide a valid MongoDB connection string URI.' });
    }

    const cleanUri = uri.trim();
    const isAtlas = cleanUri.includes('mongodb+srv://') || cleanUri.includes('mongodb.net');

    // Test the new connection
    const newDb = await reconnectMongo(cleanUri);
    if (!newDb) {
      return res.status(400).json({
        error: 'Failed to connect to MongoDB with provided URI. Please ensure your username and password are correct, and your IP address (or 0.0.0.0/0) is added to the MongoDB Atlas Network Access whitelist.'
      });
    }

    // Persist to .env file
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      let envContent = '';
      if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
      }
      if (envContent.includes('MONGODB_URI=')) {
        envContent = envContent.replace(/^MONGODB_URI=.*$/m, `MONGODB_URI=${cleanUri}`);
      } else {
        envContent += `\n# MongoDB Cloud Connection URI\nMONGODB_URI=${cleanUri}\n`;
      }
      fs.writeFileSync(envPath, envContent, 'utf8');
    } catch (fsErr) {
      console.warn('Could not update .env file:', fsErr.message);
    }

    res.json({
      success: true,
      message: `Successfully connected to ${isAtlas ? 'MongoDB Atlas Cloud' : 'MongoDB'} (Database: "${newDb.databaseName}")!`,
      isAtlas,
      database: newDb.databaseName
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
