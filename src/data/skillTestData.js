// Starter Skill Test Questions & Domains Catalog
// Admin can edit, add, or delete any question in the Admin Panel
export const initialSkillDomains = [
  { key: 'cad', label: 'Mechanical CAD & Automobile', icon: '⚙️', desc: 'AutoCAD, SolidWorks, CATIA, GD&T, 3D Modeling' },
  { key: 'civil', label: 'Civil Engineering & Structural BIM', icon: '🏛️', desc: 'Revit BIM, AutoCAD Civil 3D, Structural Detailing' },
  { key: 'cnc', label: 'CNC Programming & CAM', icon: '🔧', desc: 'G-Code, M-Code, MasterCAM, Multi-Axis Machining' },
  { key: 'cs', label: 'Computer Science & Full Stack IT', icon: '💻', desc: 'Data Structures, React, Node.js, Python, Databases' },
  { key: 'eee', label: 'EEE & Industrial Automation', icon: '⚡', desc: 'PLC, SCADA, MATLAB Simulink, Circuit Design' },
  { key: 'ai', label: 'AI & Data Science', icon: '🧠', desc: 'Machine Learning, Deep Learning, PyTorch, Neural Nets' }
];

export const initialSkillQuestions = [
  // Mechanical CAD
  {
    id: 'stq-cad-1',
    domain: 'cad',
    category: 'Mechanical CAD & Automobile',
    question: 'Which projection system is standardized by ISO across European engineering manufacturing drawings?',
    options: [
      'First Angle Projection',
      'Third Angle Projection',
      'Isometric Projection',
      'Oblique Projection'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Intermediate',
    explanation: 'First Angle Projection is standardized by ISO and universally adopted across European & Indian engineering standards.'
  },
  {
    id: 'stq-cad-2',
    domain: 'cad',
    category: 'Mechanical CAD & Automobile',
    question: 'What does the standard GD&T feature control frame symbol ⌖ represent?',
    options: [
      'True Position',
      'Concentricity',
      'Perpendicularity',
      'Circular Runout'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Intermediate',
    explanation: 'The circle with crosshairs ⌖ represents True Position, controlling location deviation of features.'
  },
  {
    id: 'stq-cad-3',
    domain: 'cad',
    category: 'Mechanical CAD & Automobile',
    question: 'In parametric 3D CAD sketch modeling (SolidWorks / CATIA), what indicates a "Fully Defined" sketch?',
    options: [
      'All geometry turns black, fully constrained by explicit dimensions and geometric relations',
      'All lines are converted to dotted construction guidelines',
      'The 2D profile has been extruded into a 3D solid body',
      'The sketch is imported from an external neutral STEP or IGES file'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Beginner',
    explanation: 'A fully defined sketch has zero degrees of freedom left, bounded completely by dimensions and geometric constraints.'
  },

  // Civil BIM
  {
    id: 'stq-civil-1',
    domain: 'civil',
    category: 'Civil Engineering & Structural BIM',
    question: 'In Building Information Modeling (BIM), what is the key characteristic of Level 2 BIM?',
    options: [
      'Collaborative 3D modeling where each discipline works in their own 3D model within a Common Data Environment (CDE)',
      'Flat 2D drafting with traditional paper drawing exchanges only',
      'Complete unified cloud single-model digital twin lifecycle integration',
      'Solely photorealistic architectural rendering without structural parameters'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Intermediate',
    explanation: 'BIM Level 2 entails discipline-specific 3D models exchanged collaboratively via common file standards (IFC/CDE).'
  },
  {
    id: 'stq-civil-2',
    domain: 'civil',
    category: 'Civil Engineering & Structural BIM',
    question: 'What is the characteristic 28-day compressive cube strength for standard M25 grade concrete?',
    options: [
      '25 N/mm²',
      '20 N/mm²',
      '30 N/mm²',
      '15 N/mm²'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Beginner',
    explanation: 'The number in concrete grade designations (e.g. M25) designates its characteristic compressive strength at 28 days in N/mm².'
  },

  // CNC Programming
  {
    id: 'stq-cnc-1',
    domain: 'cnc',
    category: 'CNC Programming & CAM',
    question: 'In standard Fanuc/ISO G-Code CNC milling programming, which G-code commands linear interpolation at a programmed feed rate?',
    options: [
      'G01',
      'G00',
      'G02',
      'G03'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Beginner',
    explanation: 'G01 commands cutting feed movement in a straight line, while G00 commands rapid non-cutting positioning.'
  },

  // Computer Science & IT
  {
    id: 'stq-cs-1',
    domain: 'cs',
    category: 'Computer Science & Full Stack IT',
    question: 'Which of the following built-in collection data structures in Python is immutable?',
    options: [
      'Tuple',
      'List',
      'Set',
      'Dictionary'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Beginner',
    explanation: 'Tuples cannot be altered after creation, making them immutable in Python.'
  },

  // AI & Data Science
  {
    id: 'stq-ai-1',
    domain: 'ai',
    category: 'AI & Data Science',
    question: 'Which popular neural network regularization technique randomly deactivates neurons during forward training passes to curb overfitting?',
    options: [
      'Dropout',
      'Batch Normalization',
      'Gradient Clipping',
      'Weight Decay'
    ],
    correctAnswer: 0,
    marks: 1,
    difficulty: 'Intermediate',
    explanation: 'Dropout randomly zeroes out a fraction of node activations per update iteration to prevent co-adaptation of features.'
  }
];
