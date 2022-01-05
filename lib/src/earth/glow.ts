/*
 * @Author: ZY
 * @Date: 2021-12-31 16:40:30
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-05 14:53:18
 * @FilePath: /3d-earth/lib/src/earth/glow.ts
 * @Description: 大气层光环效果
 */

import { TextureLoader, SpriteMaterial,Sprite} from "three";
export const earthGlow =  (radius:number,img:any,scale:number) =>{
  // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
  var textureLoader = new TextureLoader();
  var texture = textureLoader.load(img); //加载纹理贴图
  // 创建精灵材质对象SpriteMaterial
  var spriteMaterial = new SpriteMaterial({
    map: texture, //设置精灵纹理贴图
    transparent: true, //开启透明
    // opacity: 0.5,//可以通过透明度整体调节光圈
  });
  // 创建表示地球光圈的精灵模型
  var sprite = new Sprite(spriteMaterial);
  sprite.scale.set(radius * scale, radius * scale, 1); //适当缩放精灵

  return sprite
};