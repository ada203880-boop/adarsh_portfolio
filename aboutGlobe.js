import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const prefersReducedMotion = () => {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
};

function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}

export class AboutGlobeController {
  static init() {
    const canvas = document.getElementById('about-globe-canvas');
    if (!canvas) return;

    // Avoid double-init
    if (canvas.dataset.inited === 'true') return;
    canvas.dataset.inited = 'true';

    const reduced = prefersReducedMotion();

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 3.2);

    // Controls (mouse interaction)
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.rotateSpeed = 0.55;
    controls.minDistance = 3.0;
    controls.maxDistance = 4.0;

    // Lighting
    const ambient = new THREE.AmbientLight(0xa855f7, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0x22d3ee, 1.0);
    keyLight.position.set(5, 3, 4);
    scene.add(keyLight);

    // Globe
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeTexture = null; // keep texture-free for deterministic offline feel

    const globeGeo = new THREE.SphereGeometry(1, 64, 64);
    const globeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x0b0b1a),
      roughness: 0.75,
      metalness: 0.35,
      emissive: new THREE.Color(0x1b0733),
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.95
    });

    const globeMesh = new THREE.Mesh(globeGeo, globeMat);
    globeGroup.add(globeMesh);

    // Neon rim (wireframe-ish) to create cyber glow
    const rimGeo = new THREE.SphereGeometry(1.015, 48, 48);
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.35
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    globeGroup.add(rim);

    // Scanlines / particles on surface
    const pointsCount = reduced ? 320 : 720;
    const positions = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.002 + Math.random() * 0.01;
      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }

    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pointsMat = new THREE.PointsMaterial({
      size: reduced ? 0.018 : 0.015,
      color: 0xa855f7,
      transparent: true,
      opacity: 0.75
    });

    const surfacePoints = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(surfacePoints);

    // Neon aura ring behind globe
    const auraGeo = new THREE.RingGeometry(1.35, 1.48, 64);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide
    });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    aura.rotation.x = Math.PI / 2;
    aura.position.y = 0;
    scene.add(aura);

    // Mouse interaction offsets
    let targetRotX = 0;
    let targetRotY = 0;
    let rotX = 0;
    let rotY = 0;

    const onPointerMove = (e) => {
      if (reduced) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const nx = clamp(x * 2 - 1, -1, 1);
      const ny = clamp(y * 2 - 1, -1, 1);
      targetRotY = nx * 0.6; // yaw
      targetRotX = -ny * 0.35; // pitch
    };

    canvas.addEventListener('pointermove', onPointerMove, { passive: true });

    // Resize
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));

      const dpr = reduced ? 1.2 : Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Subtle scale for mobile so it stays premium but balanced
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const scale = isMobile ? 0.95 : 1.0;
      globeGroup.scale.setScalar(scale);
      rim.scale.setScalar(scale);
      surfacePoints.scale.setScalar(scale);
      aura.scale.setScalar(scale);
    };

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    // Animation loop
    const clock = new THREE.Clock();
    let autoAngle = 0;

    const animate = () => {
      const dt = clock.getDelta();
      const t = clock.elapsedTime;

      // Smooth rotation (auto)
      if (!reduced) autoAngle += dt * 0.35;
      const autoY = reduced ? 0 : autoAngle;

      // Inertia from mouse
      if (!reduced) {
        rotX += (targetRotX - rotX) * 0.08;
        rotY += (targetRotY - rotY) * 0.08;
      }

      // Apply rotation
      globeGroup.rotation.y = autoY + rotY;
      globeGroup.rotation.x = rotX;

      // Neon scan effect
      surfacePoints.material.opacity = 0.55 + Math.sin(t * 0.9) * 0.2;
      rim.material.opacity = 0.22 + Math.sin(t * 1.3) * 0.1;

      aura.rotation.z = t * 0.12;

      // Keep controls updated
      controls.update();

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }
}

// Keep CommonJS-ish global compatibility for existing script.js boot call
if (typeof window !== 'undefined') {
  window.AboutGlobeController = AboutGlobeController;
}

