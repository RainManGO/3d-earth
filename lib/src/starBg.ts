/*
 * @Author: ZY
 * @Date: 2021-12-31 10:10:17
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 11:02:23
 * @FilePath: /3d-earth/lib/src/starBg.ts
 * @Description: 星空背景
 */

import {
  BufferGeometry,
  Vector3,
  Color,
  Float32BufferAttribute,
  TextureLoader,
  PointsMaterial,
  AdditiveBlending,
  Points
} from "three";
import starPng from "./img/star.png";
//添加星空背景
export const starBackground = () => {
  const positions = [];
  const colors = [];
  const geometry = new BufferGeometry();
  for (var i = 0; i < 10000; i++) {
    var vertex = new Vector3();
    vertex.x = Math.random() * 2 - 1;
    vertex.y = Math.random() * 2 - 1;
    vertex.z = Math.random() * 2 - 1;
    positions.push(vertex.x, vertex.y, vertex.z);
    var color = new Color();
    color.setHSL(Math.random() * 0.2 + 0.5, 0.55, Math.random() * 0.25 + 0.55);
    colors.push(color.r, color.g, color.b);
  }
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

  var textureLoader = new TextureLoader();
  var texture = textureLoader.load(starPng); //加载纹理贴图

  var starsMaterial = new PointsMaterial({
    map: texture,
    size: 1,
    transparent: true,
    opacity: 1,
    vertexColors: true, //true：且该几何体的colors属性有值，则该粒子会舍弃第一个属性--color，而应用该几何体的colors属性的颜色
    blending: AdditiveBlending,
    sizeAttenuation: true,
  });
  let stars = new Points(geometry, starsMaterial);
  stars.scale.set(300, 300, 300);
  
  return stars
};
