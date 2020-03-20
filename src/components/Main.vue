<template>
    <div class="main-body"> 
        <div id="main-left" >
        </div>
        <div id="main-right">
        </div>
    </div>
</template>

<script type="text/javascript">
var echarts = require('echarts')
import Common from '@/common/common.js'

    export default {
        data(){
            return {
            }
        }, 
         mounted(){ 
            this.drawLeft();
            this.drawRight();
        },
        methods:{
            drawLeft(){
                var chartV1 = echarts.init(document.getElementById("main-left"));
                chartV1.setOption({
                    title: {
                        text: '定时任务统计',
                        subtext: '实时数据',
                        left: 'center',
                        padding: [30, 0, 0, 0],
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        padding: [450, 0 , 0 , 30],
                        textStyle:{
                            fontStyle:'oblique',
                            fontWeight: 'bolder' ,
                        }
                    },
                    series: [
                        {
                            name: '定时任务统计',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '40%'],
                            data: [],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            },
                            color:['#e7dbc3','#516b91','#c1232b'],
                        }
                    ]
                });
                this.$axios.get('/quartz/task/statistics/v1')
                    .then(function (response) {
                        setTimeout(function () {
                            chartV1.hideLoading();
                            chartV1.setOption({
                                series:[{
                                    name:'定时任务统计',
                                    type: 'pie',
                                    data: [
                                        {value:response.data.unRunningTasks, name: "未执行定时任务数"},
                                        {value:response.data.runningTasks, name: "正在执行定时任务数"},
                                        {value:response.data.pausedTasks , name: "暂停的定时任务数"}
                                    ]
                                }],
                                
                            })
                        }, 1000);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            drawRight(){
                var chartV2 = echarts.init(document.getElementById("main-right"), 'light');
                var data = []
                chartV2.setOption({
                    title: {
                        left: 'center', 
                        text: '定时任务生成图',
                        padding: [30, 0, 0, 0],
                        textStyle: {
                            color: '#fdfefe'
                        },
                    },
                    textStyle: {
                        color: '#c7ced5'
                    },
                    grid:{
                        bottom:65,
                        height:'75%'
                    },
                    legend: {
                       left:'right',
                       padding:40,
                       textStyle: {
                            color: '#fdfefe'
                       },
                    },
                    tooltip:{
                        show: true,
                        trigger: 'item',
                    },
                    xAxis: {
                        type: 'time',
                        name: '日期',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize : 10      //更改坐标轴文字大小
                            }
                        },
                        splitLine:{show: false}
                    },
                    yAxis: {
                        type: 'value',
                        name: '定时任务生成数量',
                        splitLine:{show: false},
                         axisLabel: {
                            show: true,
                            textStyle: {
                                fontSize : 12      //更改坐标轴文字大小
                            }
                        },
                    },
                    toolbox: {
                        left: 'right',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 10,
                    }, {
                        start: 0,
                        end: 10,
                        handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                        handleSize: '70%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                    series: {
                        name: 'NUMBER',
                        type: 'line',
                        smooth: false,
                        data: data,
                        symbolSize: 10,
                    },
                });
                this.$axios.get('/quartz/task/num')
                .then(function (response) {
                        setTimeout(function () {
                            chartV2.hideLoading();
                            chartV2.setOption({
                                series:[{
                                    name:'NUMBER',
                                    type: 'line',
                                    data: response.data.data
                                }],
                                
                            })
                        }, 1000);
                    })
                    .catch(function (error) {
                        console.log(error);
                });
            }
        }
    }
</script>
<style >
.main-body{
    width: 1270px;
    height: 400px;
    display: flex;
    flex-direction: row;
}
#main-left{
    width: 400px;
    height: 600px;
    /* background-color: #fff; */
    margin-left: 30px;
    border-radius: 10px;
    background: linear-gradient(#ece9e6);
}
#main-right{
    width: 800px;
    height: 600px;
    background-color: #172b4d;
    margin-left: 30px;
    margin-right: 30px;
     border-radius: 10px;
}
</style>