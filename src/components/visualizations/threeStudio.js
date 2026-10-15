// src/components/visualizations/threeStudio.js
/**
 * Three.js 3D Interactive Graphics Engine for StatQuest Website.
 * Supports:
 *  1. normal3d: Bivariate Normal Bell Surface with slicing plane & correlation
 *  2. regression3d: 3D Multiple Regression Plane with residual drop lines & Loss Paraboloid
 *  3. mle3d: 3D Log-Likelihood surface with interactive parameter climbing
 *  4. cov3d: 3D Covariance Ellipsoid and rotating point cloud
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

    this.init();
  }

  init() {
    this.container.innerHTML = '';
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 500;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0a0f1d);

    // Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    this.camera.position.set(12, 10, 14);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.1;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight1.position.set(15, 25, 20);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.4);
    dirLight2.position.set(-15, -10, -15);
    this.scene.add(dirLight2);

    // Grid floor
    const grid = new THREE.GridHelper(24, 24, 0x1e293b, 0x0f172a);
    grid.position.y = -0.01;
    this.scene.add(grid);

    // Handle Resize
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    // Start loop
    this.animate();
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animId = requestAnimationFrame(() => this.animate());
    if (this.controls) this.controls.update();
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  clearActiveObjects() {
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
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.resizeObserver) this.resizeObserver.disconnect();
    this.clearActiveObjects();
    if (this.renderer && this.renderer.domElement) {
      this.renderer.dispose();
      this.container.innerHTML = '';
    }
  }

  // ==========================================
  // MODE 1: 3D Bivariate Gaussian Bell Surface
  // ==========================================
  renderNormal3D(params = { muX: 0, muY: 0, sigmaX: 2.0, sigmaY: 2.0, rho: 0.0, slicePos: null }) {
    this.currentMode = 'normal3d';
    this.clearActiveObjects();

    const { muX, muY, sigmaX, sigmaY, rho, slicePos } = params;
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

    let maxHeight = 0;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);

      const dx = (x - muX) / sigmaX;
      const dz = (z - muY) / sigmaY;

      const exponent = -1 / (2 * oneMinusRho2) * (dx * dx - 2 * rho * dx * dz + dz * dz);
      const density = normFactor * Math.exp(exponent);
      const y = density * 18; // scale height for visual clarity
      pos.setY(i, y);

      if (y > maxHeight) maxHeight = y;

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

    // Interactive Slicing Plane if active
    if (slicePos !== null && slicePos !== undefined) {
      const sliceGeom = new THREE.PlaneGeometry(size, 6);
      const sliceMat = new THREE.MeshBasicMaterial({
        color: 0xec4899,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const sliceMesh = new THREE.Mesh(sliceGeom, sliceMat);
      sliceMesh.position.set(slicePos, 3, 0);
      sliceMesh.rotateY(Math.PI / 2);
      this.scene.add(sliceMesh);
      this.activeObjects.push(sliceMesh);
    }
  }

  // ==========================================
  // MODE 2: 3D Multiple Linear Regression & Loss Paraboloid
  // ==========================================
  renderRegression3D(params = { beta0: 2, beta1: 1.2, beta2: -0.8, showResiduals: true, showLossBowl: false }) {
    this.currentMode = 'regression3d';
    this.clearActiveObjects();

    const { beta0, beta1, beta2, showResiduals, showLossBowl } = params;

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
        // Quadratic loss
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
      const curLoss = 1.5 * (beta1 - trueB1)**2 + 1.2 * (beta2 - trueB2)**2;
      ball.position.set(beta1 * 2, Math.min(10, curLoss * 0.8) + 0.35, beta2 * 2);
      this.scene.add(ball);
      this.activeObjects.push(ball);

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
    this.currentMode = 'mle3d';
    this.clearActiveObjects();

    const { candidateMu, candidateSigma } = params;
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
    this.currentMode = 'cov3d';
    this.clearActiveObjects();

    const { rhoXY, rhoXZ, rhoYZ } = params;

    // Generate correlated 3D cloud
    const count = 400;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    // Cholesky decomposition approximation for 3D correlation
    const l11 = 1.0;
    const l21 = rhoXY;
    const l22 = Math.sqrt(Math.max(0.01, 1 - l21 * l21));
    const l31 = rhoXZ;
    const l32 = (rhoYZ - l31 * l21) / l22;
    const l33 = Math.sqrt(Math.max(0.01, 1 - l31 * l31 - l32 * l32));

    for (let i = 0; i < count; i++) {
      // Box-Muller normal draws
      const u1 = Math.random(), u2 = Math.random(), u3 = Math.random(), u4 = Math.random();
      const z1 = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.cos(2 * Math.PI * u2);
      const z2 = Math.sqrt(-2 * Math.log(u1 + 1e-9)) * Math.sin(2 * Math.PI * u2);
      const z3 = Math.sqrt(-2 * Math.log(u3 + 1e-9)) * Math.cos(2 * Math.PI * u4);

      // Correlate: X = L * Z
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
      size: 0.25,
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
