/*
 * @Author: ZY
 * @Date: 2021-12-31 16:34:41
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 16:34:41
 * @FilePath: /3d-earth/lib/src/earth/clound.ts
 * @Description: 云层
 */

import {
  TextureLoader,
  SphereBufferGeometry,
  MeshLambertMaterial,
  AdditiveBlending,
  Mesh,
} from "three";
import cloud from "../img/earth_cloud.png";

//添加地球云层贴图的Mesh到场景中
export const createEarthCloudImageMesh =  (radius:number)=>{
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  var textureLoader = new TextureLoader();
  var texture = textureLoader.load(cloud); //加载纹理贴图
  var geometry = new SphereBufferGeometry(radius, 96, 96); //创建一个球体几何对象
  //材质对象Material
  // MeshLambertMaterial  MeshBasicMaterial
  var material = new MeshLambertMaterial({
    map: texture, //设置地球0颜色贴图map
    transparent: true,
    opacity: 1,
    blending: AdditiveBlending,
  });
  var mesh = new Mesh(geometry, material); //网格模型对象Mesh
  return mesh;
};
