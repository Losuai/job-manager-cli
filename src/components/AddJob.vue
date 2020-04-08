<template>
    <div class="add">
      <div class="left">
        <el-row class="add-top">
            <el-col :span="4"><h4>定时任务</h4></el-col>
        </el-row>
        <el-form :label-position="labelPosition" :model="QuartzTaskInformation" :rules="rules" ref="jobForm" label-width="100px" class="demo-jobForm">
            <el-form-item class="form-title" label="任务名称" prop="taskName" >
                <el-input class="a" v-model="QuartzTaskInformation.taskName" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item  class="form-title" label="任务编号" prop="taskNo">
                <el-input class="a" v-model="QuartzTaskInformation.taskNo" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item class="form-title" label="定时规则" prop="schedulerRule">
                <el-popover v-model="cronPopover">
                  <cron @change="changeCron" @close="cronPopover=false" i18n="en"></cron>
                  <el-input class="a"  slot="reference" @click="cronPopover=true" v-model="QuartzTaskInformation.schedulerRule" placeholder="请输入定时策略"></el-input>
                </el-popover> 
            </el-form-item>
            <el-form-item class="form-title" label="执行参数" prop="executeParamter">
                <el-input class="a" v-model="QuartzTaskInformation.executeParamter" placeholder="请输入执行参数"></el-input>
            </el-form-item>
            <el-form-item class="form-title" label="执行方" prop="executorNo">
                <el-input  class="a" v-model="QuartzTaskInformation.executorNo" placeholder="请输入执行人"></el-input>
            </el-form-item>
            <el-form-item class="form-title" label="是否冻结" prop="frozenStatus">
                <el-radio-group v-model="QuartzTaskInformation.frozenStatus">
                <el-radio class="form-title" label="FROZEN">冻结</el-radio>
                <el-radio class="form-title" label="UNFROZEN">非冻结</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item class="form-title" label="任务备注" prop="remark">
                <el-input class="b" type="textarea" v-model="QuartzTaskInformation.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="" type="primary" @click="submitForm('jobForm')">立即创建</el-button>
                <el-button class="" @click="resetForm('jobForm')">重置</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
</template>
<script>
    import {cron} from 'vue-cron';
    import Common from '@/common/common.js'

  export default {
     components: { cron },
    data() {
      return {
        QuartzTaskInformation: {
          taskName: '',
          taskNo: '',
          schedulerRule: '',
          executeParamter: '',
          executorNo: '',
          frozenStatus: '',
          remark: '',
        },       
        cronPopover:false,
        labelPosition: 'right',
        cron:'',
        rules: {
          taskName: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
          ],
           taskNo: [
            { required: true, message: '请输入任务编号', trigger: 'blur' },
          ],
           schedulerRule: [
            { required: true, message: '请输入定时表达式', trigger: 'blur' },
          ],
           executeParamter: [
            { required: true, message: '请输入任务执行参数', trigger: 'blur' },
          ],
           executorNo: [
            { required: true, message: '请输入执行方', trigger: 'blur' },
          ],
          frozenStatus: [
            { required: true, message: '请选择是否冻结', trigger: 'change' }
          ],
          remark: [
            { required: true, message: '请填写任务备注', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(jobForm) {
        var self = this;
        this.$refs[jobForm].validate((valid) => {
          if (valid) {
            this.$confirm('此操作将创建新的定时任务, 是否继续?', '提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'success'
            }).then(()=>{
              this.$axios.post('/quartz/task/add', this.QuartzTaskInformation).then(function(response){
                  if(response.data.code == 200){
                    self.$message({
                    type: 'success',
                    message: '创建成功!'
                    });
                    Common.$emit('v', '1')
                  }else{
                    self.$message({
                    type: 'error',
                    message: '创建失败!'
                  });
                  }
                  
              }).catch(function(error){
                console.log(error);
                self.$message({
                  type: 'error',
                  message: '创建失败!'
                  });
            })
            }).catch(()=>{
              this.$message({
              type: 'info',
              message: '已取消创建'
              });  
            });
           
          } else {
            console.log('error submit!!');
            return false;
          }
        });
       
      },
      resetForm(jobForm) {
        this.$refs[jobForm].resetFields();
      },
     changeCron(val){
        this.cron=val
      },
    }
  }
</script>
<style>
.add{
    width: 1200px;
    height: 600px;
    position: relative;
    background:rgba(0,0,0,0);
    left: 40px; 
}
.left{
  width: 1200px;
  height: 600px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;   
}
.a{
  width: 800px;
  margin-left: 0;
}
.a  input.el-input__inner{
  border-radius: #42426a 15px;
  box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
}
.b{
  width: 800px; 
  box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
}
.add-top{
  border-bottom: #dadfe2 solid 1px; 
  padding-left: 10px;
  font-size: 20px;
  color: #42426a;
  background-color: #f7fafc;
  border-radius: 10px 10px 0 0;
}
.demo-jobForm{
  padding-top: 20px;
  font-family: Open Sans,sans-serif;
  background-color: #ffffff;
  border-radius: 0 0 10px 10px;
  height: 507px;
}
.form-title{
    color: #525f7f;
    font-size: .875rem;
    font-weight: 600;
    padding-left: 80px;
    margin-right: 240px;
}

</style>