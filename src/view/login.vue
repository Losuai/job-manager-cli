<template>
    <div class="login">
        <div class="login-header">
            <i class="el-icon-data-analysis" style="margin-top:15px;color:#43c3c7;"></i>
        </div>
         <el-divider></el-divider>
        <div class="login-main">
            <span style="font-size:13px;margin-left:120px;color:#9eacbb;">Sign in with credentials</span>
            <div class="f-name">
                <i class="el-icon-user n"></i>
                 <input class="name" v-model="name" placeholder="Name" type="text">
            </div>
            <div class="f-password">
                <i class="el-icon-key pwd"></i>
                <input class="password" v-model="password" placeholder="Password" type="password">
            </div>
              <el-checkbox class="rm"  v-model="checked">Remember Me</el-checkbox>
            <el-button class="login-btn" type="primary" size="mini" @click="login">Sign in </el-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            name:'',
            password:'',
            checked: false,
        }
    },
    methods:{
        login(){
            this.$router.push({path:'/quartz/main'})
        }
    }
    
}
</script>
<style>
.login{
    width: 400px;
    height: 480px;
    position: absolute;
    border-radius: 10px;
    background-color: #f7fafc;
    background: linear-gradient(#A1FFCE,#FAFFD1);
}
.login-header{
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 80px;
}
.login-main{
    height: 300px;
    display: flex;
    flex-direction: column;
}
.f-name{
    margin-top: 20px;
    width: 320px;
    height: 40px;
    margin-left: 40px;
    display: flex;
    justify-content: start;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
    background-color: #ffffff;
}
.name{
    width: 290px;
    border: none;
    background-color: #ffffff;
    outline: none;
    border-radius: 0 5px 5px 0;
}
.el-icon-user{
    margin-right: 10px;
    margin-top: 10px;
    margin-left: 10px;
}
.f-password{
    margin-top: 20px;
    width: 320px;
    height: 40px;
    margin-left: 40px;
    display: flex;
    justify-content: start;
    border: 0px;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
    background-color: #ffffff;
}
.password{
    width: 290px;
    border: none;
    background-color: #ffffff;
    outline: none;
    border-radius: 0 5px 5px 0;
}
.pwd.el-icon-key{
    margin-right: 10px;
    margin-top: 10px;
    margin-left: 10px;
}
.rm{
    margin-top: 30px;
    margin-left: 40px;
    width: 150px;
}
.login-btn{
    margin-top: 30px;
    width: 80px;
    height: 45px;
    margin-left: 160px;
    border-radius: 10px;
    background-color: #5e72e4!important;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)!important;
}
</style>