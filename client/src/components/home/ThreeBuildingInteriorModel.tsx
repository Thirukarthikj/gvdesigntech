import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBuildingInteriorModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = mount.clientWidth || 300;
    const height = mount.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 200);
    camera.position.set(22, 24, 24);
    camera.lookAt(0, 0.8, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // Lights (Crisp architectural clay render illumination)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.6);
    hemiLight.position.set(0, 30, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.7);
    keyLight.position.set(18, 28, 16);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 5;
    keyLight.shadow.camera.far = 80;
    keyLight.shadow.camera.left = -14;
    keyLight.shadow.camera.right = 14;
    keyLight.shadow.camera.top = 14;
    keyLight.shadow.camera.bottom = -14;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf1f5f9, 0.7);
    fillLight.position.set(-18, 16, -14);
    scene.add(fillLight);

    // Materials
    const whiteMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.35,
      metalness: 0.02,
    });

    const plinthMat = new THREE.MeshStandardMaterial({
      color: 0xf1f1ee,
      roughness: 0.42,
      metalness: 0.02,
    });

    const floorMat = new THREE.MeshStandardMaterial({
      color: 0xfcfbf9,
      roughness: 0.45,
      metalness: 0.01,
    });

    const furnitureMat = new THREE.MeshStandardMaterial({
      color: 0xeeeeec,
      roughness: 0.4,
      metalness: 0.04,
    });

    const softMat = new THREE.MeshStandardMaterial({
      color: 0xe5e5e3,
      roughness: 0.5,
      metalness: 0.02,
    });

    const redAccentMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.35,
      metalness: 0.05,
    });

    const darkAccentMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.45,
    });

    // Master Group for 360 Rotation
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Helper to add box mesh
    const addBox = (
      w: number,
      h: number,
      d: number,
      x: number,
      y: number,
      z: number,
      mat = whiteMat,
      castShadow = true,
      receiveShadow = true
    ) => {
      const geo = new THREE.BoxGeometry(w, h, d);
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y + h / 2, z);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      houseGroup.add(mesh);
      return mesh;
    };

    // 1. Foundation Plinth Base
    addBox(16.5, 1.2, 14.5, 0, -1.2, 0, plinthMat, false, true);

    // Plinth Front Steps (Entrance)
    addBox(3.8, 0.25, 0.5, -0.6, -0.25, 7.5, plinthMat);
    addBox(3.8, 0.25, 0.5, -0.6, -0.5, 8.0, plinthMat);
    addBox(3.8, 0.25, 0.5, -0.6, -0.75, 8.5, plinthMat);

    // Main Interior Floor Plate
    addBox(14.8, 0.08, 12.8, 0, 0, 0, floorMat, false, true);

    const WALL_H = 2.4;
    const WALL_T = 0.38;

    // 2. Exterior Perimeter Walls with Openings
    // Back Wall (Z = -6.2)
    addBox(3.2, WALL_H, WALL_T, -5.6, 0, -6.2);
    // Back Left Window Sill & Top Lintel
    addBox(2.4, 0.85, WALL_T, -2.8, 0, -6.2);
    addBox(2.4, 0.55, WALL_T, -2.8, 1.85, -6.2);
    // Center-Back Wall (behind stairs)
    addBox(4.4, WALL_H, WALL_T, 0.6, 0, -6.2);
    // Back Right Window (Master Bed)
    addBox(2.2, 0.85, WALL_T, 3.9, 0, -6.2);
    addBox(2.2, 0.55, WALL_T, 3.9, 1.85, -6.2);
    addBox(1.3, WALL_H, WALL_T, 5.65, 0, -6.2);

    // Left Wall (X = -7.2)
    addBox(WALL_T, WALL_H, 4.4, -7.2, 0, -4.0);
    // Left Window (Kitchen/Living)
    addBox(WALL_T, 0.85, 2.4, -7.2, 0, -0.6);
    addBox(WALL_T, 0.55, 2.4, -7.2, 1.85, -0.6);
    addBox(WALL_T, WALL_H, 5.0, -7.2, 0, 3.1);

    // Right Wall (X = +6.4)
    addBox(WALL_T, WALL_H, 4.8, 6.4, 0, -3.8);
    // Right Window (Bedroom 2)
    addBox(WALL_T, 0.85, 2.2, 6.4, 0, -0.3);
    addBox(WALL_T, 0.55, 2.2, 6.4, 1.85, -0.3);
    addBox(WALL_T, WALL_H, 5.0, 6.4, 0, 3.3);

    // Front Wall (Z = +6.2)
    // Front Left Wall (Living Room front)
    addBox(4.6, WALL_H, WALL_T, -4.9, 0, 6.2);
    // Entrance Doorway Opening (X = -2.6 to +1.4 open threshold)
    // Front Right Wall (Bathroom/Bedroom front)
    addBox(1.8, WALL_H, WALL_T, 2.3, 0, 6.2);
    // Front Window (Bathroom)
    addBox(1.5, 1.1, WALL_T, 3.95, 0, 6.2);
    addBox(1.5, 0.4, WALL_T, 3.95, 2.0, 6.2);
    addBox(0.95, WALL_H, WALL_T, 5.18, 0, 6.2);
    // Front Bedroom Window
    addBox(1.8, 0.85, WALL_T, 6.55, 0, 6.2);

    // 3. Interior Partition Walls
    // Hallway / Spine Wall dividing Living (left) from Bedrooms (right)
    addBox(WALL_T, WALL_H, 2.6, 1.4, 0, 4.9);
    // Doorway to bathroom / corridor
    addBox(WALL_T, WALL_H, 3.2, 1.4, 0, 0.6);
    addBox(WALL_T, WALL_H, 3.6, 1.4, 0, -4.4);

    // Bedroom Partition (Master Bed vs Bedroom 2)
    addBox(5.0, WALL_H, WALL_T, 3.9, 0, -1.0);

    // Bathroom Enclosure (Front-Right)
    addBox(3.4, WALL_H, WALL_T, 3.1, 0, 1.8);
    addBox(WALL_T, WALL_H, 4.4, 4.8, 0, 4.0);

    // Kitchen / Staircase Partition Wall
    addBox(WALL_T, WALL_H, 4.4, -0.6, 0, -4.0);

    // 4. Central Staircase (Detailed Treads)
    const STAIR_COUNT = 10;
    const stairStepW = 1.6;
    const stairStepH = 0.18;
    const stairStepD = 0.42;
    for (let i = 0; i < STAIR_COUNT; i++) {
      addBox(
        stairStepW,
        stairStepH,
        stairStepD,
        0.4,
        i * stairStepH,
        -1.6 - i * (stairStepD * 0.9),
        whiteMat
      );
    }
    // Stair stringer wall
    addBox(0.12, 2.0, 4.2, -0.42, 0, -3.5);
    addBox(0.12, 2.0, 4.2, 1.22, 0, -3.5);

    // 5. Living Room Furniture (Front-Left)
    // Main 3-Seater Sofa
    addBox(3.4, 0.45, 1.1, -4.8, 0, 4.6, furnitureMat);
    addBox(3.4, 0.85, 0.28, -4.8, 0, 5.05, furnitureMat); // Backrest
    addBox(0.25, 0.65, 1.1, -6.38, 0, 4.6, furnitureMat); // Left arm
    addBox(0.25, 0.65, 1.1, -3.22, 0, 4.6, furnitureMat); // Right arm
    // Red Accent Pillow
    addBox(0.5, 0.35, 0.15, -4.2, 0.45, 4.85, redAccentMat);

    // Armchair 1 (Left)
    addBox(1.1, 0.45, 1.1, -6.3, 0, 2.8, furnitureMat);
    addBox(0.28, 0.85, 1.1, -6.75, 0, 2.8, furnitureMat);
    // Armchair 2 (Right)
    addBox(1.1, 0.45, 1.1, -3.3, 0, 2.8, furnitureMat);
    addBox(0.28, 0.85, 1.1, -2.85, 0, 2.8, furnitureMat);

    // Coffee Table
    addBox(1.8, 0.35, 1.1, -4.8, 0, 2.8, furnitureMat);
    // TV Credenza against left wall
    addBox(0.5, 0.55, 2.6, -6.8, 0, 4.0, darkAccentMat);

    // 6. Dining Area (Center-Left)
    // Dining Table
    addBox(2.4, 0.75, 1.3, -0.8, 0, 1.2, furnitureMat);
    // 6 Dining Chairs
    const chairZ = [0.65, 1.2, 1.75];
    chairZ.forEach((z) => {
      addBox(0.35, 0.45, 0.35, -2.2, 0, z, softMat);
      addBox(0.08, 0.85, 0.35, -2.35, 0, z, softMat);
      addBox(0.35, 0.45, 0.35, 0.6, 0, z, softMat);
      addBox(0.08, 0.85, 0.35, 0.75, 0, z, softMat);
    });

    // 7. Kitchen (Back-Left)
    // Back Counter
    addBox(3.8, 0.85, 0.85, -4.6, 0, -5.7, furnitureMat);
    // Left Side Counter (L-Shape)
    addBox(0.85, 0.85, 2.8, -6.7, 0, -3.9, furnitureMat);
    // Central Kitchen Island
    addBox(2.2, 0.85, 1.1, -3.6, 0, -3.4, furnitureMat);
    // 2 Island Bar Stools
    addBox(0.35, 0.65, 0.35, -4.1, 0, -2.4, softMat);
    addBox(0.35, 0.65, 0.35, -3.1, 0, -2.4, softMat);

    // 8. Master Bedroom (Back-Right)
    // King-Size Bed
    addBox(2.6, 0.5, 2.8, 4.4, 0, -4.2, furnitureMat);
    addBox(2.8, 1.1, 0.25, 4.4, 0, -5.7, furnitureMat); // Headboard
    // Two Pillows
    addBox(0.95, 0.15, 0.55, 3.7, 0.5, -5.2, softMat);
    addBox(0.95, 0.15, 0.55, 5.1, 0.5, -5.2, softMat);
    // Bedside Nightstands
    addBox(0.55, 0.5, 0.55, 2.7, 0, -5.6, furnitureMat);
    addBox(0.55, 0.5, 0.55, 6.0, 0, -5.6, furnitureMat);
    // Wardrobe along partition wall
    addBox(0.7, 2.1, 2.8, 1.8, 0, -3.8, furnitureMat);
    // Bedroom Desk & Chair
    addBox(1.5, 0.75, 0.6, 3.4, 0, -1.8, furnitureMat);
    addBox(0.4, 0.75, 0.4, 3.4, 0, -2.4, softMat);

    // 9. Bedroom 2 (Front-Right)
    // Double Bed
    addBox(2.4, 0.5, 2.5, 4.6, 0, 3.6, furnitureMat);
    addBox(2.6, 1.0, 0.25, 4.6, 0, 5.0, furnitureMat); // Headboard
    addBox(0.85, 0.15, 0.5, 4.0, 0.5, 4.6, softMat);
    addBox(0.85, 0.15, 0.5, 5.2, 0.5, 4.6, softMat);
    // Nightstand
    addBox(0.5, 0.5, 0.5, 3.1, 0, 4.9, furnitureMat);
    // Built-in Closet
    addBox(0.65, 2.1, 2.0, 1.8, 0, 2.8, furnitureMat);

    // 10. Bathroom Suite (Middle-Right)
    // Bathtub
    addBox(2.0, 0.6, 1.0, 3.0, 0, 3.0, furnitureMat);
    // Vanity Counter with Sink
    addBox(1.4, 0.8, 0.65, 3.0, 0, 4.4, furnitureMat);

    // Initial slight diagonal isometric angle
    houseGroup.rotation.y = -Math.PI / 4;

    // Interactive Drag to Rotate logic
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let autoRotate = true;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      autoRotate = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      houseGroup.rotation.y += deltaX * 0.008;

      // Slight tilt clamping
      camera.position.y = Math.max(16, Math.min(32, camera.position.y - deltaY * 0.05));
      camera.lookAt(0, 0.8, 0);

      previousMousePosition = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      // Resume slow auto-rotation after 1 second
      setTimeout(() => {
        autoRotate = true;
      }, 1000);
    };

    const domElement = renderer.domElement;
    domElement.style.cursor = 'grab';

    domElement.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    domElement.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        houseGroup.rotation.y += 0.004;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!mount) return;
      const newW = mount.clientWidth;
      const newH = mount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      domElement.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);

      domElement.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (mount.contains(domElement)) {
        mount.removeChild(domElement);
      }

      // Dispose all geometries and materials
      houseGroup.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
    />
  );
};
