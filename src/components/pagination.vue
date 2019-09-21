<<template>
    <div>
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
</template>

<script>
import  store from '../store'

export default {
    computed: {
        totalPage(){
            return store.getters.totalPage;
        },
        filteredItems (){
            return store.getters.filteredItems
        },
        currentPage:{
            get(){
                return store.state.currentPage;
            },
            set(val){
                store.dispatch('setCurrentPage',val);
            }
        }
    },
    methods: {
        setPage(page){
            if (page > 0 && page <= this.totalPage){
                this.currentPage = page;
            } 
        }
    },
}
</script>