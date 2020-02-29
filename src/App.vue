<template>
  <div id="app">
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
        <el-footer class="footer" style="height:100px">Footer</el-footer> 
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
  name: 'App',
  components: {
      'navmenu': NavMenu,
      'vheader': Header,
      'addJob': addJob,
      'mainTop': mainTop
    }
}
</script>

<style>
#app{
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
  background-color: #f6f7fc;
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
    height: 1200px;
}
.footer{
  background-color: #f8f9fa;
  /* height: 400px; */
  /* width: 1500px; */
}
</style>
