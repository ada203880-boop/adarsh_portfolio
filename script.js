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
        if(overlay.classList.contains("open-active")) internalToggleMenu();
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

    const catalogRoles = ["Software Developer", "Full Stack Developer", "Data Science Enthusiast"];
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