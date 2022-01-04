/*
 * @Author: ZY
 * @Date: 2022-01-04 14:50:39
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-04 15:06:48
 * @FilePath: /3d-earth/lib/src/tools/index.ts
 * @Description: 工具方法
 */

export const lon2xyz = (
  radius: number,
  longitude: number,
  latitude: number
) => {
  var lon = (longitude * Math.PI) / 180; //转弧度值
  var lat = (latitude * Math.PI) / 180; //转弧度值
  lon = -lon; // three.js坐标系z坐标轴对应经度-90度，而不是90度

  // 经纬度坐标转球面坐标计算公式
  var x = radius * Math.cos(lat) * Math.cos(lon);
  var y = radius * Math.sin(lat);
  var z = radius * Math.cos(lat) * Math.sin(lon);
  // 返回球面坐标
  return {
    x: x,
    y: y,
    z: z,
  };
};
