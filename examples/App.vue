<template>
    <div id="app">
        <el-button @click="toViewFile"
                   size="mini"
                   type='primary'>查看图片
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'App',
        data(){
            return{
                fileList:[
                    //有name文件名字展示name 没有name属性自动截取后缀前的名字
                    {url:require('./assets/testImg/1.jpeg')},
                    {name:'22222',url:require('./assets/testImg/2.jpeg')},
                    {name:'33333',url:require('./assets/testImg/3.jpeg')},
                    {url:require('./assets/testImg/4.jpeg')},
                    {name:'55555',url:require('./assets/testImg/5.jpeg')},
                    {url:'https://bbzcar.com.cn/akfile/view/clyy/file/accessory/20200731/20073116332166102712.pdf'},
                ]
            }
        },
        methods:{
            toViewFile(){
                this.$fileView(this.fileList,1,(file)=>{
                    console.log(file);
                });
            }
        }
    }
</script>

<style>

</style>
