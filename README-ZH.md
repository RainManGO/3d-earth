Language: [English](README.md) | [中文简体](README-ZH.md)

<p align="center">
  <img width="192" src="https://tva1.sinaimg.cn/large/008i3skNly1gy3q3h2ufrj308103gmx4.jpg" alt="axios mapper">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/3d-earth">
    <img src="https://img.shields.io/npm/v/3d-earth?color=blue" alt="npm">
  </a>
  <a href="https://github.com/RainManGO/3d-earth">
    <img src="https://img.shields.io/npm/types/3d-earth" alt="Types">
  </a>
    <a href="https://github.com/RainManGO/axios-mapper/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/axios-mapper" alt="License">
  </a>
</p>






3d-earth 是一个漂亮的，基于threejs 的组件。



效果展示：

![3d-earth](https://img-blog.csdnimg.cn/448b48bbe7394022b089c7617d2222d8.gif)





## Install

```shell
  npm install 3d-earth
```

or

```shell
  yarn add 3d-earth
```

## Features

- [x]  星空背景
- [x]  云层
- [x] 城市位置涟漪
- [x]  光晕
- [x] 世界地图边界
- [x] 飞线效果
- [x]  地球自转动画
- [x] 自动缩放中国动画


## Usage



已打包esm 文件，如有其他需求自行打包。支持vue/react/html 简单嵌入

&nbsp;

config

```js
   //地球是否旋转
  autoRotate: boolean;
  //是否缩放到中国，之后再放大动画
  zoomChina: boolean;
  //是否显示星空背景
  starBackground: boolean
```




### Dependency

 - ThreeJS
 - TweenJS



## License

3d-earth  is open-sourced software licensed under the [MIT license](./LICENSE).
