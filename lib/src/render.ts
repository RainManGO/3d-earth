/*
 * @Author: ZY
 * @Date: 2021-12-30 14:44:39
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-05 14:46:58
 * @FilePath: /3d-earth/lib/src/render.ts
 * @Description: 渲染器
 */

import { WebGLRenderer,PCFShadowMap } from "three";

export const initRender = (width:number,height:number)=>{
  let renderer = new WebGLRenderer({
    antialias: true,
    alpha: true
  });
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.setSize(width,height)

  return renderer
}
