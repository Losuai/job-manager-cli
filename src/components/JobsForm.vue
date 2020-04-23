<template>
<div class="job-form">
  <el-row class="nav-top">
    <el-col :span="12"><div class="grid-content bg-purple top-left"><h3>Job Table</h3></div></el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light top-right">
        <el-input placeholder="请输入内容" v-model="keyWords" class="input-search" @keyup.enter.native="searchJob">
        </el-input>
      </div>
    </el-col>
  </el-row>
  <el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%" class="form-table"   
    :header-cell-style="{background:'#f6f9fc',color:'#93a2b2',height:'60px',}">
    <el-table-column
      label="任务编号"
      prop="taskNo"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="任务名称"
      prop="taskName"
      align="center">
    </el-table-column>
    <el-table-column
      label="定时规则"
      prop="schedulerRule"
      align="center">
    </el-table-column>
     <el-table-column
      label="执行人"
      prop="executorNo"
      align="center">
    </el-table-column>
    <el-table-column
      label="执行参数"
      prop="executeParamter"
      align="center">
    </el-table-column>
    <el-table-column
      label="备注"
      prop="remark"
      align="center">
    </el-table-column>
    <el-table-column
      label="操作"
      align="center"         
        >
      <template slot-scope="scope">
        <el-button
          size="mini"
          :style="{'background-color': scope.row.pauseOrResume == 1 ? '#e64f4f' :  '#22dc7b'}"
          style="color:white"
          @click="handleRun(scope.$index, scope.row)">{{ scope.row.pauseOrResume == 1 ? "暂停":"启动"}}</el-button>
        <el-button
            size="mini"
            type="primary "
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
   </el-table>
    <div class="block" style="text-align: center; margin-top:30px;">
        <el-pagination
            background
            :page-size="pageSize" 
            @current-change="handleCurrentChange" 
            layout="prev, pager, next, total"
            :total="totalElements">
        </el-pagination>
    </div>
    <el-dialog title="修改定时任务" :visible.sync="dialogFormVisible" >
      <el-form :model="QuartzTaskInformation" >
        <el-form-item label="任务名称" :label-width="formLabelWidth" prop="taskName" >
          <el-input v-model="QuartzTaskInformation.taskName" disabled style="width:70%;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item label="任务编号" :label-width="formLabelWidth" prop="taskNo">
          <el-input v-model="QuartzTaskInformation.taskNo"  disabled style="width:70%;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item label="定时规则" :label-width="formLabelWidth" prop="schedulerRule">
            <el-popover v-model="cronPopover">
              <cron @change="changeCron" @close="cronPopover=false" i18n="en"></cron>
              <el-input  slot="reference" @click="cronPopover=true" v-model="QuartzTaskInformation.schedulerRule" style="width:70%;margin-left:20px"></el-input>
            </el-popover> 
        </el-form-item>
        <el-form-item label="执行参数" :label-width="formLabelWidth" prop="executeParamter">
          <el-input v-model="QuartzTaskInformation.executeParamter" style="width:70%;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item label="执行方" :label-width="formLabelWidth" prop="executorNo">
          <el-input v-model="QuartzTaskInformation.executorNo" style="width:70%;margin-left:20px"></el-input>
        </el-form-item>
        <el-form-item  label="是否冻结" :label-width="formLabelWidth" prop="frozenStatus">
              <el-radio-group v-model="QuartzTaskInformation.frozenStatus" style="width:70%;margin-left:20px">
                <el-radio  label="FROZEN">冻结</el-radio>
                <el-radio label="UNFROZEN">非冻结</el-radio>
              </el-radio-group>
            </el-form-item>
        <el-form-item label="任务备注" :label-width="formLabelWidth" prop="remark"> 
          <el-input v-model="QuartzTaskInformation.remark"  style="width:70%;margin-left:20px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleChange()">确 定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import Common from '@/common/common.js'
import {cron} from 'vue-cron';

export default {
       components: { cron },

    data() {
      return {
        tableData: [{
          id:'',
          taskNo: '',
          taskName: '',
          schedulerRule: '',
          executorNo: '',
          executeParamter: '',
          pauseOrResume:'',
          remark:'',
          version:'',
          createTime:'',
        }],
        search: '',
        pageSize:7,
        totalElements:0,
        dialogFormVisible: false,
        QuartzTaskInformation: {
          id:'',
          taskName: '',
          taskNo: '',
          schedulerRule: '',
          executeParamter: '',
          executorNo: '',
          frozenStatus: '',
          remark: '',
          version:'',
          pauseOrResume:'',
          createTime:'',
        },  
        formLabelWidth: '120px',
        cron:'',
        cronPopover:false,
        keyWords:"",
      }
    },
    created: function () {
      var vm = this
      // 用$on事件来接收参数
      Common.$on('Data', (data) => {
        vm.tableData = data
      })
      Common.$on('totalElements', (data)=>{
        vm.totalElements = data
      })
    },
    methods: {
      handleChange(){
        var self =  this;
        this.$axios.post("/quartz/task/update", this.QuartzTaskInformation)
        .then(function(response){
            if(response.data.code == 200){
                self.$message({
                type: 'success',
                message: '修改成功!'
                });
              self.dialogFormVisible = false;
              self.$axios.get('/quartz/task/find?page=1')
                .then(function (response) {
                  self.tableData = response.data.content
                  self.totalElements = response.data.totalElements
                })
                .catch(function (error) {
                  console.log(error);
                });
            }else{
                self.$message({
                type: 'error',
                message: '修改失败!'
                });
            }
        }).catch(function(error){
          self.$message({
              type: 'error',
              message: '修改失败!'
          });
        })
      },
      handleEdit(index, row){
       this.dialogFormVisible=true;
       this.QuartzTaskInformation.taskName = row.taskName;
       this.QuartzTaskInformation.taskNo = row.taskNo;
       this.QuartzTaskInformation.schedulerRule = row.schedulerRule;
       this.QuartzTaskInformation.executeParamter = row.executeParamter;
       this.QuartzTaskInformation.executorNo = row.executorNo;
       this.QuartzTaskInformation.frozenStatus = row.frozenStatus;
       this.QuartzTaskInformation.remark = row.remark;
       this.QuartzTaskInformation.version = row.version;
       this.QuartzTaskInformation.id = row.id;
       this.QuartzTaskInformation.pauseOrResume = row.pauseOrResume;
       this.QuartzTaskInformation.createTime = row.createTime;
      },
      handleRun(index, row) {
        var vm = this
        if(row.pauseOrResume == 0 || row.pauseOrResume == 2){
          //启动定时任务
          this.$axios.get('/quartz/task/option?jobName='+row.taskNo+'&onOrOff='+1)
            .then(function(response){
              row.pauseOrResume = 1;
              row.version += 1;
              Common.$emit('v', '1')
              // row.btName = "暂停"
            }).catch(function (error) {
                console.log(error);
             });
        }else{
          //暂停定时任务
          this.$axios.get('/quartz/task/option?jobName='+row.taskNo+'&onOrOff='+0)
            .then(function(response){
                row.pauseOrResume = 0;
                // row.btName = "启动"
                row.version += 1;
                Common.$emit('v', '1')
            }).catch(function (error) {
                console.log(error);
             });
           
        }
      },
      handleDelete(index, row) {
        var self = this
        this.$confirm('永久删除该定时任务，是否继续？','提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(()=>{
          this.$axios.delete('/quartz/task/delete?jobName='+row.taskNo)
          .then(function(response){
            if(response.data.code == 11001){
                self.$message({
                type: 'success',
                message: '删除成功!'
                });
                Common.$emit('v', '1')
               self.$axios.get('/quartz/task/find?page=1')
                .then(function (response) {
                  self.tableData = response.data.content
                  self.totalElements = response.data.totalElements
                })
                .catch(function (error) {
                  console.log(error);
                });
            }else{
              self.$message({
                type: 'error',
                message: '删除失败!'
                });
            }
          }).catch(function(error){
              self.$message({
                type: 'error',
                message: '删除失败!'
                });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleCurrentChange(val){
        var self = this
        this.$axios.get('/quartz/task/find?page='+val)
        .then(function (response) {
          self.tableData = response.data.content
        })
        .catch(function (error) {
          console.log(error);
        });
      } ,
      changeCron(val){
        this.cron=val
      },
      searchJob(){
        var self = this
        this.$axios.get('/quartz/task/find?page=1&keyWords='+self.keyWords)
        .then(function (response) {
          self.tableData = response.data.content
          self.totalElements = response.data.totalElements
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
   
  }
</script>
<style>
.job-form{
  width: 1182px;
  height: 605px;
  margin-left: 43px;
  background-color: #ffffff;
  border-radius: 10px;
}
.nav-top{
  position: relative;
  height: 80px;
  line-height: 40px;
  border-bottom: #f7f0f0 solid 1px; 
}
.top-left{
  padding-left: 20px;
  color: #32325d;
  height: 60px;
}
.top-right{
  float: right;
  width: 100%;
  height: 80px;
  line-height: 80px;
}
.el-button--mini, .el-button--mini.is-round {
    padding: 7px 6px;
}

 
.el-table--enable-row-hover .form-table .el-table__body tr:hover>td{
background-color: #b8bbbed8 !important;
}

.input-search{
  margin-left: 250px;
  width: 300px;
 
}
.input-search>.el-input__inner{
 border-radius: 20px ;
}
.el-table.form-table>.el-table__body-wrapper>.el-table__empty-block>.el-table__empty-text {
  background-color: #fff!important;
  width: 100%;
}
</style>