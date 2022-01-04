/*
 * @Author: ZY
 * @Date: 2022-01-04 14:46:00
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-04 16:52:14
 * @FilePath: /3d-earth/lib/src/types/index.ts
 * @Description: 类型
 */


/**
 * @description: 地球配置
 * @param {*}
 * @return {*}
 */
export interface EarthConfigProps {
  //地球是否旋转
  autoRotate: Boolean;
  //是否缩放到中国，之后再放大动画
  zoomChina: Boolean;
}

//城市
export interface City {
  name:string,
  longitude:number,
  latitude:number
}

//飞线类型
export interface FlyData{
  from:string,
  to: string[],
  color:string
}
