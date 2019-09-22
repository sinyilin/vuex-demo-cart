<template>
    <div>
        <div class="item">
          <h2>{{ name }}</h2>
          <img class="item-img img-responsive" :src="picture" alt="">
          <p>{{ info }}</p>
          <p class="item-price ">$ {{price}} </p>
          <a class="btn btn-primary " @click.prevent="addItems(item)" href="# ">放入購物車 <span class="glyphicon glyphicon-chevron-right "></span></a>
        </div>
    </div>
</template>


<script>
import store from '../store'

export default {
    props:{
        item: Object
    },
    data() {
        //ES6語法 透過這個可以將物件展開 不用在template 一個一個寫item.name 
        return {
            ...this.item
        };
    },
    computed: {
        cart(){
            return store.state.cart;
        },
        total:{
            get(){
                return store.state.total;
            },
            set(val){
                store.dispatch('setTotal',val);
            }
        }
    },
    methods: {
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
        }
    },
}
</script>