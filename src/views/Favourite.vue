<template>
<div>
    <v-container class="col-10" fluid text-center fill-height>
        <v-row justify="center"
          dense>
            <v-col md="8"
                cols="12">
                <FilterFavoritePage v-if="!$vuetify.breakpoint.mobile"
                :startupFilterOptions="filterOptions"
                :ingredients="ingredients"
                :allDiets="allDiets"
                @filter="filterRecipes"/>
            </v-col>
            <v-col cols="12" class="py-0 mb-0 mt-6">
              <v-row justify="space-between">
                <v-col cols="6" v-if="$vuetify.breakpoint.mobile" class="text-left">
                    <v-btn
                    color="#16A310"
                    dark
                    @click="dialog = true"
                    >
                      Filter
                  </v-btn>
                </v-col>
                <v-col cols="6" sm="5" md="3" lg="2">
                  <div class="col-12 py-0 my-0">
                    <v-select v-model="selectedSort"
                                :items="sortTypes"
                                label="Sort"
                                outlined
                                background-color="#F8EBD6"
                                dense>
                                <template v-slot:selection="{ item }">
                                  <span>{{ item.text }}</span>
                                  <v-icon v-if="item.direction === 'asc'">
                                    mdi-arrow-up-thin
                                  </v-icon>
                                  <v-icon v-if="item.direction === 'dsc'">
                                    mdi-arrow-down-thin
                                  </v-icon>
                                </template>
                                <template v-slot:item="{item}">
                                  {{item.text }}
                                  <v-icon v-if="item.direction === 'asc'">
                                    mdi-arrow-up-thin
                                  </v-icon>
                                  <v-icon v-if="item.direction === 'dsc'">
                                    mdi-arrow-down-thin
                                  </v-icon>
                                </template>
                      </v-select>
                  </div>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="py-0 my-0">
                <masonry v-if="sortedRecipes.length"
                    :cols =" {default: 5, 1400: 3, 1000: 2, 700: 1, 400:1} "
                    :gutter="30">
                    <RecipeListElement v-for="reciep in recipesToPrint"
                        :key="reciep.id" :information="reciep"
                        showClose
                        @click.native="toRecipeDeatils(reciep.id)"
                        @deleteFromFavourite="deleteFromFavourite"/>
                </masonry>
                <div v-else>No results</div>
            </v-col>
            <v-col cols="12">
            <v-pagination v-if="pagination.totalPages > 1"
              color="#16A310"
              v-model="pagination.currentPage"
              :length="pagination.totalPages"
              :total-visible="7"
            ></v-pagination>
        </v-col>
        </v-row>
    </v-container>
    <v-dialog v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card color="#DCAD5B" tile>
          <v-toolbar
            max-height="10%"
            flat
            color="#DCAD5B">
            <v-btn icon
              redRobinText
              class="redRobinText"
              dark
              @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title class="redRobinText">Filter</v-toolbar-title>
          </v-toolbar>
          <v-container>
            <FilterFavoritePage class="cream"
                :ingredients="ingredients"
                :allDiets="allDiets"
                @filter="filterRecipes"/>
          </v-container>
        </v-card>
      </v-dialog>
    <Confirm  ref="confirm"/>
</div>
</template>

<script>
import RecipeListElement from '../components/RecipeListElement.vue';
import FilterFavoritePage from '../components/FilterFavoritePage.vue';
import Confirm from '../components/Confirm.vue';

export default {
  name: 'Favourite',
  data() {
    return {
      dialog: false,
      recipes: [],
      pagination: {
        totalResults: 0,
        currentPage: 1,
        totalPages: 1,
        perPage: 30,
      },
      sortTypes: [{
        text: 'Default',
        value: '',
      }, {
        text: 'name',
        value: 'nameasc',
        direction: 'asc',
      },
      {
        text: 'name',
        value: 'namedsc',
        direction: 'dsc',
      },
      {
        text: 'healthiness',
        value: 'healthinessasc',
        direction: 'asc',
      },
      {
        text: 'healthiness',
        value: 'healthinessdsc',
        direction: 'dsc',
      },
      {
        text: 'time',
        value: 'timeasc',
        direction: 'asc',
      },
      {
        text: 'time',
        value: 'timedsc',
        direction: 'dsc',
      },
      {
        text: 'calories',
        value: 'caloriesasc',
        direction: 'asc',
      },
      {
        text: 'calories',
        value: 'caloriesdsc',
        direction: 'dsc',
      }],
      allDiets: [],
      ingredients: [],
      selectedSort: [],
    };
  },
  watch: {
    sortedRecipes(value) {
      this.pagination.totalResults = value.length;
      this.pagination.currentPage = 1;
      this.pagination.totalPages = Math.ceil(value.length / this.pagination.perPage);
    },
  },
  computed: {
    filterOptions: {
      get() {
        return this.$store.state.favouriteFilterOptions;
      },
      set(val) {
        this.$store.dispatch('updateFavouriteFilterOptions', val);
      },
    },
    sortedRecipes() {
      const recipes = [...this.recipes];

      // eslint-disable-next-line default-case
      switch (this.selectedSort) {
        case 'nameasc':
          return recipes.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
        case 'namedsc':
          return recipes.sort((a, b) => {
            if (a.title < b.title) return 1;
            if (a.title > b.title) return -1;
            return 0;
          });
        case 'timeasc':
          return recipes.sort((a, b) => {
            if (a.readyInMinutes < b.readyInMinutes) return -1;
            if (a.readyInMinutes > b.readyInMinutes) return 1;
            return 0;
          });
        case 'timedsc':
          return recipes.sort((a, b) => {
            if (a.readyInMinutes < b.readyInMinutes) return 1;
            if (a.readyInMinutes > b.readyInMinutes) return -1;
            return 0;
          });
        case 'caloriesasc':
          return recipes.sort((a, b) => {
            if (a.nutrition.nutrients[0].amount.toFixed()
            < b.nutrition.nutrients[0].amount.toFixed()) return -1;
            if (a.nutrition.nutrients[0].amount.toFixed()
            > b.nutrition.nutrients[0].amount.toFixed()) return 1;
            return 0;
          });
        case 'caloriesdsc':
          return recipes.sort((a, b) => {
            if (a.nutrition.nutrients[0].amount.toFixed()
            < b.nutrition.nutrients[0].amount.toFixed()) return 1;
            if (a.nutrition.nutrients[0].amount.toFixed()
            > b.nutrition.nutrients[0].amount.toFixed()) return -1;
            return 0;
          });
        case 'healthinesssasc':
          return recipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) return -1;
            if (a.healthScore > b.healthScore) return 1;
            return 0;
          });
        case 'healthinessdsc':
          return recipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) return 1;
            if (a.healthScore > b.healthScore) return -1;
            return 0;
          });
      }

      return recipes;
    },
    recipesToPrint() {
      const start = (this.pagination.currentPage - 1) * this.pagination.perPage;
      return this.sortedRecipes.slice(start, this.pagination.perPage + start);
    },
  },
  methods: {
    filterRecipes(filterOptions) {
      this.dialog = false;
      this.filterOptions = filterOptions;
      const recipes = [...this.$store.state.favouriteRecipes];

      this.recipes = recipes.filter((item) => {
        if (this.filterOptions.recipeName && item.title.toUpperCase()
          .indexOf(this.filterOptions.recipeName.toUpperCase()) < 0) {
          return false;
        }

        if (this.filterOptions.selectedDiet && !item.diets
          .find((diet) => diet.toUpperCase() === this.filterOptions.selectedDiet.toUpperCase())) {
          return false;
        }

        if (this.filterOptions.selectedIngredients.length) {
          for (let x = 0; x < this.filterOptions.selectedIngredients.length; x += 1) {
            if (item.allIngredients.findIndex(
              (ingredient) => ingredient.name === this.filterOptions.selectedIngredients[x],
            ) < 0) {
              return false;
            }
          }
        }

        if (this.filterOptions.selectedExcludeIngredients.length) {
          for (let x = 0; x < this.filterOptions.selectedExcludeIngredients.length; x += 1) {
            if (item.allIngredients.findIndex(
              (ingredient) => ingredient.name === this.filterOptions.selectedExcludeIngredients[x],
            ) >= 0) {
              return false;
            }
          }
        }
        if (!(item.nutrition.nutrients[0].amount.toFixed() >= this.filterOptions.calories[0]
        && item.nutrition.nutrients[0].amount.toFixed() <= this.filterOptions.calories[1])) {
          return false;
        }
        return true;
      });
    },
    addToFavourite(data) {
      this.$store.dispatch('addRecipeToFavourite', data);
    },
    deleteFromFavourite(data) {
      if (this.$store.state.showConfirm) {
        this.$refs.confirm.open('Are you sure?')
          .then((state) => {
            if (state) {
              this.$store.dispatch('deleteRecipeFromFavourite', data);
              const index = this.recipes.findIndex((item) => item.id === data.id);
              this.recipes.splice(index, 1);
            }
          });
      } else {
        this.$store.dispatch('deleteRecipeFromFavourite', data);
        const index = this.recipes.findIndex((item) => item.id === data.id);
        this.recipes.splice(index, 1);
      }
    },
    toRecipeDeatils(id) {
      this.$router.push({ name: 'RecipeDetails', params: { id } });
    },
    checkOnResize() {
      this.dialog = this.$vuetify.breakpoint.mobile ? this.dialog : false;
    },
  },
  created() {
    this.recipes = [...this.$store.state.favouriteRecipes];

    if (this.recipes.length) {
      let diets = [];
      let ingredients = [];
      const calories = [];

      this.ingredients = [];

      this.recipes.forEach((item) => {
        diets = diets.concat(item.diets);
        // eslint-disable-next-line no-param-reassign
        item.allIngredients = item.missedIngredients.concat(item.usedIngredients);
        ingredients = ingredients.concat(item.allIngredients);
        calories.push(item.nutrition.nutrients[0].amount);
      });

      ingredients = ingredients.map((item) => item.name);
      this.ingredients = [...new Set(ingredients)];

      this.filterOptions.calories[0] = Math.min(...calories);
      this.filterOptions.calories[1] = Math.max(...calories);

      this.allDiets = [...new Set(diets)];
      this.allDiets.unshift({ text: 'No Diet', value: '' });
    }
  },
  beforeDestroy() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', this.checkOnResize, { passive: true });
  },
  mounted() {
    window.addEventListener('resize', this.checkOnResize, { passive: true });
  },
  components: {
    RecipeListElement, Confirm, FilterFavoritePage,
  },
};
</script>

<style lang="scss" scoped>
#logoText{
  color:#813B1D;
}
</style>
