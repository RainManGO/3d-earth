/*
 * @Author: ZY
 * @Date: 2021-12-31 13:57:51
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 16:49:42
 * @FilePath: /3d-earth/lib/src/earth/index.ts
 * @Description: 文件描述
 */

import { Object3D } from "three";
import { createEarthImageMesh } from "./earth";
import { createEarthCloudImageMesh } from "./cloud";
import { earthGlow } from "./glow";
import { earthRadius } from "../config/index";
import { countryLine } from "./countryPolygon";

export const earth3dObj = ()=>{
  var object3D = new Object3D();
  let earthMesh = createEarthImageMesh(earthRadius)
  // let cloudMesh = createEarthCloudImageMesh(earthRadius + 0.03)
  let glow = earthGlow(earthRadius)

  object3D.add(countryLine(earthRadius + 0.01));
  object3D.add(earthMesh);
  // object3D.add(cloudMesh);  
  object3D.add(glow);

  return object3D
}