## 模块的出现原因
1. 为何会有模块的出现
    - 随着`javascript`越来越强大，函数代码的组织变得越来越难
    - 于是模块化的思维开始出现，即一个功能需求，在相应的代码模块中，需要的时候再引入调用
2. 初期阶段
    - 简单的代码函数封装
    - 命名冲突的问题
3. 模块的引入
    - commonJs
        >一个文件就是一个模块，每个模块都有其单独的作用域
        ```javascript
        //模块定义 myModel.js
            var name = 'Byron';
            function printName(){
                console.log(name);
            }
            function printFullName(firstName){
                console.log(firstName + name);
            }
            module.exports = {
                printName: printName,
                printFullName: printFullName
            }
            //加载模块
            var nameModule = require('./myModel.js');
            nameModule.printName();
        ```
        > 问题这个是nodejs 服务端的使用方法，模块的加载是同步的
    - AMD
        > 浏览器端的模块加载，使用异步加载的方法
        ```javascript
        // 定义模块 myModule.js
        define(['dependency'], function(){
            var name = 'Byron';
            function printName(){
                console.log(name);
            }
            return {
                printName: printName
            };
        });
        // 加载模块
        require(['myModule'], function (my){
            my.printName(); 
        });
        ```
        >可以定义模块名称，还能够加载依赖，再运行代码

## webpack的出现
> 为了使模块代码的依赖解绑，不再像amd那样，加载模块需要再次请求资源。 解决模块之间的加载顺序问题等，而且能够分块加载，合并重复的代码

webpack教程
https://webpack.docschina.org/concepts/

entry，outry
module是处理某一块特定资源的，
plugins是所有的资源都使用的情况