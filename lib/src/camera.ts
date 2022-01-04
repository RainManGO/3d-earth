/*
 * @Author: ZY
 * @Date: 2021-12-30 16:41:35
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 10:22:42
 * @FilePath: /3d-earth/lib/src/camera.ts
 * @Description: 相机
 */

import { PerspectiveCamera } from "three";

export const initCamera = (width:number,height:number)=>{
  let aspect = width / height;
  let camera = new PerspectiveCamera(45, aspect, 0.1, 1000);
  camera.position.set(30, 26, 30);

  return camera
}

