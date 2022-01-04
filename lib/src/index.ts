import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { controlConfig } from "./config/index";

import { initRender } from "./render";
import { initRender2D } from "./renderer2d";
import { initScene } from "./scene";
import { initCamera } from "./camera";
import { initLight } from "./light";
import { starBackground } from "./starBg";
import { earth3dObj } from "./earth/index";

const TWEEN = require("@tweenjs/tween.js");

/**
 * @description: 地球配置
 * @param {*}
 * @return {*}
 */
interface EarthConfigProps {
  //地球是否旋转
  autoRotate: Boolean;
  //是否缩放到中国，之后再放大动画
  zoomChina: Boolean;
}

class Earth {
  width: number;
  height: number;
  parentDom: HTMLElement;
  renderer: THREE.WebGLRenderer;
  renderer2d: CSS2DRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  orbitControl: OrbitControls;
  earth3dObj: THREE.Object3D;
  earthConfig: EarthConfigProps;

  constructor(
    containerId: string,
    config: EarthConfigProps = { autoRotate: true, zoomChina: false }
  ) {
    this.parentDom = document.getElementById(containerId);
    this.width = this.parentDom.offsetWidth;
    this.height = this.parentDom.offsetHeight;
    this.earthConfig = config;
    this.init();
  }

  load = () => {
    this.animate();
    this.scene.add(starBackground());
    this.earth3dObj = earth3dObj();
    this.scene.add(this.earth3dObj);
    if (this.earthConfig.autoRotate && this.earthConfig.zoomChina) {
      this.autoRotateEarth()
    }
  };

  /**
   * @description: 初始化 threeJS 环境
   * @param {*}
   * @return {*}
   */
  init() {
    this.renderer = initRender(this.width, this.height);
    this.renderer2d = initRender2D(this.width, this.height);

    this.parentDom.appendChild(this.renderer.domElement);
    this.parentDom.appendChild(this.renderer2d.domElement);

    this.scene = initScene();
    this.camera = initCamera(this.width, this.height);
    initLight(this.scene);

    const orbitControl = new OrbitControls(
      this.camera,
      this.renderer2d.domElement
    );
    orbitControl.minZoom = controlConfig.minZoom;
    orbitControl.maxZoom = controlConfig.maxZoom;
    orbitControl.minPolarAngle = controlConfig.minPolarAngle;
    orbitControl.maxPolarAngle = controlConfig.maxPolarAngle;
    orbitControl.update();
    this.orbitControl = orbitControl;
  }

  /**
   * @description: 地球自动旋转
   * @param {*}
   * @return {*}
   */
  autoRotateEarth() {
    const startRotateY = (3.15 * Math.PI) / 2;
    const startZoom = -18;
    const endRotateY = 3.15 * Math.PI;
    const endZoom = 4;

    var that = this;

    //旋转地球动画
    var rotateEarthStep = new TWEEN.Tween({
      rotateY: startRotateY,
      zoom: startZoom,
    })
      .to({ rotateY: endRotateY, zoom: endZoom }, 36000) //.to({rotateY: endRotateY, zoom: endZoom}, 10000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function (object: any) {
         if (that.earth3dObj) {
            that.earth3dObj.rotation.set(0, object.rotateY, 0);
        }
        (that.orbitControl as any).zoom0 = object.zoom < 1 ? 1 : object.zoom;
        that.orbitControl.reset();
      });

    var rotateEarthStepBack = new TWEEN.Tween({
      rotateY: endRotateY,
      zoom: endZoom,
    })
      .to({ rotateY: 3.15 * Math.PI * 2, zoom: startZoom }, 36000) //.to({rotateY: endRotateY, zoom: endZoom}, 10000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function (object: any) {
        if (that.earth3dObj) {
          that.earth3dObj.rotation.set(0, object.rotateY, 0);
        }
        (that.orbitControl as any).zoom0 = object.zoom < 1 ? 1 : object.zoom;
        that.orbitControl.reset();
      });

    rotateEarthStep.chain(rotateEarthStepBack);
    rotateEarthStepBack.chain(rotateEarthStep);

    rotateEarthStep.start();
  }

  /**
   * @description: 帧变化需要做的动画
   * @param {*}
   * @return {*}
   */

  animate = () => {
    requestAnimationFrame(this.animate);
    //只是自转，不需要缩放到中国
    if ( this.earth3dObj) {
      if (this.earthConfig.autoRotate && !this.earthConfig.zoomChina) {
        this.earth3dObj.rotation.y += 0.01;
      }
    }
    this.renderer.render(this.scene, this.camera);
    this.afterAnimate();
  };

  afterAnimate = () => {
    TWEEN.update();
  };
}

export default Earth;
