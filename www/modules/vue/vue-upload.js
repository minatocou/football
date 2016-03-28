define('/modules/vue/vue-upload', ['require', 'exports', 'module', '/modules/vue/vue', '/modules/vue/vue-resource', '/modules/vue/vue-common'],function(require, exports, module) {
/**
 * Created by xpeng on 2016/3/24.
 */
var Vue=require('/modules/vue/vue');
Vue.use(require('/modules/vue/vue-resource'));
var common=require('/modules/vue/vue-common');

Vue.component('upload', {
    mixins: [common],
    template: "<div class=\"img-box\">\r\n    <div class=\"u-img\" id=\"upload-images\">\r\n    </div>\r\n    <div class=\"add-img\">\r\n        <input v-if=\"multiple==true\" @change=\"fileChange\" multiple=\"true\" type=\"file\">\r\n        <input v-else @change=\"fileChange\" type=\"file\">\r\n    </div>\r\n</div>",
    props:["maxImg","maxHeight","multiple"],
    data:{
        maxHeight:null,
        imgs:[]
    },
    methods:{
        render: function(src){
            var $this=this;
            lrz(src, {width: $this.maxHeight,height:$this.maxHeight})
                .then(function (rst) {
                    // 把处理的好的图片给用户看看呗
                    var img = new Image();

                    img.src = rst.base64;

                    img.onload = function () {
                        var preDiv=document.createElement('div');
                        preDiv.classList.add('preDiv');
                        preDiv.appendChild(img);
                        document.getElementById("upload-images").appendChild(preDiv);
                    };
                    return rst;
                })
                .then(function (rst) {
                    // 这里该上传给后端啦

                    /* ==================================================== */
                    // 原生ajax上传代码，所以看起来特别多 ╮(╯_╰)╭，但绝对能用
                    // 其他框架，例如jQuery处理formData略有不同，请自行google，baidu。
                    //var xhr = new XMLHttpRequest();
                    //xhr.open('POST', 'http://localhost:5000/');
                    //xhr.onload = function () {
                    //    if (xhr.status === 200) {
                    //        // 上传成功
                    //    } else {
                    //        // 处理其他情况
                    //    }
                    //};
                    //xhr.onerror = function () {
                    //    // 处理错误
                    //};
                    //xhr.upload.onprogress = function (e) {
                    //    // 上传进度
                    //    var percentComplete = ((e.loaded / e.total) || 0) * 100;
                    //};
                    //// 添加参数
                    //rst.formData.append('fileLen', rst.fileLen);
                    //rst.formData.append('xxx', '我是其他参数');
                    //// 触发上传
                    //xhr.send(rst.formData);
                    ///* ==================================================== */
                    //return rst;
                })
                .catch(function (err) {
                    // 万一出错了，这里可以捕捉到错误信息
                    // 而且以上的then都不会执行
                    alert(err);
                })
                .always(function () {
                    // 不管是成功失败，这里都会执行
                });
        },
        loadImage: function(src){
            var $this=this;
            if(!src.type.match(/image.*/)){
                if(window.console){
                    console.log("选择的文件类型不是图片: ", src.type);
                } else {
                    window.confirm("只能选择图片文件");
                }
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e){
                $this.render(e.target.result);
            };
            reader.readAsDataURL(src);
        },
        fileChange: function(e){
            e.preventDefault();
            var imgLength=document.querySelectorAll('.preDiv').length;
            console.log(imgLength);
            for(var i=0;i<e.target.files.length;i++){
                if(i+imgLength<=this.maxImg){
                    this.loadImage(e.target.files[i]);
                }else{
                    alert('最多添加9张照片');
                    return;
                }

            }
        }

    },
    ready:function(){

    }

})
});