/*
 * @Author: ZY
 * @Date: 2021-12-31 13:59:54
 * @LastEditors: ZY
 * @LastEditTime: 2021-12-31 15:06:58
 * @FilePath: /3d-earth/lib/src/config/index.ts
 * @Description: 全局配置设置
 */

//地球半径
export const earthRadius = 10

//世界轮廓线段
export const countryLineColor = 0x7aa5a5

export const controlConfig = {
  minZoom: 0.5,
  maxZoom: 2,
  minPolarAngle: 0,
  maxPolarAngle: Math.PI / 2,
};