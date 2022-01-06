import { Object3D } from "three";
import type { City, FlyData } from "../types/index";
export declare const earth3dObj: (cityList?: Record<string, City>, flyLineData?: FlyData[]) => {
    object3D: Object3D<import("three").Event>;
    waveMeshArr: any[];
    flyManager: import("../tools/flyLine").InitFlyLine;
} | {
    object3D: Object3D<import("three").Event>;
    waveMeshArr?: undefined;
    flyManager?: undefined;
};
