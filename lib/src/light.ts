/*
 * @Author: ZY
 * @Date: 2021-12-30 17:32:26
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-05 14:36:30
 * @FilePath: /3d-earth/lib/src/light.ts
 * @Description: 灯光
 */

import { DirectionalLight,PointLight,HemisphereLight,AmbientLight,Scene } from "three";

export const initLight = (scene:Scene)=>{
   /**
     * 光源设置
     */
    // 平行光1
    var directionalLight = new DirectionalLight(0x80b5ff, 1);
    directionalLight.position.set(-250, 250, 100);
    scene.add(directionalLight);
    var directionalLight = new DirectionalLight(0x80d4ff, 1);
    directionalLight.position.set(-250, 250, 100);
    scene.add(directionalLight);
    var directionalLight = new DirectionalLight(0x80b5ff, 1);
    directionalLight.position.set(-250, 250, 100);
    scene.add(directionalLight);
    var directionalLight = new DirectionalLight(0xc2ffff, 1);
    directionalLight.position.set(-250, 250, 100);
    scene.add(directionalLight);
    // 点光1
    var pointLight = new PointLight(0x80d4ff, 1);
    pointLight.position.set(-250, 250, 100);
    scene.add(pointLight);
 
    // 半球光1
    var hemisphereLight = new HemisphereLight(0xffffff, 0x3d6399, 1);
    hemisphereLight.position.set(-250, 250, 100);
    scene.add(hemisphereLight);
    var hemisphereLight = new HemisphereLight(0xffffff, 0x3d6399, 1);
    hemisphereLight.position.set(-250, 250, 100);
    scene.add(hemisphereLight);
    //环境光
    var ambient = new AmbientLight(0x002bff, 0.8);
    scene.add(ambient);
}

