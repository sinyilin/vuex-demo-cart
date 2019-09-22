<template>
    <div>
        <div class="well ">
          <h4>商品搜尋</h4>
          <div class="input-group ">
            <input type="text" class="form-control" v-model="searchName">
            <span class="input-group-btn">
                <button class="btn btn-default"><span class="glyphicon glyphicon-search "></span></button>
            </span>
          </div>
        </div>
    </div>
</template>

<script>
import  store from '../store'

export default {
    computed: {
        searchName:{
            get(){
                return store.state.searchName;
            },
            set(val){
                store.dispatch('setSearchName',val);
            }
            
        }
    },
}
</script>