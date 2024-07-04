import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";

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
      50000
    );
    // Adjust the camera position to be higher
    camera.position.set(0, 600, 1200); // Increase the y-coordinate for a higher view

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
    controls.enableZoom = false;
    controls.dampingFactor = 0.01;
    controls.autoRotate = true;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI / 3.5;
    controls.target.set(0, 250, 0); // 設定相機聚焦點

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      `${process.env.PUBLIC_URL}/textures/map.png`
    );

    const planeGeometry = new THREE.PlaneGeometry(30000, 30000);
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
      `${process.env.PUBLIC_URL}/gltf/101_gltf/1586297.gltf`,
      (gltf) => {
        const model = gltf.scene;

        // 縮小模型
        const scale = 1.8; // 調整這個值來控制縮小比例
        model.scale.set(scale, scale, scale);

        // model.position.set(-50, 0, 200);

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

    const labelDiv = document.createElement("div");
    labelDiv.innerHTML = `
  <div>
    <div style="display: flex; align-items: center; margin: 0px 0px 4px 0px;">
      <img src="${
        process.env.PUBLIC_URL
      }/layout/UnionOrange.svg" style="width: 20px; height: 20px; margin: 0px 4px; padding: 0px" />
      <span style="font-size: 22px; font-weight: 350;">
        Taipei 101
      </span>
    </div>
    <div id="border-div" style="display: flex; justify-content: center; color: #ffffff; border-width: 0px 4px; border-color: #fe8c23; border-style: solid; position: relative;">
      <div style="margin: 0px 8px;">
        <div style="margin: 4px 0px;">
          <div style="color: #cccccc; font-size: 12px; font-weight: 400">PUE</div>
          <div style="color: #ffffff; font-size: 18px; font-weight: 400">${pue.toFixed(
            3
          )}</div>
        </div>
        <div style="margin: 4px 0px;">
          <div style="color: #cccccc; font-size: 12px; font-weight: 400">KWH</div>
          <div style="color: #ffffff; font-size: 18px; font-weight: 400">${kwh}</div>
        </div>
      </div>
      <div style="margin: 0px 8px;">
        <div style="margin: 4px 0px;">
          <div style="color: #cccccc; font-size: 12px; font-weight: 400">IN Mbps</div>
          <div style="color: #ffffff; font-size: 18px; font-weight: 400">381</div>
        </div>
        <div style="margin: 4px 0px;">
          <div style="color: #cccccc; font-size: 12px; font-weight: 400">OUT Mbps</div>
          <div style="color: #ffffff; font-size: 18px; font-weight: 400">498</div>
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
      position: "relative",
    });

    const borderDiv = labelDiv.querySelector("#border-div");

    // Create and style the before pseudo-element for the left segment of the top border
    const beforeTopElement = document.createElement("div");
    Object.assign(beforeTopElement.style, {
      content: '""',
      position: "absolute",
      top: "0",
      left: "0",
      height: "0",
      width: "calc(20% - 20px)", // Adjust this value to control the middle segment's length
      borderTop: "4px solid #fe8c23", // Thicker left segment
      zIndex: "1",
    });

    // Create and style the middle pseudo-element for the top border
    const middleTopElement = document.createElement("div");
    Object.assign(middleTopElement.style, {
      content: '""',
      position: "absolute",
      top: "2px",
      left: "calc(20% - 20px)",
      height: "0",
      width: "calc(80% + 20px)", // Adjust this value to control the middle segment's length
      borderTop: "1px solid #fe8c23", // Thinner middle segment
      zIndex: "1",
    });

    // Create and style the after pseudo-element for the right segment of the top border
    const afterTopElement = document.createElement("div");
    Object.assign(afterTopElement.style, {
      content: '""',
      position: "absolute",
      top: "0",
      right: "0",
      height: "0",
      width: "calc(20% - 20px)", // Adjust this value to control the middle segment's length
      borderTop: "4px solid #fe8c23", // Thicker right segment
      zIndex: "1",
    });

    // Create and style the before pseudo-element for the left segment of the bottom border
    const beforeBottomElement = document.createElement("div");
    Object.assign(beforeBottomElement.style, {
      content: '""',
      position: "absolute",
      bottom: "0",
      left: "0",
      height: "0",
      width: "calc(20% - 20px)", // Adjust this value to control the middle segment's length
      borderBottom: "4px solid #fe8c23", // Thicker left segment
      zIndex: "1",
    });

    // Create and style the middle pseudo-element for the bottom border
    const middleBottomElement = document.createElement("div");
    Object.assign(middleBottomElement.style, {
      content: '""',
      position: "absolute",
      bottom: "2px",
      left: "calc(20% - 20px)",
      height: "0",
      width: "calc(80% + 20px)", // Adjust this value to control the middle segment's length
      borderBottom: "1px solid #fe8c23", // Thinner middle segment
      zIndex: "1",
    });

    // Create and style the after pseudo-element for the right segment of the bottom border
    const afterBottomElement = document.createElement("div");
    Object.assign(afterBottomElement.style, {
      content: '""',
      position: "absolute",
      bottom: "0",
      right: "0",
      height: "0",
      width: "calc(20% - 20px)", // Adjust this value to control the middle segment's length
      borderBottom: "4px solid #fe8c23", // Thicker right segment
      zIndex: "1",
    });

    // Append the pseudo-elements to the borderDiv
    borderDiv.appendChild(beforeTopElement);
    borderDiv.appendChild(middleTopElement);
    borderDiv.appendChild(afterTopElement);
    borderDiv.appendChild(beforeBottomElement);
    borderDiv.appendChild(middleBottomElement);
    borderDiv.appendChild(afterBottomElement);

    const modelLabel = new CSS2DObject(labelDiv);
    modelLabel.position.set(-400, 500, 0);
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
