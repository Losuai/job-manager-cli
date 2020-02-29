<template>
  <div>
      <div class="menu-top">
        <i class="el-icon-crop"></i>
        <h3>JOB MANAGER</h3>
      </div>
      <el-col :span="24" class="ac">
        <el-menu  
          :default-active="this.$route.path"
          router
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          @select="handleSelect"
          text-color="#858d8dde"
          >
          <el-menu-item  @click="click1" index="/1">
            <i class="el-icon-s-home" style="color:#1965f0;"></i>
            <span slot="title" id="nav-1">首页</span>
          </el-menu-item>
          <el-menu-item @click="click2" index="/quartz/task/add">
            <i class="el-icon-circle-plus" style="color:#5ac2f4;"></i>
            <span slot="title" id="nav-2">新增任务</span>
          </el-menu-item>
          <el-menu-item  @click="click3" index="/2-2">
            <i class="el-icon-s-order" style="color:#10e194;"></i>
            <span slot="title" id="nav-2">任务列表</span>
          </el-menu-item>
          <el-menu-item  @click="click4" index="/3">
            <i class="el-icon-s-release" style="color:#e8374f;"></i>
            <span slot="title" id="nav-2">失败纪录</span>
          </el-menu-item>
          <el-menu-item  @click="click5" index="/4">
            <i class="el-icon-user-solid" style="color:#e1b410;"></i>
            <span slot="title" id="nav-2">用户</span>
          </el-menu-item>
          <el-menu-item  @click="click6" index="/5">
            <i class="el-icon-s-tools" style="color:#ae10e1;"></i>
            <span slot="title" id="nav-2">设置</span>
          </el-menu-item>
          <el-menu-item  @click="click7" index="/6">
            <i class="el-icon-key" style="color:#206291;"></i>
            <span slot="title" id="nav-2">登录</span>
          </el-menu-item>
          <el-menu-item  @click="click8" index="/7">
            <i class="el-icon-s-custom" style="color:#1dd51a;"></i>
            <span slot="title" id="nav-2">注册</span>
          </el-menu-item>
        </el-menu>
      </el-col>
  </div> 
  
</template>

<script defer >
  import Common from '@/common/common.js'

  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
      console.log(key, keyPath);
      },
      click1: function () {
        Common.$emit('val', "首页")
      },
      click2: function () {
        Common.$emit('val', "新增任务")
      },
      click3: function () {
        Common.$emit('val', "任务列表")
      },
      click4: function () {
        Common.$emit('val', "失败记录")
      },
      click5: function () {
        Common.$emit('val', "用户")
      },
      click6: function () {
        Common.$emit('val', "设置")
      },
      click7: function () {
        Common.$emit('val', "登录")
      },
      click8: function () {
        Common.$emit('val', "注册")
      },
    },
      data () {
        return {
        } 
      }, 
     
  }
 
</script>
<style scoped>
/* .el-menu{
  	border-right:0;
} */

.menu-top{
  height: 70px;
  width: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0 0 15px;
  color: #2dce8a;
}

.ac{
  margin-top: 20px;  
}

.el-menu-item{
  padding-left: 30px!important;
  margin-top: 5px;
}
.el-menu-item:hover{
    outline: 0 !important;
    color: #454747de !important;
    background-color:rgb(255, 255, 255)
}
.el-menu-item.is-active {
    color: #080808f3 !important;
    background: none !important;
    border-left: 2px solid #5e72e4;
}
.el-icon-crop{
  size: 1000px
}
</style>