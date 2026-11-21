import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aiStyles as z } from '../data/styles.js';

export default function ArtificialIntelligence({ onOpenModal }) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(z['ai-revealed']);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(
      `.${z['ai-reveal-up']}, .${z['ai-reveal-left']}, .${z['ai-reveal-right']}, .${z['ai-reveal-scale']}`
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const capabilities = [
    { title: 'Generative AI', desc: 'Large language models, autonomous agent frameworks, prompt architectures, and conversational bots.' },
    { title: 'Machine Learning', desc: 'Predictive intelligence, supervised learning, and anomaly classification algorithms.' },
    { title: 'AI Automation', desc: 'End-to-end robotic process integration, business task automation, and intelligent orchestrators.' },
    { title: 'AI Chatbots', desc: 'Context-aware multilingual customer support assistants with transactional API execution.' },
    { title: 'Computer Vision', desc: 'Image classification, object detection, facial recognition, and video stream telemetry.' },
    { title: 'Natural Language Processing', desc: 'Sentiment classification, multi-document summarization, entity recognition, and embeddings.' },
    { title: 'Enterprise AI', desc: 'High-availability scalable AI cluster infrastructure with cloud governance and security.' },
    { title: 'AI Consulting', desc: 'Custom architectural roadmaps, feasibility studies, and industrial AI implementation.' }
  ];

  return (
    <div className={z['ai-page']}>
      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className={z['ai-section-tag']}>PYBOT AI SOLUTIONS</div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '20px 0', color: '#fff' }}>
            Transform Business With <span className={z['ai-grad-text']}>Artificial Intelligence</span>
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto 36px', fontSize: '18px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.78)' }}>
            PYBOT AI Solutions empowers organisations through Generative AI, Machine Learning, and Intelligent Automation. We build production-ready AI models that drive transformative efficiency.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={z['ai-btn-primary']}
              onClick={onOpenModal}
              style={{ border: 'none', cursor: 'pointer', padding: '14px 34px', fontSize: '16px' }}
            >
              Get Started Now
            </button>
            <Link
              to="/Contactus"
              className={z['ai-btn-outline']}
              style={{ padding: '14px 30px', fontSize: '16px', textDecoration: 'none' }}
            >
              Talk to AI Architect
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ padding: '60px 24px 100px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className={z['ai-section-tag']}>CORE EXPERTISE</div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff' }}>
            AI Capabilities That <span className={z['ai-grad-text']}>Drive Results</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {capabilities.map((c, i) => (
            <div
              key={i}
              style={{
                padding: '28px',
                background: 'linear-gradient(160deg, rgba(26, 18, 66, 0.7), rgba(4, 5, 22, 0.8))',
                border: '1px solid rgba(139, 92, 246, 0.35)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', marginBottom: '16px' }}>
                {i + 1}
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '10px' }}>
                {c.title}
              </h3>
              <p style={{ fontSize: '14.5px', color: 'rgba(255, 255, 255, 0.72)', lineHeight: 1.55 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5-Step Process */}
      <section style={{ padding: '80px 24px', background: 'rgba(10, 8, 30, 0.6)', borderTop: '1px solid rgba(139, 92, 246, 0.2)', borderBottom: '1px solid rgba(139, 92, 246, 0.2)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div className={z['ai-section-tag']}>EXECUTION PIPELINE</div>
          <h2 style={{ fontSize: '34px', fontWeight: '800', color: '#fff', marginBottom: '48px' }}>
            From Idea to <span className={z['ai-grad-text']}>Deployed AI</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {['Discover', 'Design', 'Train', 'Deploy', 'Optimize'].map((step, idx) => (
              <div key={idx} style={{ padding: '24px 16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: '800', color: '#39d0ff', letterSpacing: '1px' }}>STEP 0{idx + 1}</span>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: '10px 0 6px' }}>{step}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45 }}>
                  {idx === 0 && 'Identify automation bottlenecks & model requirements'}
                  {idx === 1 && 'Architect neural topologies & data ingestion feeds'}
                  {idx === 2 && 'Hyperparameter convergence & deep fine-tuning'}
                  {idx === 3 && 'Low-latency containerized cloud inference'}
                  {idx === 4 && 'Continuous active learning & feedback loops'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '90px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
            The Future Is Powered By <span className={z['ai-grad-text']}>Artificial Intelligence</span>
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '32px' }}>
            Start building production AI applications today with PyBot Academy's industry experts.
          </p>
          <button
            type="button"
            className={z['ai-btn-primary']}
            onClick={onOpenModal}
            style={{ border: 'none', cursor: 'pointer', padding: '16px 40px', fontSize: '17px' }}
          >
            Join AI Certification Program
          </button>
        </div>
      </section>
    </div>
  );
}
