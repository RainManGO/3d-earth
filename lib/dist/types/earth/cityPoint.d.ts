import { Mesh } from "three";
import type { City } from "../types/index";
export declare const getCityMeshGroup: (cityList: Record<string, City>) => {
    waveMeshArr: any[];
    pointMeshArr: any[];
};
export declare const cityWaveAnimate: (WaveMeshArr: Mesh[]) => void;
