<template>
    <div>
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
</template>


<script>
import store from '../store'

export default {
    computed: {
        cart:{
            get(){
                return store.state.cart;
            },
            set(val){
                store.dispatch('setCart',val);
            }
            
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
        plus(item){
            item.qyt++;
            this.total += item.price;
        },
        minus(item){
            item.qyt--;
            this.total -= item.price;
            if(item.qyt === 0){
                this.cart = this.cart.filter(d => d.id != item.id);
            }
        }
    },
}
</script>