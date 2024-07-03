import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as TWEEN from "three/examples/jsm/libs/tween.module.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer";

const Canva3D = () => {
  const canva3DRef = useRef(null);

  useEffect(() => {
    // 創建場景
    const scene = new THREE.Scene();

    // 創建相機
    const camera = new THREE.PerspectiveCamera(
      75, // 視角
      window.innerWidth / window.innerHeight, // 寬高比
      0.1, // 近平面, 最近能看到什麼
      5000 // 遠平面, 最遠能看到什麼
    );

    // 設置相機位置
    camera.position.z = 1000;
    camera.position.y = 500;
    camera.position.x = 0;
    camera.lookAt(0, 0, 0);

    // 添加世界座標輔助器
    // const axesHelper = new THREE.AxesHelper(5)
    // scene.add(axesHelper)

    // 添加網格地面
    // const gridHelper = new THREE.GridHelper(100, 100)
    // scene.add(gridHelper)

    // 創建渲染器
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 抗鋸齒
      alpha: true,
      logarithmicDepthBuffer: true, // 防止深度衝突導致閃爍
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // 將渲染器的透明顏色設定為透明, 0 = 透明
    canva3DRef.current.appendChild(renderer.domElement);

    // 添加CSS2D渲染器
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.top = "0px";
    labelRenderer.domElement.style.pointerEvents = "none";
    canva3DRef.current.appendChild(labelRenderer.domElement);

    // 添加CSS3D渲染器
    const css3DRenderer = new CSS3DRenderer();
    css3DRenderer.setSize(window.innerWidth, window.innerHeight);
    css3DRenderer.domElement.style.position = "absolute";
    css3DRenderer.domElement.style.top = "0px";
    css3DRenderer.domElement.style.pointerEvents = "none";
    canva3DRef.current.appendChild(css3DRenderer.domElement);

    // 添加軌道控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // 設置帶阻尼的慣性 (拖曳後不會馬上停止, 會有慣性慢慢停下)
    controls.dampingFactor = 0.01; // 設置阻尼係數, 數值愈小, 慣性持續時間愈久
    controls.autoRotate = true; // 設置自動旋轉

    // 加载地图照片纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("textures/map.png"); // 替换为你的地图照片路径

    // 创建平面几何体
    const planeGeometry = new THREE.PlaneGeometry(2500, 2500); // 設置平面大小
    const planeMaterial = new THREE.MeshStandardMaterial({ map: texture });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.rotation.x = -Math.PI / 2; // 將平面旋轉至底部
    planeMesh.position.y = -1; // 設置平面的Y軸位置
    scene.add(planeMesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // color, intensity
    scene.add(ambientLight);

    // 添加FBX模型
    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      //   "fbx/101/3DModel_Taipei101.fbx",
      "fbx/office/office.fbx",
      (object) => {
        console.log(object);

        // 縮小模型
        const scale = 0.1; // 調整這個值來控制縮小比例
        object.scale.set(scale, scale, scale);

        // Add 2D Label to the model
        const labelDiv = document.createElement("div");
        labelDiv.innerHTML = `
            <div>
                <h3 style="font-size: 32px; font-weight: 350; margin: 0px">Taipei 101</h3>
                <div style="display: flex; justify-content: center; color: #ffffff; border: 2px #fe8c23 solid">
                    <div style="margin: 0px 8px;">
                        <div style="margin: 8px 0px;">
                            <div style="color: #cccccc; font-size: 16px; font-weight: 400">PUE</div>
                            <div style="color: #ffffff; font-size: 28px; font-weight: 400">1.43</div>
                        </div>
                        <div style="margin: 8px 0px;">
                            <div style="color: #cccccc; font-size: 16px; font-weight: 400">KWH</div>
                            <div style="color: #ffffff; font-size: 28px; font-weight: 400">15,651</div>
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
        modelLabel.position.set(-5000, 3000, 0); // 根據模型位置調整
        modelLabel.scale.set(1, 1, 1); // 初始比例為1
        object.add(modelLabel);

        const animate = () => {
          controls.update();
          renderer.render(scene, camera);
          labelRenderer.render(scene, camera);
          css3DRenderer.render(scene, camera);
          TWEEN.update();
          requestAnimationFrame(animate);

          updateCSS2DObjectScale(camera, object, modelLabel);
        };
        animate();

        scene.add(object);
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );

    // 添加環境
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      "textures/sky/sky.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      },
      undefined,
      (error) => {
        console.error("An error occurred loading the RGBE texture:", error);
      }
    );

    let lastTime = performance.now();
    let frameCount = 0;

    // 更新CSS2DObject的比例
    const updateCSS2DObjectScale = (camera, object, modelLabel) => {
      const scale = calculateScale(camera, object.position);
      modelLabel.scale.set(scale, scale, scale);
    };

    // 計算比例
    const calculateScale = (camera, position) => {
      const distance = camera.position.distanceTo(position);
      const fov = camera.fov * (Math.PI / 180); // Convert fov to radians
      const objectSizeAtDistance = 2 * Math.tan(fov / 2) * distance;

      // Determine appropriate scale factor based on desired size in the viewport
      const desiredObjectSize = 50; // Example: desired object size in viewport
      const scaleFactor = desiredObjectSize / objectSizeAtDistance;

      return scaleFactor;
    };

    // 渲染函數
    const animate = () => {
      controls.update();
      renderer.render(scene, camera); // 渲染
      labelRenderer.render(scene, camera); // 渲染CSS2D標籤
      css3DRenderer.render(scene, camera); // 渲染CSS3D標籤
      TWEEN.update(); // 更新tween
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);

      frameCount++;
      const now = performance.now();
      const deltaTime = now - lastTime;

      if (deltaTime >= 1000) {
        // If one second has passed
        const fps = frameCount / (deltaTime / 1000);
        console.log(`FPS: ${fps.toFixed(2)}`);

        frameCount = 0;
        lastTime = now;
      }
    };
    animate();

    // 監聽視窗變化
    window.addEventListener("resize", () => {
      renderer.setSize(window.innerWidth, window.innerHeight); // 重置渲染器寬高比
      camera.aspect = window.innerWidth / window.innerHeight; // 重置相機寬高比
      camera.updateProjectionMatrix(); // 更新相機投影矩陣
      labelRenderer.setSize(window.innerWidth, window.innerHeight); // 重置CSS2D渲染器
      css3DRenderer.setSize(window.innerWidth, window.innerHeight); // 重置CSS3D渲染器
    });

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      labelRenderer.setSize(window.innerWidth, window.innerHeight);
      css3DRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      canva3DRef.current.removeChild(renderer.domElement);
      canva3DRef.current.removeChild(labelRenderer.domElement);
      canva3DRef.current.removeChild(css3DRenderer.domElement);
    };
  }, []);

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
