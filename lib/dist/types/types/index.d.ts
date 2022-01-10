/**
 * @description: 地球配置
 * @param {*}
 * @return {*}
 */
export interface EarthConfigProps {
    earthRadius: number;
    autoRotate: boolean;
    zoomChina: boolean;
    starBackground: boolean;
    orbitControlConfig: {
        enableRotate: boolean;
        enableZoom: boolean;
    };
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
