import { FlyData, City } from "../types/index";
import { InitFlyLine } from "../tools/flyLine";
import { Object3D } from "three";
export declare const earthAddFlyLine: (earth: Object3D, flyLineData: FlyData[], cityList: Record<string, City>) => InitFlyLine;
