import React, { useRef, useEffect } from 'react';

/**
 * High-Performance Procedural 360° Fashion Mannequin Rendering Engine
 * Renders a full-body editorial fashion mannequin wearing the SAUR HAUL
 * heavyweight drop hoodie, tactical pleated cargo pants, and chunky sneakers.
 * Angle in radians (0 to 2*PI), smoothly interpolated with inertia and dynamic lighting.
 */
export default function Mannequin360Canvas({ 
  angle = 0, 
  color = 'pitch-black', 
  isDragging = false,
  zoom = 1,
  showWireframe = false 
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 480;
    const height = rect.height || 640;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Center and scale
    const cx = width / 2;
    const cy = height * 0.52;
    const scale = (height / 680) * zoom;

    // Normalize angle to [0, 2*PI]
    const normAngle = ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
    
    // Trigonometric components for 3D projection
    const sinA = Math.sin(normAngle); // -1 (left profile) to 1 (right profile)
    const cosA = Math.cos(normAngle); // 1 (front) to -1 (back)

    // Palette based on selected outfit color
    let fabricBase = '#111113';
    let fabricShade = '#080809';
    let fabricHighlight = '#242428';
    let textGraphicColor = '#f4f4f5';

    if (color === 'concrete-slate') {
      fabricBase = '#334155';
      fabricShade = '#1e293b';
      fabricHighlight = '#475569';
      textGraphicColor = '#ffffff';
    } else if (color === 'bone-white') {
      fabricBase = '#e2e8f0';
      fabricShade = '#cbd5e1';
      fabricHighlight = '#f8fafc';
      textGraphicColor = '#0f172a';
    }

    // Light source angle: Top-left studio softbox
    const lightX = -0.5;
    const lightY = -0.7;

    // ==========================================
    // 1. FLOOR STUDIO REFLECTION & CONTACT SHADOW
    // ==========================================
    const shadowY = cy + 240 * scale;
    const shadowGrad = ctx.createRadialGradient(
      cx, shadowY, 10 * scale,
      cx, shadowY, 150 * scale
    );
    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.65)');
    shadowGrad.addColorStop(0.4, 'rgba(0, 0, 0, 0.35)');
    shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx + sinA * 5 * scale, shadowY, 130 * scale, 22 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = shadowGrad;
    ctx.fill();

    // Subtle studio pedestal circular ring
    ctx.beginPath();
    ctx.ellipse(cx, shadowY, 140 * scale, 26 * scale, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Degree tick marks on pedestal
    for (let i = 0; i < 36; i++) {
      const a = (i * 10 * Math.PI) / 180;
      const tx = cx + Math.cos(a) * 140 * scale;
      const ty = shadowY + Math.sin(a) * 26 * scale;
      ctx.beginPath();
      ctx.arc(tx, ty, i % 9 === 0 ? 2 : 1, 0, Math.PI * 2);
      ctx.fillStyle = i % 9 === 0 ? 'rgba(225, 29, 72, 0.8)' : 'rgba(255, 255, 255, 0.2)';
      ctx.fill();
    }
    ctx.restore();

    // ==========================================
    // 2. CHUNKY PLATFORM STREETWEAR SNEAKERS
    // ==========================================
    const drawSneaker = (isLeft) => {
      const legOffset = isLeft ? -28 : 28;
      // 3D rotation of feet
      const footX = cx + (legOffset * cosA - (isLeft ? -5 : 5) * sinA) * scale;
      const footZ = legOffset * sinA + (isLeft ? -5 : 5) * cosA;
      const footY = cy + 225 * scale;

      // Sole depth
      const soleDepth = 14 * scale;
      const soleWidth = (26 + Math.abs(sinA) * 16) * scale;
      const soleDir = sinA; // facing direction

      ctx.save();
      // Sneaker shadow
      ctx.beginPath();
      ctx.ellipse(footX, footY + 12 * scale, 22 * scale, 6 * scale, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fill();

      // Sculpted Chunky Sole (Off-white / bone with tread)
      ctx.beginPath();
      ctx.roundRect(
        footX - soleWidth / 2 + soleDir * 6 * scale,
        footY + 4 * scale,
        soleWidth,
        soleDepth,
        4 * scale
      );
      const soleGrad = ctx.createLinearGradient(footX - soleWidth / 2, footY, footX + soleWidth / 2, footY + soleDepth);
      soleGrad.addColorStop(0, '#e4e4e7');
      soleGrad.addColorStop(0.5, '#d4d4d8');
      soleGrad.addColorStop(1, '#a1a1aa');
      ctx.fillStyle = soleGrad;
      ctx.fill();
      ctx.strokeStyle = '#27272a';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sole tread grooves
      for (let g = 0; g < 3; g++) {
        ctx.beginPath();
        const gx = footX - soleWidth / 3 + (g * soleWidth) / 3;
        ctx.moveTo(gx, footY + 5 * scale);
        ctx.lineTo(gx, footY + 16 * scale);
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.stroke();
      }

      // Sneaker Upper (Brutalist Streetwear Runner)
      ctx.beginPath();
      ctx.moveTo(footX - soleWidth / 2 + 2 * scale, footY + 4 * scale);
      ctx.lineTo(footX - 10 * scale, footY - 14 * scale);
      ctx.lineTo(footX + 12 * scale + soleDir * 10 * scale, footY - 10 * scale);
      ctx.lineTo(footX + soleWidth / 2 - 2 * scale, footY + 4 * scale);
      ctx.closePath();
      const upperGrad = ctx.createLinearGradient(footX, footY - 14 * scale, footX, footY + 4 * scale);
      upperGrad.addColorStop(0, '#18181b');
      upperGrad.addColorStop(1, '#27272a');
      ctx.fillStyle = upperGrad;
      ctx.fill();
      ctx.strokeStyle = '#3f3f46';
      ctx.stroke();

      // Red accent detail tab on heel / tongue
      ctx.beginPath();
      ctx.rect(footX + (isLeft ? -8 : 8) * scale, footY - 12 * scale, 4 * scale, 3 * scale);
      ctx.fillStyle = '#e11d48';
      ctx.fill();

      ctx.restore();
    };

    // Draw sneakers with depth sort
    if (sinA > 0) {
      drawSneaker(true); // left foot first
      drawSneaker(false); // right foot
    } else {
      drawSneaker(false);
      drawSneaker(true);
    }

    // ==========================================
    // 3. TACTICAL PLEATED WIDE-LEG CARGO PANTS
    // ==========================================
    const pantsTopY = cy + 40 * scale;
    const pantsBottomY = cy + 220 * scale;

    ctx.save();
    // Shadow Coal / Tactical Olive Dark palette
    const pantsGrad = ctx.createLinearGradient(cx - 70 * scale, pantsTopY, cx + 70 * scale, pantsBottomY);
    pantsGrad.addColorStop(0, '#1c1c1f');
    pantsGrad.addColorStop(0.3, '#141416');
    pantsGrad.addColorStop(0.7, '#18181b');
    pantsGrad.addColorStop(1, '#111113');

    // Left and Right leg contours with architectural pleats and wide flare
    const waistWidth = 56 * scale;
    const hemWidth = 32 * scale;
    const leftHemX = cx - 34 * scale * (1 + 0.15 * cosA) + sinA * 8 * scale;
    const rightHemX = cx + 34 * scale * (1 - 0.15 * cosA) + sinA * 8 * scale;

    // Full pants shape
    ctx.beginPath();
    // Waist
    ctx.moveTo(cx - waistWidth * cosA, pantsTopY);
    // Left outer hip & thigh
    ctx.bezierCurveTo(
      cx - 68 * scale + sinA * 10 * scale, pantsTopY + 50 * scale,
      leftHemX - hemWidth, pantsBottomY - 40 * scale,
      leftHemX - hemWidth * 0.7, pantsBottomY
    );
    // Left hem
    ctx.lineTo(leftHemX + hemWidth * 0.4, pantsBottomY);
    // Inseam crotch
    ctx.lineTo(cx + sinA * 6 * scale, pantsTopY + 70 * scale);
    // Right inseam
    ctx.lineTo(rightHemX - hemWidth * 0.4, pantsBottomY);
    // Right hem
    ctx.lineTo(rightHemX + hemWidth * 0.7, pantsBottomY);
    // Right outer hip & thigh
    ctx.bezierCurveTo(
      rightHemX + hemWidth, pantsBottomY - 40 * scale,
      cx + 68 * scale + sinA * 10 * scale, pantsTopY + 50 * scale,
      cx + waistWidth * cosA, pantsTopY
    );
    ctx.closePath();

    ctx.fillStyle = pantsGrad;
    ctx.fill();
    ctx.strokeStyle = '#27272a';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Tactical Pleats & Vertical Drape Creases
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1.2;

    // Center fly or back seam
    ctx.beginPath();
    ctx.moveTo(cx + sinA * 8 * scale, pantsTopY);
    ctx.lineTo(cx + sinA * 6 * scale, pantsTopY + 70 * scale);
    ctx.stroke();

    // Left and right architectural pleat lines
    if (cosA > -0.5) { // Visible mostly from front and sides
      ctx.beginPath();
      ctx.moveTo(cx - 20 * scale * cosA, pantsTopY + 8 * scale);
      ctx.lineTo(leftHemX - 4 * scale, pantsBottomY - 10 * scale);
      ctx.moveTo(cx + 20 * scale * cosA, pantsTopY + 8 * scale);
      ctx.lineTo(rightHemX + 4 * scale, pantsBottomY - 10 * scale);
      ctx.stroke();
    }

    // Articulated 3D Cargo Bellows Pockets (visible on sides & 3/4 view)
    const cargoVisibility = Math.abs(sinA);
    if (cargoVisibility > 0.25) {
      const pocketSide = sinA > 0 ? 1 : -1;
      const pocketX = cx + pocketSide * (48 + Math.abs(sinA) * 12) * scale;
      const pocketY = pantsTopY + 75 * scale;
      const pocketW = 24 * scale;
      const pocketH = 34 * scale;

      ctx.save();
      // Pocket 3D box
      ctx.fillStyle = '#1e1e22';
      ctx.beginPath();
      ctx.roundRect(pocketX - pocketW / 2, pocketY, pocketW, pocketH, 3 * scale);
      ctx.fill();
      ctx.strokeStyle = '#3f3f46';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Pocket flap
      ctx.fillStyle = '#27272a';
      ctx.beginPath();
      ctx.roundRect(pocketX - pocketW / 2, pocketY - 2 * scale, pocketW, 10 * scale, [3 * scale, 3 * scale, 0, 0]);
      ctx.fill();

      // Tactical nylon pull strap hanging down
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(pocketX - 2 * scale, pocketY + 8 * scale, 4 * scale, 14 * scale);
      ctx.restore();
    }

    // Fabric wrinkle shadows across knees
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(leftHemX - 10 * scale, pantsTopY + 110 * scale);
    ctx.quadraticCurveTo(leftHemX, pantsTopY + 115 * scale, leftHemX + 12 * scale, pantsTopY + 112 * scale);
    ctx.moveTo(rightHemX - 12 * scale, pantsTopY + 112 * scale);
    ctx.quadraticCurveTo(rightHemX, pantsTopY + 115 * scale, rightHemX + 10 * scale, pantsTopY + 110 * scale);
    ctx.stroke();

    ctx.restore();

    // ==========================================
    // 4. SIGNATURE 450 GSM OVERSIZED DROP HOODIE
    // ==========================================
    const shoulderY = cy - 130 * scale;
    const chestY = cy - 50 * scale;
    const waistHemY = cy + 48 * scale;
    const bodyHalfWidth = (78 + Math.abs(cosA) * 14) * scale;
    const shoulderDropWidth = (108 + Math.abs(cosA) * 12) * scale;

    ctx.save();

    // Dynamic linear gradient for fabric based on rotation
    const hoodieGrad = ctx.createLinearGradient(
      cx - shoulderDropWidth, shoulderY,
      cx + shoulderDropWidth, waistHemY
    );
    hoodieGrad.addColorStop(0, fabricHighlight);
    hoodieGrad.addColorStop(0.35, fabricBase);
    hoodieGrad.addColorStop(0.8, fabricShade);
    hoodieGrad.addColorStop(1, '#050506');

    // ARMS & SLEEVES (Drawn first so torso drapes cleanly)
    const drawSleeve = (isLeft) => {
      const armDir = isLeft ? -1 : 1;
      const shX = cx + armDir * shoulderDropWidth * 0.92;
      const shY = shoulderY + 28 * scale;
      const elbowX = cx + armDir * (shoulderDropWidth * 0.98 + sinA * armDir * 12 * scale);
      const elbowY = cy - 20 * scale;
      const wristX = cx + armDir * (bodyHalfWidth * 0.88 + sinA * armDir * 8 * scale);
      const wristY = cy + 42 * scale;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(shX, shY - 14 * scale);
      ctx.bezierCurveTo(elbowX + armDir * 18 * scale, elbowY - 20 * scale, elbowX + armDir * 14 * scale, elbowY + 20 * scale, wristX + armDir * 10 * scale, wristY);
      ctx.lineTo(wristX - armDir * 8 * scale, wristY);
      ctx.bezierCurveTo(elbowX - armDir * 12 * scale, elbowY + 15 * scale, elbowX - armDir * 10 * scale, elbowY - 25 * scale, shX - armDir * 22 * scale, shY + 18 * scale);
      ctx.closePath();

      const armGrad = ctx.createLinearGradient(shX, shY, wristX, wristY);
      armGrad.addColorStop(0, fabricBase);
      armGrad.addColorStop(0.5, fabricShade);
      armGrad.addColorStop(1, '#09090b');
      ctx.fillStyle = armGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Ribbed wrist cuff
      ctx.fillStyle = '#18181b';
      ctx.beginPath();
      ctx.roundRect(wristX - 8 * scale, wristY, 18 * scale, 10 * scale, 2 * scale);
      ctx.fill();

      // Editorial cuff barcode / typography print on right sleeve
      if (!isLeft && Math.abs(cosA) < 0.6) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = `bold ${5 * scale}px "Space Mono", monospace`;
        ctx.fillText("HAUL // 2025", wristX - 6 * scale, wristY + 7 * scale);
      }
      ctx.restore();
    };

    // Draw sleeves based on Z-depth
    if (sinA < 0) {
      drawSleeve(false); // right sleeve behind
      drawSleeve(true);  // left sleeve front
    } else {
      drawSleeve(true);
      drawSleeve(false);
    }

    // MAIN TORSO (BOX SHAPE WITH RELAXED DRAPE)
    ctx.beginPath();
    // Collar center
    ctx.moveTo(cx - 36 * scale * cosA, shoulderY - 8 * scale);
    // Left shoulder drop line
    ctx.lineTo(cx - shoulderDropWidth, shoulderY + 24 * scale);
    // Left side body (slightly tapering into wide hem)
    ctx.bezierCurveTo(
      cx - bodyHalfWidth * 1.05 + sinA * 6 * scale, chestY,
      cx - bodyHalfWidth * 0.98 + sinA * 4 * scale, waistHemY - 15 * scale,
      cx - bodyHalfWidth * 0.92, waistHemY
    );
    // Bottom ribbed hem (curved by rotation perspective)
    ctx.quadraticCurveTo(
      cx + sinA * 10 * scale, waistHemY + 14 * scale * cosA,
      cx + bodyHalfWidth * 0.92, waistHemY
    );
    // Right side body
    ctx.bezierCurveTo(
      cx + bodyHalfWidth * 0.98 + sinA * 4 * scale, waistHemY - 15 * scale,
      cx + bodyHalfWidth * 1.05 + sinA * 6 * scale, chestY,
      cx + shoulderDropWidth, shoulderY + 24 * scale
    );
    // Right shoulder drop line
    ctx.lineTo(cx + 36 * scale * cosA, shoulderY - 8 * scale);
    ctx.closePath();

    ctx.fillStyle = hoodieGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Heavyweight Ribbed Bottom Band
    ctx.fillStyle = '#0f0f11';
    ctx.beginPath();
    ctx.moveTo(cx - bodyHalfWidth * 0.92, waistHemY);
    ctx.quadraticCurveTo(cx + sinA * 10 * scale, waistHemY + 14 * scale * cosA, cx + bodyHalfWidth * 0.92, waistHemY);
    ctx.lineTo(cx + bodyHalfWidth * 0.92, waistHemY + 12 * scale);
    ctx.quadraticCurveTo(cx + sinA * 10 * scale, waistHemY + 26 * scale * cosA, cx - bodyHalfWidth * 0.92, waistHemY + 12 * scale);
    ctx.closePath();
    ctx.fill();

    // Rib vertical lines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let r = -5; r <= 5; r++) {
      const rx = cx + (r * bodyHalfWidth * 0.15) + sinA * 6 * scale;
      ctx.beginPath();
      ctx.moveTo(rx, waistHemY + 2 * scale);
      ctx.lineTo(rx, waistHemY + 12 * scale);
      ctx.stroke();
    }

    // ==========================================
    // 5. ROTATION-DEPENDENT GRAPHICS & DETAILS
    // ==========================================
    
    // --- FRONT VIEW GRAPHICS (cosA > 0.15) ---
    if (cosA > 0.15) {
      const frontAlpha = Math.min(1, (cosA - 0.15) / 0.5);
      ctx.save();
      ctx.globalAlpha = frontAlpha;

      // Chest Puff Print Graphic: "SAUR HAUL // 01 ARCHIVE"
      const graphicX = cx + sinA * 30 * scale;
      const graphicY = chestY - 15 * scale;
      const graphicWidth = 72 * scale * cosA;

      // High-density puff typography banner
      ctx.save();
      ctx.translate(graphicX, graphicY);
      ctx.scale(cosA, 1);

      // Distressed geometric brand mark
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 2;
      ctx.strokeRect(-26 * scale, -18 * scale, 52 * scale, 4 * scale);

      // Primary Brand Name
      ctx.fillStyle = textGraphicColor;
      ctx.font = `800 ${14 * scale}px "Syne", sans-serif`;
      ctx.textAlign = 'center';
      ctx.letterSpacing = '2px';
      ctx.fillText("SAUR HAUL", 0, 0);

      // Sub-specifications in technical monospace
      ctx.fillStyle = 'rgba(225, 29, 72, 0.9)';
      ctx.font = `bold ${6 * scale}px "Space Mono", monospace`;
      ctx.fillText("280 GSM HEAVYWEIGHT // SPEC. 01", 0, 10 * scale);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.font = `500 ${5 * scale}px "Space Grotesk", sans-serif`;
      ctx.fillText("NOT EVERYONE GETS IT. THAT'S THE POINT.", 0, 18 * scale);
      ctx.restore();

      // Kangaroo Pocket with curved seamlines
      const pocketTop = chestY + 22 * scale;
      const pocketW = 54 * scale * cosA;
      ctx.beginPath();
      ctx.moveTo(cx - pocketW + sinA * 15 * scale, pocketTop + 14 * scale);
      ctx.lineTo(cx - pocketW * 0.7 + sinA * 12 * scale, pocketTop);
      ctx.lineTo(cx + pocketW * 0.7 + sinA * 12 * scale, pocketTop);
      ctx.lineTo(cx + pocketW + sinA * 15 * scale, pocketTop + 14 * scale);
      ctx.lineTo(cx + pocketW * 0.9 + sinA * 10 * scale, waistHemY);
      ctx.lineTo(cx - pocketW * 0.9 + sinA * 10 * scale, waistHemY);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Double bar-tack stitching on pocket mouth
      ctx.fillStyle = '#e11d48';
      ctx.fillRect(cx - pocketW + sinA * 15 * scale, pocketTop + 12 * scale, 3 * scale, 2 * scale);
      ctx.fillRect(cx + pocketW + sinA * 15 * scale - 3 * scale, pocketTop + 12 * scale, 3 * scale, 2 * scale);

      ctx.restore();
    }

    // --- REAR BACKPRINT VIEW GRAPHICS (cosA < -0.15) ---
    if (cosA < -0.15) {
      const backAlpha = Math.min(1, (-cosA - 0.15) / 0.5);
      ctx.save();
      ctx.globalAlpha = backAlpha;

      const rearX = cx + sinA * 26 * scale;
      const rearY = chestY - 10 * scale;
      const rearWidth = Math.abs(cosA);

      ctx.save();
      ctx.translate(rearX, rearY);
      ctx.scale(rearWidth, 1);

      // Statement Spine Box
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(-42 * scale, -32 * scale, 84 * scale, 76 * scale);

      // Giant Typography: "CHAOS & ART"
      ctx.fillStyle = textGraphicColor;
      ctx.font = `800 ${18 * scale}px "Syne", sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText("CHAOS", 0, -12 * scale);

      ctx.fillStyle = '#e11d48';
      ctx.font = `800 ${18 * scale}px "Syne", sans-serif`;
      ctx.fillText("& ART", 0, 8 * scale);

      // Japanese street Kanji / Subtitle
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = `bold ${7 * scale}px "Space Mono", monospace`;
      ctx.fillText("SAUR HAUL // ARCHIVE 2025", 0, 24 * scale);

      // Technical coordinates & barcode
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = `5 * scale}px "Space Mono", monospace`;
      ctx.fillText("26.2389° N, 73.0243° E // JODHPUR", 0, 34 * scale);

      // Barcode bars
      for (let b = -30; b <= 30; b += 3) {
        ctx.fillStyle = (b % 6 === 0) ? '#e11d48' : 'rgba(255, 255, 255, 0.6)';
        ctx.fillRect(b * scale, 37 * scale, 1.8 * scale, 5 * scale);
      }

      ctx.restore();
      ctx.restore();
    }

    // --- SIDE PROFILE DETAILS (Math.abs(sinA) > 0.65) ---
    if (Math.abs(sinA) > 0.65) {
      const sideAlpha = (Math.abs(sinA) - 0.65) / 0.35;
      ctx.save();
      ctx.globalAlpha = sideAlpha;

      // Drop Shoulder Armhole Curve Seamline
      const seamX = cx + (sinA > 0 ? 1 : -1) * 36 * scale;
      ctx.beginPath();
      ctx.moveTo(seamX, shoulderY + 5 * scale);
      ctx.bezierCurveTo(
        seamX + (sinA > 0 ? 12 : -12) * scale, chestY,
        seamX + (sinA > 0 ? 6 : -6) * scale, waistHemY - 20 * scale,
        seamX, waistHemY
      );
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.restore();
    }

    // ==========================================
    // 6. ARCHITECTURAL DOUBLE-LAYER HOOD
    // ==========================================
    const hoodTopY = cy - 195 * scale;
    const hoodBaseY = shoulderY + 4 * scale;
    const hoodHalfW = (44 + Math.abs(cosA) * 6) * scale;

    ctx.save();
    const hoodGrad = ctx.createLinearGradient(cx - hoodHalfW, hoodTopY, cx + hoodHalfW, hoodBaseY);
    hoodGrad.addColorStop(0, '#1c1c20');
    hoodGrad.addColorStop(0.5, '#121215');
    hoodGrad.addColorStop(1, '#0a0a0c');

    ctx.beginPath();
    // Hood drape with deep slouch
    ctx.moveTo(cx - 30 * scale, hoodBaseY);
    ctx.bezierCurveTo(
      cx - hoodHalfW * 1.15 + sinA * 8 * scale, hoodTopY + 40 * scale,
      cx - hoodHalfW * 0.9, hoodTopY,
      cx + sinA * 6 * scale, hoodTopY
    );
    ctx.bezierCurveTo(
      cx + hoodHalfW * 0.9, hoodTopY,
      cx + hoodHalfW * 1.15 + sinA * 8 * scale, hoodTopY + 40 * scale,
      cx + 30 * scale, hoodBaseY
    );
    // Collar rim
    ctx.quadraticCurveTo(cx + sinA * 8 * scale, hoodBaseY + 12 * scale * cosA, cx - 30 * scale, hoodBaseY);
    ctx.closePath();

    ctx.fillStyle = hoodGrad;
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Hood Opening / Face Void or Mannequin Head Silhouette
    // Editorial headless mannequin neck chrome cylinder
    const neckY = hoodBaseY - 22 * scale;
    const neckW = 16 * scale;
    const neckGrad = ctx.createLinearGradient(cx - neckW, neckY, cx + neckW, neckY);
    neckGrad.addColorStop(0, '#52525b');
    neckGrad.addColorStop(0.4, '#a1a1aa');
    neckGrad.addColorStop(0.7, '#f4f4f5');
    neckGrad.addColorStop(1, '#3f3f46');

    ctx.beginPath();
    ctx.ellipse(cx + sinA * 4 * scale, neckY, neckW, 8 * scale, 0, 0, Math.PI * 2);
    ctx.fillStyle = neckGrad;
    ctx.fill();

    // Sculpted matte chrome mannequin neck topper
    ctx.beginPath();
    ctx.arc(cx + sinA * 4 * scale, neckY - 6 * scale, 6 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#e4e4e7';
    ctx.fill();

    ctx.restore();

    // ==========================================
    // 7. WIREFRAME / CAD INSPECTION OVERLAY (OPTIONAL)
    // ==========================================
    if (showWireframe) {
      ctx.save();
      ctx.strokeStyle = 'rgba(225, 29, 72, 0.4)';
      ctx.lineWidth = 0.8;
      // Contour latitude lines
      for (let y = hoodTopY; y < pantsBottomY; y += 20 * scale) {
        ctx.beginPath();
        ctx.ellipse(cx + sinA * 10 * scale, y, 70 * scale, 12 * scale * Math.abs(cosA) + 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    ctx.restore();
  }, [angle, color, isDragging, zoom, showWireframe]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block touch-none select-none pointer-events-none"
      style={{ filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.7))' }}
    />
  );
}
