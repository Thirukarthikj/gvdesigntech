// Client-Side MongoDB API Service for GV DesignTech
// Connects directly to Vite-hosted or standalone /api backend

const API_BASE = '/api';

/**
 * Health & connection status of MongoDB
 */
export async function checkMongoHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('MongoDB health check warning:', err.message);
    return { status: 'offline', error: err.message };
  }
}

/* ==================================================
   1. MOUs (Memorandums of Understanding)
   ================================================== */
export async function fetchMousFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/mous`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch MOUs from MongoDB:', err.message);
    return null;
  }
}

export async function createMouInMongo(mou) {
  try {
    const res = await fetch(`${API_BASE}/mous`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mou)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not create MOU in MongoDB:', err.message);
    return null;
  }
}

export async function updateMouInMongo(id, mou) {
  try {
    const res = await fetch(`${API_BASE}/mous/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mou)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not update MOU in MongoDB:', err.message);
    return null;
  }
}

export async function deleteMouInMongo(id) {
  try {
    const res = await fetch(`${API_BASE}/mous/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not delete MOU in MongoDB:', err.message);
    return null;
  }
}

/* ==================================================
   2. Campus Gallery Photos
   ================================================== */
export async function fetchGalleryFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/gallery`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch gallery from MongoDB:', err.message);
    return null;
  }
}

export async function createGalleryInMongo(item) {
  try {
    const res = await fetch(`${API_BASE}/gallery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not create gallery photo in MongoDB:', err.message);
    return null;
  }
}

export async function updateGalleryInMongo(id, item) {
  try {
    const res = await fetch(`${API_BASE}/gallery/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not update gallery in MongoDB:', err.message);
    return null;
  }
}

export async function deleteGalleryInMongo(id) {
  try {
    const res = await fetch(`${API_BASE}/gallery/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not delete gallery item in MongoDB:', err.message);
    return null;
  }
}

/* ==================================================
   3. Placements & Student Stories
   ================================================== */
export async function fetchPlacementsFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/placements`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch placements from MongoDB:', err.message);
    return null;
  }
}

export async function savePlacementsToMongo(data) {
  try {
    const res = await fetch(`${API_BASE}/placements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not save placements to MongoDB:', err.message);
    return null;
  }
}

/* ==================================================
   4. Technical Blogs
   ================================================== */
export async function fetchBlogsFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/blogs`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch blogs from MongoDB:', err.message);
    return null;
  }
}

export async function createBlogInMongo(blog) {
  try {
    const res = await fetch(`${API_BASE}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not create blog in MongoDB:', err.message);
    return null;
  }
}

export async function updateBlogInMongo(id, blog) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not update blog in MongoDB:', err.message);
    return null;
  }
}

export async function deleteBlogInMongo(id) {
  try {
    const res = await fetch(`${API_BASE}/blogs/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not delete blog in MongoDB:', err.message);
    return null;
  }
}

/* ==================================================
   5. Leadership & Founders
   ================================================== */
export async function fetchLeadersFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/leaders`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch leaders from MongoDB:', err.message);
    return null;
  }
}

export async function saveLeadersToMongo(leaders) {
  try {
    const res = await fetch(`${API_BASE}/leaders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leaders)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not save leaders to MongoDB:', err.message);
    return null;
  }
}

/* ==================================================
   6. Certificates Registry
   ================================================== */
export async function fetchCertificatesFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/certificates`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch certificates from MongoDB:', err.message);
    return null;
  }
}

export async function saveCertificateToMongo(cert) {
  try {
    const res = await fetch(`${API_BASE}/certificates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cert)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not save certificate to MongoDB:', err.message);
    return null;
  }
}

export async function deleteCertificateInMongo(id) {
  try {
    const res = await fetch(`${API_BASE}/certificates/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not delete certificate in MongoDB:', err.message);
    return null;
  }
}

/* ==================================================
   7. Inquiries & Student Leads
   ================================================== */
export async function fetchLeadsFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/leads`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch leads from MongoDB:', err.message);
    return null;
  }
}

export async function createLeadInMongo(lead) {
  try {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not create lead in MongoDB:', err.message);
    return null;
  }
}

export async function updateLeadInMongo(id, lead) {
  try {
    const res = await fetch(`${API_BASE}/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not update lead in MongoDB:', err.message);
    return null;
  }
}

export async function deleteLeadInMongo(id) {
  try {
    const res = await fetch(`${API_BASE}/leads/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not delete lead in MongoDB:', err.message);
    return null;
  }
}

/* ==================================================
   8. Courses & Curriculum
   ================================================== */
export async function fetchCoursesFromMongo() {
  try {
    const res = await fetch(`${API_BASE}/courses`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not fetch courses from MongoDB:', err.message);
    return null;
  }
}

export async function createCourseInMongo(course) {
  try {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not create course in MongoDB:', err.message);
    return null;
  }
}

export async function updateCourseInMongo(id, course) {
  try {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not update course in MongoDB:', err.message);
    return null;
  }
}

export async function deleteCourseInMongo(id) {
  try {
    const res = await fetch(`${API_BASE}/courses/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not delete course in MongoDB:', err.message);
    return null;
  }
}

export async function syncCoursesToMongo(courses) {
  try {
    const res = await fetch(`${API_BASE}/courses/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courses)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Could not sync courses to MongoDB:', err.message);
    return null;
  }
}
