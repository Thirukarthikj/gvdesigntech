import React, { useState } from 'react';
import { pestStyles as J } from '../data/styles.js';

export default function SkillTest() {
  const [selectedDomain, setSelectedDomain] = useState('cad');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAns, setSelectedAns] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [testStarted, setTestStarted] = useState(false);

  const testData = {
    cad: [
      { q: 'Which projection method is standard in European engineering drawings?', options: ['First Angle Projection', 'Third Angle Projection', 'Isometric Projection', 'Oblique Projection'], correct: 0 },
      { q: 'What does the GD&T symbol ⌖ represent?', options: ['True Position', 'Concentricity', 'Perpendicularity', 'Runout'], correct: 0 },
      { q: 'In parametric CAD, what is a fully defined sketch?', options: ['All geometry is constrained by dimensions and geometric relations', 'All lines are converted to construction lines', 'A 3D solid is already extruded', 'An imported DXF drawing'], correct: 0 },
      { q: 'Which FEA element type is best suited for thin-walled sheet metal structures?', options: ['2D Shell Elements', 'Solid Tetrahedral Elements', '1D Beam Elements', 'Hexahedral Brick Elements'], correct: 0 }
    ],
    civil: [
      { q: 'What does BIM Level 2 primarily entail?', options: ['Collaborative 3D working with separate discipline models in common data environments', '2D drafting only', 'Complete cloud digital twin integration', 'Paper-based blueprint exchange'], correct: 0 },
      { q: 'In structural design using STAAD.Pro, what is P-Delta analysis?', options: ['Second-order geometric non-linear analysis under axial and lateral loads', 'Linear static gravity analysis', 'Thermal load expansion test', 'Dynamic seismic spectrum only'], correct: 0 },
      { q: 'What is the standard characteristic compressive strength of M25 concrete at 28 days?', options: ['25 N/mm²', '20 N/mm²', '30 N/mm²', '15 N/mm²'], correct: 0 }
    ],
    python: [
      { q: 'Which of the following data structures in Python is immutable?', options: ['List', 'Set', 'Tuple', 'Dictionary'], correct: 2 },
      { q: 'What is the output of bool([]) in Python?', options: ['True', 'False', 'None', 'Error'], correct: 1 },
      { q: 'Which keyword is used for creating anonymous functions in Python?', options: ['def', 'lambda', 'func', 'anonymous'], correct: 1 },
      { q: 'What does the GIL (Global Interpreter Lock) in CPython do?', options: ['Ensures multi-core parallel execution', 'Allows only one thread to execute Python bytecode at a time', 'Locks disk I/O operations', 'Optimizes memory garbage collection'], correct: 1 }
    ],
    ai: [
      { q: 'Which activation function is most prone to the vanishing gradient problem?', options: ['ReLU', 'Sigmoid', 'Leaky ReLU', 'GELU'], correct: 1 },
      { q: 'What does the attention mechanism in Transformers calculate?', options: ['Weights between all pairs of input tokens', 'Gradient descent step size', 'Image pixel convolution kernel', 'Batch normalization mean'], correct: 0 },
      { q: 'Which metric is best suited for an imbalanced classification problem?', options: ['Accuracy', 'F1-Score / PR-AUC', 'Mean Absolute Error', 'R-Squared'], correct: 1 },
      { q: 'What technique prevents neural networks from overfitting during training?', options: ['Dropout', 'Increasing epochs', 'Removing validation data', 'Using zero learning rate'], correct: 0 }
    ]
  };

  const questions = testData[selectedDomain] || testData.cad;

  const handleSelectOption = (idx) => {
    setSelectedAns({ ...selectedAns, [currentQ]: idx });
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setIsFinished(true);
    }
  };

  const score = Object.entries(selectedAns).reduce((acc, [qIdx, ansIdx]) => {
    return acc + (questions[qIdx]?.correct === ansIdx ? 1 : 0);
  }, 0);

  const resetTest = () => {
    setSelectedAns({});
    setCurrentQ(0);
    setIsFinished(false);
    setTestStarted(false);
  };

  return (
    <div className={J['mi-page']} style={{ minHeight: '100vh', background: '#04020a', color: '#fff', padding: '140px 24px 80px' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-block', padding: '6px 18px', background: 'rgba(217, 70, 239, 0.15)', border: '1px solid rgba(217, 70, 239, 0.4)', borderRadius: '999px', color: '#f472b6', fontSize: '13px', fontWeight: '700', letterSpacing: '1px', marginBottom: '16px' }}>
            SKILL TEST — GV DESIGNTECH BENCHMARK
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: '800', lineHeight: 1.15, margin: '0 0 16px', background: 'linear-gradient(135deg, #ffffff 40%, #e879f9 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            GV DesignTech Technical Assessment<br />P.S.T
          </h1>
          <p style={{ maxWidth: '680px', margin: '0 auto', fontSize: '16.5px', color: '#94a3b8', lineHeight: 1.6 }}>
            Benchmark your engineering design skills with an industry-standard technical assessment. Test your knowledge in Mechanical CAD, Civil BIM, and Modern Software Engineering.
          </p>
        </div>

        {!testStarted ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>Choose Your Assessment Track</h2>
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { key: 'cad', label: 'Mechanical CAD & CAE', icon: '⚙️' },
                  { key: 'civil', label: 'Civil BIM & Structural', icon: '🏛️' },
                  { key: 'python', label: 'Python Automation', icon: '🐍' },
                  { key: 'ai', label: 'AI & Data Science', icon: '🧠' }
                ].map((t) => (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setSelectedDomain(t.key)}
                    style={{
                      padding: '16px 28px',
                      borderRadius: '16px',
                      border: '1px solid',
                      borderColor: selectedDomain === t.key ? '#d946ef' : 'rgba(139, 92, 246, 0.3)',
                      background: selectedDomain === t.key ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(217,70,239,0.3))' : 'rgba(255,255,255,0.03)',
                      color: '#fff',
                      fontSize: '15px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{t.icon}</span>
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '36px' }}>
              <button
                type="button"
                onClick={() => setTestStarted(true)}
                style={{
                  padding: '16px 48px',
                  background: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
                  border: 'none',
                  borderRadius: '14px',
                  color: '#fff',
                  fontSize: '17px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(217, 70, 239, 0.4)'
                }}
              >
                Start Assessment Now →
              </button>
            </div>
          </div>
        ) : !isFinished ? (
          /* Active Question */
          <div style={{ maxWidth: '680px', margin: '0 auto', padding: '36px', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.8), rgba(6, 6, 24, 0.9))', border: '1px solid rgba(139, 92, 246, 0.4)', borderRadius: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#22d3ee' }}>
                QUESTION {currentQ + 1} OF {questions.length}
              </span>
              <span style={{ fontSize: '12px', padding: '4px 10px', background: '#ffffff', borderRadius: '999px' }}>
                Domain: {selectedDomain.toUpperCase()}
              </span>
            </div>

            <h3 style={{ fontSize: '20px', fontWeight: '700', lineHeight: 1.4, marginBottom: '24px', color: '#fff' }}>
              {questions[currentQ].q}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {questions[currentQ].options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelectOption(oIdx)}
                  style={{
                    padding: '14px 20px',
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: selectedAns[currentQ] === oIdx ? '#d946ef' : 'rgba(255,255,255,0.15)',
                    background: selectedAns[currentQ] === oIdx ? 'rgba(217, 70, 239, 0.2)' : 'rgba(255,255,255,0.03)',
                    color: '#fff',
                    fontSize: '15px',
                    fontWeight: '500',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ marginRight: '10px', color: '#a78bfa', fontWeight: '700' }}>
                    {String.fromCharCode(65 + oIdx)}.
                  </span>
                  {opt}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={resetTest}
                style={{ background: 'none', border: 'none', color: '#475569', cursor: 'pointer', fontSize: '14px' }}
              >
                Quit Assessment
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={selectedAns[currentQ] === undefined}
                style={{
                  padding: '12px 32px',
                  background: selectedAns[currentQ] !== undefined ? 'linear-gradient(135deg, #8b5cf6, #d946ef)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '10px',
                  color: selectedAns[currentQ] !== undefined ? '#fff' : 'rgba(255,255,255,0.4)',
                  fontSize: '15px',
                  fontWeight: '700',
                  cursor: selectedAns[currentQ] !== undefined ? 'pointer' : 'not-allowed'
                }}
              >
                {currentQ === questions.length - 1 ? 'Finish Test' : 'Next Question →'}
              </button>
            </div>
          </div>
        ) : (
          /* Finished Screen */
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', textAlign: 'center', background: 'linear-gradient(160deg, rgba(30, 22, 68, 0.9), rgba(6, 6, 24, 0.95))', border: '1px solid #22d3ee', borderRadius: '24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏆</div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Test Completed!</h2>
            <p style={{ color: '#475569', fontSize: '15px', marginBottom: '24px' }}>
              Your Score: <strong style={{ color: '#39d0ff', fontSize: '24px' }}>{score} / {questions.length}</strong>
            </p>
            <p style={{ fontSize: '14px', color: '#34d399', background: 'rgba(52, 211, 153, 0.15)', padding: '12px', borderRadius: '10px', marginBottom: '28px' }}>
              {score >= questions.length * 0.75 ? '🎉 Outstanding! You qualify for GV DesignTech Advanced Placement fast-tracking!' : 'Good attempt! Explore our training programs to level up.'}
            </p>
            <button
              type="button"
              onClick={resetTest}
              style={{ padding: '12px 30px', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', border: 'none', borderRadius: '10px', color: '#fff', fontSize: '15px', fontWeight: '700', cursor: 'pointer' }}
            >
              Take Another Test
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
