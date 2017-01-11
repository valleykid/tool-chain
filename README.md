# 通用工具链

此工具包是基于gulp+webpack封装而成，提供了`动态编译、热更新、demo动态刷新、demo服务器代理`等功能，可以达到极致顺畅的开发体验~

### 安装和使用

- step1:
```
tnpm i tool-chain
```

- step2:
```
// gulpfile.js 工具包中默认提供的命令：webpack/dev
const gulp = require('gulp');
const tc = require('tool-chain');
gulp.tasks = tc.gulp.tasks;
gulp.task('default', ['dev']);
```

- step3:
```
gulp / gulp dev
```

- demo-node启动，就可以体验顺畅开发了。。。


### 配置文件.toolchainrc

```
{
  "name": "" // 工程名，与platform中同名，默认从package.json中取
  "tasks": ["library", "webpack"], // 远程gulp任务，默认webpack+min(min任务不用设置)
  "server": {
    "watch": "", // gulp-nodemon监听文件夹
    "env": { "NODE_ENV": "local" },  // node启动时参数配置
    "script": "./examples/bin/server.js" // node启动文件 required
  },
  "proxy": {
    "hotdomain": "", // 热更新指向域名，默认取本机ip
    "port": 8800 // node服务器端口
  },
  "livereload": {
    "exts": ["xtpl"], // 监听的node端文件类型
    "watchPath": "./examples/app/views" // 监听的node端文件夹
  }
}
```

PS: hotdomain设置可参考[文章](http://forum-archive.vuejs.org/topic/836/webpack-hot-reloading-possible-with-express-server)，大部分场景不需要设置

### Usage

express服务器

```
// webpackware.js

const proxy = require('tool-chain/proxy');

module.exports = function(app) {
  app.use(proxy.wpdev());
  app.use(proxy.wphot());
  app.use(proxy.wpcors());
  app.set('proxyPort', proxy.port);
    const livereloadjs = proxy.livereload();
    app.use(function(req, res, next){
      res.locals.livereloadjs = livereloadjs;
      next();
    });
};
```

```
// proxy.route.js
const proxy = require('tool-chain/proxy');
module.exports = module.exports = function(app) {
  proxy.expressRoute(app);
};

```

```
// app.js
...
const app = express();
...
require('./webpackware')(app);
require('./routes/router.proxy')(app);
...

// const server = http.createServer(app);

// 使用http/https协议监听同一个本地端口
const server = proxy.globalServer(app);
server.listen(app.get('proxyPort') || process.env.PORT || 8080, function () {
  console.log('Listening on %j', server.address());
});

```

### webpack自定义扩展配置

规定格式：
```
module.exports = {
  loadersSetting: 'babel, less', //默认四个loader: babel, less, html, url，此处不设置则用默认
  module: {
    loaders: [...] //此处设置会与默认的loader融合
  }
}
```

函数格式：
```
// 此处的cfg为包内置webpack配置对象，webpack也是内置的webpack
module.exports = function(cfg, webpack) {
  // 设置externals
  config.externals = {
    requirejs: 'requirejs',
    kui: 'KUI',
    jquery: 'jQuery',
    backbone: 'Backbone',
    underscore: '_',
    icat: 'ICAT'
  };
  ...
};

```

### `!import` 打包入口文件

可以在.toolchainrc中设置`entryPath`(默认./src/entry) 或 `libPath`控制打包哪些文件；

如果js中有less引用，会打包出一个同名的css文件; 比如bundle.js作为入口文件，引入了各种饱含less引用的组件，会打包出一个bundle.css

libPath主要是考虑第三方非npm包的场景，需要依赖又想单独打包，可以在此处设置


### License
[MIT License](http://www.opensource.org/licenses/mit-license.php)
