/**
 * Adarsh Panda - Brand Application Management Framework Script
 * Optimized Framework Configurations Lifecycle Engine - 2026
 */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Core Operational Subsystems
  EngineLoader.init();
  ParticleEnvironment.init();
  CursorSystem.init();
  NavigationCore.init();
  TypographyAnimator.init();
  ScrollRevealEngine.init();
  MetricCounters.init();
  PipelineFormHandler.init();
  TechnologySystem.init();

  // Intro wave animation for the hand emoji (runs once on first load)
  const waveEmoji = document.querySelector('.wave-emoji');
  if (waveEmoji) {
    waveEmoji.classList.remove('is-wave-intro');
    // force reflow so the animation can restart if needed
    void waveEmoji.offsetWidth;
    waveEmoji.classList.add('is-wave-intro');
  }

  // About globe boot (if canvas exists)
  if (document.getElementById('about-globe-canvas')) {
    // AboutGlobeController is exposed globally by aboutGlobe.js
    AboutGlobeController.init();

  }
});




/* ==========================================================================
   01. PAGE PRELOADER INTERACTIVE LIFECYCLE
   ========================================================================== */
const EngineLoader = {
  init() {
    const loader = document.getElementById("loader-screen");
    const fill = document.querySelector(".loader-bar-fill");
    const statusText = document.querySelector(".loader-status");

    if (!loader) return;

    const sequenceSteps = [
      { percentage: 25, label: "Mounting structural DOM matrices..." },
      { percentage: 60, label: "Compiling vector hardware systems..." },
      { percentage: 85, label: "Caching functional data channels..." },
      { percentage: 100, label: "System initialized successfully." }
    ];

    let currentStep = 0;

    const processAllocation = setInterval(() => {
      if (currentStep < sequenceSteps.length) {
        const currentData = sequenceSteps[currentStep];
        fill.style.width = `${currentData.percentage}%`;
        statusText.textContent = currentData.label;
        currentStep++;
      } else {
        clearInterval(processAllocation);

        // Graceful exit animation sequences via Hardware Transforms
        anime({
          targets: loader,
          opacity: 0,
          duration: 600,
          easing: "easeOutQuad",
          complete: () => {
            loader.style.display = "none";
          }
        });
      }
    }, 220);
  }
};

/* ==========================================================================
   02. HIGH-FIDELITY VECTOR CANVAS FLOATING PARTICLE MODULES
   ========================================================================== */
const ParticleEnvironment = {
  init() {
    const canvas = document.getElementById("bg-particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particlesList = [];
    let animationFrameId;

    const configuration = {
      densityCount: 45,
      baseColor: "#a855f7",
      secondaryColor: "#22d3ee",
      maxConnectionDistance: 110
    };

    function resizeCanvasViewport() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class RenderNodeParticle {
      constructor() {
        this.resetPosition();
      }

      resetPosition() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 2 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.colorIndex = Math.random() > 0.5;
      }

      updateMetrics() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
          this.resetPosition();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.colorIndex ? configuration.baseColor : configuration.secondaryColor;
        ctx.globalAlpha = 0.4;
        ctx.fill();
      }
    }

    function constructEnvironmentPool() {
      particlesList = [];
      for (let i = 0; i < configuration.densityCount; i++) {
        particlesList.push(new RenderNodeParticle());
      }
    }

    function executeRenderLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update coordinates & paint vertices
      for (let i = 0; i < particlesList.length; i++) {
        particlesList[i].updateMetrics();
        particlesList[i].draw();

        // Connect near neighbors using proximity equations
        for (let j = i + 1; j < particlesList.length; j++) {
          const deltaX = particlesList[i].x - particlesList[j].x;
          const deltaY = particlesList[i].y - particlesList[j].y;
          const separationDistance = Math.hypot(deltaX, deltaY);

          if (separationDistance < configuration.maxConnectionDistance) {
            const relativeAlpha = (1 - (separationDistance / configuration.maxConnectionDistance)) * 0.12;
            ctx.strokeStyle = configuration.baseColor;
            ctx.globalAlpha = relativeAlpha;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particlesList[i].x, particlesList[i].y);
            ctx.lineTo(particlesList[j].x, particlesList[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(executeRenderLoop);
    }

    window.addEventListener("resize", () => {
      resizeCanvasViewport();
      constructEnvironmentPool();
    });

    resizeCanvasViewport();
    constructEnvironmentPool();
    executeRenderLoop();
  }
};

/* ==========================================================================
   03. CUSTOM BRANDED CURSOR MOTION ENGINE
   ========================================================================== */
const CursorSystem = {
  init() {
    const cursorRing = document.querySelector(".custom-cursor");
    const cursorDot = document.querySelector(".custom-cursor-dot");

    if (window.matchMedia("(pointer: coarse)").matches || !cursorRing) return;

    let targetX = 0, targetY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener("pointermove", (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Keep structural inner dot anchored synchronously
      cursorDot.style.left = `${targetX}px`;
      cursorDot.style.top = `${targetY}px`;
    }, { passive: true });

    // Smooth lerped physics trace animation for external outer aura ring
    function traceCursorPhysics() {
      const displacementFactor = 0.15;
      ringX += (targetX - ringX) * displacementFactor;
      ringY += (targetY - ringY) * displacementFactor;

      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;

      requestAnimationFrame(traceCursorPhysics);
    }
    requestAnimationFrame(traceCursorPhysics);

    // Dynamic scale trigger adjustments on interactive element interactions
    const interactiveSelectors = 'a, button, input, textarea, [role="button"], .credential-glass-card';
    document.querySelectorAll(interactiveSelectors).forEach((node) => {
      node.addEventListener("pointerover", () => cursorRing.classList.add("grow-interactive"));
      node.addEventListener("pointerout", () => cursorRing.classList.remove("grow-interactive"));
    });
  }
};

/* ==========================================================================
   04. OVERLAY DESIGN NAVIGATION SCREEN MANAGEMENT
   ========================================================================== */
const NavigationCore = {
  init() {
    const trigger = document.querySelector(".mobile-toggle-trigger");
    const overlay = document.querySelector(".mobile-nav-overlay");
    const structuralLinks = document.querySelectorAll(".mobile-nav-anchor, .nav-anchor-link");
    const sections = document.querySelectorAll("section");

    if (!trigger) return;

    function internalToggleMenu() {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", !isExpanded);
      trigger.classList.toggle("open-active");
      overlay.classList.toggle("open-active");
      document.body.style.overflow = isExpanded ? "" : "hidden";
    }

    trigger.addEventListener("click", internalToggleMenu);

    document.querySelectorAll(".mobile-nav-anchor").forEach(link => {
      link.addEventListener("click", () => {
        if (overlay.classList.contains("open-active")) internalToggleMenu();
      });
    });

    // High-performance structural route intersection tracking logic
    window.addEventListener("scroll", () => {
      let activeSectionId = "";
      const positionalOffset = window.scrollY + 160;

      sections.forEach((sect) => {
        const topBound = sect.offsetTop;
        const heightBound = sect.offsetHeight;
        if (positionalOffset >= topBound && positionalOffset < topBound + heightBound) {
          activeSectionId = sect.getAttribute("id");
        }
      });

      document.querySelectorAll(".nav-anchor-link").forEach((anchor) => {
        anchor.classList.remove("active-link-state");
        if (anchor.getAttribute("href") === `#${activeSectionId}`) {
          anchor.classList.add("active-link-state");
        }
      });
    }, { passive: true });
  }
};
// --- Project Reveal Animation ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-item').forEach((el) => observer.observe(el));

/* ==========================================================================
   05. ADVANCED INDUSTRIAL TYPOGRAPHY STEP ENGINE (TYPING EFFECT)
   ========================================================================== */
const TypographyAnimator = {
  init() {
    const elementTarget = document.getElementById("animated-role-target");
    if (!elementTarget) return;

    // Updated roles as per requirements
    const catalogRoles = ["Full-Stack Developer", "Software Developer", "AI & Data Enthusiast"];
    let stringIndex = 0;
    let characterIndex = 0;
    let inverseState = false;
    let delayAllocation = 100;

    function executeTypingEngineCycle() {
      const coreString = catalogRoles[stringIndex];

      if (!inverseState) {
        // Appending text vectors
        elementTarget.textContent = coreString.substring(0, characterIndex + 1);
        characterIndex++;
        delayAllocation = 80;

        if (characterIndex === coreString.length) {
          inverseState = true;
          delayAllocation = 2000; // Hold sequence state on complete string output
        }
      } else {
        // Slicing text vectors
        elementTarget.textContent = coreString.substring(0, characterIndex - 1);
        characterIndex--;
        delayAllocation = 40;

        if (characterIndex === 0) {
          inverseState = false;
          stringIndex = (stringIndex + 1) % catalogRoles.length;
          delayAllocation = 400; // Stabilizing delay balance before switching arrays
        }
      }

      setTimeout(executeTypingEngineCycle, delayAllocation);
    }

    setTimeout(executeTypingEngineCycle, 800);
  }
};

/* ==========================================================================
   06. HARDWARE-ACCELERATED DEPLOYMENT SCROLL REVEAL ARRAYS
   ========================================================================== */
const ScrollRevealEngine = {
  init() {
    if (typeof ScrollReveal === "undefined") return;

    const trackingInst = ScrollReveal({
      distance: "40px",
      duration: 1000,
      delay: 150,
      opacity: 0,
      scale: 0.96,
      easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      reset: false,
      mobile: true
    });

    // Structural element cascades targeting strategy implementation
    trackingInst.reveal(".reveal-item", { interval: 100 });

    // Skill bar load injection monitoring
    trackingInst.reveal(".skills-grid-wrapper", {
      callback: () => {
        document.querySelectorAll(".progress-bar-fill-bar").forEach((bar) => {
          bar.style.width = bar.getAttribute("data-width");
        });
      }
    });

    // Dynamic 3D Parallax Tilt Initialization Engine via VanillaTilt
    if (typeof VanillaTilt !== "undefined") {
      const nativeCards = document.querySelectorAll("[data-tilt]");
      VanillaTilt.init(Array.from(nativeCards), {
        max: 8,
        speed: 800,
        glare: true,
        "max-glare": 0.12,
        gyroscope: true
      });
    }
  }
};

/* ==========================================================================
   07. HIGH PERFORMANCE METRIC COUNTERS CONTROLLER MODULE
   ========================================================================== */
const MetricCounters = {
  init() {
    const counterFields = document.querySelectorAll(".counter-metric-value");
    if (!counterFields.length) return;

    const optionsConfig = { threshold: 0.8, triggerOnce: true };

    const appearanceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetNode = entry.target;
          const quantitativeLimit = parseInt(targetNode.getAttribute("data-target"), 10);

          let counterMap = { currentVal: 0 };

          anime({
            targets: counterMap,
            currentVal: quantitativeLimit,
            round: 1,
            easing: "easeOutQuad",
            duration: 1800,
            update: () => {
              targetNode.textContent = counterMap.currentVal;
            }
          });

          observer.unobserve(targetNode);
        }
      });
    }, optionsConfig);

    counterFields.forEach((node) => appearanceObserver.observe(node));
  }
};

/* ==========================================================================
   09. ADVANCED TECHNOLOGY SYSTEM MODULE
   ========================================================================== */
const TechnologySystem = {
  init() {
    if (!document.getElementById('tech-grid-wrapper')) return;

    const techData = {
      core: [
        { name: 'JavaScript', category: 'Languages', tier: 'core', icon: 'fab fa-js', description: 'Core language for dynamic web application development and interactive user interfaces.', projects: ['APEXCORE ATM Platform'] },
        { name: 'Python', category: 'Languages', tier: 'core', icon: 'fab fa-python', description: 'Used for backend services, data processing, machine learning workflows, and scripting automation.', projects: ['Titanic Survival Prediction'] },
        { name: 'Java', category: 'Languages', tier: 'core', icon: 'fab fa-java', description: 'Used for object-oriented programming, enterprise application development, and system design.', projects: [] },
        { name: 'C++', category: 'Languages', tier: 'core', icon: 'fas fa-code', description: 'Used for performance-critical applications, algorithmic problem solving, and system programming.', projects: [] },
        { name: 'PHP', category: 'Languages', tier: 'core', icon: 'fab fa-php', description: 'Used for server-side web development, WordPress customization, and backend application logic.', projects: [] },
        { name: 'HTML5', category: 'Frontend', tier: 'core', icon: 'fab fa-html5', description: 'Foundation markup language for structuring responsive web applications and semantic interfaces.', projects: ['APEXCORE ATM Platform'] },
        { name: 'CSS3', category: 'Frontend', tier: 'core', icon: 'fab fa-css3-alt', description: 'Used for responsive layouts, modern styling, animations, and premium visual design systems.', projects: ['APEXCORE ATM Platform'] },
        { name: 'React.js', category: 'Frontend', tier: 'core', icon: 'fab fa-react', description: 'Used for building responsive component-based user interfaces with efficient state management.', projects: [] },
        { name: 'Responsive Web Design', category: 'Frontend', tier: 'core', icon: 'fas fa-mobile-alt', description: 'Designing adaptive layouts that work seamlessly across desktop, tablet, and mobile devices.', projects: ['APEXCORE ATM Platform'] },
        { name: 'Node.js', category: 'Backend', tier: 'core', icon: 'fab fa-node-js', description: 'Used for backend services, API-driven application workflows, and server-side JavaScript execution.', projects: ['APEXCORE ATM Platform'] },
        { name: 'Express.js', category: 'Backend', tier: 'core', icon: 'fas fa-server', description: 'Minimalist web framework for building RESTful APIs and handling HTTP request routing.', projects: ['APEXCORE ATM Platform'] },
        { name: 'REST APIs', category: 'Backend', tier: 'core', icon: 'fas fa-plug', description: 'Building and consuming RESTful services for client-server communication and data exchange.', projects: ['APEXCORE ATM Platform'] },
        { name: 'Authentication', category: 'Backend', tier: 'core', icon: 'fas fa-shield-halved', description: 'Implementing secure user authentication flows including login, registration, and session management.', projects: ['APEXCORE ATM Platform'] },
        { name: 'Input Validation', category: 'Backend', tier: 'core', icon: 'fas fa-check-double', description: 'Validating and sanitizing user input to ensure data integrity and application security.', projects: ['APEXCORE ATM Platform'] },
        { name: 'MySQL', category: 'Database', tier: 'core', icon: 'fas fa-database', description: 'Used for relational data storage, complex queries, and database-driven application backends.', projects: ['APEXCORE ATM Platform'] },
        { name: 'SQL', category: 'Database', tier: 'core', icon: 'fas fa-database', description: 'Writing efficient queries for data retrieval, manipulation, and relational database operations.', projects: ['APEXCORE ATM Platform'] },
        { name: 'DBMS', category: 'Database', tier: 'core', icon: 'fas fa-database', description: 'Understanding database management systems, schema design, and data modeling principles.', projects: ['APEXCORE ATM Platform'] },
        { name: 'WordPress', category: 'CMS', tier: 'core', icon: 'fab fa-wordpress', description: 'Building and customizing WordPress websites, themes, and plugins for content-driven platforms.', projects: [] },
        { name: 'WooCommerce', category: 'CMS', tier: 'core', icon: 'fab fa-wordpress', description: 'Building e-commerce solutions with WooCommerce for online stores and payment integration.', projects: [] },
        { name: 'Pandas', category: 'AI & Data', tier: 'core', icon: 'fas fa-chart-bar', description: 'Data manipulation and analysis library for cleaning, transforming, and analyzing structured data.', projects: ['Titanic Survival Prediction'] },
        { name: 'NumPy', category: 'AI & Data', tier: 'core', icon: 'fas fa-calculator', description: 'Numerical computing library for array operations, mathematical functions, and scientific computing.', projects: ['Titanic Survival Prediction'] },
        { name: 'Machine Learning', category: 'AI & Data', tier: 'core', icon: 'fas fa-brain', description: 'Applying supervised and unsupervised learning algorithms for predictive modeling and data insights.', projects: ['Titanic Survival Prediction'] },
        { name: 'AI Integration', category: 'AI & Data', tier: 'core', icon: 'fas fa-robot', description: 'Integrating intelligent features into applications using APIs and AI-powered workflows.', projects: [] },
        { name: 'Git', category: 'Tools', tier: 'core', icon: 'fab fa-git-alt', description: 'Version control system for tracking code changes, collaboration, and project history management.', projects: ['APEXCORE ATM Platform', 'Titanic Survival Prediction'] },
        { name: 'GitHub', category: 'Tools', tier: 'core', icon: 'fab fa-github', description: 'Hosting repositories, managing code collaboration, and contributing to open-source projects.', projects: ['APEXCORE ATM Platform', 'Titanic Survival Prediction'] },
        { name: 'VS Code', category: 'Tools', tier: 'core', icon: 'fas fa-code', description: 'Primary development environment for writing, debugging, and managing code efficiently.', projects: ['APEXCORE ATM Platform', 'Titanic Survival Prediction'] },
        { name: 'AWS Fundamentals', category: 'Cloud', tier: 'core', icon: 'fab fa-aws', description: 'Understanding core AWS services for cloud deployment, storage, and application hosting.', projects: [] }
      ],
      advanced: [
        { name: 'Generative AI', category: 'AI & Application Intelligence', tier: 'advanced', icon: 'fas fa-robot', description: 'Building applications powered by generative AI models for content creation and intelligent automation.', projects: [] },
        { name: 'LLM APIs', category: 'AI & Application Intelligence', tier: 'advanced', icon: 'fas fa-comments', description: 'Integrating Large Language Model APIs for natural language understanding and AI-powered features.', projects: [] },
        { name: 'Prompt Engineering', category: 'AI & Application Intelligence', tier: 'advanced', icon: 'fas fa-terminal', description: 'Designing effective prompts to optimize LLM outputs for specific tasks and use cases.', projects: [] },
        { name: 'AI Integration', category: 'AI & Application Intelligence', tier: 'advanced', icon: 'fas fa-robot', description: 'Building intelligent application features with contextual AI workflows and automation.', projects: [] },
        { name: 'Multimodal AI', category: 'AI & Application Intelligence', tier: 'advanced', icon: 'fas fa-layer-group', description: 'Working with AI models that process multiple input types including text, images, and audio.', projects: [] },
        { name: 'AI Agents', category: 'AI & Application Intelligence', tier: 'advanced', icon: 'fas fa-user-robot', description: 'Building autonomous AI agents that can perform tasks, make decisions, and interact with systems.', projects: [] },
        { name: 'TypeScript', category: 'Modern Web', tier: 'advanced', icon: 'fas fa-code', description: 'Typed superset of JavaScript for building scalable and maintainable web applications.', projects: [] },
        { name: 'Next.js', category: 'Modern Web', tier: 'advanced', icon: 'fas fa-bolt', description: 'React framework for production-grade applications with SSR, SSG, and optimized performance.', projects: [] },
        { name: 'Advanced React Patterns', category: 'Modern Web', tier: 'advanced', icon: 'fab fa-react', description: 'Implementing advanced patterns like hooks, context, render props, and compound components.', projects: [] },
        { name: 'WebSockets', category: 'Modern Web', tier: 'advanced', icon: 'fas fa-plug', description: 'Real-time bidirectional communication for live data streaming and interactive applications.', projects: [] },
        { name: 'Progressive Web Apps', category: 'Modern Web', tier: 'advanced', icon: 'fas fa-mobile-alt', description: 'Building offline-capable, installable web applications with native-like user experience.', projects: [] },
        { name: 'API Security', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-shield-halved', description: 'Implementing security best practices for API protection, threat mitigation, and secure data handling.', projects: [] },
        { name: 'JWT', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-key', description: 'JSON Web Token implementation for secure authentication and authorization in APIs.', projects: [] },
        { name: 'OAuth 2.0', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-lock', description: 'Implementing OAuth 2.0 for secure third-party authentication and delegated authorization.', projects: [] },
        { name: 'Rate Limiting', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-gauge-high', description: 'Implementing rate limiting strategies to protect APIs from abuse and ensure fair usage.', projects: [] },
        { name: 'API Validation', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-check-double', description: 'Validating API requests and responses to ensure data integrity and prevent security vulnerabilities.', projects: [] },
        { name: 'Secure Authentication', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-shield-halved', description: 'Building robust authentication systems with secure session management and token handling.', projects: [] },
        { name: 'Background Jobs', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-gears', description: 'Implementing asynchronous background task processing for improved application performance.', projects: [] },
        { name: 'Caching', category: 'Backend & API Engineering', tier: 'advanced', icon: 'fas fa-bolt', description: 'Implementing caching strategies to reduce database load and improve application response times.', projects: [] },
        { name: 'AWS', category: 'Cloud & DevOps', tier: 'advanced', icon: 'fab fa-aws', description: 'Deploying and managing applications on AWS infrastructure with scalable cloud services.', projects: [] },
        { name: 'Docker', category: 'Cloud & DevOps', tier: 'advanced', icon: 'fab fa-docker', description: 'Containerizing applications for consistent deployment across development, testing, and production.', projects: [] },
        { name: 'CI/CD', category: 'Cloud & DevOps', tier: 'advanced', icon: 'fas fa-infinity', description: 'Setting up continuous integration and deployment pipelines for automated testing and deployment.', projects: [] },
        { name: 'Cloud Deployment', category: 'Cloud & DevOps', tier: 'advanced', icon: 'fas fa-cloud-upload-alt', description: 'Deploying applications to cloud platforms with high availability and scalability configurations.', projects: [] },
        { name: 'Serverless Architecture', category: 'Cloud & DevOps', tier: 'advanced', icon: 'fas fa-cloud', description: 'Building serverless applications with functions-as-a-service for cost-effective scalability.', projects: [] },
        { name: 'Vector Databases', category: 'Data & AI Infrastructure', tier: 'advanced', icon: 'fas fa-database', description: 'Using vector databases for similarity search, embeddings storage, and AI-powered retrieval.', projects: [] },
        { name: 'Embeddings', category: 'Data & AI Infrastructure', tier: 'advanced', icon: 'fas fa-vector-square', description: 'Creating and using embeddings for semantic search, recommendation systems, and AI applications.', projects: [] },
        { name: 'RAG', category: 'Data & AI Infrastructure', tier: 'advanced', icon: 'fas fa-search', description: 'Retrieval-Augmented Generation for building AI systems that combine knowledge retrieval with generation.', projects: [] },
        { name: 'Data Pipelines', category: 'Data & AI Infrastructure', tier: 'advanced', icon: 'fas fa-stream', description: 'Building ETL/ELT pipelines for data ingestion, transformation, and delivery to AI systems.', projects: [] },
        { name: 'AI/ML APIs', category: 'Data & AI Infrastructure', tier: 'advanced', icon: 'fas fa-cloud', description: 'Integrating machine learning APIs for predictions, recommendations, and intelligent features.', projects: [] }
      ],
      exploring: [
        { name: 'TypeScript', category: 'Modern Web', tier: 'exploring', icon: 'fas fa-code', description: 'Currently exploring TypeScript for type-safe development and scalable codebases.', projects: [] },
        { name: 'Next.js', category: 'Modern Web', tier: 'exploring', icon: 'fas fa-bolt', description: 'Currently exploring Next.js for server-rendered React applications and modern web development.', projects: [] },
        { name: 'Docker', category: 'Cloud & DevOps', tier: 'exploring', icon: 'fab fa-docker', description: 'Currently exploring Docker for containerization and consistent application deployment.', projects: [] },
        { name: 'AWS', category: 'Cloud & DevOps', tier: 'exploring', icon: 'fab fa-aws', description: 'Currently exploring AWS cloud services for scalable infrastructure and application deployment.', projects: [] },
        { name: 'CI/CD', category: 'Cloud & DevOps', tier: 'exploring', icon: 'fas fa-infinity', description: 'Currently exploring continuous integration and deployment workflows for automated delivery.', projects: [] },
        { name: 'RAG', category: 'Data & AI Infrastructure', tier: 'exploring', icon: 'fas fa-search', description: 'Currently exploring Retrieval-Augmented Generation for building intelligent AI applications.', projects: [] },
        { name: 'Vector Databases', category: 'Data & AI Infrastructure', tier: 'exploring', icon: 'fas fa-database', description: 'Currently exploring vector databases for AI-powered search and semantic applications.', projects: [] },
        { name: 'LLM Applications', category: 'AI & Application Intelligence', tier: 'exploring', icon: 'fas fa-comments', description: 'Currently exploring building applications powered by Large Language Models.', projects: [] },
        { name: 'AI Agents', category: 'AI & Application Intelligence', tier: 'exploring', icon: 'fas fa-user-robot', description: 'Currently exploring autonomous AI agents for task automation and intelligent systems.', projects: [] },
        { name: 'Cloud Architecture', category: 'Cloud & DevOps', tier: 'exploring', icon: 'fas fa-cloud', description: 'Currently exploring cloud architecture patterns for scalable and resilient system design.', projects: [] }
      ]
    };

    const iconMap = {};
    const allTech = [...techData.core, ...techData.advanced, ...techData.exploring];
    allTech.forEach(tech => {
      iconMap[tech.name] = tech.icon;
    });

    // Render cards
    function renderCards() {
      const coreGrid = document.getElementById('tech-grid-core');
      const advancedGrid = document.getElementById('tech-grid-advanced');
      const exploringGrid = document.getElementById('tech-grid-exploring');

      if (coreGrid) coreGrid.innerHTML = techData.core.map(t => createTechCard(t)).join('');
      if (advancedGrid) advancedGrid.innerHTML = techData.advanced.map(t => createTechCard(t)).join('');
      if (exploringGrid) exploringGrid.innerHTML = techData.exploring.map(t => createTechCard(t)).join('');
    }

    function createTechCard(tech) {
      const tierClass = tech.tier === 'core' ? 'core' : tech.tier === 'advanced' ? 'advanced' : 'exploring';
      const projectsHtml = tech.projects && tech.projects.length > 0
        ? `<div style="font-size: 0.65rem; color: var(--text-muted); margin-top: 4px;">Used in: ${tech.projects.join(', ')}</div>`
        : '';

      return `
        <button class="tech-card ${tierClass}" data-tech="${encodeURIComponent(tech.name)}" data-tier="${tech.tier}" aria-label="View details for ${tech.name}">
          <div class="tech-card-icon"><i class="${tech.icon}"></i></div>
          <div class="tech-card-name">${tech.name}</div>
          <div class="tech-card-tier">${tech.tier === 'core' ? 'CORE' : tech.tier === 'advanced' ? 'ADVANCED' : 'EXPLORING'}</div>
          ${projectsHtml}
        </button>
      `;
    }

    renderCards();

    // Filter functionality
    const filterButtons = document.querySelectorAll('.tech-filter-btn');
    const categoryMap = {
      'all': null,
      'frontend': ['HTML5', 'CSS3', 'React.js', 'Responsive Web Design', 'TypeScript', 'Next.js', 'Advanced React Patterns', 'WebSockets', 'Progressive Web Apps'],
      'backend': ['Node.js', 'Express.js', 'REST APIs', 'Authentication', 'Input Validation', 'API Security', 'JWT', 'OAuth 2.0', 'Rate Limiting', 'API Validation', 'Secure Authentication', 'Background Jobs', 'Caching'],
      'database': ['MySQL', 'SQL', 'DBMS', 'WordPress', 'WooCommerce', 'Vector Databases', 'Embeddings', 'RAG', 'Data Pipelines', 'AI/ML APIs'],
      'ai-data': ['Pandas', 'NumPy', 'Machine Learning', 'AI Integration', 'Generative AI', 'LLM APIs', 'Prompt Engineering', 'Multimodal AI', 'AI Agents', 'RAG', 'Vector Databases', 'Embeddings', 'Data Pipelines', 'AI/ML APIs'],
      'cloud': ['AWS Fundamentals', 'AWS', 'Docker', 'CI/CD', 'Cloud Deployment', 'Serverless Architecture', 'Cloud Architecture'],
      'tools': ['Git', 'GitHub', 'VS Code'],
      'exploring': ['TypeScript', 'Next.js', 'Docker', 'AWS', 'CI/CD', 'RAG', 'Vector Databases', 'LLM Applications', 'AI Agents', 'Cloud Architecture']
    };

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.dataset.filter;
        const categories = categoryMap[filter];

        document.querySelectorAll('.tech-card').forEach(card => {
          const techName = decodeURIComponent(card.dataset.tech);
          if (!categories) {
            card.classList.remove('hidden');
          } else {
            card.classList.toggle('hidden', !categories.includes(techName));
          }
        });
      });
    });

    // Modal functionality
    const modalOverlay = document.getElementById('tech-modal-overlay');
    const modalTitle = document.getElementById('tech-modal-title');
    const modalCategory = document.getElementById('tech-modal-category');
    const modalTier = document.getElementById('tech-modal-tier');
    const modalDescription = document.getElementById('tech-modal-description');
    const modalIcon = document.getElementById('tech-modal-icon');
    const modalProjects = document.getElementById('tech-modal-projects');
    const modalProjectsList = document.getElementById('tech-modal-projects-list');
    const modalClose = document.querySelector('.tech-modal-close');

    function openModal(tech) {
      if (!modalOverlay) return;

      const tierClass = tech.tier === 'core' ? 'core' : tech.tier === 'advanced' ? 'advanced' : 'exploring';
      const tierLabel = tech.tier === 'core' ? 'Core Stack' : tech.tier === 'advanced' ? 'Advanced / Currently Developing' : 'Exploring Next';
      const exploringNote = tech.tier === 'exploring' ? ' <span style="color: #fbbf24; font-weight: 500;">(Currently Exploring)</span>' : '';

      modalTitle.textContent = tech.name;
      modalCategory.textContent = tech.category;
      modalTier.className = `tech-modal-tier ${tierClass}`;
      modalTier.textContent = tierLabel;
      modalDescription.innerHTML = tech.description + exploringNote;

      if (tech.icon) {
        modalIcon.innerHTML = `<i class="${tech.icon}"></i>`;
        modalIcon.className = `tech-modal-icon ${tierClass}`;
      }

      if (tech.projects && tech.projects.length > 0) {
        modalProjects.style.display = 'block';
        modalProjectsList.innerHTML = tech.projects.map(p => `<li class="tech-modal-project-tag">${p}</li>`).join('');
      } else {
        modalProjects.style.display = 'none';
      }

      modalOverlay.classList.add('active');
      modalOverlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modalClose?.focus();
    }

    function closeModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove('active');
      modalOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    // Event delegation for tech cards
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.tech-card');
      if (!card) return;

      const techName = decodeURIComponent(card.dataset.tech);
      const techTier = card.dataset.tier;
      const allTech = [...techData.core, ...techData.advanced, ...techData.exploring];
      const tech = allTech.find(t => t.name === techName && t.tier === techTier);

      if (tech) openModal(tech);
    });

    // Close modal events
    modalClose?.addEventListener('click', closeModal);
    modalOverlay?.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
        closeModal();
      }
    });

    // Keyboard navigation for tech cards
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.tech-card');
        if (card) {
          e.preventDefault();
          card.click();
        }
      }
    });
  }
};

/* ==========================================================================
   08. COMMUNICATION PIPELINE FORM VALIDATION & DATA OVERVIEW
   ========================================================================== */
const PipelineFormHandler = {
  init() {
    const contextForm = document.getElementById("portfolio-contact-form");
    const statusLogger = document.getElementById("form-response-status");

    if (!contextForm) return;

    contextForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Retrieve structured DOM values safely
      const nameInput = document.getElementById("form-name-field").value.trim();
      const emailInput = document.getElementById("form-email-field").value.trim();
      const subjectInput = document.getElementById("form-subject-field").value.trim();
      const messageInput = document.getElementById("form-message-field").value.trim();

      statusLogger.className = "form-feedback-status-msg";
      statusLogger.textContent = "Processing payload routing...";

      // Client-Side Security Filter Assertions Validation Check
      if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        statusLogger.classList.add("error-state");
        statusLogger.textContent = "Error: Active parameter fields cannot contain empty values.";
        return;
      }

      // Simulated network pipeline transmission latency delay wrapper block
      setTimeout(() => {
        statusLogger.classList.add("success-state");
        statusLogger.innerHTML = `Message packaged from <strong>${nameInput}</strong> dispatched successfully! (Mock API System Live)`;
        contextForm.reset();
      }, 1200);
    });
  }
};