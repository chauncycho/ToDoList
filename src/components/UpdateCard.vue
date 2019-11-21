<template>
  <div class="update-card">
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
  import {mapState} from 'vuex'

  export default {
    name: 'UpdateCard',
    data(){
      return {
        cardData: {
          id: "",
          title: "",
          startTime: "",
          endTime: "",
          content: "",
          isNormal: true,
          isFinish: false
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
            this.updateCard();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      updateCard(){
        let card = {
          id: this.cardData.id,
          title: this.cardData.title,
          startTime: this.cardData.startTime.format("yyyy-MM-dd hh:mm:ss"),
          endTime: this.cardData.endTime.format("yyyy-MM-dd hh:mm:ss"),
          content: this.cardData.content,
          isNormal: this.isNormal,
          isFinish: this.isFinish
        }
        console.log(card)
        this.$store.dispatch('updateCard',{id:card.id,newCard:card});
        this.$store.dispatch('changeUpdate',false);
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      },
      init(){
        let oldCard = this.getUpdatingCard
        this.cardData.id = oldCard.id;
        this.cardData.title = oldCard.title;

        let oldDateStringStart = oldCard.startTime.replace(/-/g,':').replace(' ',':').split(':');
        let oldDateStartTime = new Date(oldDateStringStart[0],(oldDateStringStart[1]-1),oldDateStringStart[2],oldDateStringStart[3],oldDateStringStart[4],oldDateStringStart[5])
        this.cardData.startTime = oldDateStartTime;

        let oldDateStringEnd = oldCard.endTime.replace(/-/g,':').replace(' ',':').split(':');
        let oldDateEndTime = new Date(oldDateStringEnd[0],(oldDateStringEnd[1]-1),oldDateStringEnd[2],oldDateStringEnd[3],oldDateStringEnd[4],oldDateStringEnd[5])
        this.cardData.endTime = oldDateEndTime;

        this.cardData.content = oldCard.content;
        this.cardData.isNormal = oldCard.isNormal;
        this.cardData.isFinish = oldCard.isFinish;

        console.log(this.cardData)
      }
    },
    computed: {
      getUpdatingCard(){
        return this.$store.getters.getUpdatingCard;
      },
      ...mapState(['updatingId','isUpdateOpen'])
    },
    watch:{
      isUpdateOpen: function (newval, oldval) {
        if (newval){
          this.init();
        }
      }
    },
    mounted () {
      this.init();
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
  .update-card .el-input{
    width: 400px;
  }
  .update-card .el-textarea{
    width: 400px;
  }
  .update-card .button-line button{
    width: 200px;
    font-size: 20px;
    font-weight: 600;
    border-radius: 10px;
  }
</style>
