/*
 * @Author: ZY
 * @Date: 2022-01-04 14:29:23
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-10 12:01:45
 * @FilePath: /3d-earth/lib/src/earth/cityPoint.ts
 * @Description: 城市标注点。涟漪
 */

import {
  PlaneBufferGeometry,
  TextureLoader,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  Vector3,
} from "three";
import type { City } from "../types/index";
import { lon2xyz } from "../tools/index";
import { GlobalConfig } from "../config/index";
import wavePng from "../img/wave.png";
import pointPng from "../img/point.png";

export const getCityMeshGroup = (cityList:Record<string,City>) => {
  let waveMeshArr = [];
  let pointMeshArr = [];

  for (const cityName in cityList) {
    var city = cityList[cityName];
    var cityXyz = lon2xyz(GlobalConfig.earthRadius, city.longitude, city.latitude);

    var cityGeometry = new PlaneBufferGeometry(1, 1); //默认在XOY平面上
    var textureLoader = new TextureLoader(); // TextureLoader创建一个纹理加载器对象
    var texture = textureLoader.load(wavePng);

    // 如果不同mesh材质的透明度、颜色等属性同一时刻不同，材质不能共享
    var cityWaveMaterial = new MeshBasicMaterial({
      color: 0x22ffcc,
      map: texture,
      transparent: true, //使用背景透明的png贴图，注意开启透明计算
      opacity: 1.0,
      side: DoubleSide, //双面可见
      depthWrite: false, //禁止写入深度缓冲区数据
    });

    //城市点添加
    var pointTexture = textureLoader.load(pointPng);
    var cityPointMaterial = new MeshBasicMaterial({
      color:0xffc300,
      map: pointTexture,
      transparent: true, //使用背景透明的png贴图，注意开启透明计算
      depthWrite:false,//禁止写入深度缓冲区数据
    });

    var cityWaveMesh = new Mesh(cityGeometry, cityWaveMaterial);
    var cityMesh = new Mesh(cityGeometry, cityPointMaterial);

    var size = GlobalConfig.earthRadius*0.05;//矩形平面Mesh的尺寸
    cityMesh.scale.set(size, size, size);//设置mesh大小

    var size = GlobalConfig.earthRadius * 0.12; //矩形平面Mesh的尺寸
    (cityWaveMesh as any).size = size; //自顶一个属性，表示mesh静态大小
    cityWaveMesh.scale.set(size, size, size); //设置mesh大小
    (cityWaveMesh as any)._s = Math.random() * 1.0 + 1.0; //自定义属性._s表示mesh在原始大小基础上放大倍数  光圈在原来mesh.size基础上1~2倍之间变化

    cityWaveMesh.position.set(cityXyz.x, cityXyz.y, cityXyz.z);
    cityMesh.position.set(cityXyz.x, cityXyz.y, cityXyz.z)

    // mesh姿态设置
    // mesh在球面上的法线方向(球心和球面坐标构成的方向向量)
    var coordVec3 = new Vector3(cityXyz.x, cityXyz.y, cityXyz.z).normalize();
    // mesh默认在XOY平面上，法线方向沿着z轴new THREE.Vector3(0, 0, 1)
    var meshNormal = new Vector3(0, 0, 1);
    // 四元数属性.quaternion表示mesh的角度状态
    //.setFromUnitVectors();计算两个向量之间构成的四元数值
    cityWaveMesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);
    cityMesh.quaternion.setFromUnitVectors(meshNormal, coordVec3);

    waveMeshArr.push(cityWaveMesh);
    pointMeshArr.push(cityMesh)
  }

  return {waveMeshArr,pointMeshArr};
};

export const cityWaveAnimate = (WaveMeshArr: Mesh[]) => {
  // 所有波动光圈都有自己的透明度和大小状态
  // 一个波动光圈透明度变化过程是：0~1~0反复循环
  WaveMeshArr.forEach(function (mesh:any) {
    mesh._s += 0.007;
    mesh.scale.set(
      mesh.size * mesh._s,
      mesh.size * mesh._s,
      mesh.size * mesh._s
    );
    if (mesh._s <= 1.5) {
      mesh.material.opacity = (mesh._s - 1) * 2; //2等于1/(1.5-1.0)，保证透明度在0~1之间变化
    } else if (mesh._s > 1.5 && mesh._s <= 2) {
      mesh.material.opacity = 1 - (mesh._s - 1.5) * 2; //2等于1/(2.0-1.5) mesh缩放2倍对应0 缩放1.5被对应1
    } else {
      mesh._s = 1.0;
    }
  });
};
