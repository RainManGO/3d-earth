/*
 * @Author: ZY
 * @Date: 2021-12-31 13:57:51
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-04 17:11:27
 * @FilePath: /3d-earth/lib/src/earth/index.ts
 * @Description: 文件描述
 */

import { Object3D } from "three";
import { createEarthImageMesh } from "./earth";
import { createEarthCloudImageMesh } from "./cloud";
import { earthGlow } from "./glow";
import { earthRadius } from "../config/index";
import { countryLine } from "./countryPolygon";
import  type { City } from "../types/index";

import { getCityMeshGroup } from "./cityPoint";

export const earth3dObj = (cityList:Record<string,City>)=>{
  var object3D = new Object3D();
  let earthMesh = createEarthImageMesh(earthRadius)
  // let cloudMesh = createEarthCloudImageMesh(earthRadius + 0.03)
  // object3D.add(cloudMesh);  
  let glow = earthGlow(earthRadius)
  object3D.add(countryLine(earthRadius + 0.01));
  object3D.add(earthMesh);
  object3D.add(glow);

  // 添加城市标注点
   let waveMeshArr = getCityMeshGroup(cityList)
   for (const cityMesh of waveMeshArr) {
    object3D.add(cityMesh);
   }

  return {object3D,waveMeshArr}
}