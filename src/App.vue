<template>
  
    <div id="cart-app" class="container">

    <div class="row">
      <div class="col-md-8">
        <h1 class="page-header">VUEJS 實戰 - <small>5倍商城</small></h1>
        <div v-if="filteredItems.length === 0"><h2>無符合條件之商品</h2></div>
        <pordList :item="item" v-for="item in filteredItems.slice(pageStart,pageStart+countOfPage)" :key="item._id" ></pordList>
        <!--
        <div class="item" v-for="item in filteredItems.slice(pageStart,pageStart+countOfPage)" :key="item._id">
          <h2>{{ item.name }}</h2>
          <img class="item-img img-responsive" :src="item.picture" alt="">
          <p>{{ item.info }}</p>
          <p class="item-price ">$ {{item.price}} </p>
          <a class="btn btn-primary " @click.prevent="addItems(item)" href="# ">放入購物車 <span class="glyphicon glyphicon-chevron-right "></span></a>
        </div>
        -->
        <hr>

        <!--Pager -->
        <ul class="pagination" v-if="true">
          <li @click.prevent="setPage(currentPage-1)">
            <a href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>   
          <li v-for="i in totalPage" @click.prevent="setPage(i)" :class="{'active': i == currentPage}"><a href="#">{{i}}</a></li>
          <li @click.prevent="setPage(currentPage+1)">
            <a href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
       
      </div>

      <!-- Blog Sidebar Widgets Column -->
      <div class="col-md-4 ">

        <div class="well ">
          <h4>商品搜尋</h4>
          <div class="input-group ">
            <input type="text" class="form-control" v-model="searchName">
            <span class="input-group-btn">
                <button class="btn btn-default"><span class="glyphicon glyphicon-search "></span></button>
            </span>
          </div>
          <!-- /.input-group -->
        </div>

        <hr>

        <div class="well cart">
          <h4>購物車</h4>

          <ul class="itemsInCart">
            <li v-for="i in cart">
              <div class="cart-item">
                <div class="cart-title">{{i.name}}</div> <span class="price">$ {{i.price}}</span> x {{i.qyt}}
                <span class="count">{{i.count}}</span>
                <div class="handler">
                  <a href="#" class="cart-btn plus" @click.prevent="plus(i)">+</a>
                  <a href="#" class="cart-btn minus" @click.prevent="minus(i)">-</a>
                </div>
              </div>
            </li>
          </ul>
          <hr>
          <p>小計： <span>$ {{total}}</span></p>
        </div>

      </div>

    </div>
    <!-- /.row -->

  </div>
  
</template>

<script>

import store from './store'
import pordList from './components/productionList.vue'

export default {
  name: 'app',
  components:{
    pordList
  },
  created() {
    store.dispatch('getItems');
  },
  computed: {
    items(){
      return store.state.items;
    },
    cart(){
      return store.state.cart;
    }, 
    total(){
      return store.state.total;
    },
    searchName(){
      return store.state.searchName;
    },
    countOfPage(){
      return store.state.countOfPage;
    },
    currentPage(){
      return store.state.currentPage;
    },
    filteredItems(){
      console.log("dfsafd");
      console.log(store.getters.filteredItems);
      console.log(store.getters.filteredItems.length);
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
    setPage(page){
      if (page > 0 && page <= this.totalPage){
        this.currentPage = page;
      } 
    }
    ,plus(item){
      item.qyt++;
      this.total += item.price;

    },minus(item){
      item.qyt--;
      this.total -= item.price;
      if(item.qyt === 0){
        this.cart = this.cart.filter(d => d.id != item.id);
      }
    }

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

