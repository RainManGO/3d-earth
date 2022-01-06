import * as THREE from "three";
export declare class InitFlyLine {
    constructor({ texture }?: any);
    /**
     * [addFly description]
     *
     * @param   {String}  opt.color  [颜色_透明度]
     * @param   {Array}   opt.curve  [线的节点]
     * @param   {Number}  opt.width  [宽度]
     * @param   {Number}  opt.length [长度]
     * @param   {Number}  opt.speed  [速度]
     * @param   {Number}  opt.repeat [重复次数]
     * @return  {Mesh}               [return 图层]
     */
    addFly({ color, curve, width, length, speed, repeat, texture, callback }?: any): THREE.Points<THREE.BufferGeometry, THREE.ShaderMaterial>;
    /**
     * 根据线条组生成路径
     * @param {*} arr 需要生成的线条组
     * @param {*} dpi 密度
     */
    tranformPath(arr: any, dpi?: number): any[];
    /**
     * [remove 删除]
     * @param   {Object}  mesh  [当前飞线]
     */
    remove(mesh: any): void;
    /**
     * [animation 动画]
     * @param   {Number}  delta  [执行动画间隔时间]
     */
    animation(delta?: number): void;
    color(c: any): THREE.Color;
    getColorArr(str: any): any[];
}
