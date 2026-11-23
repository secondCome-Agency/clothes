import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Three.js WebGL 3D Studio Mannequin Renderer
 * Renders an editorial 3D studio environment with realistic lighting,
 * shadows, and anatomical mannequin proportions wearing the outfit.
 */
export default function ThreeMannequinScene({
  angle = 0,
  color = 'pitch-black',
  isDragging = false,
  zoom = 1
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const mannequinGroupRef = useRef(null);
  const rendererRef = useRef(null);
  const materialsRef = useRef({});

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || 480;
    const height = mount.clientHeight || 640;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2 / zoom);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // STUDIO LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    // Key Light (Warm softbox)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(-3, 4, 3);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    // Rim Light (Sharp edge backlight)
    const rimLight = new THREE.DirectionalLight(0xff3366, 1.8);
    rimLight.position.set(3, 3, -3);
    scene.add(rimLight);

    // Fill Light
    const fillLight = new THREE.DirectionalLight(0x99bbff, 1.0);
    fillLight.position.set(2, 1, 3);
    scene.add(fillLight);

    // STUDIO FLOOR PEDESTAL
    const pedestalGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.08, 64);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0x141416,
      roughness: 0.3,
      metalness: 0.8
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -1.45;
    pedestal.receiveShadow = true;
    scene.add(pedestal);

    // Pedestal accent ring
    const ringGeo = new THREE.TorusGeometry(1.18, 0.008, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.41;
    scene.add(ring);

    // MANNEQUIN ROOT GROUP
    const mannequinGroup = new THREE.Group();
    scene.add(mannequinGroup);
    mannequinGroupRef.current = mannequinGroup;

    // MATERIALS
    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.15
    });

    const fabricMat = new THREE.MeshStandardMaterial({
      color: color === 'bone-white' ? 0xe2e8f0 : color === 'concrete-slate' ? 0x334155 : 0x111114,
      roughness: 0.85,
      metalness: 0.08
    });

    const pantsMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.75,
      metalness: 0.1
    });

    const soleMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      roughness: 0.4,
      metalness: 0.1
    });

    materialsRef.current = { fabricMat, pantsMat, chromeMat, soleMat };

    // 1. MANNEQUIN HEAD & NECK (CHROME SCULPTED TOP)
    const neckGeo = new THREE.CylinderGeometry(0.08, 0.1, 0.28, 32);
    const neck = new THREE.Mesh(neckGeo, chromeMat);
    neck.position.y = 1.15;
    mannequinGroup.add(neck);

    const headGeo = new THREE.SphereGeometry(0.14, 32, 24);
    headGeo.scale(0.85, 1.1, 0.9);
    const head = new THREE.Mesh(headGeo, chromeMat);
    head.position.y = 1.32;
    mannequinGroup.add(head);

    // 2. HOODIE HOOD
    const hoodGeo = new THREE.SphereGeometry(0.24, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.75);
    hoodGeo.scale(1.1, 1.2, 1.15);
    const hood = new THREE.Mesh(hoodGeo, fabricMat);
    hood.position.set(0, 1.25, -0.05);
    hood.castShadow = true;
    mannequinGroup.add(hood);

    // 3. OVERSIZED HOODIE TORSO (BOXY ARCHITECTURAL CUT)
    const torsoGeo = new THREE.CylinderGeometry(0.48, 0.44, 0.95, 32);
    torsoGeo.scale(1.1, 1, 0.75); // Boxy drop shape
    const torso = new THREE.Mesh(torsoGeo, fabricMat);
    torso.position.y = 0.65;
    torso.castShadow = true;
    mannequinGroup.add(torso);

    // Kangaroo Pocket Box
    const pocketGeo = new THREE.BoxGeometry(0.46, 0.26, 0.1);
    const pocket = new THREE.Mesh(pocketGeo, fabricMat);
    pocket.position.set(0, 0.45, 0.32);
    mannequinGroup.add(pocket);

    // Graphic Brand Plate on Chest (Front)
    const chestPlateGeo = new THREE.PlaneGeometry(0.38, 0.14);
    const canvasTex = document.createElement('canvas');
    canvasTex.width = 512;
    canvasTex.height = 190;
    const tCtx = canvasTex.getContext('2d');
    tCtx.fillStyle = '#0f0f12';
    tCtx.fillRect(0, 0, 512, 190);
    tCtx.strokeStyle = '#e11d48';
    tCtx.lineWidth = 6;
    tCtx.strokeRect(10, 10, 492, 170);
    tCtx.fillStyle = '#f4f4f5';
    tCtx.font = 'bold 54px sans-serif';
    tCtx.textAlign = 'center';
    tCtx.fillText("SAUR HAUL", 256, 80);
    tCtx.fillStyle = '#e11d48';
    tCtx.font = 'bold 26px monospace';
    tCtx.fillText("280 GSM // ARCHIVE", 256, 130);

    const chestTex = new THREE.CanvasTexture(canvasTex);
    const chestPlateMat = new THREE.MeshBasicMaterial({ map: chestTex });
    const chestPlate = new THREE.Mesh(chestPlateGeo, chestPlateMat);
    chestPlate.position.set(0, 0.78, 0.37);
    mannequinGroup.add(chestPlate);

    // Rear Statement Plate (Backprint)
    const rearCanvasTex = document.createElement('canvas');
    rearCanvasTex.width = 512;
    rearCanvasTex.height = 360;
    const rCtx = rearCanvasTex.getContext('2d');
    rCtx.fillStyle = '#0f0f12';
    rCtx.fillRect(0, 0, 512, 360);
    rCtx.strokeStyle = '#3f3f46';
    rCtx.lineWidth = 4;
    rCtx.strokeRect(12, 12, 488, 336);
    rCtx.fillStyle = '#ffffff';
    rCtx.font = 'bold 64px sans-serif';
    rCtx.textAlign = 'center';
    rCtx.fillText("CHAOS & ART", 256, 110);
    rCtx.fillStyle = '#e11d48';
    rCtx.font = 'bold 34px sans-serif';
    rCtx.fillText("SAUR HAUL 2025", 256, 180);
    rCtx.fillStyle = '#a1a1aa';
    rCtx.font = '22px monospace';
    rCtx.fillText("26.2389° N, 73.0243° E", 256, 240);

    const rearTex = new THREE.CanvasTexture(rearCanvasTex);
    const rearPlateMat = new THREE.MeshBasicMaterial({ map: rearTex });
    const rearPlate = new THREE.Mesh(new THREE.PlaneGeometry(0.48, 0.36), rearPlateMat);
    rearPlate.position.set(0, 0.72, -0.37);
    rearPlate.rotation.y = Math.PI;
    mannequinGroup.add(rearPlate);

    // Bottom Ribbed Band
    const hemBandGeo = new THREE.CylinderGeometry(0.44, 0.44, 0.1, 32);
    hemBandGeo.scale(1.08, 1, 0.74);
    const hemBand = new THREE.Mesh(hemBandGeo, fabricMat);
    hemBand.position.y = 0.14;
    mannequinGroup.add(hemBand);

    // 4. OVERSIZED DROP SHOULDERS & SLEEVES
    const createArm = (isLeft) => {
      const armGroup = new THREE.Group();
      const dir = isLeft ? -1 : 1;

      // Drop Shoulder Cap
      const shGeo = new THREE.SphereGeometry(0.18, 16, 16);
      shGeo.scale(1, 1.2, 0.9);
      const sh = new THREE.Mesh(shGeo, fabricMat);
      sh.position.set(dir * 0.52, 0.96, 0);
      armGroup.add(sh);

      // Upper Arm
      const bicepGeo = new THREE.CylinderGeometry(0.15, 0.13, 0.46, 24);
      const bicep = new THREE.Mesh(bicepGeo, fabricMat);
      bicep.position.set(dir * 0.58, 0.7, 0.04);
      bicep.rotation.z = dir * 0.22;
      bicep.rotation.x = 0.12;
      armGroup.add(bicep);

      // Forearm & Ribbed Cuff
      const foreGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.42, 24);
      const fore = new THREE.Mesh(foreGeo, fabricMat);
      fore.position.set(dir * 0.62, 0.35, 0.14);
      fore.rotation.z = dir * 0.1;
      fore.rotation.x = -0.2;
      armGroup.add(fore);

      // Chrome stylized hand
      const handGeo = new THREE.BoxGeometry(0.06, 0.12, 0.08);
      const hand = new THREE.Mesh(handGeo, chromeMat);
      hand.position.set(dir * 0.62, 0.1, 0.2);
      armGroup.add(hand);

      return armGroup;
    };

    mannequinGroup.add(createArm(true));
    mannequinGroup.add(createArm(false));

    // 5. TACTICAL PLEATED WIDE-LEG CARGO PANTS
    const createLeg = (isLeft) => {
      const legGroup = new THREE.Group();
      const dir = isLeft ? -1 : 1;

      // Upper Leg / Thigh (Wide drape)
      const thighGeo = new THREE.CylinderGeometry(0.24, 0.22, 0.75, 24);
      thighGeo.scale(1, 1, 0.85);
      const thigh = new THREE.Mesh(thighGeo, pantsMat);
      thigh.position.set(dir * 0.2, -0.28, 0);
      legGroup.add(thigh);

      // Lower Leg (Wide bell bottom flare over kicks)
      const calfGeo = new THREE.CylinderGeometry(0.22, 0.25, 0.78, 24);
      calfGeo.scale(1.05, 1, 0.95);
      const calf = new THREE.Mesh(calfGeo, pantsMat);
      calf.position.set(dir * 0.21, -0.92, 0);
      legGroup.add(calf);

      // 3D Tactical Bellows Pocket on Side
      const cargoGeo = new THREE.BoxGeometry(0.08, 0.22, 0.18);
      const cargo = new THREE.Mesh(cargoGeo, pantsMat);
      cargo.position.set(dir * 0.42, -0.4, 0.02);
      legGroup.add(cargo);

      // Red pull strap on cargo
      const strapGeo = new THREE.BoxGeometry(0.02, 0.1, 0.02);
      const strapMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });
      const strap = new THREE.Mesh(strapGeo, strapMat);
      strap.position.set(dir * 0.46, -0.44, 0.02);
      legGroup.add(strap);

      // 6. CHUNKY SNEAKER
      const shoeGroup = new THREE.Group();
      shoeGroup.position.set(dir * 0.21, -1.35, 0.04);

      // Chunky Platform Sole
      const soleGeo = new THREE.BoxGeometry(0.22, 0.1, 0.42);
      const sole = new THREE.Mesh(soleGeo, soleMat);
      sole.position.y = -0.05;
      shoeGroup.add(sole);

      // Upper runner
      const upperGeo = new THREE.BoxGeometry(0.2, 0.14, 0.38);
      const upperMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
      const upper = new THREE.Mesh(upperGeo, upperMat);
      upper.position.y = 0.06;
      shoeGroup.add(upper);

      legGroup.add(shoeGroup);

      return legGroup;
    };

    mannequinGroup.add(createLeg(true));
    mannequinGroup.add(createLeg(false));

    // ANIMATION LOOP
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Update rotation from props
      if (mannequinGroupRef.current) {
        mannequinGroupRef.current.rotation.y = angle;
      }

      renderer.render(scene, camera);
    };
    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update angle on changes
  useEffect(() => {
    if (mannequinGroupRef.current) {
      mannequinGroupRef.current.rotation.y = angle;
    }
  }, [angle]);

  // Update color on change
  useEffect(() => {
    if (materialsRef.current && materialsRef.current.fabricMat) {
      const hex = color === 'bone-white' ? 0xe2e8f0 : color === 'concrete-slate' ? 0x334155 : 0x111114;
      materialsRef.current.fabricMat.color.setHex(hex);
    }
  }, [color]);

  return <div ref={mountRef} className="w-full h-full block" />;
}
