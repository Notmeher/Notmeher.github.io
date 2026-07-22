"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SignalField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let frameId = 0;
    let disposed = false;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
      camera.position.set(0, 3.7, 8.5);
      camera.lookAt(0, 0, -1);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        preserveDrawingBuffer: true,
        powerPreference: "low-power",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.domElement.setAttribute("aria-hidden", "true");
      mount.appendChild(renderer.domElement);

      const gridGeometry = new THREE.PlaneGeometry(18, 12, 30, 18);
      const gridMaterial = new THREE.MeshBasicMaterial({
        color: 0xcc785c,
        wireframe: true,
        transparent: true,
        opacity: 0.24,
      });
      const grid = new THREE.Mesh(gridGeometry, gridMaterial);
      grid.rotation.x = -Math.PI / 2.28;
      grid.rotation.z = -0.08;
      grid.position.set(2.1, -1.2, -2.6);
      scene.add(grid);

      const basePositions = new Float32Array(
        (gridGeometry.attributes.position.array as Float32Array).slice(),
      );

      const nodeCount = window.innerWidth < 768 ? 42 : 82;
      const nodePositions = new Float32Array(nodeCount * 3);
      for (let index = 0; index < nodeCount; index += 1) {
        nodePositions[index * 3] = (Math.random() - 0.35) * 14;
        nodePositions[index * 3 + 1] = (Math.random() - 0.5) * 5;
        nodePositions[index * 3 + 2] = (Math.random() - 0.5) * 7 - 1;
      }
      const nodeGeometry = new THREE.BufferGeometry();
      nodeGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(nodePositions, 3),
      );
      const nodeMaterial = new THREE.PointsMaterial({
        color: 0x5db8a6,
        size: 0.045,
        transparent: true,
        opacity: 0.65,
        sizeAttenuation: true,
      });
      const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
      scene.add(nodes);

      let pointerX = 0;
      let pointerY = 0;
      const handlePointer = (event: PointerEvent) => {
        pointerX = event.clientX / window.innerWidth - 0.5;
        pointerY = event.clientY / window.innerHeight - 0.5;
      };

      const render = (elapsed = 0) => {
        const position = gridGeometry.attributes.position as THREE.BufferAttribute;
        for (let index = 0; index < position.count; index += 1) {
          const x = basePositions[index * 3];
          const y = basePositions[index * 3 + 1];
          const wave =
            Math.sin(x * 0.62 + elapsed * 0.00045) * 0.24 +
            Math.cos(y * 0.7 + elapsed * 0.00032) * 0.16;
          position.setZ(index, wave);
        }
        position.needsUpdate = true;

        if (!reducedMotion) {
          camera.position.x += (pointerX * 0.5 - camera.position.x) * 0.018;
          camera.position.y += (3.7 - pointerY * 0.3 - camera.position.y) * 0.018;
          nodes.rotation.y = elapsed * 0.000025;
        }

        camera.lookAt(0, 0, -1);
        renderer.render(scene, camera);
        if (!reducedMotion && !disposed) {
          frameId = window.requestAnimationFrame(render);
        }
      };

      const resize = () => {
        const { clientWidth, clientHeight } = mount;
        renderer.setSize(clientWidth, clientHeight, false);
        camera.aspect = clientWidth / Math.max(clientHeight, 1);
        camera.updateProjectionMatrix();
        if (reducedMotion) render();
      };

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      window.addEventListener("pointermove", handlePointer, { passive: true });
      resize();
      render();
      mount.dataset.webglReady = "true";

      return () => {
        disposed = true;
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("pointermove", handlePointer);
        resizeObserver.disconnect();
        gridGeometry.dispose();
        gridMaterial.dispose();
        nodeGeometry.dispose();
        nodeMaterial.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    } catch {
      mount.dataset.webglReady = "false";
    }
  }, []);

  return <div ref={mountRef} className="signal-field" aria-hidden="true" />;
}