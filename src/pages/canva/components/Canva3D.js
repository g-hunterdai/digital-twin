import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import AnimatedNumbers from "react-animated-numbers";

const Canva3D = (props) => {
  const { pue, kwh } = props;
  const canva3DRef = useRef(null);
  const prevProps = useRef({ pue: 0, kwh: 0 }); // Store previous props
  const scene = useRef(null); // Store scene reference
  const labelRenderer = useRef(null); // Store labelRenderer reference

  useEffect(() => {
    // Three.js setup
    scene.current = new THREE.Scene();
    scene.current.background = new THREE.Color("#252424");

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );
    camera.position.z = 250;
    camera.position.y = 500;
    camera.position.x = 250;
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    canva3DRef.current.appendChild(renderer.domElement);

    labelRenderer.current = new CSS2DRenderer();
    labelRenderer.current.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.current.domElement.style.position = "absolute";
    labelRenderer.current.domElement.style.top = "0px";
    labelRenderer.current.domElement.style.pointerEvents = "none";
    canva3DRef.current.appendChild(labelRenderer.current.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
    controls.autoRotate = true;

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("textures/map.png");

    const planeGeometry = new THREE.PlaneGeometry(1800, 1800);
    const planeMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0x888888,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2;
    planeMesh.position.y = -1;
    scene.current.add(planeMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.current.add(ambientLight);

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      process.env.PUBLIC_URL + "/gltf/101_gltf/1586297.gltf",
      (gltf) => {
        const model = gltf.scene;

        createOrUpdateLabels(pue, kwh); // Initial creation of labels

        scene.current.add(model);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    const animate = () => {
      controls.update();
      renderer.render(scene.current, camera);
      labelRenderer.current.render(scene.current, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      labelRenderer.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canva3DRef.current.removeChild(renderer.domElement);
      canva3DRef.current.removeChild(labelRenderer.current.domElement);
    };
  }, []);

  useEffect(() => {
    // Only update if props have changed
    if (prevProps.current.pue !== pue || prevProps.current.kwh !== kwh) {
      prevProps.current.pue = pue;
      prevProps.current.kwh = kwh;

      createOrUpdateLabels(pue, kwh); // Update labels
    }
  }, [pue, kwh]);

  const createOrUpdateLabels = (pue, kwh) => {
    if (!scene.current || !labelRenderer.current) return;

    // Remove existing labels if any
    scene.current.children.forEach((child) => {
      if (child instanceof CSS2DObject) {
        scene.current.remove(child);
      }
    });

    // Create new label content
    const labelDiv = document.createElement("div");
    labelDiv.innerHTML = `
      <div>
        <h3 style="font-size: 32px; font-weight: 350; margin: 0px 0px 8px 0px">Taipei 101</h3>
        <div style="display: flex; justify-content: center; color: #ffffff; border-width: 1px 4px; border-color: #fe8c23; border-style: solid;">
          <div style="margin: 0px 8px;">
            <div style="margin: 8px 0px;">
              <div style="color: #cccccc; font-size: 16px; font-weight: 400">PUE</div>
              <div style="color: #ffffff; font-size: 28px; font-weight: 400">${pue.toFixed(
                3
              )}</div>
            </div>
            <div style="margin: 8px 0px;">
              <div style="color: #cccccc; font-size: 16px; font-weight: 400">KWH</div>
              <div style="color: #ffffff; font-size: 28px; font-weight: 400">${kwh}</div>
            </div>
          </div>
          <div style="margin: 0px 8px;">
            <div style="margin: 8px 0px;">
              <div style="color: #cccccc; font-size: 16px; font-weight: 400">IN Mbps</div>
              <div style="color: #ffffff; font-size: 28px; font-weight: 400">381</div>
            </div>
            <div style="margin: 8px 0px;">
              <div style="color: #cccccc; font-size: 16px; font-weight: 400">OUT Mbps</div>
              <div style="color: #ffffff; font-size: 28px; font-weight: 400">498</div>
            </div>
          </div>
        </div>
      </div>
    `;
    Object.assign(labelDiv.style, {
      fontFamily: "Univia Pro",
      color: "#FE8C23",
      backgroundColor: "rgba(3, 11, 17, 0.6)",
      padding: "4px",
      textAlign: "left",
      pointerEvents: "none",
    });

    const modelLabel = new CSS2DObject(labelDiv);
    modelLabel.position.set(-200, 200, 0);
    scene.current.add(modelLabel);
  };

  const canvasStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  return <div ref={canva3DRef} style={canvasStyle} />;
};

export default Canva3D;
