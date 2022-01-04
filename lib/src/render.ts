/*
 * @Author: ZY
 * @Date: 2021-12-30 14:44:39
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 14:45:04
 * @FilePath: /3d-earth/lib/src/render.ts
 * @Description: 渲染器
 */

import { WebGLRenderer,PCFShadowMap } from "three";

export const initRender = (width:number,height:number)=>{
  let renderer = new WebGLRenderer({
    antialias: true
  });
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.setSize(width,height)

  return renderer
}
