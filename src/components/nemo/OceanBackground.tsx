import { useEffect, useRef } from "react";

/**
 * Layered ocean + neural-network background.
 * Three.js particle field is loaded lazily on the client only, so SSR stays clean
 * and the initial bundle is unaffected.
 */
export function OceanBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      if (disposed || !mountRef.current) return;

      const width = mount.clientWidth;
      const height = mount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 320;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
      renderer.setSize(width, height);
      mount.appendChild(renderer.domElement);

      /* ---- glowing particle field (~2100 particles) ---- */
      const COUNT = 2100;
      const positions = new Float32Array(COUNT * 3);
      for (let i = 0; i < COUNT; i += 1) {
        positions[i * 3] = (Math.random() - 0.5) * 900;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 620;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 620;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particleMaterial = new THREE.PointsMaterial({
        color: 0x4fdfff,
        size: 2.1,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      /* ---- floating AI nodes joined by neural links ---- */
      const NODES = 26;
      const nodePoints: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < NODES; i += 1) {
        nodePoints.push(
          new THREE.Vector3(
            (Math.random() - 0.5) * 620,
            (Math.random() - 0.5) * 380,
            (Math.random() - 0.5) * 260,
          ),
        );
      }
      const nodeGeometry = new THREE.BufferGeometry().setFromPoints(nodePoints);
      const nodes = new THREE.Points(
        nodeGeometry,
        new THREE.PointsMaterial({
          color: 0x9beeff,
          size: 6,
          transparent: true,
          opacity: 0.75,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      );
      scene.add(nodes);

      const linkPoints: InstanceType<typeof THREE.Vector3>[] = [];
      for (let i = 0; i < NODES; i += 1) {
        for (let j = i + 1; j < NODES; j += 1) {
          if (nodePoints[i].distanceTo(nodePoints[j]) < 175) {
            linkPoints.push(nodePoints[i], nodePoints[j]);
          }
        }
      }
      const links = new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints(linkPoints),
        new THREE.LineBasicMaterial({ color: 0x3fd2ff, transparent: true, opacity: 0.16 }),
      );
      scene.add(links);

      const network = new THREE.Group();
      network.add(nodes);
      network.add(links);
      scene.add(network);

      /* ---- gentle mouse parallax ---- */
      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        target.x = (event.clientX / window.innerWidth - 0.5) * 2;
        target.y = (event.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onPointerMove, { passive: true });

      const onResize = () => {
        if (!mountRef.current) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      let frame = 0;
      let raf = 0;
      const render = () => {
        raf = requestAnimationFrame(render);
        frame += 1;
        pointer.x += (target.x - pointer.x) * 0.04;
        pointer.y += (target.y - pointer.y) * 0.04;

        particles.rotation.y += 0.00042;
        particles.rotation.x = Math.sin(frame * 0.0006) * 0.08;
        network.rotation.y += 0.0008;
        network.position.y = Math.sin(frame * 0.004) * 8;

        camera.position.x += (pointer.x * 42 - camera.position.x) * 0.05;
        camera.position.y += (-pointer.y * 30 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      };
      render();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", onResize);
        particleGeometry.dispose();
        particleMaterial.dispose();
        nodeGeometry.dispose();
        links.geometry.dispose();
        (links.material as InstanceType<typeof THREE.Material>).dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="nemo-scene" aria-hidden="true">
      <div ref={mountRef} className="absolute inset-0" />
      <div className="nemo-scene__overlay" />
      <div className="nemo-skyline" />
      <div className="nemo-ocean">
        <div className="nemo-wave nemo-wave--1" />
        <div className="nemo-wave nemo-wave--2" />
        <div className="nemo-wave nemo-wave--3" />
      </div>
    </div>
  );
}
