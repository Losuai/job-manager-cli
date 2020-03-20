<template>
    <div class="register">
        <div class="register-header">
            <i class="el-icon-news" style="margin-top:15px;color:#43c3c7;"></i>
        </div>
         <el-divider></el-divider>
        <div class="register-main">
            <span style="font-size:13px;margin-left:120px;color:#9eacbb;">Create new  account</span>
            <div class="re-name">
                <i class="el-icon-user"></i>
                 <input class="r-name" v-model="name" placeholder="Name" type="text">
            </div>
            <div class="re-password">
                <i class="el-icon-key pwd"></i>
                <input class="r-password" v-model="password" placeholder="Password" type="password">
            </div>
            <div class="rere-password">
                <i class="el-icon-key pwd"></i>
                <input class="rer-password" v-model="password" placeholder="Confirm password" type="password">
            </div>
            <el-checkbox class="agree"  v-model="checked">I agree with the Privacy Policy</el-checkbox>
            <el-button class="register-btn" type="primary" size="mini" @click="login">Create account</el-button>
        </div>
    </div>
</template>
<style>
.register{
    width: 400px;
    height: 540px;
    position: absolute;
    border-radius: 10px;
    background-color: #f7fafc;
    background: linear-gradient(#A1FFCE,#FAFFD1);
}
.register-header{
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 80px;
}
.register-main{
    height: 300px;
    display: flex;
    flex-direction: column;
}
.re-name{
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
.r-name{
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
.re-password{
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
.r-password{
    width: 290px;
    border: none;
    background-color: #ffffff;
    outline: none;
    border-radius: 0 5px 5px 0;
}
.rere-password{
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
.rer-password{
    width: 290px;
    border: none;
    background-color: #ffffff;
    outline: none;
    border-radius: 0 5px 5px 0;
}
.agree{
    margin-top: 20px;
    margin-left: 40px;
    width: 230px;
}
.register-btn{
    margin-top: 30px;
    height: 45px;
    width: 200px;
    margin-left: 100px;
    border-radius: 10px;
    background-color: #5e72e4!important;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)!important;
}
</style>