# 微足ios hybrid app产品

基于<a href="http://www.dcloud.io/">dcloud</a>开发 UI库<a href="https://github.com/dcloudio/mui">mui</a>



###目录结构
 ├── HBuilder-hello   // 项目主目录
        │    ├── static
        │    └──
        ├── Pandora/apps/H59620898(ID)                      // 前端项目目录
        │    ├── js // js部署目录
        │    │       └── app.js //全局js处理        
        │    │       └── lrz.all.bundle.js //本地预览、上传依赖包 
        │    │       └── mui.js //mui库
        │    │       └── mui.picker.min.js //mui日期选择依赖库
        │    │       └── mui.picker.min.js //mui日期选择依赖库
        │    │       └── upload.js //单文件上传以及多文件上传实现
        │    ├──  css// css部署目录
        │    │       └── (根据html文件命名)             
        │    ├──  img // image部署目录
        │    │       └── app             
        │    ├──  fonts //字体文件
        │    │               
        │    └──  manufest.json //项目配置文件 配置规范参考(<a href="http://ask.dcloud.net.cn/article/41">IOS配置</a>)

推荐使用IDE<a href="http://download.dcloud.net.cn/HBuilder.7.0.0.windows.zip">win</a> <a href="http://download.dcloud.net.cn/HBuilder.7.0.0.macosx_64.tar.gz">mac</a> 
