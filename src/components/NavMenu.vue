<template>
  <div class="aside-nav">
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
          <el-menu-item  @click="click1" index="/quartz/main">
            <i class="el-icon-s-home" style="color:#1965f0;"></i>
            <span slot="title" id="nav-1">首页</span>
          </el-menu-item>
          <el-menu-item @click="click2" index="/quartz/task/add">
            <i class="el-icon-circle-plus" style="color:#5ac2f4;"></i>
            <span slot="title" id="nav-2">新增任务</span>
          </el-menu-item>
          <el-menu-item  @click="click3" index="/quartz/task/list">
            <i class="el-icon-s-order" style="color:#10e194;"></i>
            <span slot="title" id="nav-2">任务列表</span>
          </el-menu-item>
          <el-menu-item  @click="click4" index="/quartz/record/list">
            <i class="el-icon-s-management" style="color:#e8374f;"></i>
            <span slot="title" id="nav-2">执行纪录</span>
          </el-menu-item>
          <el-menu-item  @click="click5" index="/quartz/user/profile">
            <i class="el-icon-user-solid" style="color:#e1b410;"></i>
            <span slot="title" id="nav-2">用户</span>
          </el-menu-item>
          <el-menu-item  @click="click7" index="/quartz/user/login">
            <i class="el-icon-key" style="color:#206291;"></i>
            <span slot="title" id="nav-2">登录</span>
          </el-menu-item>
          <el-menu-item  @click="click8" index="/quartz/user/register">
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
        this.$axios.get('/quartz/task/find?page=1')
        .then(function (response) {
          console.log(response)
          Common.$emit('Data', response.data.content)
          Common.$emit('totalElements', response.data.totalElements)
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      click4: function () {
        Common.$emit('val', "执行记录")
        this.$axios.get('/quartz/record/search?page=1')
        .then(function (response) {
          console.log(response)
          Common.$emit('record', response.data.data.content)
          Common.$emit('totalElement', response.data.data.totalElements)
        })
        .catch(function (error) {
          console.log(error);
        });
      },
      click5: function () {
        Common.$emit('val', "用户")
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
.aside-nav{
  position: fixed;
}
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
  position: fixed;
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