import cv2
import numpy as np
import math
from PIL import Image, ImageDraw, ImageFont
import os

width, height = 640, 800
fps = 30
duration = 4.0  # 4 seconds full 360 rotation
total_frames = int(fps * duration)

os.makedirs('public/assets/videos', exist_ok=True)
os.makedirs('public/assets/images', exist_ok=True)

video_path = 'public/assets/videos/mannequin-360.mp4'
poster_path = 'public/assets/images/mannequin-poster.jpg'

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(video_path, fourcc, fps, (width, height))

print(f"Generating {total_frames} frames for 360-degree turntable video ({width}x{height})...")

for frame_idx in range(total_frames):
    angle = (frame_idx / total_frames) * 2 * math.pi
    sinA = math.sin(angle)
    cosA = math.cos(angle)
    
    # Create high-end studio background (clean minimal off-white / light neutral)
    img = Image.new('RGB', (width, height), (248, 248, 249))
    draw = ImageDraw.Draw(img)
    
    cx = width // 2
    cy = int(height * 0.48)
    scale = height / 700.0
    
    # 1. Studio Lighting Floor Shadow & Pedestal
    shadow_y = cy + int(240 * scale)
    for r in range(120, 0, -8):
        alpha = int(25 * (1 - r / 120))
        draw.ellipse([
            cx - int(r * 1.3 * scale), shadow_y - int(r * 0.22 * scale),
            cx + int(r * 1.3 * scale), shadow_y + int(r * 0.22 * scale)
        ], fill=(210 - alpha, 210 - alpha, 215 - alpha))
        
    # Pedestal circular ring
    draw.ellipse([
        cx - int(140 * scale), shadow_y - int(24 * scale),
        cx + int(140 * scale), shadow_y + int(24 * scale)
    ], outline=(220, 220, 225), width=2)
    
    # 2. Chunky Platform Streetwear Runners
    def draw_foot(is_left):
        leg_offset = -28 if is_left else 28
        fx = cx + int((leg_offset * cosA - (-5 if is_left else 5) * sinA) * scale)
        fy = cy + int(225 * scale)
        sole_w = int((28 + abs(sinA) * 14) * scale)
        sole_h = int(14 * scale)
        
        # Sole (Bone white / light grey)
        draw.rectangle([
            fx - sole_w // 2, fy + 2,
            fx + sole_w // 2, fy + 2 + sole_h
        ], fill=(225, 225, 228), outline=(180, 180, 185), width=1)
        
        # Shoe upper (Brutalist street runner dark grey)
        draw.polygon([
            (fx - sole_w // 2, fy + 2),
            (fx - int(10 * scale), fy - int(12 * scale)),
            (fx + int(12 * scale + sinA * 6 * scale), fy - int(8 * scale)),
            (fx + sole_w // 2, fy + 2)
        ], fill=(35, 35, 40), outline=(60, 60, 65))
        
        # Red heel / tongue accent
        draw.rectangle([
            fx + int((-6 if is_left else 6) * scale), fy - int(10 * scale),
            fx + int((-2 if is_left else 10) * scale), fy - int(6 * scale)
        ], fill=(225, 29, 72))

    if sinA > 0:
        draw_foot(True)
        draw_foot(False)
    else:
        draw_foot(False)
        draw_foot(True)
        
    # 3. Tactical Pleated Wide-Leg Cargo Pants (Dark Charcoal / Jet Black)
    pants_top = cy + int(40 * scale)
    pants_bot = cy + int(220 * scale)
    waist_w = int(54 * scale * abs(cosA) + 40 * scale)
    hem_w = int(34 * scale)
    
    left_hem_x = cx - int(34 * scale * (1 + 0.15 * cosA) - sinA * 8 * scale)
    right_hem_x = cx + int(34 * scale * (1 - 0.15 * cosA) + sinA * 8 * scale)
    
    draw.polygon([
        (cx - waist_w // 2, pants_top),
        (left_hem_x - hem_w, pants_bot),
        (left_hem_x + int(hem_w * 0.4), pants_bot),
        (cx + int(sinA * 6 * scale), pants_top + int(70 * scale)),
        (right_hem_x - int(hem_w * 0.4), pants_bot),
        (right_hem_x + hem_w, pants_bot),
        (cx + waist_w // 2, pants_top)
    ], fill=(24, 24, 27), outline=(40, 40, 45), width=1)
    
    # Cargo side pockets
    if abs(sinA) > 0.25:
        p_side = 1 if sinA > 0 else -1
        px = cx + int(p_side * (48 + abs(sinA) * 12) * scale)
        py = pants_top + int(75 * scale)
        draw.rectangle([
            px - int(12 * scale), py,
            px + int(12 * scale), py + int(34 * scale)
        ], fill=(32, 32, 36), outline=(60, 60, 65))
        draw.rectangle([
            px - int(2 * scale), py + int(8 * scale),
            px + int(2 * scale), py + int(22 * scale)
        ], fill=(225, 29, 72))
        
    # 4. Signature Oversized Heavyweight Hoodie (Obsidian / Pitch Black)
    sh_y = cy - int(125 * scale)
    chest_y = cy - int(45 * scale)
    waist_y = cy + int(46 * scale)
    torso_w = int((74 + abs(cosA) * 12) * scale)
    sh_drop_w = int((104 + abs(cosA) * 10) * scale)
    
    # Sleeves
    def draw_sleeve(is_left):
        dir_val = -1 if is_left else 1
        sx = cx + int(dir_val * sh_drop_w * 0.92)
        sy = sh_y + int(24 * scale)
        ex = cx + int(dir_val * (sh_drop_w + sinA * dir_val * 10 * scale))
        ey = cy - int(15 * scale)
        wx = cx + int(dir_val * (torso_w * 0.88 + sinA * dir_val * 6 * scale))
        wy = cy + int(42 * scale)
        
        draw.polygon([
            (sx, sy - int(10 * scale)),
            (ex + dir_val * 16, ey),
            (wx + dir_val * 8, wy),
            (wx - dir_val * 8, wy),
            (ex - dir_val * 10, ey + 10),
            (sx - dir_val * 16, sy + int(14 * scale))
        ], fill=(20, 20, 22), outline=(45, 45, 50), width=1)
        
        # Ribbed wrist cuff
        draw.rectangle([
            wx - int(6 * scale), wy,
            wx + int(6 * scale), wy + int(10 * scale)
        ], fill=(12, 12, 14))

    if sinA < 0:
        draw_sleeve(False)
        draw_sleeve(True)
    else:
        draw_sleeve(True)
        draw_sleeve(False)
        
    # Torso Box
    draw.polygon([
        (cx - int(34 * scale * cosA), sh_y - int(8 * scale)),
        (cx - sh_drop_w, sh_y + int(22 * scale)),
        (cx - torso_w, waist_y),
        (cx + torso_w, waist_y),
        (cx + sh_drop_w, sh_y + int(22 * scale)),
        (cx + int(34 * scale * cosA), sh_y - int(8 * scale))
    ], fill=(16, 16, 18), outline=(35, 35, 40), width=1)
    
    # Bottom Ribbed Band
    draw.rectangle([
        cx - torso_w, waist_y,
        cx + torso_w, waist_y + int(12 * scale)
    ], fill=(10, 10, 12))
    
    # 5. Graphics based on angle
    # FRONT VIEW (cosA > 0.15)
    if cosA > 0.15:
        alpha_factor = min(1.0, (cosA - 0.15) / 0.5)
        gx = cx + int(sinA * 26 * scale)
        gy = chest_y - int(15 * scale)
        gw = int(60 * scale * cosA)
        gh = int(22 * scale)
        
        # Chest Print Box
        draw.rectangle([
            gx - gw // 2, gy - gh // 2,
            gx + gw // 2, gy + gh // 2
        ], fill=(26, 26, 30), outline=(225, 29, 72), width=1)
        
        if cosA > 0.4:
            draw.text((gx - int(24 * cosA * scale), gy - int(8 * scale)), "SAUR HAUL", fill=(240, 240, 245))
            draw.text((gx - int(20 * cosA * scale), gy + int(2 * scale)), "DROP 01 // 450 GSM", fill=(225, 29, 72))
            
        # Kangaroo Pocket
        pw = int(46 * scale * cosA)
        py = chest_y + int(24 * scale)
        draw.polygon([
            (cx - pw, py + int(10 * scale)),
            (cx - int(pw * 0.7), py),
            (cx + int(pw * 0.7), py),
            (cx + pw, py + int(10 * scale)),
            (cx + int(pw * 0.9), waist_y),
            (cx - int(pw * 0.9), waist_y)
        ], fill=(10, 10, 12), outline=(35, 35, 40), width=1)
        
    # REAR BACKPRINT (cosA < -0.15)
    if cosA < -0.15:
        rx = cx + int(sinA * 24 * scale)
        ry = chest_y - int(10 * scale)
        rw = int(72 * scale * abs(cosA))
        rh = int(64 * scale)
        
        draw.rectangle([
            rx - rw // 2, ry - rh // 2,
            rx + rw // 2, ry + rh // 2
        ], fill=(22, 22, 25), outline=(60, 60, 65), width=1)
        
        if abs(cosA) > 0.4:
            draw.text((rx - int(22 * abs(cosA) * scale), ry - int(24 * scale)), "CHAOS & ART", fill=(245, 245, 248))
            draw.text((rx - int(20 * abs(cosA) * scale), ry - int(6 * scale)), "SAUR HAUL 2025", fill=(225, 29, 72))
            draw.text((rx - int(18 * abs(cosA) * scale), ry + int(12 * scale)), "JODHPUR STUDIO", fill=(160, 160, 165))
            
    # 6. Deep Slouch Hood & Sculpted Mannequin Head
    hood_top = cy - int(185 * scale)
    hood_w = int(42 * scale)
    
    # Chrome Mannequin Neck & Head Top
    draw.ellipse([
        cx - int(12 * scale), hood_top + int(15 * scale),
        cx + int(12 * scale), hood_top + int(45 * scale)
    ], fill=(180, 180, 185), outline=(130, 130, 135))
    
    # Hood drape
    draw.polygon([
        (cx - int(28 * scale), sh_y + int(4 * scale)),
        (cx - hood_w, hood_top + int(35 * scale)),
        (cx + int(sinA * 5 * scale), hood_top),
        (cx + hood_w, hood_top + int(35 * scale)),
        (cx + int(28 * scale), sh_y + int(4 * scale))
    ], fill=(22, 22, 24), outline=(45, 45, 50), width=1)
    
    # Frame conversion to OpenCV BGR
    cv_frame = cv2.cvtColor(np.array(img), cv2.COLOR_RGB2BGR)
    out.write(cv_frame)
    
    # Save the first frame as the poster image
    if frame_idx == 0:
        img.save(poster_path, 'JPEG', quality=92)
        print(f"Saved poster image: {poster_path}")

out.release()
print(f"Turntable video generated successfully: {video_path} (Size: {os.path.getsize(video_path)} bytes)")
