import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = mountRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 5;

    // Floating emotional particles
    const count = 1800;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color(0x8b6fd4), // purple
      new THREE.Color(0xe8a0bf), // pink
      new THREE.Color(0x6495ed), // cornflower blue
      new THREE.Color(0xd4c0f0), // lavender
      new THREE.Color(0xffd4e8), // blush
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 3 + 0.5;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color",    new THREE.BufferAttribute(colors,    3));
    geo.setAttribute("size",     new THREE.BufferAttribute(sizes,     1));

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Soft nebula meshes
    const addNebula = (x, y, z, color, r) => {
      const g = new THREE.SphereGeometry(r, 16, 16);
      const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.03, depthWrite: false });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(x, y, z);
      scene.add(mesh);
      return mesh;
    };
    const n1 = addNebula(-3, 2, -2, 0x6030a0, 3);
    const n2 = addNebula(4, -2, -1, 0xa03060, 2.5);
    const n3 = addNebula(0, 0, -3, 0x3060a0, 4);

    let mouseX = 0, mouseY = 0;
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    let frame = 0;
    const animate = () => {
      const id = requestAnimationFrame(animate);
      frame++;
      const t = frame * 0.0008;

      points.rotation.y = t * 0.12 + mouseX * 0.05;
      points.rotation.x = t * 0.06 + mouseY * 0.03;

      // subtle drift
      const pos = geo.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 1] += Math.sin(t + i * 0.5) * 0.0003;
      }
      geo.attributes.position.needsUpdate = true;

      n1.rotation.y = t * 0.2;
      n2.rotation.x = t * 0.15;
      n3.rotation.z = t * 0.1;

      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.04;

      renderer.render(scene, camera);
      return id;
    };
    const animId = animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={mountRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}
