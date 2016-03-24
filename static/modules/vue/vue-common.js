/**
 * Created by xpeng on 2015/12/23.
 */
var Vue = require('vue/vue');
var vueApp = require('vue/vue-app');
var share=require('vue/vue-share');

Vue.config.debug = true;//只有开发版本可以使用调试模式。
//Vue.config.delimiters = ['${', '}']  //修改文本插值的定界符。
//Vue.config.unsafeDelimiters = ['{!!', '!!}'] //修改原生 HTML 插值的定界符。
Vue.config.silent = false;//取消 Vue.js 所有的日志与警告

//Vue.component('app-back', {
//    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>'
//});


var back = Vue.extend({
    template: '<a @click="appBack" class="backButton back"></a>',
    methods: {
        appBack: function () {
            vueApp.back();
        }
    }
});


//注册返回组件
Vue.component('app-back', back);
//注册mask组件
Vue.component('loading', {
    template: '<div id="afui_mask" v-show="!$parent.loading" class="ui-loader"><span class="ui-icon ui-icon-loading spin"></span><h1></h1></div>'
});
Vue.component('mask', {
    template: '<div id="mask" v-show="$parent.mask" class="mask"></div>'
});
//
Vue.component('popup', {

    template: '<div id="popup" v-show="$parent.popup" transition="o" class="ui-loader popup">{{$parent.popup}}</div>',
    watch: {
        '$parent.popup': function (val, oVal) {
            var $this = this;
            if (val) {
                setTimeout(function () {
                    $this.$parent.popup = null;
                }, 3000)
            }
        }
    }
});
module.exports = {
    mixins: [share],
    ready: function () {
        if (/@LLT_HYBRID_APP/.test(navigator.userAgent)) {

            document.addEventListener('click', function (e) {
                if (e.target && e.target.nodeName == "A" || e.target.parentNode.nodeName == "A") {
                    var tar=e.target.nodeName == "A" ? e.target:e.target.parentNode;
                    var href = tar.getAttribute('href');
                    vueApp.refUrl(href);
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            },false)
        }else{
            this.set_share(window.LLT_WX_SHARE);
        }

    },
    methods: {
        httpGet: function (setting) {
            setting = setting || {};
            setting.options = setting.options || {};
            setting.options.emulateJSON = true;
            setting.beforeSend &&( setting.options.beforeSend=function(request){
                setting.beforeSend(request);
            })
            if(setting.type && setting.type=='post'){
                Vue.http.post(setting.url, setting.param, setting.options).then(function (response) {
                    if (response.status == '200') {
                        setting.success && setting.success(response.data);
                    }
                }, setting.error);
            }else{
                Vue.http.get(setting.url, setting.param, setting.options).then(function (response) {
                    if (response.status == '200') {
                        setting.success && setting.success(response.data);
                    }
                }, setting.error);
            }

        },
        httpPost: function (setting) {
            setting = setting || {};
            setting.type='post';
            this.httpGet(setting);
        },
        getSearch: function (name, search) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = search ? search.substr(1).match(reg) : decodeURIComponent(window.location.search).substr(1).match(reg);
            if (r != null) return (r[2]);
            return null;
        },
        vueBack: function(){
            vueApp.back();
        },
        setTitle: function(title){
            vueApp.setNavBarTitle(title);
        }
    }
}

