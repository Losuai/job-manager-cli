<template>
        <el-row class="head">
            <el-col :span="12">
                <div class="grid-content bg-purple head-1">
                    <a class="nav-title">{{name}}
                    </a>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light head-2">
                    <el-dropdown @command="handleCommand">
                        <span class="el-dropdown-link-2">
                            <img :src='imageUrl' class="header2-avater">
                            <span>{{username}}</span>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">My Profile</el-dropdown-item>
                            <el-dropdown-item command="b">Change Password</el-dropdown-item>
                            <el-dropdown-item command="c" divided>Logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
            <el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="500px" :close-on-click-modal='false'	:close-on-press-escape	='false'>
                <el-form :model="form" :rules="rules" status-icon ref="form">
                    <el-form-item label="旧密码" :label-width="labelWidth" prop="oldPwd" >
                        <el-input v-model="form.oldPwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" :label-width="labelWidth" prop="newPwd">
                        <el-input v-model="form.newPwd"  type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" :label-width="labelWidth" prop="confirmPwd">
                        <el-input v-model="form.confirmPwd"  type="password"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel('form')">放弃修改</el-button>
                    <el-button type="primary" @click="pwdChange('form')">确认修改</el-button>
                </div>
            </el-dialog>
        </el-row>
</template>
<style>
.head{
    top: 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.head-1{
    padding-left: 20px;
    font-size: 18px;
    font-weight: 800;
}
.nav-title{
    color: #ffffff;
    text-decoration:none;
}
.nav-title:hover{
    color: #e1e1ef;
}
.head-2{
    float: right;
    margin-right: 20px;
}
.el-dropdown-link-2 {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    font-weight: 600;
  }  
  .header2-avater{
    max-width: 50%;
    border-radius: 100%;
    height: 36px;
    width: 36px;
    margin-right: 10px;
  }
</style>
<script>
import Common from '@/common/common.js'

export default {
    data(){
        var validateConfirmPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入新密码'));
            } else if (value !== this.form.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateNewPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入新密码'));
            }  else {
                callback();
            }
        };
        var validateOldPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入旧密码'));
            } else {
                callback();
            }
        };
        return{
            input:'',
            name: "首页",
            username:'',
            imageUrl:'',
            centerDialogVisible:false,
            labelWidth:'100px',
            form:{
                oldPwd:'',
                newPwd:'',
                confirmPwd:'',
            },
            rules:{
                confirmPwd:[
                    {validator: validateConfirmPwd, trigger: 'change'}
                ],
                newPwd:[
                    {validator: validateNewPwd, trigger: 'blur'}
                ],
                oldPwd:[
                    {validator: validateOldPwd, trigger: 'blur'}
                ],
            },
        
        }
    },
     mounted: function () {
      var vm = this;
      // 用$on事件来接收参数
      Common.$on('val', (data) => {
        vm.name = data
      });
      vm.username = vm.$cookies.get('user');
      vm.$axios({
            url:'/quartz/user/find/avatar',
            method: 'get',
            params: {
                username: vm.username,
            },
            responseType :'blob',
        })
        .then(function (response) {
            console.log(response);
            vm.imageUrl = URL.createObjectURL(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods: {
      handleCommand(command) {
        if(command === 'a'){
            this.$router.push({path:'/quartz/user/profile'})
        }else if(command === 'b'){
            this.centerDialogVisible = true
        }else{
            this.$cookies.remove('user');
            this.$router.push({path:'/quartz/user/login'})
        }
      },
      pwdChange(formName){
        var self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.$axios({
            method: 'post',
            url: '/quartz/user/pwd',
            data: {
                username: self.$cookies.get('user'),
                oldPwd: self.form.oldPwd,
                newPwd: self.form.newPwd,
            }
            }).then(function(resp){
                console.log(resp)
                if(resp.data.code === 200){
                    self.$message({
                        type: 'success',
                        message: resp.data.msg+", 请重新登录!",
                    });
                    self.$cookies.remove("user");
                    self.$router.push({path:"/quartz/user/login"})
                }else{
                    self.$message({
                        type: 'error',
                        message: resp.data.msg,
                    });
                }
            }).catch(function(err){
                self.$message({
                    type: 'error',
                    message: "error",
                });
            })
          } else {
            return false;
          }
        });
      },
       cancel(formName){
        this.$refs[formName].resetFields();
        this.centerDialogVisible = false;
      },
    }
}
</script>