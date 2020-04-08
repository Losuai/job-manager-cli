<template>
  <div id="job-manager">
  <el-container>
    <el-aside width="250px" class="aside">
      <navmenu/>
    </el-aside> 
    <el-container class="container">
        <el-header class="header" style="height: 80px;"><vheader/></el-header>
        <el-main class="main">
          <div class="mainTop"><mainTop/></div>
          <el-container class="body">
            <router-view/>
          </el-container>
        </el-main>
        <el-footer class="jobfooter" style="height:100px;">
          <el-col :span="12"><div class="grid-content bg-purple ">© 2020 Job Manager & Binary Code</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light footer-right">About Us</div></el-col>
        </el-footer> 
    </el-container>
  </el-container>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
import Header from '@/components/Header'
import addJob from '@/components/AddJob'
import mainTop from '@/components/MainTop'
export default {
  name: 'Job',
  components: {
      'navmenu': NavMenu,
      'vheader': Header,
      'addJob': addJob,
      'mainTop': mainTop
    },
  data(){
    return{

    }
  },
  beforeCreate(){
    var user = this.$cookies.get('user');
    if(user === null) {
       this.$message({
          type: 'error',
          message: '请登录'
      });
      this.$router.push({path:'/quartz/user/login'})
    }
  },
  beforeUpdate(){
    var user = this.$cookies.get('user');
    if(user === null) {
       this.$message({
          type: 'error',
          message: '登录过期，请重新登录'
      });
      this.$router.push({path:'/quartz/user/login'})
    }
  }
}
</script>

<style>
#job-manager{
    margin-top: 0px;
    height: 100%;
    width: 100%;
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
}
.header{
  /* line-height: 40px; */
  background: -webkit-linear-gradient(left, #2dce8a, #2dcecb)
}
.main{
  padding: 0;
  height: 830px;
  background-color: #f1f2f5fb;
  position: relative;
  overflow: hidden!important;

}
.aside{
  height: 800px;
  color: #aa2525;
  box-shadow: #6c757d
}
.mainTop{
  height: 310px;
  width: 100%;
  background: -webkit-linear-gradient(left, #2dce91, #2dcebf);
}
.body{
    position: absolute;
    top: 220px;
    width: 1269px;
    /* height: 1200px; */
}
.jobfooter{
  background-color: #f8f9fa;
  width: 1269px;
  line-height: 100px;
  color: #9aa8b7;
}
.footer-right{
  float: right;
}
</style>
