// src/components/ThreeAnimation.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  width: 100%;
  height: 400px;
  margin: 20px 0;
  border: 1px solid #bdc3c7;
`;

const ThreeAnimation = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Copy the current mountRef to a local variable
    const currentMount = mountRef.current;
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    
    // Create scene and set a background color
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0); // light grey background

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer and append its DOM element
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    currentMount.appendChild(renderer.domElement);

    // Create a rotating cube with a standard material
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x3498db });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add ambient light to ensure the cube is lit evenly
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    // Add a point light for additional lighting and shadows
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Animation loop to rotate the cube and render the scene
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount using the stored reference
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <CanvasContainer ref={mountRef} />;
};

export default ThreeAnimation;
