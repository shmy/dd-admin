# WebPolice 项目起始模板

基于[`D2Admin v1.2.0`](http://d2admin.fairyever.com/zh/)，只保留了基础功能，例如

* 主题系统
* 登陆和注销
* 数据持久化
* 多标签页
* 菜单和路由逻辑
* ...

# 新增功能  

* 根据后端条件动态生成路由和菜单 👌
* 按需引入 `Element-ui` 组件 减少体积 👌
* 请求拦截 请求进度 请求统一返回 👌
* 根据菜单结构生成路由 👌
* 生产环境预渲染 👌
* 系统参数便捷配置 👌
* 常用表单验证规则 👌
* 滚动位置记录与恢复 👌
* lottie 动画 👌
* 自定义过渡动画 👌
* 便捷mixins 👌

# 教程

- 配置路由
> 本项目采用菜单映射路由，所有`tab`内打开的页面，在`src/menu/map.js`的`MAPS`中添加对应的模块，路径，将自动映射到`src/pages`目录, 路由组件的`name`与组件的`name`会自动匹配生成；所有`tab`外打开的页面自行配置`router/routes.js`。  

- 添加`Element-ui`组件
> `src/plugin/element-ui/index.js`里按需加载

- 表单验证规则
> `src/libs/rules.js`里书写验证规则，已导入`validator.js`，可以复用其规则

# 实例添加的属性/方法

* `$env`: `process.env.NODE_ENV`
* `$baseUrl`: 发布路径
* `$confirm`: 同Element-UI
* `$alert`: 同Element-UI
* `$prompt`: 同Element-UI
* `$message.success`: 同Element-UI
* `$message.warning`: 同Element-UI
* `$message.info`: 同Element-UI
* `$message.error`: 同Element-UI
* `$message.closeAll`: 同Element-UI
* `$notify.success`: 同Element-UI
* `$notify.warning`: 同Element-UI
* `$notify.info`: 同Element-UI
* `$notify.error`: 同Element-UI
* `$notify.closeAll`: 同Element-UI
* `$log`: 快速打印一条日志
* `$logAdd`: 快速记录一条日志
* `$open`: 打开外部链接
* `$sve[namespace]`: 封装的`services`
* `$krCam`: 封装的摄像头拍照
* `$krCropper`: 封装的图片裁切组件
* `$krViewer`: 封装的图片预览组件

# tab页的实例mixin

* `backTop`: 返回顶部
* `openTab(name, [params, query])`: 根据路由`name`打开新标签
* `closeTab(name)`: 根据路由`name`关闭标签
* `closeCurrentTab`: 关闭当前tab

# 全局的系统参数
> 可以修改`.env`(生产环境)，`.env.development`(开发环境) 进行复写  

* `window.__SITE_CONFIG.NAME`: 系统的名称
* `window.__SITE_CONFIG.VERSION`: 系统的版本
* `window.__SITE_CONFIG.BUILD_AT`: 系统的构建时间
* `window.__SITE_CONFIG.SUPPORT_NAME`: 系统的支持名称
* `window.__SITE_CONFIG.SUPPORT_URL`: 系统的支持网址

# 快速上手

-   `NODE.JS >= 8`
-   安装 `Python`
-   设置 `NODE-SASS` 镜像  

  - windows: 

  ```bash
  $ set SASS_BINARY_SITE=http://npm.taobao.org/mirrors/node-sass
  ```

- 安装依赖
```bash
$ yarn install # npm install
```

- 启动
```bash
$ yarn run dev # npm run dev
```

- 打包
```bash
$ yarn run build # npm run build
```
