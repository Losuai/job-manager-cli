<template>
    <div class="register">
        <div class="register-header">
            <i class="el-icon-news" style="margin-top:15px;color:#43c3c7;"></i>
        </div>
         <el-divider></el-divider>
        <el-form  class="register-main" :model="QuartzUser" status-icon :rules="rules" ref="QuartzUser" label-width="30px">
            <span style="font-size:13px;margin-left:100px;color:#9eacbb;">Create new  account</span>
            <el-form-item class="z" prop="username">
                <span slot="label"><i class="el-icon-user" style="margin-left:15px;"></i></span>
                <el-input class="s" v-model="QuartzUser.username" placeholder="UserName"></el-input>
            </el-form-item>
            <el-form-item class="z" prop="password">
                <span slot="label"><i class="el-icon-key" style="margin-left:15px;"></i></span>
                <el-input  class="s" v-model="QuartzUser.password" placeholder="Password" type="password"></el-input>
            </el-form-item>
            <el-form-item class="z" prop="confirmPassword">
                <span slot="label"><i class="el-icon-key " style="margin-left:15px;"></i></span>
                <el-input class="s"  v-model="QuartzUser.confirmPassword" placeholder="Confirm password" type="password"></el-input>
            </el-form-item>
            <el-form-item  prop="checked"> 
                <el-checkbox class="agree"  v-model="QuartzUser.checked">I agree with the Privacy Policy</el-checkbox>
            </el-form-item>
            <el-button class="register-btn" type="primary" size="mini" @click="register('QuartzUser')">Create account</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.QuartzUser.password) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        var validateName = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请输入用户名'))
            }else{
                callback();
            }
        };
        var validatechecked = (rule, value, callback) => {
            if(value !== true){
                callback(new Error('请阅读隐私协议'))
            }else{
                callback();
            }
        };
        return{
            QuartzUser:{
                username:'',
                password:'',
                confirmPassword:'', 
                checked: false,
            },
            rules: {
                username: [
                    { validator: validateName, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                confirmPassword: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                checked:[
                    {validator: validatechecked, trigger: 'blur'}
                ]
            }
        }
        
    },
    methods:{
        register(formName){
            this.$refs[formName].validate((valid) => {
          if (valid) {
            var vm = this;
            vm.$axios({
                method: 'post',
                url: '/quartz/user/register',
                data: vm.QuartzUser,
            }).then(function(response){
                if(response.data.code === 200){
                    vm.$message({
                    type: 'success',
                    message: '注册成功，请登录!'
                    });
                vm.$router.push({path:'/quartz/user/login'})
                }else{
                    vm.$message({
                        type: 'error',
                        message: '注册失败，该账户名已存在!'
                        });
                    }
            }).catch(function(error){
                vm.$message({
                    type: 'error',
                    message: '注册失败，该账户名已存在!'
                    });
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        }
    }
}
</script>
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
    height: 320px!important;
    width: 320px;
    margin-left: 40px;
}
.z.el-form-item{
    margin-top: 10px;
    height: 40px;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
}
.s>.el-input__inner{
    border: 0px solid!important;
}
.agree{
    width: 230px;
    border: 0px solid;
    margin-left: -28px;
}
.register-btn{
    height: 45px;
    width: 200px;
    margin-left: 60px;
    border-radius: 10px;
    background-color: #5e72e4!important;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)!important;
}
</style>