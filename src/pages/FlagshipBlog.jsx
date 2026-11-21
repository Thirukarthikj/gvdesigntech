import React, { useState } from 'react';
import { blogStyles as gC } from '../data/styles.js';
import { blogCategories, blogPosts } from '../data/blogs.js';

export default function FlagshipBlog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState(null);

  const filtered = blogPosts.filter((b) => {
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch = !searchQuery || b.title.toLowerCase().includes(searchQuery.toLowerCase()) || (b.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = blogPosts[0];

  return (
    <div className={gC['blog-page']} style={{ minHeight: '100vh', background: '#050816', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            KNOWLEDGE HUB
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Recent Articles &amp; Technical Insights
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto 32px', fontSize: '16.5px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
            Stay ahead with expert tutorials and industry trends on Full Stack, AI, Data Science, MERN, and Python — curated by PyBot Experts.
          </p>

          {/* Search bar */}
          <div style={{ maxWidth: '480px', margin: '0 auto 28px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Search tutorials, languages, frameworks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                color: '#fff',
                fontSize: '15px',
                outline: 'none'
              }}
            />
          </div>

          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '999px',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? '#d946ef' : 'rgba(255,255,255,0.15)',
                  background: selectedCategory === cat ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255,255,255,0.04)',
                  color: '#fff',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post (if not searching) */}
        {!searchQuery && selectedCategory === 'All' && featured && (
          <div
            onClick={() => setActiveArticle(featured)}
            style={{
              padding: '28px',
              borderRadius: '24px',
              background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.7), rgba(6, 6, 24, 0.8))',
              border: '1px solid rgba(217, 70, 239, 0.4)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              marginBottom: '60px',
              cursor: 'pointer'
            }}
          >
            <div style={{ height: '280px', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={featured.image || '/assets/recent-activity/ai-workshop-2.jpg'}
                alt={featured.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.src = '/assets/recent-activity/ai-workshop-2.jpg'; }}
              />
              <span style={{ position: 'absolute', top: '12px', left: '12px', padding: '4px 12px', background: '#d946ef', borderRadius: '999px', fontSize: '12px', fontWeight: '700' }}>
                Featured
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ color: '#22d3ee', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px' }}>
                {featured.category}
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: '800', lineHeight: 1.3, marginBottom: '14px', color: '#fff' }}>
                {featured.title}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '20px' }}>
                Comprehensive roadmap and industry salary breakdown for developers preparing for high-growth tech positions in 2026.
              </p>
              <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <span>✍️ {featured.author}</span>
                <span>📅 {featured.date}</span>
                <span>⏱️ {featured.readTime}</span>
                <span>👁️ {featured.views}</span>
              </div>
            </div>
          </div>
        )}

        {/* Blog Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {filtered.map((b) => (
            <article
              key={b.id}
              onClick={() => setActiveArticle(b)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.6), rgba(4, 5, 22, 0.7))',
                border: '1px solid rgba(139, 92, 246, 0.28)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={b.image || '/assets/recent-activity/ai-workshop-2.jpg'}
                  alt={b.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/assets/recent-activity/ai-workshop-2.jpg'; }}
                />
                <span style={{ position: 'absolute', top: '10px', left: '10px', padding: '3px 10px', background: 'rgba(2, 4, 18, 0.8)', border: '1px solid rgba(139,92,246,0.4)', borderRadius: '999px', fontSize: '11px', fontWeight: '700', color: '#c084fc' }}>
                  {b.category}
                </span>
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '17px', fontWeight: '700', lineHeight: 1.4, color: '#fff', marginBottom: '12px' }}>
                  {b.title}
                </h3>
                <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', color: 'rgba(255,255,255,0.55)' }}>
                  <span>{b.date}</span>
                  <span>{b.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Article Reading Modal */}
        {activeArticle && (
          <div
            onClick={() => setActiveArticle(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: 'rgba(2, 4, 18, 0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '750px',
                width: '100%',
                maxHeight: '85vh',
                overflowY: 'auto',
                background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.98), rgba(4, 5, 22, 0.98))',
                border: '1px solid rgba(139, 92, 246, 0.5)',
                borderRadius: '24px',
                padding: '32px',
                color: '#fff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ padding: '4px 12px', background: 'rgba(217, 70, 239, 0.2)', border: '1px solid #d946ef', borderRadius: '999px', fontSize: '12px', fontWeight: '700', color: '#f472b6' }}>
                  {activeArticle.category}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              </div>

              <h2 style={{ fontSize: '24px', fontWeight: '800', lineHeight: 1.3, marginBottom: '14px' }}>
                {activeArticle.title}
              </h2>

              <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
                <span>✍️ {activeArticle.author}</span>
                <span>📅 {activeArticle.date}</span>
                <span>⏱️ {activeArticle.readTime}</span>
                <span>👁️ {activeArticle.views} views</span>
              </div>

              <div style={{ width: '100%', height: '240px', borderRadius: '16px', overflow: 'hidden', marginBottom: '24px' }}>
                <img
                  src={activeArticle.image || '/assets/recent-activity/ai-workshop-2.jpg'}
                  alt={activeArticle.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/assets/recent-activity/ai-workshop-2.jpg'; }}
                />
              </div>

              <div style={{ fontSize: '15.5px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)' }}>
                <p>
                  As technology rapidly evolves in 2026, proficiency in modern engineering stacks, cloud deployment architectures, and generative AI agents is separating top-tier developers from the rest of the industry.
                </p>
                <p>
                  At PyBot AI Academy, we bridge academic foundations with industrial execution through hands-on laboratory sandboxes, live code reviews, and enterprise capstone pipelines.
                </p>
                <p>
                  Key competencies required this year include asynchronous microservices, scalable vector search architectures, automated continuous integration, and secure container orchestration.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
