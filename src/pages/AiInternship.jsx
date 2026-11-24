import React, { useState } from 'react';
import { aiInternStyles as V } from '../data/styles.js';

export default function AiInternship({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const domains = [
    { title: 'Machine Learning', desc: 'Classification, regression, clustering, ensemble models, and scikit-learn.' },
    { title: 'Deep Learning', desc: 'Neural networks, PyTorch, backpropagation, and loss function convergence.' },
    { title: 'Generative AI', desc: 'LLM fine-tuning, LangChain, agent swarms, and prompt architecture.' },
    { title: 'Computer Vision', desc: 'OpenCV image filtering, YOLO object tracking, and feature extraction.' },
    { title: 'Data Science', desc: 'NumPy, Pandas, exploratory data analysis, and predictive modeling.' },
    { title: 'Python Development', desc: 'Data structures, asynchronous APIs, OOP, and script automation.' },
    { title: 'AI Automation', desc: 'Robotic process automation, scheduled batch jobs, and workflow bots.' },
    { title: 'Prompt Engineering', desc: 'Context structuring, few-shot prompting, and deterministic outputs.' }
  ];

  const steps = [
    { num: '01', title: 'Submit Application', desc: 'Fill out your candidate profile and select your preferred AI track.' },
    { num: '02', title: 'Technical Screening', desc: 'Quick baseline evaluation to customize your learning path.' },
    { num: '03', title: 'Secure Enrollment', desc: 'Confirm your batch timings and gain access to our live sandbox.' },
    { num: '04', title: 'Intensive Domain Training', desc: 'Deep dive into theory and practical coding with senior engineers.' },
    { num: '05', title: 'Real-Time Project Work', desc: 'Architect an enterprise-grade AI solution solving real industrial friction.' },
    { num: '06', title: 'Comprehensive Assessment', desc: 'Code review, model optimization check, and performance benchmarks.' },
    { num: '07', title: 'Certification Issuance', desc: 'Receive an industry-recognized, globally verifiable credential.' },
    { num: '08', title: 'Career Deployment', desc: 'Resume marketing, mock interviews, and direct partner referrals.' }
  ];

  const faqs = [
    { q: 'Who can apply for this AI Internship?', a: 'Undergraduate and postgraduate students, fresh engineering graduates, and early-career software developers looking for intensive practical experience.' },
    { q: 'Is this internship recognized by universities?', a: 'Yes! GV DesignTech is an ISO 9001:2015 certified training institute, and our internship credentials and completion letters are accepted for academic credit across colleges.' },
    { q: 'Will I work on live corporate projects?', a: 'Yes! You will work on real industrial datasets and build end-to-end architectures that can be showcased on your GitHub portfolio.' }
  ];

  return (
    <div className={V['ai-page']} style={{ minHeight: '100vh', background: '#04020a', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(139, 92, 246, 0.15)', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '999px', color: '#c084fc', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            CAREER ACCELERATOR
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #c084fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Become Industry Ready with Our<br />AI Internship Program
          </h1>
          <p style={{ maxWidth: '750px', margin: '0 auto 36px', fontSize: '17px', color: '#94a3b8', lineHeight: 1.6 }}>
            Gain real-time experience building machine learning pipelines, fine-tuning LLMs, and deploying AI computer vision systems under the guidance of seasoned tech architects.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={onOpenModal}
              style={{ padding: '14px 38px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 24px rgba(217, 70, 239, 0.35)' }}
            >
              Apply for Internship
            </button>
          </div>
        </div>

        {/* Domains Grid */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Explore Core AI Domains</h2>
            <p style={{ color: '#475569' }}>Select your specialization during the program</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {domains.map((d, i) => (
              <div key={i} style={{ padding: '24px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.6), rgba(6, 6, 24, 0.7))', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '8px' }}>{d.title}</h3>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 8-Step Process */}
        <section style={{ marginBottom: '80px', padding: '40px', background: 'rgba(20, 14, 52, 0.6)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '24px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: '800', textAlign: 'center', marginBottom: '36px' }}>
            The Internship Operational Process
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {steps.map((s, idx) => (
              <div key={idx} style={{ padding: '20px', background: '#ffffff', border: '1px solid rgba(139,92,246,0.2)', borderRadius: '16px' }}>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#22d3ee' }}>{s.num}</span>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', margin: '8px 0 6px' }}>{s.title}</h4>
                <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ maxWidth: '800px', margin: '0 auto 60px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: '700', textAlign: 'center', marginBottom: '32px' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ background: '#ffffff', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '12px', overflow: 'hidden' }}>
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  style={{ width: '100%', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: 'pointer', textAlign: 'left' }}
                >
                  <span>{faq.q}</span>
                  <span style={{ fontSize: '20px', color: '#c084fc', transform: activeFaq === idx ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                {activeFaq === idx && (
                  <div style={{ padding: '0 24px 20px', color: '#475569', fontSize: '14.5px', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
