/*
 * @Author: ZY
 * @Date: 2022-01-04 14:46:00
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-10 12:01:35
 * @FilePath: /3d-earth/lib/src/types/index.ts
 * @Description: 类型
 */


/**
 * @description: 地球配置
 * @param {*}
 * @return {*}
 */
export interface EarthConfigProps {
   //地球半径
   earthRadius: number;
  //地球是否旋转
  autoRotate: boolean;
  //是否缩放到中国，之后再放大动画
  zoomChina: boolean;
  //是否显示星空背景
  starBackground: boolean;
  // 滑轨相机配置
  orbitControlConfig:{
    enableRotate:boolean,
    enableZoom:boolean
  }
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
