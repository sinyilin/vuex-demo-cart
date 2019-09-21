import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios/dist/axios.min.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items:[],
    cart:[],
    total:0,
    searchName:'',
    countOfPage:10, //一頁要有幾筆
    currentPage:1,  //目前在哪一頁
  },
  getters:{
    filteredItems(state, getters){
      state.currentPage = 1;
      return state.items.filter(d => d.name.toLowerCase().includes(state.searchName.toLowerCase()));
    },
    totalPage(state, getters){
      return Math.ceil( getters.filteredItems.length / state.countOfPage);
    },
    pageStart(state, getters){
      return (state.currentPage-1)*10;
    },
  },
  mutations: {
    setItem(state, val){
      state.items = val;
    },
    setCurrentPage(state, val){
      state.currentPage = val;
    }
    
  },
  actions: {
    getItems(context){
      axios.get('http://localhost:9090/ItemList').then(
        res => {
          console.log("getItems");
          //context.commit('Mutation名稱',‘傳送的值’);
          context.commit('setItem',res.data);
      });
    },
    setCurrentPage(context,playload){
      // console.log(playload);
      context.commit('setCurrentPage',playload);
    }
  }
})
