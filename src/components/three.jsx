import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Configuración básica
    const scene = new THREE.Scene();
    const loader = new FBXLoader();
    const camera = new THREE.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(window.innerWidth / 2, window.innerHeight/2);
    mountRef.current.appendChild(renderer.domElement);
    
    //Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    loader.load('../../public/low_poly_borzoi.fbx', (object) => {
      scene.add(object);

      object.position.set(0, -1.7, 0);
      object.scale.set(0.4, .4, .4);
      object.rotation.set(0, 2, 0)
    }, (xhr) => {
      // Callback llamado durante el progreso de la carga
      console.log((xhr.loaded / xhr.total * 100) + '% cargado');
    }, (error) => {
      // Callback llamado en caso de error
      console.error('Un error ocurrió durante la carga:', error);
    });

    camera.position.set(2, 0, 2);


    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };

    animate();

    // Cleanup al desmontar el componente
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
