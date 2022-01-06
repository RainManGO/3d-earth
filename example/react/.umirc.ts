/*
 * @Author: ZY
 * @Date: 2022-01-05 15:58:57
 * @LastEditors: ZY
 * @LastEditTime: 2022-01-05 17:31:52
 * @FilePath: /3d-earth/example/react/.umirc.ts
 * @Description: 文件描述
 */
import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  webpack5:{}
});
