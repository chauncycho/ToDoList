<template>
  <div class="card">
    <div class="frame">
      <div class="card-head">{{cardData.title}}</div>
      <div class="card-start-time edit-line">
        <div class="line-label">开始时间:</div>
        <div class="line-value">{{cardData.startTime}}</div>
      </div>
      <div class="card-end-time edit-line">
        <div class="line-label">结束时间:</div>
        <div class="line-value">{{cardData.endTime}}</div>
      </div>
      <div class="card-content edit-line">
        <div class="line-label">任务内容:</div>
        <div class="line-value">{{cardData.content}}</div>
      </div>
      <div class="card-status-line">
        <div class="left-list-button">
          <el-button v-if="cardData.isNormal" type="primary" @click="setNormal(cardData.id,false)">普通任务</el-button>
          <el-button v-else type="danger" @click="setNormal(cardData.id,true)">重要任务</el-button>
        </div>
        <div class="right-list-button">
          <el-button v-if="cardData.isFinish" type="success" @click="setFinish(cardData.id,false)">已完成</el-button>
          <el-button v-else type="warning" @click="setFinish(cardData.id,true)">未完成</el-button>
          <el-button type="danger" @click="deleteCard(cardData.id)">删除</el-button>
        </div>
      </div>
      <div id="setting">
        <i class="el-icon-s-tools" @click="updateOpen(cardData.id)"></i>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Card',
    data(){
      return {

      }
    },
    props: ['cardData'],
    methods:{
      setNormal(id,isNormal){
        let newCard = {
          isNormal: isNormal
        }
        this.$store.dispatch('updateCard',{id:id,newCard:newCard})
        if(isNormal){
          this.$message({
            type: 'success',
            message: '已将任务"'+this.cardData.title+'"设为普通任务'
          })
        }else{
          this.$message({
            type: 'success',
            message: '已将任务"'+this.cardData.title+'"设为重要任务'
          })
        }
      },
      setFinish(id,isFinish){
        let newCard = {
          isFinish: isFinish
        }
        this.$store.dispatch('updateCard',{id:id,newCard:newCard})
        if(isFinish){
          this.$message({
            type: 'success',
            message: '已将任务"'+this.cardData.title+'"设为完成'
          })
        }else{
          this.$message({
            type: 'success',
            message: '已将任务"'+this.cardData.title+'"设为未完成'
          })
        }
      },
      deleteCard(id){
        this.$confirm('将永久删除该项任务，是否继续？','警告',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
          this.$store.dispatch('deleteCard',id)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      updateOpen(id){
        this.$store.dispatch('setUpdatingId',id);
        this.$store.dispatch('changeUpdate',true);
      }
    }
  }
</script>

<style scoped>
  .card{
    padding: 10px;
    width: calc( 50% - 3px);
    display: inline-block;
    height: 350px;
  }
  .frame{
    background-color: aqua;
    border-radius: 10px;
    padding: 20px;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .card-head{
    font-size: 20px;
    font-weight: 600;
    text-align: center;
  }
  .edit-line{
    text-align: left;
    line-height: 40px;
  }
  .line-label{
    font-weight: 500;
  }
  .line-value{
    margin-left: 20px;
  }
  .card-content .line-value{
    margin: 0 20px;
    padding: 5px 10px;
    display: block;
    height: 80px;
    overflow-y: scroll;
    background-color: #dafff3;
    box-sizing: border-box;
    border-radius: 10px;
    line-height: 30px;
  }

  .line-label,.line-value,.left-list-button,.right-list-button{
    display: inline-block;
  }
  .card-status-line{
    margin-top: 20px;
    position: relative;
    height: 40px;
    width: 100%;
  }
  .card-status-line button{
    border-radius: 10px;
  }
  .left-list-button{
    position: absolute;
    left: 0;
  }
  .right-list-button{
    position: absolute;
    right: 0;
  }

  #setting{
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 24px;
    width: 24px;
    height: 24px;
  }
  #setting:active{
    color: #747474;
  }
</style>
