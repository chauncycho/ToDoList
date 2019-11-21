<template>
  <div class="add-card">
    <el-form :model="cardData" :rules="rules" ref="cardData">
      <el-form-item label="主题" :label-width="labelWidth" prop="title">
        <el-input v-model="cardData.title" placeholder="请输入主题" required="true"></el-input>
      </el-form-item>
      <el-form-item label="开始时间" :label-width="labelWidth" prop="startTime">
        <el-date-picker v-model="cardData.startTime" type="datetime" placeholder="请选择日期与时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" :label-width="labelWidth" prop="endTime">
        <el-date-picker v-model="cardData.endTime" type="datetime" placeholder="请选择日期与时间"></el-date-picker>
      </el-form-item>
      <el-form-item label="任务内容" :label-width="labelWidth" placeholder="请输入任务内容" prop="content">
        <el-input type="textarea" resize="none" :autosize="{ minRows: 2, maxRows: 4}" v-model="cardData.content"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-line">
      <el-button type="primary" @click="submit('cardData')">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'AddCard',
    data(){
      return {
        cardData: {
          title: "",
          startTime: "",
          endTime: "",
          content: "",
        },
        labelWidth: "80px",
        rules: {
          title: [{
            required: true, message: '请输入标题'
          }],
          startTime: [{
            required: true, message: '请选择时间'
          }],
          endTime: [{
            required: true, message: '请选择时间'
          }],
          content: [{
            required: true, message: '请输入任务内容'
          }]
        }
      }
    },
    methods:{
      submit(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addCard();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      addCard(){
        let card = {
          id: this.$store.getters.getNewId,
          title: this.cardData.title,
          startTime: this.cardData.startTime.format("yyyy-MM-dd hh:mm:ss"),
          endTime: this.cardData.endTime.format("yyyy-MM-dd hh:mm:ss"),
          content: this.cardData.content,
          isNormal: true,
          isFinish: false
        }
        console.log(card)
        this.$store.dispatch('addCard',card);
        this.$store.dispatch('idAdd');
        this.$store.dispatch('changeDialog',false);
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    }
  }

  Date.prototype.format = function(fmt) {
    var o = {
      "M+": this.getMonth() + 1,                 //月份
      "d+": this.getDate(),                    //日
      "h+": this.getHours(),                   //小时
      "m+": this.getMinutes(),                 //分
      "s+": this.getSeconds(),                 //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
</script>
<style scoped>
  .add-card .el-input{
    width: 400px;
  }
  .add-card .el-textarea{
    width: 400px;
  }
  .add-card .button-line button{
    width: 200px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 10px;
  }
</style>
