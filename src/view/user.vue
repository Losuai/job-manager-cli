<template>
    <el-container id="user">
        <el-header class="user-header">
            <el-row>
            <el-col :span="10">
                <div class="grid-content bg-purple user-header-title">
                    <i class="el-icon-crop" style="margin-right:20px;" ></i>
                    <h3>JOB MANAGER</h3>
                </div>
            </el-col>
            <el-col :span="14">
                <div class="grid-content bg-purple-light header-right">
                    <el-menu
                    :default-active="this.$route.path"
                    router
                    class="header-menu"
                    mode="horizontal"
                    background-color="rgba(0,0,0,0)"
                    text-color="#fff"
                    active-text-color="hsla(0,0%,100%,.65)"
                    >
                    <el-menu-item class="header-menu-item" index="/quartz/main">
                       <i class="el-icon-s-home" style=""></i>
                         <span slot="title">Home</span>
                        </el-menu-item>
                    <el-menu-item class="header-menu-item" index="/quartz/user/login">
                        <i class="el-icon-key"  style=""></i>
                           <span slot="title"> Login</span>
                        </el-menu-item>
                    <el-menu-item class="header-menu-item" index="/quartz/user/register">
                        <i class="el-icon-s-custom"  style=""></i>
                           <span slot="title">Register</span>
                        </el-menu-item>
                    </el-menu>
                </div>
                </el-col>
            </el-row>
        </el-header>
        <div class="user-main1">
            <div class="main1-content">
                <div class="content">
                    <h1 class="content-title">Welcome!</h1>
                    <p class="content-body">Please register or log in with a unique account to manage scheduled tasks.</p>
                </div>
            </div>
            <div class="content-btm">
                <svg x="0" y="0" viewBox="0 0 2560 100"><polygon points="2560 0 2560 100 0 100" class="fill-default" ></polygon></svg>
            </div>
        </div>
        <div class="user-main2">
            <div class="main2-content">
                <router-view/>
            </div>
        </div>
        <el-footer class="footer">
          <el-col :span="12"><div class="grid-content bg-purple footer-1">© 2020 Job Manager & Binar Code</div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light footer-2">About Us</div></el-col>
        </el-footer> 
    </el-container>
</template>

<script>
export default {
    data(){
        return{
        }
    }
}
</script>
<style>
#user{
    position: relative;
    background-color: #172b4d!important;
}
.user-header{
    position: absolute;
    width: 100%;
    top: 20px;
}
.user-header-title{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.user-main1{
    height: 480px;
    background: linear-gradient(87deg,#2dce89,#2dcecc)!important;
}
.header-right{
    margin-left: 300px;
}
.el-menu.el-menu--horizontal.header-menu{
    border-bottom: 0;
}
.header-menu-item.el-menu-item{
    border: none!important;
    font-weight: 550;
}
.header-menu-item.el-menu-item.is-active {
    border: none!important;
    background-color: rgba(0, 0, 0, 0)!important;
}
.header-menu-item.el-menu-item:hover {
    background-color: rgba(0, 0, 0, 0)!important;
    color: hsla(0,0%,100%,.65)!important;
}
.main1-content{
    width: 100%;
    height: 200px;
    margin-top: 120px;
    display: flex;
    justify-content: center;
}
.content{
    width: 435px;
    text-align: center;
    color: #fff;
}
.content-title{
    font-weight: 600;
    line-height: 1.5;
}
.content-body{
    font-weight: 300;
    line-height: 1.7;
}
.content-btm{
    width: 100%;
    height: 70px;
    bottom: 0!important;
    top: 410px;
}
.content-btm, .content-btm svg{
    position: absolute;
    pointer-events: none;
    bottom: 0;
}
.fill-default{
    fill: #172b4d;
}
.user-main2{
    height: 600px;
    width: 100%;
    margin-top: -7rem!important;
  
}
.main2-content{
    width: auto;
    height: auto;
     display: flex;
    justify-content: space-around;
}
.el-footer.footer{
    height: 120px!important;
    line-height: 120px!important;
    color: #9aa8b7;
}
.footer-1{
    padding-left: 190px;
}
.footer-2{
    padding-left: 380px!important;
}

</style>