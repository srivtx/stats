// src/components/visualizations/threeStudio.js
/**
 * Three.js 3D Interactive Graphics Engine for StatQuest Website.
 * Supports:
 *  1. normal3d: Bivariate Normal Bell Surface with 1D slice curve & correlation morphing
 *  2. regression3d: 3D Multiple Regression Plane with residual drop lines & Loss Paraboloid
 *  3. mle3d: 3D Log-Likelihood surface with interactive parameter climbing
 *  4. cov3d: 3D Covariance Ellipsoid and smooth-morphing correlated point cloud
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class ThreeStudio {
  constructor(containerElement) {
    this.container = containerElement;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.animId = null;
    this.currentMode = null;
    this.activeObjects = [];
    this.resizeObserver = null;
    this.gridHelper = null;
    this.isDestroyed = false;

    // Pre-computed deterministic standard normal base points for cov3d morphing
    this.covBasePoints = [];
    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 450; i++) {
      const u1 = rnd() + 1e-9, u2 = rnd();
      const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
      const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
      const u3 = rnd() + 1e-9, u4 = rnd();
      const z3 = Math.sqrt(-2 * Math.log(u3)) * Math.cos(2 * Math.PI * u4);
      this.covBasePoints.push({ z1, z2, z3 });
    }

    this.init();
  }

  getThemeColors(themeName) {
    const theme = themeName || (typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme')) || 'bw-dark';
    if (theme === 'bw-light') {
      return { bg: 0xfcfcfc, grid1: 0xd4d4d8, grid2: 0xe4e4e7, dir2: 0x52525b };
    } else if (theme === 'bw-contrast') {
      return { bg: 0x000000, grid1: 0xffffff, grid2: 0x27272a, dir2: 0xffffff };
    }
    return { bg: 0x09090b, grid1: 0x27272a, grid2: 0x18181b, dir2: 0x71717a };
  }

  setTheme(themeName) {
    if (!this.scene) return;
    const colors = this.getThemeColors(themeName);
    this.scene.background = new THREE.Color(colors.bg);
    if (this.gridHelper) {
      this.scene.remove(this.gridHelper);
      if (this.gridHelper.geometry) this.gridHelper.geometry.dispose();
      this.gridHelper = new THREE.GridHelper(24, 24, colors.grid1, colors.grid2);
      this.gridHelper.position.y = -0.01;
      this.scene.add(this.gridHelper);
    }
  }

  isWebGLAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  showWebGLFallback() {
    this.container.innerHTML = `
      <div class="webgl-fallback-container">
        <div style="font-size: 2.2rem; margin-bottom: 12px;">📐</div>
        <h3 style="color: #38bdf8; margin-bottom: 8px;">WebGL 3D Acceleration Unavailable</h3>
        <p style="color: #94a3b8; max-width: 460px; margin: 0 auto 12px; font-size: 0.88rem;">
          WebGL context creation is disabled or unsupported in this browser environment.
        </p>
        <p style="color: #64748b; font-size: 0.8rem;">
          Switch to the <strong>2D Simulation Lab</strong> or <strong>First-Principles Theory</strong> tabs for complete interactive exploration!
        </p>
      </div>
    `;
  }

  init() {
    if (!this.isWebGLAvailable()) {
      this.showWebGLFallback();
      return;
    }

    this.container.innerHTML = '';
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 520;

    try {
      // Scene
      this.scene = new THREE.Scene();
      const themeColors = this.getThemeColors();
      this.scene.background = new THREE.Color(themeColors.bg);

      // Camera
      this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
      this.camera.position.set(12, 10, 14);

      // Renderer
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      this.renderer.shadowMap.enabled = true;
      this.container.appendChild(this.renderer.domElement);

      // Controls
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.1;

      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
      this.scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
      dirLight1.position.set(15, 25, 20);
      this.scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.45);
      dirLight2.position.set(-15, -10, -15);
      this.scene.add(dirLight2);

      // Grid floor
      this.gridHelper = new THREE.GridHelper(24, 24, themeColors.grid1, themeColors.grid2);
      this.gridHelper.position.y = -0.01;
      this.scene.add(this.gridHelper);

      // Handle Resize
      if (typeof ResizeObserver !== 'undefined') {
        this.resizeObserver = new ResizeObserver(() => this.onResize());
        this.resizeObserver.observe(this.container);
      }

      // Start loop
      this.animate();
    } catch (err) {
      console.warn('ThreeStudio WebGL initialization error:', err);
      this.showWebGLFallback();
    }
  }

  onResize() {
    if (this.isDestroyed || !this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    if (this.isDestroyed) return;
    this.animId = requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  clearActiveObjects() {
    if (!this.scene) return;
    this.activeObjects.forEach(obj => {
      this.scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
        else obj.material.dispose();
      }
    });
    this.activeObjects = [];
  }

  destroy() {
    this.isDestroyed = true;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }
    this.clearActiveObjects();
    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
    }
    this.scene = null;
    this.camera = null;
  }

  // ==========================================
  // MODE 1: 3D Bivariate Gaussian Bell Surface
  // ==========================================
  renderNormal3D(params = { muX: 0, muY: 0, sigmaX: 2.0, sigmaY: 2.0, rho: 0.0, slicePos: null }) {
    if (!this.scene) return;
    this.currentMode = 'normal3d';
    this.clearActiveObjects();

    const { muX = 0, muY = 0, sigmaX = 2.0, sigmaY = 2.0, rho = 0.0, slicePos = null } = params;
    const size = 16;
    const segments = 80;
    const geom = new THREE.PlaneGeometry(size, size, segments, segments);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    const colorCold = new THREE.Color(0x1e3a8a); // deep blue
    const colorMid = new THREE.Color(0x06b6d4);  // cyan
    const colorHot = new THREE.Color(0xf59e0b);  // gold
    const colorPeak = new THREE.Color(0xef4444); // crimson

    // Determinant & normalization factor for bivariate normal
    const oneMinusRho2 = Math.max(0.01, 1 - rho * rho);
    const normFactor = 1 / (2 * Math.PI * sigmaX * sigmaY * Math.sqrt(oneMinusRho2));

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      const dx = (x - muX) / sigmaX;
      const dz = (z - muY) / sigmaY;

      const exponent = -1 / (2 * oneMinusRho2) * (dx * dx - 2 * rho * dx * dz + dz * dz);
      const density = normFactor * Math.exp(exponent);
      const y = density * 18;
      pos.setY(i, y);

      // Color mapping
      const t = Math.min(1.0, y / 3.5);
      const c = new THREE.Color();
      if (t < 0.3) {
        c.lerpColors(colorCold, colorMid, t / 0.3);
      } else if (t < 0.7) {
        c.lerpColors(colorMid, colorHot, (t - 0.3) / 0.4);
      } else {
        c.lerpColors(colorHot, colorPeak, (t - 0.7) / 0.3);
      }

      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.2
    });

    const mesh = new THREE.Mesh(geom, mat);
    this.scene.add(mesh);
    this.activeObjects.push(mesh);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.08
    });
    const wireMesh = new THREE.Mesh(geom, wireMat);
    this.scene.add(wireMesh);
    this.activeObjects.push(wireMesh);

    // Interactive Slicing Plane & 1D Cross-Section Curve if active
    if (slicePos !== null && slicePos !== undefined) {
      const sliceGeom = new THREE.PlaneGeometry(size, 7);
      const sliceMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const sliceMesh = new THREE.Mesh(sliceGeom, sliceMat);
      sliceMesh.position.set(slicePos, 3.5, 0);
      sliceMesh.rotateY(Math.PI / 2);
      this.scene.add(sliceMesh);
      this.activeObjects.push(sliceMesh);

      // 1D Gaussian cross-section glowing curve along the slice plane
      const curvePoints = [];
      const zSteps = 70;
      for (let j = 0; j <= zSteps; j++) {
        const z = -size / 2 + (j / zSteps) * size;
        const dx = (slicePos - muX) / sigmaX;
        const dz = (z - muY) / sigmaY;
        const exponent = -1 / (2 * oneMinusRho2) * (dx * dx - 2 * rho * dx * dz + dz * dz);
        const y = normFactor * Math.exp(exponent) * 18;
        curvePoints.push(new THREE.Vector3(slicePos, y + 0.08, z));
      }
      const curveGeom = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({ color: 0xf43f5e, linewidth: 4 });
      const curveLine = new THREE.Line(curveGeom, curveMat);
      this.scene.add(curveLine);
      this.activeObjects.push(curveLine);
    }
  }

  // ==========================================
  // MODE 2: 3D Multiple Linear Regression & Loss Paraboloid
  // ==========================================
  renderRegression3D(params = { beta0: 2, beta1: 1.2, beta2: -0.8, showResiduals: true, showLossBowl: false }) {
    if (!this.scene) return;
    this.currentMode = 'regression3d';
    this.clearActiveObjects();

    const { beta0 = 2, beta1 = 1.2, beta2 = -0.8, showResiduals = true, showLossBowl = false } = params;

    if (showLossBowl) {
      // 3D Loss Bowl (Paraboloid) SSR(b1, b2)
      const size = 12;
      const segs = 50;
      const bowlGeom = new THREE.PlaneGeometry(size, size, segs, segs);
      bowlGeom.rotateX(-Math.PI / 2);
      const pos = bowlGeom.attributes.position;
      const colors = new Float32Array(pos.count * 3);

      const trueB1 = 1.2, trueB2 = -0.8;

      for (let i = 0; i < pos.count; i++) {
        const b1 = pos.getX(i) / 2;
        const b2 = pos.getZ(i) / 2;
        // Quadratic loss bowl
        const ssr = 1.5 * (b1 - trueB1) * (b1 - trueB1) + 1.2 * (b2 - trueB2) * (b2 - trueB2);
        const y = Math.min(10, ssr * 0.8);
        pos.setY(i, y);

        const t = Math.min(1.0, y / 8.0);
        const c = new THREE.Color().lerpColors(new THREE.Color(0x10b981), new THREE.Color(0xef4444), t);
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      bowlGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      bowlGeom.computeVertexNormals();

      const bowlMat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.4 });
      const bowlMesh = new THREE.Mesh(bowlGeom, bowlMat);
      this.scene.add(bowlMesh);
      this.activeObjects.push(bowlMesh);

      // Current candidate parameter ball
      const ballGeom = new THREE.SphereGeometry(0.35, 16, 16);
      const ballMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x38bdf8 });
      const ball = new THREE.Mesh(ballGeom, ballMat);
      const curLoss = 1.5 * (beta1 - trueB1) ** 2 + 1.2 * (beta2 - trueB2) ** 2;
      ball.position.set(beta1 * 2, Math.min(10, curLoss * 0.8) + 0.35, beta2 * 2);
      this.scene.add(ball);
      this.activeObjects.push(ball);

      // Wireframe overlay on bowl
      const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.1 });
      const wireMesh = new THREE.Mesh(bowlGeom, wireMat);
      this.scene.add(wireMesh);
      this.activeObjects.push(wireMesh);

      return;
    }

    // Static synthetic sample data points: (x1, x2, y_true)
    const dataPoints = [
      { x1: -3, x2: -2, y: -0.5 },
      { x1: -2, x2: 1,  y: 0.8 },
      { x1: -1, x2: -1, y: 1.4 },
      { x1: 0,  x2: 2,  y: 1.0 },
      { x1: 1,  x2: -2, y: 4.8 },
      { x1: 2,  x2: 0,  y: 4.2 },
      { x1: 3,  x2: 2,  y: 4.5 },
      { x1: -1, x2: 3,  y: 0.1 },
      { x1: 2,  x2: -3, y: 6.9 },
      { x1: 3,  x2: -1, y: 6.2 },
      { x1: -2, x2: -3, y: 1.9 },
      { x1: 1,  x2: 1,  y: 2.6 }
    ];

    // Plot data points as glowing spheres
    const sphereGeom = new THREE.SphereGeometry(0.25, 16, 16);
    dataPoints.forEach(pt => {
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        roughness: 0.2
      });
      const sphere = new THREE.Mesh(sphereGeom, sphereMat);
      sphere.position.set(pt.x1, pt.y, pt.x2);
      this.scene.add(sphere);
      this.activeObjects.push(sphere);

      // Residual drop line from point to fitted plane
      if (showResiduals) {
        const yPred = beta0 + beta1 * pt.x1 + beta2 * pt.x2;
        const lineGeom = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(pt.x1, pt.y, pt.x2),
          new THREE.Vector3(pt.x1, yPred, pt.x2)
        ]);
        const resDist = Math.abs(pt.y - yPred);
        const lineMat = new THREE.LineBasicMaterial({
          color: resDist > 1.2 ? 0xef4444 : 0x10b981,
          linewidth: 2
        });
        const line = new THREE.Line(lineGeom, lineMat);
        this.scene.add(line);
        this.activeObjects.push(line);
      }
    });

    // Fitted regression plane: y = beta0 + beta1*x1 + beta2*x2
    const planeSize = 8;
    const planeGeom = new THREE.PlaneGeometry(planeSize, planeSize, 2, 2);
    planeGeom.rotateX(-Math.PI / 2);
    const planePos = planeGeom.attributes.position;

    for (let i = 0; i < planePos.count; i++) {
      const x1 = planePos.getX(i);
      const x2 = planePos.getZ(i);
      const y = beta0 + beta1 * x1 + beta2 * x2;
      planePos.setY(i, y);
    }
    planeGeom.computeVertexNormals();

    const planeMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
      roughness: 0.3
    });
    const planeMesh = new THREE.Mesh(planeGeom, planeMat);
    this.scene.add(planeMesh);
    this.activeObjects.push(planeMesh);

    // Plane border wireframe
    const wireMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const wireMesh = new THREE.Mesh(planeGeom, wireMat);
    this.scene.add(wireMesh);
    this.activeObjects.push(wireMesh);
  }

  // ==========================================
  // MODE 3: 3D Maximum Likelihood Estimation Surface
  // ==========================================
  renderMLE3D(params = { candidateMu: 0, candidateSigma: 1.5, trueMu: 0, trueSigma: 1.5 }) {
    if (!this.scene) return;
    this.currentMode = 'mle3d';
    this.clearActiveObjects();

    const { candidateMu = 0, candidateSigma = 1.5 } = params;
    const size = 12;
    const segs = 60;
    const geom = new THREE.PlaneGeometry(size, size, segs, segs);
    geom.rotateX(-Math.PI / 2);

    const pos = geom.attributes.position;
    const colors = new Float32Array(pos.count * 3);

    // Sample data to evaluate likelihood: [ -1.2, -0.4, 0.2, 0.8, 1.6 ]
    const sample = [-1.2, -0.4, 0.2, 0.8, 1.6];
    const n = sample.length;

    for (let i = 0; i < pos.count; i++) {
      // Map grid coordinates: X -> mu in [-3, 3], Z -> sigma in [0.4, 3.5]
      const mu = (pos.getX(i) / (size / 2)) * 3;
      const sigma = 0.5 + ((pos.getZ(i) + size / 2) / size) * 3.0;

      // Log-likelihood of normal sample
      let logLik = -0.5 * n * Math.log(2 * Math.PI * sigma * sigma);
      for (let s of sample) {
        logLik -= ((s - mu) ** 2) / (2 * sigma * sigma);
      }

      // Height scaled for visibility
      const y = Math.max(0, (logLik + 18) * 0.7);
      pos.setY(i, y);

      const t = Math.min(1.0, y / 7.0);
      const c = new THREE.Color().lerpColors(new THREE.Color(0x312e81), new THREE.Color(0xf59e0b), t);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geom.computeVertexNormals();

    const mat = new THREE.MeshStandardMaterial({ vertexColors: true, side: THREE.DoubleSide, roughness: 0.35 });
    const mesh = new THREE.Mesh(geom, mat);
    this.scene.add(mesh);
    this.activeObjects.push(mesh);

    // Current candidate parameter pin / marker
    const pinGeom = new THREE.CylinderGeometry(0.08, 0.08, 3, 16);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c });
    const pin = new THREE.Mesh(pinGeom, pinMat);

    const candX = (candidateMu / 3) * (size / 2);
    const candZ = ((candidateSigma - 0.5) / 3.0) * size - (size / 2);

    let curLogLik = -0.5 * n * Math.log(2 * Math.PI * candidateSigma * candidateSigma);
    for (let s of sample) {
      curLogLik -= ((s - candidateMu) ** 2) / (2 * candidateSigma * candidateSigma);
    }
    const candY = Math.max(0, (curLogLik + 18) * 0.7);

    pin.position.set(candX, candY + 1.5, candZ);
    this.scene.add(pin);
    this.activeObjects.push(pin);

    // Flag peak sphere
    const peakSphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    peakSphere.position.set(candX, candY + 3.0, candZ);
    this.scene.add(peakSphere);
    this.activeObjects.push(peakSphere);
  }

  // ==========================================
  // MODE 4: 3D Covariance Ellipsoid & Point Cloud
  // ==========================================
  renderCovariance3D(params = { rhoXY: 0.7, rhoXZ: 0.3, rhoYZ: 0.2, scale: 1.0 }) {
    if (!this.scene) return;
    this.currentMode = 'cov3d';
    this.clearActiveObjects();

    const { rhoXY = 0.7, rhoXZ = 0.3, rhoYZ = 0.2 } = params;

    const count = this.covBasePoints.length;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    // Cholesky decomposition approximation for 3D correlation
    const l11 = 1.0;
    const l21 = rhoXY;
    const l22 = Math.sqrt(Math.max(0.01, 1 - l21 * l21));
    const l31 = rhoXZ;
    const l32 = (rhoYZ - l31 * l21) / l22;
    const l33 = Math.sqrt(Math.max(0.01, 1 - l31 * l31 - l32 * l32));

    // Transform deterministic base points smoothly without jitter
    for (let i = 0; i < count; i++) {
      const { z1, z2, z3 } = this.covBasePoints[i];
      const x = (l11 * z1) * 2.5;
      const y = (l21 * z1 + l22 * z2) * 2.5;
      const z = (l31 * z1 + l32 * z2 + l33 * z3) * 2.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const ptMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.28,
      transparent: true,
      opacity: 0.85
    });
    const points = new THREE.Points(geom, ptMat);
    this.scene.add(points);
    this.activeObjects.push(points);

    // Dynamic 3D Covariance Ellipsoid wireframe
    const ellGeom = new THREE.SphereGeometry(3.5, 24, 24);
    ellGeom.scale(1.0 + Math.abs(rhoXY), 1.0, 1.0 + Math.abs(rhoXZ));
    const ellMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });
    const ellMesh = new THREE.Mesh(ellGeom, ellMat);
    ellMesh.rotation.z = Math.asin(Math.max(-0.99, Math.min(0.99, rhoXY))) / 2;
    ellMesh.rotation.y = Math.asin(Math.max(-0.99, Math.min(0.99, rhoXZ))) / 2;
    this.scene.add(ellMesh);
    this.activeObjects.push(ellMesh);
  }
}
