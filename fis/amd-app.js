/**
 * Created by Peng on 2016/3/24.
 */

var path = require('path');

//fis.config.set('project.include', /^\/(?:html|js|css|img)\/.*\.(?:html|js|css|swf|mp4|jpg|png|gif|ico|cur|otf|eot|svg|ttf|woff|woff2)$/i);
//fis.config.set('project.include', /^\/(?:html|js|css|img)\/.*$/img);

//发布为相对路径
fis.config.set('roadmap.relative', true);

fis.config.set('project.fileType.image', 'swf, mp4, ico, cur, otf, eot, ttf, woff, woff2');

//处理less文件
fis.config.set('modules.parser.less', 'less');
//将less文件编译为css
fis.config.set('roadmap.ext.less', 'css');

//amd start
fis.config.set('modules.postpackager', 'autoload');
fis.config.set('settings.postpackager.autoload.type', 'requirejs');

fis.config.set('modules.postprocessor.html', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');
fis.config.set('settings.postprocessor.amd', {
    baseUrl: './modules',
    // 查看：https://github.com/amdjs/amdjs-api/blob/master/CommonConfig.md#paths-
    // 不同的是，这是编译期处理，路径请填写编译路径。
    paths: {
    }
});

//使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');

fis.config.set('pack', {

    // js
    // 依赖也会自动打包进来, 且可以通过控制前后顺来来定制打包，后面的匹配结果如果已经在前面匹配过，将自动忽略。
    //'pkg/modules/vue/vue.js': ['modules/vue/vue.js'],
    //'pkg/modules/qna/add.js': ['modules/qna/add.js']

});

//文件打包
fis.config.merge({
    pack: {

    }
});
//amd end

//生成hash-map,用于增量更新使用
fis.config.set('modules.postpackager', 'jchm');

//静态资源文件域名设置
fis.config.merge({
    roadmap: {
        domain: ''
    }
});


//部署设置
fis.config.set('roadmap.path', [

    //不发布的文件
    {
        reg: /.+\.(?:cmd|bat|json)$/i,
        release: false
    },
    {
        reg: /\/bower_components\/.*$/i,
        release: false
    },
    {
        reg: /\/(?:html|js|css)\/.*(?:[-_]tpl\.html)$/i,
        release: false
    },
    {
        reg: /\/include\/.*\.(?:js|css|less|scss|html)$/i,
        release: false
    },
    //所有已_开头的文件，不发布
    {
        reg: /.*?\/_[-_\w]+\.(?:html|js|less|scss|css|png|gif|jpg)$/i,
        release: false
    },
    //hybrid app发布规则
    {
        reg: /^\/js\/app\/config.js/i,
        release: 'config.js'
    },
    {
        reg: /^\/js\/app\/config.product.js/i,
        release: 'config.product.js'
    },
    {
        reg: /^\/html\/.*\/(?:app(?:\.[\w]+)?|main|style)\.(?:html|js|less|scss|css)$/i,
        release: '$&'
    },
    {
        reg: /^\/(?:js|css)\/.*/i,
        release: '$&'
    },

    //模块化开发相关
    {
        reg: /^\/modules\/(.+\.js)/i,
        release: '$&',
        url: '$&',
        isMod: true,
        id:'$&'
    },
    //modules html文件不发布
    {
        reg: /^\/modules\/(.+\.html)/i,
        release: false
    },
    //modules html文件不发布
    {
        reg: /\/pkg\/(.+\.js)/i,
        release:  '$&'
    },
    //任何img文件
    {
        reg: /^.*\.(?:jpg|png|gif|svg)/i,
        release: '$&'
    },
    //字体文件
    {
        reg: /.+?([^/]+\.(?:otf|eot|svg|ttf|woff|woff2))$/i,
        release: '$&'
    },
    //其它任何文件不发布
    {
        reg: /.+$/i,
        release: false
    }

]);


//使用fis release --dest local，lltios来使用这个配置
fis.config.merge({
    deploy : {
        local : {
            to : '../www',
            exclude: /(?:\/_[^/]+\.\w+)|(?:\.(?:cmd|json))$/i
        }
        //football : {
        //    to : '../../football/platforms/ios/www',
        //    exclude: /(?:\/_[^/]+\.\w+)|(?:\.(?:cmd|json))$/i
        //}
    }
});