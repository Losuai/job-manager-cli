<template>
        <el-row class="head">
            <el-col :span="12">
                <div class="grid-content bg-purple head-1">
                    <a class="nav-title" href="">{{name}}
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
                            <el-dropdown-item command="e" divided>Logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-col>
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
        return{
            input:'',
            name: "首页",
            username:'',
            imageUrl:'',
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
        this.$message('click on item ' + command);
      }
    }
}
</script>