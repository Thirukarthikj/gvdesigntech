import { CourseCategory } from '../types';

export const COURSE_CATEGORIES: CourseCategory[] = [
  {
    id: 'cs-it',
    slug: 'computer-science-it',
    title: 'Computer Science & IT',
    tagline: 'Modern Programming, Web Architecture & Data Fundamentals',
    shortDescription: 'From core programming languages to modern frontend engineering and database architecture, master the technical skills driving today’s software development industry.',
    detailedDescription: 'Our Computer Science and Information Technology curriculum provides structured, hands-on instruction in algorithmic thinking, object-oriented systems, backend frameworks, and responsive frontend design. Whether you are building your first program or preparing for technical career challenges, our courses emphasize code quality, practical exercises, and problem-solving.',
    heroImage: '/images/courses/software-dev-hero.jpg',
    thumbnailImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    accentColor: 'blue',
    iconName: 'Code',
    courseCountNote: '8 Focused Courses',
    courses: [
      {
        id: 'c-programming',
        name: 'C Programming',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Master memory management, pointers, and foundational computation principles with structured C programming.',
        overview: 'C is the foundational language of modern computer systems. This course emphasizes procedural logic, memory pointers, struct definitions, file handling, and efficient algorithm implementation.',
        keyTopics: [
          'Data Types, Operators & Flow Control',
          'Functions, Recursion & Scope',
          'Arrays & String Manipulation',
          'Pointers & Dynamic Memory Allocation',
          'Structures, Unions & File I/O'
        ],
        softwareCovered: ['GCC / Clang Compiler', 'VS Code', 'Code::Blocks'],
        recommendedFor: ['Computer Science Students', 'Diploma Engineering Students', 'Beginners in Programming'],
        learningOutcomes: [
          'Understand low-level computer memory mechanics',
          'Write efficient, structured procedural code',
          'Build strong logical problem-solving foundations'
        ]
      },
      {
        id: 'cpp-programming',
        name: 'C++',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Advance your computational skills with Object-Oriented Programming (OOP) and the Standard Template Library in C++.',
        overview: 'C++ brings high performance and object-oriented abstractions. Learn encapsulation, inheritance, polymorphism, templates, and resource management.',
        keyTopics: [
          'Object-Oriented Architecture & Classes',
          'Constructors, Destructors & Encapsulation',
          'Inheritance & Polymorphism',
          'Templates & Exception Handling',
          'Standard Template Library (STL) Containers & Iterators'
        ],
        softwareCovered: ['Modern C++ Compilers', 'VS Code', 'MinGW'],
        recommendedFor: ['Engineering Graduates', 'Game Development Enthusiasts', 'System Software Aspirants'],
        learningOutcomes: [
          'Design modular and reusable object-oriented systems',
          'Utilize STL algorithms and data structures effectively',
          'Prepare for advanced technical interviews and projects'
        ]
      },
      {
        id: 'java',
        name: 'Java',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Build robust, platform-independent enterprise applications with Core and Advanced Java concepts.',
        overview: 'Java powers scalable enterprise solutions, Android systems, and backend platforms worldwide. Learn the JVM ecosystem, multi-threading, collections framework, and JDBC database connectivity.',
        keyTopics: [
          'Core Java Syntax & OOP Principles',
          'Java Virtual Machine (JVM) Architecture',
          'Exception Handling & Multithreading',
          'Java Collections Framework (List, Set, Map)',
          'JDBC Database Connectivity & File Processing'
        ],
        softwareCovered: ['JDK 17+', 'IntelliJ IDEA / Eclipse', 'MySQL Connector'],
        recommendedFor: ['IT & CS Undergraduates', 'Backend Aspirants', 'Career Starters'],
        learningOutcomes: [
          'Develop modular, multi-threaded Java applications',
          'Connect Java business logic to SQL databases',
          'Build practical desktop and console-based enterprise utilities'
        ]
      },
      {
        id: 'python',
        name: 'Python',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Learn one of the most versatile and in-demand programming languages for scripting, automation, and web development.',
        overview: 'Python offers clean syntax and powerful standard libraries. Explore procedural and object-oriented paradigms, data analysis libraries, file automation, and scripting workflows.',
        keyTopics: [
          'Python Fundamentals, Data Types & Data Structures',
          'Functions, Modules & Package Management',
          'Object-Oriented Programming in Python',
          'File Automation & Regex Processing',
          'Working with External APIs & Data Formats (JSON/CSV)'
        ],
        softwareCovered: ['Python 3.x', 'VS Code', 'PyCharm Community'],
        recommendedFor: ['All Technical Disciplines', 'Data Aspirants', 'Automation Enthusiasts'],
        learningOutcomes: [
          'Automate repetitive computational and file workflows',
          'Develop modular object-oriented Python scripts',
          'Establish the prerequisite foundation for web frameworks'
        ]
      },
      {
        id: 'django',
        name: 'Django',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Develop production-ready, secure web applications with Python’s premier high-level web framework.',
        overview: 'Django follows the Model-View-Template (MVT) pattern for rapid, secure web development. Learn authentication, ORM database modeling, routing, forms, and admin interface customization.',
        keyTopics: [
          'Django Architecture & Project Structure',
          'MVT (Model-View-Template) Pattern',
          'Django ORM Database Modeling & Migrations',
          'User Authentication & Session Management',
          'RESTful API Principles & Form Validation'
        ],
        softwareCovered: ['Django Framework', 'SQLite / MySQL', 'Postman'],
        recommendedFor: ['Python Learners', 'Full-Stack Developers', 'Web Application Builders'],
        learningOutcomes: [
          'Construct complete database-driven web applications',
          'Implement secure user authentication and permissions',
          'Integrate frontend templates with backend database ORM'
        ]
      },
      {
        id: 'mysql',
        name: 'MySQL',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Master relational database design, complex SQL queries, index optimization, and data integrity.',
        overview: 'Data powers modern applications. Learn relational database management systems (RDBMS), normalization, complex joins, subqueries, stored procedures, and transaction management.',
        keyTopics: [
          'Relational Database Concepts & Schema Design',
          'DDL, DML, and DQL Syntax Mastery',
          'Table Relationships, Foreign Keys & Normalization',
          'Complex Joins, Subqueries & Aggregations',
          'Indexing, Constraints & Data Integrity'
        ],
        softwareCovered: ['MySQL Server', 'MySQL Workbench', 'phpMyAdmin'],
        recommendedFor: ['Database Administrators', 'Software Developers', 'IT Professionals'],
        learningOutcomes: [
          'Design normalized schemas for complex real-world data',
          'Write high-performance SQL queries and multi-table joins',
          'Ensure transactional reliability and data consistency'
        ]
      },
      {
        id: 'html',
        name: 'HTML',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Understand modern semantic markup, accessibility fundamentals, and the core structural backbone of the web.',
        overview: 'HTML5 is the universal document model of the internet. Learn semantic structuring, form validation, accessible metadata, media embedding, and document hierarchy.',
        keyTopics: [
          'HTML5 Semantic Document Architecture',
          'Form Elements, Input Types & Client Validation',
          'Multimedia Integration (Audio, Video, Canvas)',
          'Web Accessibility (ARIA) Best Practices',
          'Meta Tags, SEO Basics & Document Linking'
        ],
        softwareCovered: ['VS Code', 'Modern Web Browsers', 'Developer Tools'],
        recommendedFor: ['Web Design Starters', 'Content Creators', 'Frontend Beginners'],
        learningOutcomes: [
          'Write clean, standards-compliant semantic HTML5',
          'Structure accessible content for web search and screen readers',
          'Build responsive form layouts ready for styling and scripting'
        ]
      },
      {
        id: 'frontend-development',
        name: 'Frontend Development',
        categorySlug: 'computer-science-it',
        categoryName: 'Computer Science & IT',
        shortDescription: 'Combine HTML, CSS styling, responsive layout systems, and interactive JavaScript to build modern web interfaces.',
        overview: 'Transform static designs into interactive, responsive digital experiences. Master CSS Flexbox, Grid, DOM manipulation, responsive breakpoints, and client-side web behavior.',
        keyTopics: [
          'CSS3 Modern Layouts: Flexbox & CSS Grid',
          'Responsive Design & Media Queries',
          'JavaScript DOM Manipulation & Event Handling',
          'CSS Animations, Transitions & UI Feedback',
          'Frontend Best Practices & Cross-Browser Consistency'
        ],
        softwareCovered: ['HTML5 & CSS3', 'JavaScript (ES6+)', 'VS Code', 'Browser DevTools'],
        recommendedFor: ['Aspiring Web Developers', 'Graphic Designers Entering Web', 'Graduates'],
        learningOutcomes: [
          'Build responsive layouts that look great on mobile and desktop',
          'Implement dynamic interactive elements using JavaScript',
          'Translate visual design mockups into functional web pages'
        ]
      }
    ]
  },
  {
    id: 'multimedia-graphic-design',
    slug: 'multimedia-graphic-design',
    title: 'Multimedia & Graphic Design',
    tagline: 'Visual Identity, Interface Design & User-Centric Experiences',
    shortDescription: 'Master industry-standard creative tools including Figma, Photoshop, Illustrator, and XD to craft compelling branding, visual assets, and digital user interfaces.',
    detailedDescription: 'Visual communication is at the core of digital products and marketing. Our Multimedia and Graphic Design track provides hands-on practical training in vector illustration, photo retouching, UI wireframing, interactive prototyping, and user experience methodologies.',
    heroImage: '/images/courses/graphic-design-hero.jpg',
    thumbnailImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    accentColor: 'amber',
    iconName: 'PenTool',
    courseCountNote: '5 Focused Courses',
    courses: [
      {
        id: 'adobe-photoshop',
        name: 'Adobe Photoshop',
        categorySlug: 'multimedia-graphic-design',
        categoryName: 'Multimedia & Graphic Design',
        shortDescription: 'Master raster image editing, photo manipulation, colour grading, layer masking, and digital asset preparation.',
        overview: 'Photoshop is the industry benchmark for digital imagery. Learn non-destructive editing workflows, selection precision, retouching techniques, compositing, and preparation for print and web.',
        keyTopics: [
          'Layers, Adjustment Layers & Non-Destructive Masking',
          'Advanced Selection & Path Tools',
          'Photo Retouching & Restoration Techniques',
          'Color Correction, Grading & Blending Modes',
          'Banner Design, Typography & Asset Exporting'
        ],
        softwareCovered: ['Adobe Photoshop CC', 'Adobe Camera Raw'],
        recommendedFor: ['Creative Aspirants', 'Photographers', 'Digital Marketers', 'Students'],
        learningOutcomes: [
          'Create professional photo manipulations and composites',
          'Master color adjustments and image retouching workflows',
          'Produce high-resolution creative visuals for digital and print media'
        ]
      },
      {
        id: 'adobe-xd',
        name: 'Adobe XD',
        categorySlug: 'multimedia-graphic-design',
        categoryName: 'Multimedia & Graphic Design',
        shortDescription: 'Design user experience layouts, wireframes, and interactive screen transitions for mobile and web applications.',
        overview: 'Adobe XD provides a dedicated environment for screen design and prototyping. Learn repeat grids, artboard management, auto-animate micro-interactions, and design specification exports.',
        keyTopics: [
          'Artboard Systems & UI Grid Alignment',
          'Repeat Grids, Components & States',
          'Auto-Animate & Interactive Screen Flows',
          'Responsive Resize & Mobile Layouts',
          'Design Handoff & Developer Specifications'
        ],
        softwareCovered: ['Adobe XD'],
        recommendedFor: ['UI/UX Designers', 'Web Designers', 'Mobile App Concept Developers'],
        learningOutcomes: [
          'Create interactive prototypes demonstrating user flows',
          'Design consistent component-based screen systems',
          'Prepare clickable mobile app concepts for presentation'
        ]
      },
      {
        id: 'figma',
        name: 'Figma',
        categorySlug: 'multimedia-graphic-design',
        categoryName: 'Multimedia & Graphic Design',
        shortDescription: 'Learn the collaborative design platform powering today’s modern software product teams.',
        overview: 'Figma is the leading collaborative interface design tool. Master Auto Layout, component variants, design tokens, responsive constraints, and design system foundations.',
        keyTopics: [
          'Frames, Vector Networks & Constraints',
          'Auto Layout 5.0 & Responsive Component Sizing',
          'Components, Variants & Property Controls',
          'Interactive Prototyping, Smart Animate & Variables',
          'Building Reusable Design Systems & Style Guides'
        ],
        softwareCovered: ['Figma Web & Desktop App'],
        recommendedFor: ['Product Designers', 'UI Engineers', 'Tech Graduates'],
        learningOutcomes: [
          'Construct responsive, flexible UI screens using Auto Layout',
          'Build scalable design systems with reusable components and tokens',
          'Prototype real-time interactive digital application flows'
        ]
      },
      {
        id: 'ui-ux-design',
        name: 'UI/UX Design',
        categorySlug: 'multimedia-graphic-design',
        categoryName: 'Multimedia & Graphic Design',
        shortDescription: 'Learn user research principles, wireframing, information architecture, usability testing, and visual hierarchy.',
        overview: 'Go beyond visual aesthetics to understand how users interact with digital products. Study user personas, empathy mapping, user journeys, wireframing, visual hierarchy, and usability evaluation.',
        keyTopics: [
          'UX Fundamentals: User Research & Persona Creation',
          'Information Architecture & User Flow Mapping',
          'Low-Fidelity Sketching to High-Fidelity Wireframes',
          'Visual Hierarchy, Color Psychology & Typography Systems',
          'Usability Testing, Heuristic Evaluation & Iteration'
        ],
        softwareCovered: ['Figma', 'Miro / FigJam', 'Balsamiq Concepts'],
        recommendedFor: ['Anyone interested in Product Design', 'Developers', 'Creative Students'],
        learningOutcomes: [
          'Conduct structured user research and identify user friction',
          'Transform abstract requirements into intuitive digital workflows',
          'Design polished interfaces grounded in sound usability principles'
        ]
      },
      {
        id: 'adobe-illustrator',
        name: 'Adobe Illustrator',
        categorySlug: 'multimedia-graphic-design',
        categoryName: 'Multimedia & Graphic Design',
        shortDescription: 'Master precision vector graphics, logo creation, branding assets, typography, and scalable illustration.',
        overview: 'Vector artwork scales infinitely without quality loss. Master the Pen tool, Pathfinder operations, shape builders, typography styling, color swatches, and vector branding packages.',
        keyTopics: [
          'Precision Vector Paths & The Pen Tool Mastery',
          'Shape Builder & Pathfinder Boolean Operations',
          'Typography Pairing, Text Formatting & Lettering',
          'Color Harmonies, Gradients & Pattern Creation',
          'Logo Design, Vector Icons & Print Export Formats'
        ],
        softwareCovered: ['Adobe Illustrator CC'],
        recommendedFor: ['Brand Designers', 'Graphic Illustrators', 'Marketing Creatives'],
        learningOutcomes: [
          'Design mathematically precise vector logos and brand assets',
          'Produce vector illustrations and scalable iconography',
          'Prepare print-ready vector files with correct color profiles'
        ]
      }
    ]
  },
  {
    id: 'mechanical-automobile',
    slug: 'mechanical-automobile',
    title: 'Mechanical & Automobile',
    tagline: 'Parametric CAD, Mechanical Assemblies & Precision Manufacturing',
    shortDescription: 'Industry-standard mechanical computer-aided design (CAD), 3D parametric modelling, engineering drawings, CAM manufacturing toolpaths, and GD&T.',
    detailedDescription: 'Engineering demands precision. GV DESIGN TECH provides deep practical training in mechanical drafting, parametric 3D modeling, assembly design, sheet metal, surface modeling, CAM machining simulations, Geometric Dimensioning & Tolerancing (GD&T), and Reverse Engineering.',
    heroImage: '/images/cad-design-light.jpg',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    accentColor: 'indigo',
    iconName: 'Cpu',
    courseCountNote: '8 Specialized Courses',
    courses: [
      {
        id: 'autocad-mechanical',
        name: 'AutoCAD',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Master 2D engineering drafting, geometric construction, dimensioning standards, and machine component layouts.',
        overview: 'AutoCAD is the global standard for technical drawings. Learn coordinate systems, drawing commands, layer standards, orthographic views, sectioning, dimensioning, and plotting.',
        keyTopics: [
          'Coordinate Systems & Precision Drafting Commands',
          'Layer Management, Line Types & Dimension Styles',
          'Orthographic Projections & Isometric Views',
          'Sectional Views, Details & Hatching Standards',
          'Assembly Drawings, Bills of Materials (BOM) & Plotting'
        ],
        softwareCovered: ['AutoCAD Mechanical'],
        recommendedFor: ['Mechanical Engineers', 'Diploma Holders', 'Drafting Technicians'],
        learningOutcomes: [
          'Create production-standard 2D engineering drawings',
          'Interpret and construct multi-view mechanical projections',
          'Generate professional drafting sheets with title blocks'
        ]
      },
      {
        id: 'solidworks',
        name: 'SolidWorks',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Parametric 3D solid modelling, part design, mechanical assemblies, and engineering drawing generation.',
        overview: 'SolidWorks is widely used in automotive and industrial product design. Learn sketch-driven parametric features, complex assemblies with mating conditions, sheet metal, and drawing automation.',
        keyTopics: [
          '2D Sketch Constraints & Parametric Dimensions',
          'Extrude, Revolve, Sweep & Loft Solid Features',
          'Assembly Design & Advanced Mating Conditions',
          'Exploded Views & Collision Detection',
          'Production Drawing Generation & Detailing'
        ],
        softwareCovered: ['SolidWorks Design Suite'],
        recommendedFor: ['Product Designers', 'Automobile Engineers', 'CAD Modelers'],
        learningOutcomes: [
          'Build parametric 3D parts and complex multi-component assemblies',
          'Check mechanical interference and motion behavior',
          'Automate detailed 2D production drawings directly from 3D models'
        ]
      },
      {
        id: 'creo-ptc',
        name: 'Creo PTC',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Master robust parametric part design, complex surface features, and manufacturing-ready engineering assemblies.',
        overview: 'Creo (formerly Pro/ENGINEER) is a powerhouse in heavy engineering and automotive sectors. Master feature-based parametric modeling, family tables, flexible modeling, and mechanism analysis.',
        keyTopics: [
          'Parametric Sketching & Datum References',
          'Part Modeling Features & Family Tables',
          'Surface Modeling Basics & Blends',
          'Assembly Constraints & Sub-Assembly Hierarchy',
          'Mechanism Dynamics & Kinematic Simulation'
        ],
        softwareCovered: ['PTC Creo Parametric'],
        recommendedFor: ['Automotive Engineers', 'Manufacturing Designers', 'Engineering Students'],
        learningOutcomes: [
          'Model robust parametric engineering components',
          'Construct complex assemblies with precise spatial constraints',
          'Simulate basic mechanism kinematics and kinematic envelopes'
        ]
      },
      {
        id: 'catia',
        name: 'CATIA',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Advanced generative shape design, automotive surface styling, solid part modeling, and digital mockup integration.',
        overview: 'CATIA dominates aerospace and automobile surface engineering. Learn generative shape design (GSD), Class-A surface principles, complex fillets, solid integration, and DMU kinematics.',
        keyTopics: [
          'Part Design Workbench & Parametric Wireframe',
          'Generative Shape Design (GSD) & Surface Modeling',
          'Surface Continuity (G0, G1, G2) & Curve Networks',
          'Assembly Design & Digital Mockup (DMU) Navigation',
          'Drafting Workbench & Engineering Tolerances'
        ],
        softwareCovered: ['CATIA V5 / 3DEXPERIENCE'],
        recommendedFor: ['Automotive Designers', 'Aerospace Aspirants', 'Mechanical Engineers'],
        learningOutcomes: [
          'Construct high-aesthetic aerodynamic surfaces and vehicle components',
          'Seamlessly integrate surface bodies into solid manufacturable volumes',
          'Analyze surface continuity and spatial packaging constraints'
        ]
      },
      {
        id: 'mastercam',
        name: 'Mastercam',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Computer-Aided Manufacturing (CAM) toolpath generation, 2D/3D milling, turning operations, and CNC code generation.',
        overview: 'Mastercam bridges CAD geometry and CNC machine tools. Learn how to import part geometry, define machine stock, configure cutting tools, generate 2D/3D toolpaths, and verify NC code.',
        keyTopics: [
          'CAD Geometry Import & Coordinate Alignment',
          '2D Milling Toolpaths: Facing, Pocketing & Contouring',
          'Lathe Turning Operations & Threading Cycles',
          'Toolpath Simulation & Machine Collision Checking',
          'Post-Processing & G-Code Generation for Machine Controllers'
        ],
        softwareCovered: ['Mastercam Mill & Lathe'],
        recommendedFor: ['Machinists', 'Tool & Die Makers', 'Production Engineers'],
        learningOutcomes: [
          'Generate optimized CNC milling and turning toolpaths',
          'Simulate cutting operations to eliminate shop-floor collisions',
          'Export post-processed G-codes for real CNC machining centers'
        ]
      },
      {
        id: 'solidcam',
        name: 'SolidCAM',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Integrated CAM inside SolidWorks featuring iMachining technology for high-efficiency CNC metal cutting.',
        overview: 'SolidCAM offers seamless CAM integration inside the SolidWorks environment. Learn iMachining toolpath technology, multi-axis milling, stock recognition, and cycle-time optimization.',
        keyTopics: [
          'SolidWorks-Integrated CAM Setup & Coordinate Systems',
          'iMachining 2D & 3D Technology (Feeds & Speeds Wizard)',
          'Pocket Recognition & Automatic Feature Machining',
          'Solid Verification & Remaining Stock Analysis',
          'Multi-Axis Indexing & G-Code Post-Processing'
        ],
        softwareCovered: ['SolidCAM', 'SolidWorks CAD'],
        recommendedFor: ['Manufacturing Engineers', 'CNC Programmers', 'Production Specialists'],
        learningOutcomes: [
          'Program efficient toolpaths directly within native CAD assemblies',
          'Leverage iMachining to reduce machining time and tool wear',
          'Validate metal removal operations with realistic simulation'
        ]
      },
      {
        id: 'gdt',
        name: 'GD&T (Geometric Dimensioning & Tolerancing)',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Standardized symbolic engineering language (ASME Y14.5 / ISO) defining geometric tolerance and feature control frames.',
        overview: 'GD&T ensures that manufactured parts fit and function correctly. Learn form, orientation, location, runout, datum reference frames, maximum material condition (MMC), and inspection methods.',
        keyTopics: [
          'Introduction to ASME Y14.5 & ISO GPS Standards',
          'Datums & 3-2-1 Datum Reference Systems',
          'Form Tolerances (Flatness, Straightness, Circularity, Cylindricity)',
          'Orientation & Location Tolerances (Position, Perpendicularity)',
          'Material Modifiers (MMC, LMC, RFS) & Functional Gauging'
        ],
        softwareCovered: ['CAD Drafting Standards', 'Inspection Reference Tools'],
        recommendedFor: ['Design Engineers', 'Quality Control Inspectors', 'Production Supervisors'],
        learningOutcomes: [
          'Interpret complex engineering drawings with GD&T feature control frames',
          'Apply correct tolerances to balance manufacturing cost and functional quality',
          'Calculate tolerance stacks and minimum/maximum material clearances'
        ]
      },
      {
        id: 'reverse-engineering',
        name: 'Reverse Engineering',
        categorySlug: 'mechanical-automobile',
        categoryName: 'Mechanical & Automobile',
        shortDescription: 'Reconstruct parametric CAD models from physical parts, scan point-clouds, and physical measurement data.',
        overview: 'Reverse engineering is essential for legacy components, aftermarket development, and product redesign. Learn physical measuring, coordinate measuring concepts, point-cloud reconstruction, and CAD modeling.',
        keyTopics: [
          'Principles of Physical Measurement & Scan Data Collection',
          'Handling Mesh & Point Cloud Datasets in CAD',
          'Curve Extraction, Cross-Section Slicing & Surface Fitting',
          'Parametric Reconstruction of Functional Engineering Features',
          'Deviation Analysis & Model Verification against Physical Samples'
        ],
        softwareCovered: ['Parametric CAD Suite', 'Mesh Processing Utilities'],
        recommendedFor: ['R&D Engineers', 'Product Redesign Specialists', 'Graduates'],
        learningOutcomes: [
          'Extract design intent and critical features from physical parts',
          'Reconstruct fully parametric 3D CAD models from scanned data',
          'Perform deviation checks to verify dimensional accuracy'
        ]
      }
    ]
  },
  {
    id: 'civil-engineering',
    slug: 'civil-engineering',
    title: 'Civil Engineering',
    tagline: 'Architectural Drafting, Structural Planning & Building Modeling',
    shortDescription: 'Comprehensive training in civil engineering software, 2D architectural drafting, structural schematics, and digital project visualization.',
    detailedDescription: 'Civil engineering workflows rely heavily on precise computer-aided drafting and 3D modeling. Our training focuses on practical drawing standards, building plans, elevations, sectional details, and structural layouts.',
    heroImage: '/images/courses/civil-architecture-hero.jpg',
    thumbnailImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    accentColor: 'emerald',
    iconName: 'Building2',
    courseCountNote: 'Practical Technical Training',
    courses: [
      {
        id: 'civil-software-drafting',
        name: 'Civil Engineering Software & Technical Training',
        categorySlug: 'civil-engineering',
        categoryName: 'Civil Engineering',
        shortDescription: 'Master 2D civil drafting, architectural floor plans, building elevations, structural layouts, and site documentation.',
        overview: 'Develop real-world technical skills required by civil consultancies, architectural firms, and construction contractors. Learn drafting standards, municipal submission drawing norms, layer conventions, reinforcement details, and site layout plans.',
        keyTopics: [
          'Civil Coordinate Systems & Unit Configuration',
          'Architectural 2D Floor Plans & Wall Thickness Standards',
          'Building Elevations & Longitudinal / Cross-Sectional Views',
          'Structural Column-Beam Grid Layouts & Footing Details',
          'Municipal Approval Drawing Formats & Plotting Setup'
        ],
        softwareCovered: ['AutoCAD Civil & Architectural Workflows', 'Drafting Tools'],
        recommendedFor: ['Civil Engineering Students', 'Diploma in Civil Holders', 'Site Supervisors', 'Architectural Draftspersons'],
        learningOutcomes: [
          'Produce clean, standardized 2D architectural and civil plans',
          'Draft structural reinforcement details and building sections',
          'Prepare drawings ready for municipal submission and site execution'
        ]
      }
    ]
  },
  {
    id: 'cnc-programming',
    slug: 'cnc-programming',
    title: 'CNC Programming',
    tagline: 'Machine Code, G & M Code Mastery & Machining Simulation',
    shortDescription: 'Hands-on training in computer numerical control (CNC) programming, turning and milling cycles, coordinate setup, and machine tool simulation.',
    detailedDescription: 'Precision manufacturing relies on skilled CNC programmers. Our technical training covers the syntax of G-codes and M-codes, work coordinate systems (G54-G59), tool offset calibration, canned cycles, canned turning routines, and virtual machine simulation.',
    heroImage: '/images/courses/cnc-machining-hero.jpg',
    thumbnailImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    accentColor: 'rose',
    iconName: 'Settings',
    courseCountNote: 'Industrial Technical Training',
    courses: [
      {
        id: 'cnc-programming-machining',
        name: 'CNC Programming & Related Technical Training',
        categorySlug: 'cnc-programming',
        categoryName: 'CNC Programming',
        shortDescription: 'Master manual part programming, ISO G-Codes, M-Codes, turning and milling canned cycles, and virtual simulation.',
        overview: 'Learn the foundational and advanced programming principles governing CNC Lathes and Vertical Machining Centers (VMC). Understand machine zero, work zero, tool height offsets, radius compensation, and canned drilling/boring cycles.',
        keyTopics: [
          'CNC Machine Architecture & Axis Coordinates (X, Y, Z)',
          'G-Codes (Linear, Circular, Rapid Motion, Canned Cycles)',
          'M-Codes (Spindle Control, Coolant, Program Ends)',
          'CNC Lathe Turning, Facing, Threading & Grooving Routines',
          'CNC VMC Milling, Pocketing, Drilling Cycles & Simulation'
        ],
        softwareCovered: ['CNC Simulation Software', 'G-Code Editors', 'Machining Verification Tools'],
        recommendedFor: ['Mechanical Diploma Holders', 'Machinists', 'ITI Mechanical Graduates', 'CNC Operators Seeking Advancement'],
        learningOutcomes: [
          'Write verified manual G-code programs for Lathe and Milling machines',
          'Calculate cutting speeds, feed rates, and depth of cut parameters',
          'Verify toolpaths using software simulation prior to physical cutting'
        ]
      }
    ]
  },
  {
    id: 'arts-multimedia',
    slug: 'arts-multimedia',
    title: 'Arts & Multimedia',
    tagline: 'Digital Art, Creative Media Production & Visual Storytelling',
    shortDescription: 'Specialized training in creative design, visual arts composition, digital media production, and creative communications.',
    detailedDescription: 'Creative expression combined with digital technology powers modern media, advertising, and content creation. Our Arts & Multimedia training teaches design principles, visual composition, digital illustration, and multimedia presentation skills.',
    heroImage: '/images/courses/graphic-design-hero.jpg',
    thumbnailImage: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=800&q=80',
    accentColor: 'purple',
    iconName: 'Palette',
    courseCountNote: 'Creative Technical Training',
    courses: [
      {
        id: 'creative-arts-multimedia',
        name: 'Creative Design & Multimedia-Related Training',
        categorySlug: 'arts-multimedia',
        categoryName: 'Arts & Multimedia',
        shortDescription: 'Develop expressive digital media, visual composition, creative asset design, and multimedia presentation abilities.',
        overview: 'Explore the creative intersection of art and digital media. Learn fundamental principles of visual composition, color theory, digital sketching, raster and vector combinations, and multimedia asset delivery.',
        keyTopics: [
          'Elements of Visual Composition & Balance',
          'Color Theory & Psychological Palette Development',
          'Digital Art Asset Creation & Layout Structuring',
          'Multimedia Integration for Social & Promotional Media',
          'Creative Portfolio Building & Presentation Skills'
        ],
        softwareCovered: ['Digital Creative Software', 'Vector Tools', 'Visual Design Applications'],
        recommendedFor: ['Fine Arts Graduates', 'Creative Aspirants', 'Content Creators', 'Visual Storytellers'],
        learningOutcomes: [
          'Apply sound composition and design principles to creative media',
          'Produce engaging multimedia visual assets for digital distribution',
          'Build an expressive portfolio showcasing creative design capability'
        ]
      }
    ]
  }
];

// Helper to get all courses flat
export const ALL_COURSES = COURSE_CATEGORIES.flatMap(cat => cat.courses);

// Helper to get a category by slug
export const getCategoryBySlug = (slug: string) =>
  COURSE_CATEGORIES.find(cat => cat.slug === slug);

// Helper to get a course by id
export const getCourseById = (id: string) =>
  ALL_COURSES.find(c => c.id === id);

