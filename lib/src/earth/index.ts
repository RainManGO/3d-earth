/*
 * @Author: ZY
 * @Date: 2021-12-31 13:57:51
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-07 16:33:35
 * @FilePath: /3d-earth/lib/src/earth/index.ts
 * @Description: 文件描述
 */

import { Object3D } from "three";
import { createEarthImageMesh } from "./earth";
// import { createEarthCloudImageMesh } from "./cloud";
import { earthGlow } from "./glow";
import { GlobalConfig } from "../config/index";
import { countryLine } from "./countryPolygon";
import type { City, FlyData } from "../types/index";
import { getCityMeshGroup } from "./cityPoint";
import { earthAddFlyLine } from "./flyLine";
import earthGlowPng from "../img/earth_glow.png";
import earthGlowLightPng from "../img/earth_glow_light.png";

export const earth3dObj = (
  cityList?: Record<string, City>,
  flyLineData?: FlyData[]
) => {
  var object3D = new Object3D();
  let earthMesh = createEarthImageMesh(GlobalConfig.earthRadius);
  // let cloudMesh = createEarthCloudImageMesh(earthRadius + 0.03)
  // object3D.add(cloudMesh);
  let glow = earthGlow(GlobalConfig.earthRadius,earthGlowPng,3.05);
  let glowLight = earthGlow(GlobalConfig.earthRadius,earthGlowLightPng,3.15);
  object3D.add(countryLine(GlobalConfig.earthRadius + 0.01));
  object3D.add(earthMesh);
  object3D.add(glow);
  object3D.add(glowLight);

  // 添加城市标注点和飞线
  if (cityList && flyLineData) {
    let {waveMeshArr,pointMeshArr} = getCityMeshGroup(cityList);
   for (let index = 0; index < waveMeshArr.length; index++) {
     const cityWaveMesh = waveMeshArr[index];
     const cityMesh = pointMeshArr[index];
     object3D.add(cityMesh);
     object3D.add(cityWaveMesh);
   }

    //添加飞线
    let flyManager = earthAddFlyLine(object3D,flyLineData,cityList)
    return { object3D, waveMeshArr,flyManager};
  }

  return { object3D };
};
