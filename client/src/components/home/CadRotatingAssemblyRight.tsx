import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

export const CadRotatingAssemblyRight: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera (Perspective set to classic 3D architectural CAD angle)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(5.2, 4.2, 5.2);
    camera.lookAt(0, 1.3, 0);

    // Renderer with transparent background & antialiasing
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Lighting (Warm directional sun + ambient + cool rim light)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.8);
    sunLight.position.set(6, 12, 6);
    scene.add(sunLight);

    const rimLight = new THREE.DirectionalLight(0x94a3b8, 0.9);
    rimLight.position.set(-6, 5, -6);
    scene.add(rimLight);

    // Master Building Group
    const buildingGroup = new THREE.Group();
    buildingGroup.position.set(0, -0.4, 0);
    scene.add(buildingGroup);

    // Cleanup registry
    const disposables: { dispose: () => void }[] = [];

    // Helper: Create architectural box with CAD edge outlines
    const createCadBox = (
      w: number,
      h: number,
      d: number,
      color: number,
      options?: {
        transparent?: boolean;
        opacity?: number;
        edgeColor?: number;
        roughness?: number;
      }
    ) => {
      const geometry = new THREE.BoxGeometry(w, h, d);
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: options?.roughness !== undefined ? options.roughness : 0.25,
        metalness: 0.1,
        transparent: options?.transparent || false,
        opacity: options?.opacity !== undefined ? options.opacity : 1.0,
      });

      const mesh = new THREE.Mesh(geometry, material);

      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({
        color: options?.edgeColor !== undefined ? options.edgeColor : 0x0f172a,
        linewidth: 1,
      });
      const lines = new THREE.LineSegments(edges, lineMaterial);
      mesh.add(lines);

      disposables.push(geometry, material, edges, lineMaterial);
      return mesh;
    };

    // 1. Site Foundation Plinth & Paved Entrance Steps
    const plinth = createCadBox(4.6, 0.16, 4.0, 0xf1f5f9, { edgeColor: 0x94a3b8 });
    plinth.position.set(0, 0.08, 0);
    buildingGroup.add(plinth);

    const steps = createCadBox(1.3, 0.08, 0.7, 0xe2e8f0, { edgeColor: 0x94a3b8 });
    steps.position.set(0.4, 0.04, 2.2);
    buildingGroup.add(steps);

    // Architectural Ground Grid Below Plinth
    const grid = new THREE.GridHelper(5.4, 12, 0xdc2626, 0xe2e8f0);
    grid.position.set(0, 0.005, 0);
    buildingGroup.add(grid);
    disposables.push(grid.geometry, grid.material as any);

    // 2. Ground Floor (Level 01) - Solid Studio Walls
    const groundMain = createCadBox(3.0, 1.45, 2.4, 0xffffff, { edgeColor: 0x1e293b });
    groundMain.position.set(-0.35, 0.16 + 0.725, -0.2);
    buildingGroup.add(groundMain);

    // Ground Floor Glass Living Room & Entrance Corner
    const groundGlass = createCadBox(1.7, 1.4, 1.5, 0x38bdf8, {
      transparent: true,
      opacity: 0.35,
      edgeColor: 0x0284c7,
    });
    groundGlass.position.set(0.9, 0.16 + 0.7, 0.65);
    buildingGroup.add(groundGlass);

    // Glass Mullion Vertical Divider
    const mullion1 = createCadBox(0.04, 1.4, 0.04, 0x0f172a);
    mullion1.position.set(0.9, 0.16 + 0.7, 1.41);
    buildingGroup.add(mullion1);

    // Entrance Door Accent
    const door = createCadBox(0.65, 1.25, 0.04, 0x1e293b, { edgeColor: 0xdc2626 });
    door.position.set(0.25, 0.16 + 0.625, 1.41);
    buildingGroup.add(door);

    // Architectural Red Column (Pillar Supporting Upper Cantilever)
    const pillar = createCadBox(0.12, 1.45, 0.12, 0xdc2626, { edgeColor: 0x991b1b });
    pillar.position.set(1.85, 0.16 + 0.725, 1.45);
    buildingGroup.add(pillar);

    // 3. Middle Slab (Separates Level 01 & Level 02)
    const midSlab = createCadBox(4.2, 0.12, 3.6, 0xe2e8f0, { edgeColor: 0x0f172a });
    midSlab.position.set(0.1, 0.16 + 1.45 + 0.06, 0.15);
    buildingGroup.add(midSlab);

    // 4. Level 02 Upper Floor (Cantilevered Modern Volume)
    const upperFloor = createCadBox(3.2, 1.35, 2.3, 0xffffff, { edgeColor: 0x1e293b });
    upperFloor.position.set(-0.25, 1.79 + 0.675, 0.25);
    buildingGroup.add(upperFloor);

    // Panoramic Ribbon Window (Level 02 Front)
    const upperWindow = createCadBox(2.6, 0.75, 0.06, 0x38bdf8, {
      transparent: true,
      opacity: 0.45,
      edgeColor: 0x0284c7,
    });
    upperWindow.position.set(-0.25, 1.79 + 0.7, 1.41);
    buildingGroup.add(upperWindow);

    // Cantilevered Sunshade Brow
    const sunshade = createCadBox(2.8, 0.04, 0.35, 0x0f172a);
    sunshade.position.set(-0.25, 1.79 + 1.15, 1.55);
    buildingGroup.add(sunshade);

    // Cantilever Balcony Terrace (Right Side)
    const balconyFloor = createCadBox(1.4, 0.08, 1.7, 0xf8fafc, { edgeColor: 0x0f172a });
    balconyFloor.position.set(1.5, 1.79 + 0.04, 0.55);
    buildingGroup.add(balconyFloor);

    // Front Glass Balustrade
    const balustradeFront = createCadBox(1.4, 0.45, 0.04, 0x38bdf8, {
      transparent: true,
      opacity: 0.4,
      edgeColor: 0x0284c7,
    });
    balustradeFront.position.set(1.5, 1.79 + 0.3, 1.41);
    buildingGroup.add(balustradeFront);

    // Side Glass Balustrade
    const balustradeSide = createCadBox(0.04, 0.45, 1.7, 0x38bdf8, {
      transparent: true,
      opacity: 0.4,
      edgeColor: 0x0284c7,
    });
    balustradeSide.position.set(2.2, 1.79 + 0.3, 0.55);
    buildingGroup.add(balustradeSide);

    // 5. Central Vertical Elevator / Staircase Core Tower
    const coreTower = createCadBox(0.85, 3.6, 0.95, 0x1e293b, { edgeColor: 0x334155 });
    coreTower.position.set(-1.45, 1.8, -0.9);
    buildingGroup.add(coreTower);

    // Red Roof Cap on Core Tower
    const coreCap = createCadBox(0.95, 0.1, 1.05, 0xdc2626, { edgeColor: 0x991b1b });
    coreCap.position.set(-1.45, 3.65, -0.9);
    buildingGroup.add(coreCap);

    // 6. Roof Slab (Level 03 Cantilevered Overhang)
    const roofSlab = createCadBox(4.0, 0.12, 3.0, 0x0f172a, { edgeColor: 0x334155 });
    roofSlab.position.set(0.0, 1.79 + 1.35 + 0.06, 0.2);
    buildingGroup.add(roofSlab);

    // Architectural Pergola Louver Fins on Terrace Roof
    for (let i = 0; i < 4; i++) {
      const louver = createCadBox(1.5, 0.04, 0.08, i % 2 === 0 ? 0xdc2626 : 0x475569, {
        edgeColor: 0x0f172a,
      });
      louver.position.set(1.4, 3.35, -0.2 + i * 0.32);
      buildingGroup.add(louver);
    }

    // Interactive Drag / Orbit Mechanics
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let autoRotate = true;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      autoRotate = false;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      buildingGroup.rotation.y += deltaX * 0.01;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 1500);
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (autoRotate) {
        buildingGroup.rotation.y += 0.007;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElem.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      if (container && domElem.parentNode === container) {
        container.removeChild(domElem);
      }

      disposables.forEach((item) => {
        try {
          item.dispose();
        } catch {
          // ignore
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="hidden xl:block absolute top-1/2 -translate-y-1/2 left-[calc(100%+1.5rem)] 2xl:left-[calc(100%+2.5rem)] z-20 pointer-events-auto select-none group"
    >
      <div className="card-interactive relative bg-white/95 backdrop-blur-md rounded-xl border border-[#E5E5E2] p-4 shadow-subtle w-64 xl:w-72 2xl:w-80 text-left transition-all hover:border-[#DC2626]/40">
        {/* OriginKit Technical Corner Crosshairs */}
        <span className="crosshair-corner top-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner top-1.5 right-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 left-2 font-mono text-[9px] select-none">+</span>
        <span className="crosshair-corner bottom-1.5 right-2 font-mono text-[9px] select-none">+</span>

        {/* Technical Header */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#F0F0EE] text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-neutral-800 tracking-wider">3D BUILDING MODEL</span>
          </div>
          <span className="text-[#DC2626] font-semibold">ROTATING</span>
        </div>

        {/* Real 3D WebGL Architectural Building Model Stage */}
        <div className="relative w-full h-56 xl:h-60 flex items-center justify-center overflow-hidden rounded-lg bg-[#FAF9F7] border border-[#EAEAE7]">
          {/* Subtle Blueprint Grid Background */}
          <div className="absolute inset-0 originkit-grid opacity-60 pointer-events-none" />

          {/* Technical Dimension Callouts (OriginKit BIM Styling) */}
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col text-[9px] font-mono leading-tight pointer-events-none">
            <span className="text-[#DC2626] font-bold">LVL 02 // +6.4m</span>
            <span className="text-neutral-500 text-[8px]">BIM 3D MODEL</span>
          </div>

          <div className="absolute top-2.5 right-2.5 z-10 text-[9px] font-mono text-neutral-400 pointer-events-none">
            REV: 360° // N 45°E
          </div>

          {/* Elevation Level Height Markers (Right Edge Leader) */}
          <div className="absolute right-2 top-11 bottom-9 z-10 flex flex-col justify-between text-[8px] font-mono text-neutral-400 border-l border-dashed border-neutral-300 pl-1.5 pointer-events-none">
            <span className="text-[#DC2626] font-semibold">+6.4m ROOF</span>
            <span>+3.2m LVL 02</span>
            <span>±0.0m GROUND</span>
          </div>

          {/* WebGL Canvas Container for 3D Building Model */}
          <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing relative z-0"
            title="Click and drag to interactively orbit 3D building"
          />

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[9px] font-mono text-neutral-400 pointer-events-none">
            <span>AXIS: BIM-3D // Z-UP</span>
            <span className="text-neutral-700 font-semibold">REVIT • 3DS MAX</span>
          </div>
        </div>

        {/* Technical Footer Telemetry */}
        <div className="pt-2 mt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[10px] font-mono">
          <span className="text-neutral-500">AutoCAD • Revit • SketchUp</span>
          <span className="text-neutral-900 font-semibold">3D CIVIL &amp; ARCH</span>
        </div>
      </div>
    </motion.div>
  );
};