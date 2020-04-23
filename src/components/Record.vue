<template>
    <div class="record-form">
        <el-row class="re-top">
            <el-col :span="12"><div class="grid-content bg-purple record-top-title"><h3>Record Table</h3></div></el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple record-title-btm">
                <el-input placeholder="请输入内容" v-model="keyWords" class="record-search" @keyup.enter.native="searchRecord"></el-input>
              </div>
            </el-col>
        </el-row>
        <el-table
            class="record-table"
            :data="QuartzTaskRecords"
            empty-text="暂无数据"
            style="width: 100%;"
            :header-cell-style="{background:'#1c345d',color:'#4976c2',height:'60px' , border:'none'}"
            :cell-style	="{background:'#172b4d',color:'#d5d9e2', height:'70px', 'border-bottom':'#1c3560 1px solid', }"
            >
            <el-table-column
            prop="executeTime"
            label="执行时间"
            width="210" 
            align="center"
           >
           <template slot-scope="scope">
                  {{formatTime(scope.row.name)}}
              </template>
            </el-table-column>
            <el-table-column
            prop="taskNo"
            label="任务编号"
            width="180"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="taskName"
            label="任务名称"
            width="180"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="schedulerRule"
            label="定时规则"
            width="180"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="isfailure"
            label="执行情况"
            align="center"
            >
              <template slot-scope="scope">
                 <el-tag  :type='formType(scope.row)'
                  effect="dark" size="small">{{ scope.row.isFailure == 1 ? "失败": "成功" }}</el-tag>
              </template> 
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"         
            >
              <template slot-scope="scope">
                <el-button
                size="small"
                type="primary"
                plain
                :disabled="readOrNot(scope.row)" 
                @click="handleRead(scope.$index, scope.row)">查看</el-button>
               </template>
            </el-table-column> 
        </el-table>
        <div class="" style="text-align: center; margin-top:30px;">
            <el-pagination
                background
                :page-size="pageSize" 
                @current-change="handleCurrentChange" 
                layout="prev, pager, next, total"
                :total="totalElements">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import Common from '@/common/common.js'
import moment from "moment"
  export default {
    data() {
      return {
        QuartzTaskRecords: [{
          id:'',
          executeTime: '',
          taskNo: '',
          taskName: '',
          schedulerRule:'',
          isFailure: 0,
        },],
        pageSize: 5,
        totalElements: 0,
        keyWords:"",
      }
    },
    created: function () {
      var vm = this
      // 用$on事件来接收参数
      Common.$on('record', (data) => {
        vm.QuartzTaskRecords = data
      })
      Common.$on('totalElement', (data)=>{
        vm.totalElements = data    
      })
    },
    methods: {
        handleRead(index, row){
          var self = this
          console.log(row)
          this.$axios.get('/quartz//task/error?id='+row.id)
          .then(function (response) {
            self.$notify({
              title: response.data.data.errorKey,
              message: response.data.data.errorValue,
              offset: 300
            });
          })
          .catch(function (error) {
            console.log(error);
          });
        },
        formType(row){
          console.log(row.isFailure)
          if(row.isFailure == 1){
            return "danger"
          }else{
            return "success"
          }
        },
        readOrNot(row){
          if(row.isFailure == 1){
            return false
          }else{
            return true
          }
        },
        formatTime(time){
            return moment(time).format("YYYY-MM-DD hh:mm:ss")
        },
        handleCurrentChange(val){
        var self = this
        this.$axios.get('/quartz/record/search?page='+val+'&keyWords='+self.keyWords)
        .then(function (response) {
          self.QuartzTaskRecords = response.data.data.content
        })
        .catch(function (error) {
          console.log(error);
        });
        },
        searchRecord(){
          var self = this
          this.$axios.get('/quartz/record/search?page=1&keyWords='+self.keyWords)
          .then(function (response) {
            self.QuartzTaskRecords = response.data.data.content
            self.totalElements = response.data.data.totalElements
          })
          .catch(function (error) {
            console.log(error);
          });
        }
    }
  }
</script>
<style>
.record-form{
    width: 1200px;
    height: 600px;
    margin-left: 40px;
    background-color: #172b4d;
    border-radius: 10px;
}
.re-top{
    height: 80px;
    line-height: 50px;
}
.record-top-title{
    color: #fff;
    padding-left: 20px;
}
.record-table{
    border-bottom: #1c3560 solid 1px;
}
.el-table::before {
    height: 0px;
}
.el-table__empty-text {
  background-color: #172b4d;
  width: 100%;
}
.record-title-btm{
  width: 100%;
  line-height: 80px;
}
.record-search{
  margin-left: 250px;
  width: 300px;
}
.record-search>.el-input__inner{
  border-radius: 20px ;
  background-color: #172b4d;
  color: #fff;
}
</style>