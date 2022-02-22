<template>
  <div>
    <v-container class="col-12" fluid text-center fill-height>
      <v-row justify="center">
        <v-col cols="12">
          <div v-if="$vuetify.breakpoint.mobile" class="text-left">
            <div v-if="recieps.length">
              <v-btn color="#16A310" dark @click="dialog = true">
                Filter
              </v-btn>
            </div>
            <StartPageFilter v-else @search="searchRecipes" />
          </div>
          <StartPageFilter v-else @search="searchRecipes" />
        </v-col>
        <v-col cols="12">
          <masonry
            v-if="recieps.length"
            :cols="{ default: 5, 1400: 3, 1000: 2, 700: 1, 400: 1 }"
            :gutter="30"
          >
            <RecipeListElement
              v-for="reciep in recieps"
              :key="reciep.id"
              :information="reciep"
              showUsedIngredients
              @click.native="toRecipeDeatils(reciep.id)"
              @addToFavourite="addToFavourite"
              @deleteFromFavourite="deleteFromFavourite"
            />
          </masonry>
          <div class="text-h5 mt-12" v-else-if="wasSearch && !recieps.length">
            No results
          </div>
        </v-col>
        <v-col cols="12">
          <v-pagination
            v-if="pagination.totalPages > 1"
            color="#16A310"
            v-model="pagination.currentPage"
            :length="pagination.totalPages"
            :total-visible="7"
            @input="changePage"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-container>
    <Loading :showProgress="loading" />
    <v-dialog
      v-if="$vuetify.breakpoint.mobile"
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-container class="p-0">
        <v-card color="#DCAD5B" tile>
          <v-toolbar max-height="10%" flat color="#DCAD5B">
            <v-btn
              icon
              redRobinText
              class="redRobinText"
              dark
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="redRobinText">Filter</v-toolbar-title>
          </v-toolbar>
          <StartPageFilter class="cream" @search="searchRecipes" />
        </v-card>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import RecipeListElement from '../components/RecipeListElement.vue';
import StartPageFilter from '../components/StartPageFilter.vue';
import Loading from '../components/Loading.vue';

export default {
  name: 'Start',
  data() {
    return {
      loading: false,
      dialog: false,
      wasSearch: false,
      recieps: [],
      searchParams: {},
      pagination: {},
    };
  },
  computed: {
    favouriteRecipes() {
      return [...this.$store.state.favouriteRecipes];
    },
  },
  methods: {
    addToFavourite(data) {
      this.recieps.find((item) => item.id === data.id).isInFavourite = true;
      this.$store.dispatch('addRecipeToFavourite', data);
    },
    deleteFromFavourite(data) {
      this.recieps.find((item) => item.id === data.id).isInFavourite = false;
      this.$store.dispatch('deleteRecipeFromFavourite', data.id);
    },
    toRecipeDeatils(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    },
    loadRecipes() {
      this.loading = true;
      const params = this.searchParams;

      params.number = this.pagination.perPage;

      this.axios
        .get('/recipes/complexSearch', {
          params,
        })
        .then((res) => {
          this.pagination.totalResults = res.data.totalResults;
          this.pagination.totalPages = Math.ceil(
            this.pagination.totalResults / this.pagination.perPage,
          );
          const favouriteRecpieIds = this.favouriteRecipes.map(
            (item) => item.id,
          );
          this.recieps = res.data.results.map((item) => ({
            title: item.title,
            id: item.id,
            image: item.image,
            isInFavourite: favouriteRecpieIds.includes(item.id),
            usedIngredients: item.usedIngredients,
            missedIngredients: item.missedIngredients,
            healthScore: item.healthScore,
            nutrition: item.nutrition,
            readyInMinutes: item.readyInMinutes,
            diets: item.diets,
          }));
          this.loading = false;
          this.wasSearch = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchRecipes(params) {
      this.searchParams = params;
      this.pagination.currentPage = 1;
      this.loadRecipes();
      this.dialog = false;
    },
    changePage() {
      this.searchParams.offset = (this.pagination.currentPage - 1) * this.pagination.perPage;
      this.loadRecipes();
    },
    checkOnResize() {
      this.dialog = this.$vuetify.breakpoint.mobile ? this.dialog : false;
    },
  },
  created() {
    this.recieps = [...this.$store.state.recipes];
    const favouriteRecpieIds = this.favouriteRecipes.map((item) => item.id);
    this.recieps = this.recieps.map((item) => ({
      ...item,
      isInFavourite: favouriteRecpieIds.includes(item.id),
    }));
    this.pagination = { ...this.$store.state.paginationStart };
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.checkOnResize, { passive: true });
  },
  mounted() {
    window.addEventListener('resize', this.checkOnResize, { passive: true });
  },
  destroyed() {
    this.$store.dispatch('updateRecieps', this.recieps);
    this.$store.dispatch('updatePaginationStart', this.pagination);
  },
  components: { RecipeListElement, Loading, StartPageFilter },
};
</script>

<style lang="scss" scoped>
#logoText {
  color: #813b1d;
}
</style>
