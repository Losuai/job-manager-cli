<template>
     <el-row>
        <el-col :span="6">
            <div class="grid-content bg-purple top">
                <div class="top-title top-son">总定时任务数</div>
                <div class="top-mid top-son">2213</div>
                <div class="top-btm top-son">3.48%Since last month</div>
                <img class="top-img1" src="@/assets/1.png"/>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple top">
                <div class="top-title top-son">定时任务失败数</div>
                <div class="top-mid top-son">21231</div>
                <div class="top-btm top-son">3.48%Since last month</div>
                <img class="top-img2" src="@/assets/2.png"/>
        </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple top">
                 <div class="top-title top-son">未执行任务数</div>
                <div class="top-mid top-son">21231</div>
                <div class="top-btm top-son">3.48%Since last month</div>
                <img class="top-img3" src="@/assets/3.png"/>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple top">
                 <div class="top-title top-son">正在执行任务数</div>
                <div class="top-mid top-son">212312</div>
                <div class="top-btm top-son">3.48%Since last month</div>
                <img class="top-img4" src="@/assets/4.png"/>
            </div>
        </el-col>
    </el-row>
</template>
<style>
.top{
    background-color: #ffffff;
    margin-left: 35px;
    margin-top: 50px;
    height: 120px;
    width: 250px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
}
.top-son{
    padding-left: 30px;

}
.top-title{
    color: #97a5b5;
    font-weight: 700;
    font-size: 14px;
}
.top-mid{
    margin-top: -15px;
    font-size: 20px;
    color: #3d3d65;
    font-weight: 1000;
    font-family:Verdana, Tahoma, sans-serif
}
.top-btm{
    font-size: 14px;
    color: #949cb0;
}
.top-img1{
    height: 50px;
    width: 50px;
    position:absolute;
    top: 20px;
    left: 174px;
}
.top-img2{
    height: 50px;
    width: 50px;
    position:absolute;
    top: 20px;
    left: 175px;
}
.top-img3{
    height: 50px;
    width: 50px;
    position:absolute;
    top: 20px;
    left: 176px;
}
.top-img4{
    height: 50px;
    width: 50px;
    position:absolute;
    top: 20px;
    left: 174px;
}

</style>