import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const state={
  isDialogOpen: false,
  isUpdateOpen: false,
  updatingId: 0,
  todoListData: [{
    id: 1,
    title: "去动物园",
    startTime: "2019-11-21 12:00:00",
    endTime: "2019-11-21 19:00:00",
    content: "和XXX去参观动物园",
    isNormal: true,
    isFinish: false
  },{
    id: 2,
    title: "看电影",
    startTime: "2019-11-19 20:00:00",
    endTime: "2019-11-19 21:00:00",
    content: "和XXX去家乐福电影院看电影，记得买点零食",
    isNormal: false,
    isFinish: true
  },{
    id: 3,
    title: "バカ",
    startTime: "2019-11-20 12:00:00",
    endTime: "2019-11-20 19:00:00",
    content: "バカじゃないの？",
    isNormal: true,
    isFinish: true
  },{
    id: 4,
    title: "这段文字很长",
    startTime: "2018-11-11 00:00:00",
    endTime: "2018-11-11 00:00:00",
    content: "这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……这段文字很长……",
    isNormal: false,
    isFinish: false
  },{
    id: 5,
    title: "抓肥羊",
    startTime: "2019-11-22 00:00:00",
    endTime: "2019-11-22 23:59:59",
    content: "今天要去青青草原抓肥羊",
    isNormal: true,
    isFinish: false
  }],
  lastId: 5
}
const getters = {
  getNewId(state) {
    return state.lastId+1;
  },
  getUpdatingCard(state){
    for (let i = 0, len = state.todoListData.length; i < len ; i ++) {
      if (state.todoListData[i].id == state.updatingId){
        return state.todoListData[i];
      }
    }
  }
}
const mutations = {
  changeDialog(state, dialogState){
    state.isDialogOpen = dialogState;
  },
  changeUpdate(state, updateState){
    state.isUpdateOpen = updateState;
  },
  setUpdatingId(state, id){
    state.updatingId = id;
  },
  addCard(state, card){
    state.todoListData.push(card);
  },
  idAdd(state){
    state.lastId++;
  },
  updateCard(state,arg){
    let id = arg.id;
    let card = arg.newCard;
     //更新数组
    for(let i = 0, len = state.todoListData.length; i < len ; i ++){
      if (state.todoListData[i].id == id){
        if (card.hasOwnProperty('title')){
          state.todoListData[i].title = card.title;
        }
        if (card.hasOwnProperty('startTime')){
          state.todoListData[i].startTime = card.startTime;
        }
        if (card.hasOwnProperty('endTime')){
          state.todoListData[i].endTime = card.endTime;
        }
        if (card.hasOwnProperty('content')){
          state.todoListData[i].content = card.content;
        }
        if (card.hasOwnProperty('isNormal')){
          state.todoListData[i].isNormal = card.isNormal;
        }
        if (card.hasOwnProperty('isFinish')){
          state.todoListData[i].isFinish = card.isFinish;
        }
        break;
      }
    }
  },
  deleteCard(state,id){
    for (let i = 0, len = state.todoListData.length; i < len ; i ++){
      if (state.todoListData[i].id == id){
        state.todoListData.splice(i,1)
        break;
      }
    }
  }
}
const actions = {
  changeDialog(context,dialogState){
    context.commit('changeDialog',dialogState)
  },
  changeUpdate(context,updateState){
    context.commit('changeUpdate',updateState)
  },
  setUpdatingId(context, id){
    context.commit('setUpdatingId',id)
  },
  addCard (context, card) {
    context.commit('addCard',card)
  },
  idAdd(context){
    context.commit('idAdd');
  },
  updateCard (context, arg) {
    context.commit('updateCard',arg)
  },
  deleteCard (context, id){
    context.commit('deleteCard', id)
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
export default store;
