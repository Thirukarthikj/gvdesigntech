import React, { useState, useEffect, useRef } from 'react';

export default function DataScience({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const canvasRef = useRef(null);

  // Digital matrix / synaptic background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Floating data particles
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.6 + 0.2
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(139, 92, 246, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  const modules = [
    { title: 'Python & Data Wrangling', desc: 'Master modern Python, NumPy, Pandas, automated cleaning loops, and vector operations.' },
    { title: 'Applied Statistics & EDA', desc: 'Probability theory, hypothesis testing, Bayesian analysis, distributions, and statistical modeling.' },
    { title: 'Supervised & Unsupervised ML', desc: 'Linear/Logistic regression, Decision Trees, Random Forests, XGBoost, and KMeans clustering.' },
    { title: 'Deep Learning & Neural Networks', desc: 'Perceptrons, backpropagation, PyTorch architectures, loss optimization, and gradient clipping.' },
    { title: 'Natural Language Processing & LLMs', desc: 'Transformers, BERT, LangChain agents, token embeddings, prompt engineering, and fine-tuning.' },
    { title: 'Computer Vision Systems', desc: 'OpenCV image processing, CNNs, YOLO object detection, image segmentation, and edge AI.' },
    { title: 'Big Data & Cloud Analytics', desc: 'SQL querying, PySpark clusters, AWS S3 / SageMaker data pipelines, and distributed analytics.' },
    { title: 'Production MLOps & Capstone', desc: 'Docker containerization, FastAPI microservices, model tracking with MLflow, and live deployment.' }
  ];

  const faqs = [
    { q: 'Who is this Data Science course for?', a: 'This course is tailored for fresh engineering graduates, software developers, and analytical minds looking to break into high-paying AI, Data Science, and Machine Learning engineering roles.' },
    { q: 'What prerequisites are required?', a: 'Basic mathematics and general computer familiarity. We start with foundational Python and programming fundamentals before moving into advanced neural networks.' },
    { q: 'How does the 100% placement support work?', a: 'Our dedicated placement cell arranges mock technical rounds, algorithmic coding tests, resume ATS optimization, and direct interview referrals to over 150+ hiring partner companies.' },
    { q: 'Is this course available in offline and online modes?', a: 'Yes! We conduct classroom sessions at our modern AI laboratory in Pollachi, Coimbatore, as well as live interactive hybrid online cohorts with 24/7 sandbox lab access.' }
  ];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#050816', color: '#fff', overflow: 'hidden' }}>
      {/* Visual Canvas & Nebula Background */}
      <canvas className="ds3-brain-canvas" ref={canvasRef} />
      <div className="ds3-nebula"></div>
      <div className="stars"></div>

      {/* Futuristic Telemetry HUD Panels */}
      <div className="ds3-hud-panel ds3-hud-tl">
        ▸ NEURAL NET STATUS<br />
        <span style={{ color: '#22d3ee' }}>Model: TransformerXL</span> · Epoch: 1418<br />
        Loss: 0.045 · Acc: 98.0%
      </div>
      <div className="ds3-hud-panel ds3-hud-tr">
        SYNAPSE ACTIVITY ◂<br />
        2,847 nodes active · 14.2k connections<br />
        <span style={{ color: '#a78bfa' }}>Freq: 40 Hz · Layer: Deep Cortex</span>
      </div>
      <div className="ds3-hud-panel ds3-hud-br">
        DATA PIPELINE ◂<br />
        Batch: 512 · LR: 1e-4<br />
        <span style={{ color: '#34d399' }}>GPU: A100 · 97% UTIL</span>
      </div>

      <div className="ds3-floating-widgets">
        <div className="ds3-widget-pill">
          <span className="ds3-w-lbl">MODEL ACCURACY</span>
          <span className="ds3-w-val" style={{ color: '#22d3ee' }}>97.3%</span>
        </div>
        <div className="ds3-widget-pill">
          <span className="ds3-w-lbl">TRAINING LOSS</span>
          <span className="ds3-w-val" style={{ color: '#f472b6' }}>0.043</span>
        </div>
        <div className="ds3-widget-pill">
          <span className="ds3-w-lbl">F1 SCORE</span>
          <span className="ds3-w-val" style={{ color: '#a78bfa' }}>0.961</span>
        </div>
      </div>

      {/* Main Container */}
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1240px', margin: '0 auto', padding: '120px 24px 80px' }}>
        {/* Hero Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: '#c084fc', marginBottom: '20px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22d3ee' }}></span>
            GV DESIGNTECH · DATA SCIENCE PRO
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 20px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Master Data Science<br />&amp; Get Placed in 90 Days
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto 32px', fontSize: '17px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)' }}>
            Industry-aligned curriculum covering Python, Machine Learning, Deep Learning, Generative AI, and Big Data. Build real-world portfolio architectures and secure high-paying placements.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{ padding: '14px 36px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)' }}
            >
              Apply for Next Batch
            </button>
            <a
              href="#curriculum"
              style={{ padding: '14px 32px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '12px', color: '#fff', textDecoration: 'none', fontSize: '16px', fontWeight: '600' }}
            >
              View Curriculum ↓
            </a>
          </div>
        </div>

        {/* 8 Modules Section */}
        <section id="curriculum" style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>
              8 Modules. One Career.
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '16px' }}>
              From foundational programming to autonomous AI agents
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px' }}>
            {modules.map((m, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.6), rgba(6, 6, 24, 0.7))',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)',
                  transition: 'transform 0.25s ease, border-color 0.25s ease'
                }}
              >
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', marginBottom: '16px' }}>
                  0{idx + 1}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#fff' }}>
                  {m.title}
                </h4>
                <p style={{ fontSize: '14px', lineHeight: 1.55, color: 'rgba(255, 255, 255, 0.7)' }}>
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 6-Month Roadmap */}
        <section style={{ marginBottom: '80px', padding: '40px', background: 'rgba(20, 14, 52, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '36px' }}>
            Your 6-Month Journey
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            <div>
              <div style={{ color: '#22d3ee', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 1–2</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Foundations</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Python syntax, computational statistics, linear algebra, SQL databases, and data visual dashboards.
              </p>
            </div>
            <div>
              <div style={{ color: '#a78bfa', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 3–4</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Machine Learning</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Classical predictive algorithms, hyperparameter tuning, model validation matrices, and ensemble pipelines.
              </p>
            </div>
            <div>
              <div style={{ color: '#e879f9', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 5</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Deep Learning &amp; NLP</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                PyTorch networks, CNNs, Recurrent systems, Transformers, LangChain, and Generative AI applications.
              </p>
            </div>
            <div>
              <div style={{ color: '#34d399', fontWeight: '700', fontSize: '13px', marginBottom: '6px' }}>MONTH 6</div>
              <h4 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>Capstone + Placement</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                Industrial client capstone project, Dockerized deployment, portfolio optimization, and interview drives.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section style={{ maxWidth: '800px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '32px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '18px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#c084fc', transform: activeFaq === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>
                    +
                  </span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 24px 20px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '14.5px', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Banner */}
        <div style={{ textAlign: 'center', padding: '48px', background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(217,70,239,0.2))', border: '1px solid rgba(217,70,239,0.4)', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '700', marginBottom: '12px' }}>
            Your Data Science Career Starts Today
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px', fontSize: '16px' }}>
            Limited seats per cohort to guarantee personalized mentorship and hands-on lab infrastructure.
          </p>
          <button
            type="button"
            onClick={onOpenModal}
            style={{ padding: '14px 38px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}
          >
            Enroll in Data Science Track
          </button>
        </div>
      </div>
    </div>
  );
}
