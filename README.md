# 微足ios hybrid app产品

基于<a href="http://www.dcloud.io/">dcloud</a>开发 UI库<a href="https://github.com/dcloudio/mui">mui</a>

##名词解释
*dcloud：前端框架 <br/>
*HTML5+：封装原生一些api <br/>
*Native.js：封装js中操作oc的操作 <br/>
*MUI：ui库，对HTML5+进行深度封装。 <br/>
*H59620898 为manufest.json中id，具体请参考<a href="http://ask.dcloud.net.cn/article/41">IOS配置</a>
##使用方式
1.安装<a href="https://nodejs.org/en/">nodejs</a>     <br/>
2.安装less  cmd -> $npm i -g less <br/>
3.安装ide，工具->预编译设置->选中less->编辑->智能完成 <br/>
4.文件->打开目录，选择项目源文件目录 <br/>


##注意事项
*less文件中*@xem为适配各个屏幕尺寸，例   20px==20*@xem



##目录结构
 ├── HBuilder-hello   // 项目主目录<br/>
   ├── Pandora/apps/H59620898                      // 前端项目目录 <br/>
   │    ├── js                                         // js部署目录<br/>
   │    │       └── app.js //全局js处理        <br/>
   │    │       └── lrz.all.bundle.js //本地预览、上传依赖包 <br/>
   │    │       └── mui.js //mui库<br/>
   │    │       └── mui.picker.min.js //mui日期选择依赖库<br/>
   │    │       └── upload.js //单文件上传以及多文件上传实现<br/>
   │    ├──  css// css部署目录<br/>
   │    │       └── (根据html文件命名)             <br/>
   │    ├──  img // image部署目录<br/>
   │    │       └── app             <br/>
   │    ├──  fonts //字体文件<br/>
   │    │               <br/>
   │    └──  manufest.json //项目配置文件 配置规范参考(<a href="http://ask.dcloud.net.cn/article/41">IOS配置</a>)<br/>

推荐使用IDE
<a href="http://download.dcloud.net.cn/HBuilder.7.0.0.windows.zip">win</a> 
<a href="http://download.dcloud.net.cn/HBuilder.7.0.0.macosx_64.tar.gz">mac</a>  
