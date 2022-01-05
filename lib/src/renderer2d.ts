/*
 * @Author: ZY
 * @Date: 2021-12-30 14:44:39
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 14:42:12
 * @FilePath: /3d-earth/lib/src/renderer2d.ts
 * @Description: 渲染器
 */

import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export const initRender2D = (width:number,height:number)=>{
  const renderer2d = new CSS2DRenderer();
  renderer2d.setSize(width,height)
  renderer2d.domElement.style.position = "absolute";
  renderer2d.domElement.style.top = "0px";
  renderer2d.domElement.tabIndex = 0;
  renderer2d.domElement.className = "coreInnerRenderer2d";
  
  return renderer2d
}
