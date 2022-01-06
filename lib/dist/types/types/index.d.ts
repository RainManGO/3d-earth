/**
 * @description: 地球配置
 * @param {*}
 * @return {*}
 */
export interface EarthConfigProps {
    autoRotate: boolean;
    zoomChina: boolean;
    starBackground: boolean;
}
export interface City {
    name: string;
    longitude: number;
    latitude: number;
}
export interface FlyData {
    from: string;
    to: string[];
    color: string;
}
