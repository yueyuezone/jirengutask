## `nodejs`
`node`是运动`javascript`的引擎，内置模块可以操作，文件，建立服务器，操作`c++`，路径等

## `npm`
`npm`是`nodejs package manage`的简称。是一个命令行工具，可以下载`npm` 包.
### 常用的`npm`包
`nrm`切换`npm`源地址的包
`n`切换`node`版本的包

## `package.json`
```json
{
  "name": "note-app-vuejs-vuex",
  "version": "1.0.0",
  "description": "A notes application built using VueJs and Vuex",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --inline --hot",
    "build": "webpack -p"
  },
  "author": "Fady Makram",
  "license": "MIT",
  "devDependencies": {
    "babel-core": "^6.7.6",
  },
  "dependencies": {
    "vue": "^1.0.21",
  }
}
```
- `dependencies`当前npm包的依赖包
- `devDependencies`当前npm包中的依赖，但是并不包含在代码中
- `scripts`命令行工具

## `npm scripts`
- 用`npm install -g `安装的包，是命令行工具。
- 在`js`中`require('axios')`,即表示在`node_modules`中查找`axios npm` 包。不然会有`./axios`,表示当前目录.然后在当前的`node_modules`中找不到，就往文件的路径中的`node_modules`中查找、和全局安装的是两种东西。`E:\learn\task\jirengutask\node_modules`
- `scripts`中，可以在`dev`环境下的`node_modules\.bin`中的`npm`包中，调用它的命令行，而可以不用调用全局变量的包

