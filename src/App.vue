<template>
  
    <div id="cart-app" class="container">

    <div class="row">
      <div class="col-md-8">
        <h1 class="page-header">VUEJS 實戰 - <small>5倍商城</small></h1>
        <div v-if="filteredItems.length === 0"><h2>無符合條件之商品</h2></div>
        <pordList :item="item" v-for="item in filteredItems.slice(pageStart,pageStart+countOfPage)" :key="item._id" ></pordList>
        <hr>

        <!--Pager -->
        <pagination></pagination>
      </div>

      <!-- Blog Sidebar Widgets Column -->
      <div class="col-md-4 ">
        <searchBox></searchBox>
        <hr>
        <shoppingCart></shoppingCart>
      </div>

    </div>
    <!-- /.row -->

  </div>
  
</template>

<script>

import store from './store'
import pordList from './components/productionList.vue'
import pagination from './components/pagination.vue'
import searchBox from './components/searchBox.vue'
import shoppingCart from './components/shoppingCart.vue'

export default {
  name: 'app',
  components:{
    pordList,
    pagination,
    searchBox,
    shoppingCart
  },
  created() {
    store.dispatch('getItems');
  },
  computed: {
    cart(){
      return store.state.cart;
    }, 
    total(){
      return store.state.total;
    },
    countOfPage(){
      return store.state.countOfPage;
    },
    currentPage(){
      return store.state.currentPage;
    },
    filteredItems(){
      return store.getters.filteredItems;
    },
    totalPage(){
      console.log(store.getters.totalPage);
      return store.getters.totalPage;
    },
    pageStart(){
      return store.getters.pageStart;
    }
  },
  methods: {
    
    

  },

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

