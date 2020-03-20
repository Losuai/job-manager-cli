<template>
    <el-row class="head">
        <div class="head-1"><a class="nav-title" href="">{{name}}</a></div>
        <!-- <el-input  class="head-search"
            placeholder="请输入内容"
            v-model="input">
        </el-input> -->
        
    </el-row>
</template>
<style>
.head{
    top: 30%;
    display: flex;
    justify-content: flex-start;
}

.head-1{
    height: 40px;
    width: 700px;
    line-height: 40px;
    padding-left: 20px;
    font-size: 18px;
    font-weight: 800;
}
.head-search{
    height: 40px;
    width: 260px;  
    background-color: #2dcebf;
    
}
.head-search input.el-input__inner{
   border-radius: 30px;
   border: #abebe2 solid 2px;
   background-color: #2dcebf;
}
.nav-title{
    color: #ffffff;
    text-decoration:none;
}
.nav-title:hover{
    color: #e1e1ef;
}
</style>
<script>
import Common from '@/common/common.js'

export default {
    data(){
        return{
            input:'',
            name: "首页",
        }
    },
     mounted: function () {
      var vm = this
      // 用$on事件来接收参数
      Common.$on('val', (data) => {
        vm.name = data
      })
    },
}
</script>