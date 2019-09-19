<template>
  
    <div id="cart-app" class="container">

    <div class="row">
      <div class="col-md-8">
        <h1 class="page-header">VUEJS 實戰 - <small>5倍商城</small></h1>
        <div v-if="filteredItems.length == 0"><h2>無符合條件之商品</h2></div>
        <div class="item" v-for="item in filteredItems.slice(pageStart,pageStart+countOfPage)" :key="item._id">
          <h2>{{ item.name }}</h2>
          <img class="item-img img-responsive" :src="item.picture" alt="">
          <p>{{ item.info }}</p>
          <p class="item-price ">$ {{item.price}} </p>
          <a class="btn btn-primary " @click.prevent="addItems(item)" href="# ">放入購物車 <span class="glyphicon glyphicon-chevron-right "></span></a>
        </div>

        <hr>

        <!--Pager -->
        <ul class="pagination" v-if="filteredItems.length != 0">
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
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios/dist/axios.min.js'

export default {
  name: 'app',
  data(){
    return{
      items:[],
      cart:[],
      total:0,
      searchName:'',
      countOfPage:10, //一頁要有幾筆
      currentPage:1,  //目前在哪一頁

    }
  },created() {
    axios.get('http://localhost:9090/ItemList').then(
      res => {
        this.items = res.data;
    });    
  },computed: {
    filteredItems(){
      this.currentPage = 1;
      return this.items.filter(d => d.name.toLowerCase().includes(this.searchName.toLowerCase()));
    },
    totalPage(){
      return Math.ceil( this.filteredItems.length / this.countOfPage);
    },
    pageStart(){
      return (this.currentPage-1)*10;
    },
  },methods: {
    setPage(page){
      if (page > 0 && page <= this.totalPage){
        this.currentPage = page;
      } 
    },
    addItems(item){
      //購物車裡已有
      let idx = this.cart.findIndex(d => d.id === item._id);
      if( idx > -1){
        this.cart[idx].qyt ++;
      }else{
        this.cart.push({
          id:item._id,
          name:item.name,
          price:item.price,
          qyt:1
        });
      }
      this.total += item.price;
      
    },plus(item){
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
