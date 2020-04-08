<template>
    <div class="profile">
        <el-container>
            <el-header class="pr-header">
                <el-row>
                    <el-col :span="12"><div class="pr-header-left">
                            <a @click="home">
                                <i class="el-icon-house"></i>
                                HOME
                            </a>
                        </div></el-col>
                    <el-col :span="12">
                        <div class="pr-header-right">
                           <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    <img :src="imageUrl" class="header-avater">
                                    <span>{{user.username}}</span>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="a">My Profile</el-dropdown-item>
                                    <el-dropdown-item command="b">Change Password</el-dropdown-item>
                                    <el-dropdown-item command="c" divided>Logout</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-col>
                </el-row>
            </el-header>
            <div class="pr-main">
                <div class="pr-main-top">
                    <span class="top-mask"></span>
                    <div class="top-body">
                        <h1 class="top-title-name">Hello  {{user.username}}</h1>
                        <p class="top-content">This is your profile page. You can see the progress you've made with your work and manage your projects or assigned tasks</p>
                    </div>
                </div>
                <div class="pr-main-btm">
                    <el-card class="btm-left" :body-style="{ padding: '0px' }">
                        <img src="../assets/5.jpg" class="left-img">
                        <div class="left-avatar">
                            <el-upload
                                class="avatar-uploader"
                                action="#"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                                name="avatar"
                                :http-request="upload"
                                >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                 <i v-else class="el-icon-user-solid avatar-uploader-icon"></i>
                            </el-upload>
                        </div>
                        <div class="left-body">
                            <div class="text-center">
                                <h5 class="text-name">
                                Jessica Jones
                                </h5>
                                <span class="text-birthday">{{user.birthday}}</span>
                                <div class="text-solid">
                                <i></i>Job Manager - Creative Losuai Officer
                                </div>
                               
                            </div>
                            <el-divider></el-divider>
                            <p class="abt-me">{{user.aboutMe}}</p>
                        </div>
                   </el-card>
                   <el-card class="btm-right">
                       <div slot="header" class="right-header">
                            <span>Edit profile</span>
                            <el-button  class="right-save-btn"  @click="save('user')">Save</el-button>
                        </div>
                            <el-form class="b-r-body" :model="user"  :rules="rules" ref="user" >
                                <h6 style="color: #8898aa!important;">USER INFORMATION</h6>
                                <el-row>
                                    <el-col :span="9"  style="margin-left:50px">
                                        <el-form-item class="user-item" label="Username" prop="username">
                                            <el-input v-model="user.username"></el-input> 
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="9" style="margin-left:110px">
                                        <el-form-item class="user-item" label="Email address" prop="emailAddress">
                                            <el-input v-model="user.emailAddress"></el-input> 
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col :span="9" style="margin-left:50px">
                                        <el-form-item class="user-item" label="Birthday" prop="birthday">
                                            <el-date-picker type="date" v-model="user.birthday" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="9"  style="margin-left:110px">
                                        <el-form-item class="user-item" label="Gender selection" style="float:left;" prop="gender">
                                            <el-radio-group size="middle" v-model="user.gender">
                                                <el-radio  :label=1><i class="el-icon-male" style="color:red;font-size:18px"/></el-radio>
                                                <el-radio  :label=2><i class="el-icon-female" style="color:blue;font-size:18px"/></el-radio>
                                            </el-radio-group>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                 <el-row>
                                    <el-col :span="21"  style="margin-left:50px">
                                        <el-form-item class="user-item" label="Address" prop="address">
                                           <el-input v-model="user.address"></el-input> 
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-divider></el-divider>
                                <h6 style="color: #8898aa!important;">ABOUT ME</h6>
                                <el-col :span="21"  style="margin-left:50px;">
                                        <el-form-item class="user-item" label="About Me" prop="aboutMe">
                                            <el-input v-model="user.aboutMe" type="textarea" :rows="3"  class="abtme-in"></el-input> 
                                        </el-form-item>
                                    </el-col>
                            </el-form>
                   </el-card>
                   
                </div>
            </div>
            <el-footer class="pr-footer">
                <el-col :span="12"><div class="grid-content bg-purple pr-footer-left">© 2020 Job Manager & Binar Code</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light pr-footer-right">About Us</div></el-col>
            </el-footer> 
            <el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="500px" :close-on-click-modal='false'	:close-on-press-escape	='false'>
                <el-form  :model="form" :rules="rules" status-icon ref="form">
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
                    <el-button type="primary" @click="passwordChange('form')">确认修改</el-button>
                </div>
            </el-dialog>
        </el-container>
    </div>
</template>
<script>
export default {
    data(){
         var validateConfirmPwd = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
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
            a:'',
            user:{
                id: 0,
                username:'',
                password:'',
                emailAddress:'',
                birthday:'',
                gender: '',
                address:'',
                aboutMe:'',
                avatar:'',
            },
            imageUrl:'',
            centerDialogVisible:false,
            labelWidth:'100px',
            form:{
                oldPwd:'',
                newPwd:'',
                confirmPwd:'',
            },
            rules:{
                username:[
                    { required: true, message: '用户名不能为空', trigger: 'blur' }
                ],
                confirmPwd:[
                    {validator: validateConfirmPwd, trigger: 'blur'}
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
        this.$axios({
            method:'get',
            url:'/quartz/user/find',
            params: {
                username: this.$cookies.get('user'),
            }
        }).then(function(response){
            console.log(response)
            if(response.data.code == 200){
                vm.user.id = response.data.data.id;
                vm.user.username = response.data.data.username;
                vm.user.emailAddress = response.data.data.emailAddress;
                vm.user.birthday = response.data.data.birthday;
                vm.user.gender = response.data.data.gender;
                vm.user.address = response.data.data.address;
                vm.user.aboutMe = response.data.data.aboutMe;
                vm.user.avatar = response.data.data.avatar;
            }else{
                console.log(response)
            }
        }).catch(function(error){
            console.log(error)
        });
        vm.$axios({
                    url:'/quartz/user/find/avatar',
                    method: 'get',
                    params: {
                        username: vm.$cookies.get('user'),
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
        this.$message('click on item ' + command);
      },
      save(user){
        var vm = this;
        this.$refs[user].validate((valid) => {
            console.log(vm.user)
            if (valid) {
                vm.$axios({
                    method:'post',
                    url: '/quartz/user/update',
                    data: vm.user,
                    
                }).then(function(response){
                    console.log(response)
                    if(response.data.code ==200){
                        vm.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                        vm.user.id = response.data.data.id;
                        vm.user.username = response.data.data.username;
                        vm.user.emailAddress = response.data.data.emailAddress;
                        vm.user.birthday = response.data.data.birthday;
                        vm.user.gender = response.data.data.gender;
                        vm.user.address = response.data.data.address;
                        vm.user.aboutMe = response.data.data.aboutMe;
                        vm.user.avatar = response.data.data.avatar;
                    }else{
                         vm.$message({
                            type: 'error',
                            message: '修改失败'
                        });
                    }
                }).catch(function(error){
                    vm.$message({
                            type: 'error',
                            message: '修改失败'
                        });
                })
            } else {
                console.log('error submit!!');
            }
        });
      },  
      handleAvatarSuccess(res, file) {  
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      upload(item){
        var vm = this;
        var formData = new FormData()
        console.log(item.file)
        formData.append('avatar', item.file)
        formData.append('userID', vm.user.id)
        vm.$axios({
            url:'/quartz/user/update/avatar',
            method: 'post',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType :'blob'
        })
        .then(function (response) {
            console.log(response)
            vm.imageUrl = URL.createObjectURL(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
      },
      home(){
           this.$router.push({path:'/quartz/main'})
      },
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
      passwordChange(formName){
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
<style  >
.profile{
    position: relative;
}
.pr-header{
    width: 100%;
    height: 60px;
    background: linear-gradient(87deg,#2dce89,#2dcecc)!important;
}
.pr-main{
    padding:0;
}
.pr-main-top{
    width: 100%;
    height: 650px;
    background-image:url(../assets/profile-cover.jpg);
    background-size: cover;
    background-position: center top; 
    position: relative;
}
.top-body{
    height: 300px;
    width: 400px;
    display: flex;
    padding-left: 100px;
    flex-direction: column;
    padding-top: 100px;
    position: absolute;
}
.top-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    bottom: 0;
    background: linear-gradient(87deg,#2dce89,#2dcecc)!important;
    opacity: .7!important;
    transition: all .15s ease
}
.top-title-name{
    color: #fff!important;
    font-size: 2.75rem;
    font-weight: 600;
    line-height: 1.5;
}
.top-content{
    color: #fff!important;
    line-height: 1.8;
    font-weight: 320;
}
.pr-main-btm{
    width: 100%;
    height: 720px;
    margin-top: -100px;
    display: flex;
    justify-content: space-around;
    position: relative;
}
.btm-right{
    width: 900px;
    height: 720px;
    background-color: #fff;
}
.btm-left{
    width: 400px;
    height: 600px;
    background-color: #fff;
    border: none;
    position: relative;
}
.right-header{
    height: 30px;
    font-weight: 600;
    line-height: 30px;
    color: #32325d;
    align-items: center;
}
.btm-right>.el-card__body{
    background-color: #f7fafc;
}
.right-save-btn{
    float: right;
    height:30px;
    width:80px;
    padding:0;
    color: #fff;
    border-color: #5e72e4;
    background-color: #5e72e4;
}
.right-save-btn:hover{
    color: #fff;
    background-color: #5e72e4;
    border-color: #5e72e4;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);

}
.right-save-btn:focus{
    color: #fff;
    background-color: #5e72e4;
    border-color: #5e72e4;
    box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
}
.btm-right>.el-card__body{
    /* background-color: lavender; */
    height: 100%;
    width: 100%;
}
.abtme-in>.el-input__inner{
    width: 100%;
    height: 100px!important;
}
.user-item.el-form-item{
    font-size: .875rem;
    font-weight: 600;
    color: #525f7f;
}


.left-img{
    width: 100%;
}
.left-avatar{
    position: relative;
    width: 100%;
    margin-top: -80px;
}
.left-body{
    width: 100%;
    margin-top: 10px;
}
.text-center{
    text-align: center;
}
.text-name{
    font-weight: 600;
    font-size: 1.0625rem;
    line-height: 1.5;
    margin-bottom: .5rem;
    color: #32325d;
}
.text-birthday{
    font-size: .8125rem;
    line-height: 1.5;
    margin-bottom: .5rem;
    color: #32325d;
}
.text-solid{
    margin-top: 20px;
    font-weight: 600;
    line-height: 1.5;
    color: #32325d;
}
.abt-me{
    font-weight: 300;
    line-height: 1.7;
    font-size: 1rem;
    text-align: center;
}
.pr-footer{
    margin-top: 50px;
    height: 100px;
     color: #9aa8b7;
}
.pr-footer-left{
    padding-left: 30px;
}
.pr-footer-right{
    float: right;
    padding-right: 40px;
}
.pr-header-left{
    height: 60px;
    line-height: 60px;
}  
.pr-header-left>a{
    text-decoration: none;
    margin-left: 40px;
    color: #fff;
    font-weight: 550;
    font-size: .9em;
}
.pr-header-left>a:hover{
    color: #e1e1ef;
}        
.pr-header-right{
    float: right;
    height: 60px;
    line-height: 60px;
   
}      
.el-dropdown-link {
    cursor: pointer;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    font-weight: 600;
  }  
  .header-avater{
    max-width: 50%;
    border-radius: 100%;
    height: 36px;
    width: 36px;
    margin-right: 10px;
  }
  .avatar-uploader .el-upload {
    border: 3px solid #ffffff;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background-color: #e1e1ef;
  }
  .avatar-uploader .el-upload:hover {
     border: 3px dashed #ffffff;
  }
 .avatar-uploader-icon {
    font-size: 28px;
    color: #fff;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload{
      margin-left: 120px;
  }
</style>