import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { EarthConfigProps, City, FlyData } from "./types/index";
import { InitFlyLine } from "../src/tools/flyLine";
declare class Earth {
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
    waveMeshArr: THREE.Mesh[];
    cityList?: Record<string, City>;
    flyLineData?: FlyData[];
    flyManager: InitFlyLine;
    constructor(containerId: string, cityList?: Record<string, City>, flyLineData?: FlyData[], config?: EarthConfigProps);
    load: () => void;
    /**
     * @description: 初始化 threeJS 环境
     * @param {*}
     * @return {*}
     */
    init(): void;
    /**
     * @description: 地球自动旋转
     * @param {*}
     * @return {*}
     */
    autoRotateEarth(): void;
    /**
     * @description: 帧变化需要做的动画
     * @param {*}
     * @return {*}
     */
    animate: () => void;
    afterAnimate: () => void;
}
export default Earth;
