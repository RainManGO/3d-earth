/*
 * @Author: ZY
 * @Date: 2022-01-05 08:51:18
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-05 10:49:47
 * @FilePath: /3d-earth/lib/src/earth/flyLine.ts
 * @Description: 地球飞线
 */

import { FlyData, City } from "../types/index";
import { InitFlyLine } from "../tools/flyLine";
import { lon2xyz } from "../tools/index";
import { GlobalConfig } from "../config/index";
import { Vector3, CatmullRomCurve3, Object3D } from "three";
import pointPng from "../img/point.png";

export const earthAddFlyLine = (
  earth: Object3D,
  flyLineData: FlyData[],
  cityList: Record<string, City>
) => {
  let flyManager: InitFlyLine = null;

  if (flyManager == null) {
    flyManager = new InitFlyLine({
      texture: pointPng,
    });
  }

  for (var i = 0; i < flyLineData.length; i++) {
    var flyLine = flyLineData[i];
    for (var j = 0; j < flyLine.to.length; j++) {
      randomAddFlyLine(
        earth,
        flyManager,
        cityList[flyLine.from],
        cityList[flyLine.to[j]],
        flyLine.color
      );
    }
  }

  return flyManager;
};

// 随机个时间间隔后，再添加连线（以免同时添加连线，显示效果死板）
const randomAddFlyLine = (
  earth: Object3D,
  flyManager: InitFlyLine,
  fromCity: City,
  toCity: City,
  color: string
) => {
  setTimeout(function () {
    addFlyLine(earth, flyManager,fromCity, toCity, color);
  }, Math.ceil(Math.random() * 15000));
};

// 增加城市之间飞线
const addFlyLine = (
  earth: Object3D,
  flyManager: InitFlyLine,
  fromCity: City,
  toCity: City,
  color: string
) => {
  var coefficient = 1;
  var curvePoints = new Array();
  var fromXyz = lon2xyz(GlobalConfig.earthRadius, fromCity.longitude, fromCity.latitude);
  var toXyz = lon2xyz(GlobalConfig.earthRadius, toCity.longitude, toCity.latitude);
  curvePoints.push(new Vector3(fromXyz.x, fromXyz.y, fromXyz.z));

  //根据城市之间距离远近，取不同个数个点
  var distanceDivRadius =
    Math.sqrt(
      (fromXyz.x - toXyz.x) * (fromXyz.x - toXyz.x) +
        (fromXyz.y - toXyz.y) * (fromXyz.y - toXyz.y) +
        (fromXyz.z - toXyz.z) * (fromXyz.z - toXyz.z)
    ) / GlobalConfig.earthRadius;
  var partCount = 3 + Math.ceil(distanceDivRadius * 3);
  for (var i = 0; i < partCount; i++) {
    var partCoefficient =
      coefficient + (partCount - Math.abs((partCount - 1) / 2 - i)) * 0.01;
    var partTopXyz = getPartTopPoint(
      {
        x:
          (fromXyz.x * (partCount - i)) / partCount +
          (toXyz.x * (i + 1)) / partCount,
        y:
          (fromXyz.y * (partCount - i)) / partCount +
          (toXyz.y * (i + 1)) / partCount,
        z:
          (fromXyz.z * (partCount - i)) / partCount +
          (toXyz.z * (i + 1)) / partCount,
      },
      GlobalConfig.earthRadius,
      partCoefficient
    );
    curvePoints.push(new Vector3(partTopXyz.x, partTopXyz.y, partTopXyz.z));
  }
  curvePoints.push(new Vector3(toXyz.x, toXyz.y, toXyz.z));

  //使用B样条，将这些点拟合成一条曲线（这里没有使用贝赛尔曲线，因为拟合出来的点要在地球周围，不能穿过地球）
  var curve = new CatmullRomCurve3(curvePoints, false);

  //从B样条里获取点
  var pointCount = Math.ceil(500 * partCount);
  var allPoints = curve.getPoints(pointCount);

  //制作飞线动画
  // @ts-ignore
  var flyMesh = flyManager.addFly({
    curve: allPoints, //飞线飞线其实是N个点构成的
    color: color, //点的颜色
    width: 0.3, //点的半径
    length: Math.ceil((allPoints.length * 3) / 5), //飞线的长度（点的个数）
    speed: partCount + 10, //飞线的速度
    repeat: Infinity, //循环次数
  });

  earth.add(flyMesh);
};

const getPartTopPoint = (
  innerPoint: { x: number; y: number; z: number },
  earthRadius: number,
  partCoefficient: number
) => {
  var fromPartLen = Math.sqrt(
    innerPoint.x * innerPoint.x +
      innerPoint.y * innerPoint.y +
      innerPoint.z * innerPoint.z
  );
  return {
    x: (innerPoint.x * partCoefficient * earthRadius) / fromPartLen,
    y: (innerPoint.y * partCoefficient * earthRadius) / fromPartLen,
    z: (innerPoint.z * partCoefficient * earthRadius) / fromPartLen,
  };
};
