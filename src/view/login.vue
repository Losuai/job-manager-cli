<template>
    <div class="login">
        <div class="login-header">
            <i class="el-icon-data-analysis" style="margin-top:15px;color:#43c3c7;"></i>
        </div>
         <el-divider></el-divider>
        <el-form class="login-main" :model="user" status-icon :rules="rules" ref="user" label-width="30px">
            <span style="font-size:13px;margin-left:80px;color:#9eacbb;">Sign in with credentials</span>
            <el-form-item class="f" prop="name">
                <span slot="label"><i class="el-icon-user" style="margin-left:15px;"></i></span>
                <el-input class="v" v-model="user.name" placeholder="Name" ></el-input>
            </el-form-item>
            <el-form-item class="f" prop="password">
                <span slot="label"><i class="el-icon-key" style="margin-left:15px;"></i></span>
                <el-input class="v" v-model="user.password" placeholder="Password" type="password"></el-input>
            </el-form-item>
            <el-form-item  prop="checked">
              <el-checkbox class="rm"  v-model="user.checked">Remember Me</el-checkbox>
            </el-form-item>
            <el-button class="login-btn" type="primary" size="mini" @click="login('user')">Sign in </el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data(){
         var validateName = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请输入用户名'))
            }else{
                callback();
            }
        };
         var validatePwd = (rule, value, callback) => {
            if(value === ''){
                callback(new Error('请输入密码'))
            }else{
                callback();
            }
        };
        
        return{
            user:{
                name:'',
                password:'',
                checked: false,
            },
            rules:{
                name:[
                    {validator: validateName, trigger: 'blur' }
                ],
                password:[
                    {validator: validatePwd, trigger: 'blur' }
                ],
                
            }
            
        }
    },
    methods:{
        login(formName){
            this.$refs[formName].validate((valid) => {
                var vm = this
                if (valid) {
                    vm.$axios({
                        method:'post',
                        url:'/quartz/user/login',
                        data: {
                            userName: vm.user.name,
                            password: vm.user.password,
                        }
                    }).then(function(response){
                        if(response.data.code == 200){
                            vm.$message({
                                type: 'success',
                                message: '登录成功'
                            });
                            vm.$cookies.set('user', vm.user.name, 60 * 60 * 1);
                            vm.$router.push({path:'/quartz/main'})
                        }else{
                            vm.$message({
                                type: 'error',
                                message: '登录失败，账户名或密码错误'
                            });
                        }
                    }).catch(function(error){
                            vm.$message({
                                    type: 'error',
                                    message: '登录失败，账户名或密码错误'
                            });
                    })
                } else {
                    console.log('error submit!!');
                }
            });
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
    margin-left: 40px;
}
.f.el-form-item{
    width: 320px;
    margin-top: 10px;
    height: 40px;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
}
.v>.el-input__inner{
    border: 0px solid!important;
}
.rm{
    border: 0px solid!important;
    margin-left: -28px;
}
.login-btn{
    width: 80px;
    height: 45px;
    margin-left: 120px;
    border-radius: 10px;
    background-color: #5e72e4!important;
    font-size: 15px;
    font-weight: 600;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)!important;
}
</style>