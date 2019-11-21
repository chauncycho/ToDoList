<template>
  <div id="todo-list">
    <!--选择、排序、添加-->
    <div id="sort">
      <div class="category sort-item">
        <span>分类</span>
        <el-select v-model="categoryValue">
          <el-option v-for="item in categoryType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="time-sort sort-item">
        <span>排序</span>
        <el-select v-model="sortValue">
          <el-option v-for="item in sortType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="add-card sort-item">
        <el-button type="primary" @click="onAddCard">添加任务</el-button>
      </div>
    </div>

    <!--卡片-->
    <div id="cards">
      <Card v-for="(card,index) in inOrderCards" :key="index" :cardData="card"/>
    </div>

    <!--弹窗-->
    <el-dialog title="添加任务" :visible="isDialogOpen" @close="dialogClose">
      <AddCard/>
    </el-dialog>

    <el-dialog title="修改任务" :visible="isUpdateOpen" @close="updateClose">
      <UpdateCard/>
    </el-dialog>
  </div>
</template>

<script>
  import Card from '@/components/Card'
  import AddCard from '@/components/AddCard'
  import UpdateCard from '@/components/UpdateCard'
  import {mapState} from 'vuex'

  export default {
    name: 'TodoList',
    components: {Card,AddCard,UpdateCard},
    data(){
      return {
        that: this,
        categoryValue: "all",
        sortValue: "默认",
        addCardDialogShow: false,
        categoryType: [{
          value: 'all',
          label: '全部'
        },{
          value: 'finished',
          label: '已完成'
        },{
          value: 'unfinished',
          label: '未完成'
        },{
          value: 'today',
          label: '当天'
        }],
        sortType: [{
          value: "默认",
          label: "默认"
        },{
          value: "逆序",
          label: "时间↓"
        },{
          value: "顺序",
          label: "时间↑"
        }]
      }
    },
    methods: {
      onAddCard(){
        this.$store.dispatch('changeDialog',true);
      },
      dialogClose(){
        this.$store.dispatch('changeDialog',false);
      },
      updateClose(){
        this.$store.dispatch('changeUpdate',false);
      }
    },
    computed:{
      ...mapState(['isDialogOpen','isUpdateOpen','todoListData']),
      inOrderCards(){
        let type1filter = [];
        let data = this.todoListData;
        for (let i = 0,len = data.length ; i < len ; i++){
          if (this.categoryValue === 'finished'){
            if (data[i].isFinish){
             type1filter.push(data[i])
            }
          } else if(this.categoryValue === 'unfinished'){
            if (!data[i].isFinish){
              type1filter.push(data[i])
            }
          } else if(this.categoryValue === 'all'){
            type1filter.push(data[i]);
          } else if(this.categoryValue === 'today'){
            let today = new Date();
            let endDayString = data[i].endTime.replace(/-/g,':').replace(' ',':').split(':');
            let endDay = new Date(endDayString[0],(endDayString[1]-1),endDayString[2],endDayString[3],endDayString[4],endDayString[5])
            if (today.getDate() == endDay.getDate()){
              type1filter.push(data[i])
            }
          }
        }

        let type2filter = []
        for (let i = 0,len = data.length ; i < len ; i++){
          if (this.sortValue === '默认'){
            console.log("默认")
            type2filter = type1filter;
          } else if(this.sortValue === '顺序'){
            type2filter = sortBykey(type1filter,'endTime')
          } else if(this.sortValue === '逆序'){
            type2filter = sortBykey(type1filter,'endTime').reverse()
          }
        }

        return type2filter;
      }
    }
  }

  function sortBykey(ary, key) {
    return ary.sort(function (a, b) {
      let x = a[key]
      let y = b[key]
      return ((x < y) ? -1 : (x > y) ? 1 : 0)
    })
  }
</script>

<style scoped>
  #todo-list{
    width: 100%;
    padding: 0 100px;
  }
  #cards{
    text-align: left;
  }

  #sort{
    text-align: right;
    padding-right: 15px;
    margin-top: 10px;
  }
  .sort-item{
    display: inline-block;
    margin: 0 10px;
  }
  .el-select{
    width: 100px;
  }
</style>
