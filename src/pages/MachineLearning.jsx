import React from 'react';
import { mlStyles as B } from '../data/styles.js';

export default function MachineLearning({ onOpenModal }) {
  const capabilities = [
    { title: 'Supervised Learning', desc: 'Predictive regression, categorical classification, support vector machines, and ensemble trees.' },
    { title: 'Unsupervised Learning', desc: 'Customer clustering, anomaly detection, PCA dimensionality reduction, and pattern discovery.' },
    { title: 'Reinforcement Learning', desc: 'Policy gradients, Q-learning agents, game optimization, and automated robotic control.' },
    { title: 'Deep Neural Networks', desc: 'Multi-layer perceptrons, backpropagation gradients, CNNs, and recurrent LSTM architectures.' },
    { title: 'Computer Vision', desc: 'OpenCV image filtering, facial identification, YOLO bounding boxes, and image segmentation.' },
    { title: 'Natural Language Processing', desc: 'Text classification, BERT sentiment analysis, tokenizers, and sequence embeddings.' }
  ];

  const pipeline = [
    { step: '01', title: 'Data Ingestion', desc: 'Clean, normalize, and augment raw training samples.' },
    { step: '02', title: 'Feature Engineering', desc: 'Extract high-signal variables and remove multicollinearity.' },
    { step: '03', title: 'Model Training', desc: 'Cross-validated hyperparameter optimization and loss convergence.' },
    { step: '04', title: 'Validation', desc: 'Precision, Recall, ROC-AUC, and F1-score evaluation.' },
    { step: '05', title: 'Containerization', desc: 'Docker encapsulation and low-latency API packaging.' },
    { step: '06', title: 'Production Monitoring', desc: 'Telemetry tracking for model drift and automated retraining.' }
  ];

  return (
    <div className={B['ml-page']}>
      {/* Hero */}
      <section style={{ padding: '140px 24px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className={B['ml-section-label']}>MACHINE LEARNING SPECIALIZATION</div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 68px)', fontWeight: '800', lineHeight: 1.15, margin: '20px 0', color: '#fff' }}>
            Machine Learning Solutions for <span className={B['ml-grad-text']}>Smarter Business &amp; Growth</span>
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto 36px', fontSize: '18px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.78)' }}>
            Design, fine-tune, and deploy predictive systems that extract deep structural foresight from complex data streams.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{
                padding: '14px 36px',
                background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)'
              }}
            >
              Enroll in ML Bootcamp
            </button>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section style={{ padding: '60px 24px 80px', maxWidth: '1240px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div className={B['ml-section-label']}>CAPABILITIES</div>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#fff' }}>
            Core <span className={B['ml-grad-text']}>Machine Learning Capabilities</span>
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

      {/* Pipeline */}
      <section style={{ padding: '80px 24px', background: 'rgba(10, 8, 30, 0.6)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div className={B['ml-section-label']}>METHODOLOGY</div>
          <h2 style={{ fontSize: '34px', fontWeight: '800', color: '#fff', marginBottom: '48px' }}>
            The Complete <span className={B['ml-grad-text']}>ML Pipeline</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
            {pipeline.map((p, idx) => (
              <div key={idx} style={{ padding: '24px 16px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px' }}>
                <span style={{ fontSize: '24px', fontWeight: '800', color: '#d946ef' }}>{p.step}</span>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: '10px 0 6px' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.45 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
