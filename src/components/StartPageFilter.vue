<template>
  <v-container class="col-12" fluid fill-height>
    <v-row :justify="formJustify" dense>
      <v-col xl="2" lg="2" md="4" sm="5" xs="11" cols="11">
        <v-text-field
          v-model="filterOptions.recipeName"
          label="Name"
          outlined
          dense
          background-color="#F8EBD6"
        >
        </v-text-field>
      </v-col>
      <v-col xl="4" lg="4" md="4" sm="7" xs="11" cols="11">
        <v-combobox
          id="ingredients"
          v-model="filterOptions.selectedIngredients"
          :items="ingredients"
          label="Ingredients"
          clearable
          multiple
          outlined
          background-color="#F8EBD6"
          dense
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              class="white--text"
              :key="JSON.stringify(data.item)"
              color="#16A310"
              small
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col xl="4" lg="4" md="4" sm="7" xs="11" cols="11">
        <v-combobox
          v-model="filterOptions.selectedExcludeIngredients"
          :items="ingredients"
          label="Exlude Ingredients"
          clearable
          multiple
          outlined
          background-color="#F8EBD6"
          dense
          chips
        >
          <template v-slot:selection="data">
            <v-chip
              class="white--text"
              :key="JSON.stringify(data.item)"
              color="#16A310"
              small
              v-bind="data.attrs"
              :input-value="data.selected"
              :disabled="data.disabled"
              @click:close="data.parent.selectItem(data.item)"
            >
              {{ data.item }}
            </v-chip>
          </template>
        </v-combobox>
      </v-col>
      <v-col xl="2" lg="2" md="3" sm="5" xs="11" cols="11">
        <v-combobox
          v-model="filterOptions.selectedCuisines"
          :items="cuisines"
          label="Cuisines"
          clearable
          multiple
          outlined
          background-color="#F8EBD6"
          chips
          dense
        ></v-combobox>
      </v-col>
      <v-col xl="2" lg="2" md="3" sm="4" xs="11" cols="11">
        <v-combobox
          v-model="filterOptions.selectedIntolerances"
          :items="intolerances"
          label="Intolerances"
          clearable
          multiple
          outlined
          background-color="#F8EBD6"
          chips
          dense
        ></v-combobox>
      </v-col>
      <v-col xl="2" lg="2" md="3" sm="4" xs="11" cols="11">
        <v-select
          v-model="filterOptions.selectedDiet"
          :items="allDiets"
          label="Diets"
          outlined
          background-color="#F8EBD6"
          dense
        >
        </v-select>
      </v-col>
      <v-col xl="2" lg="2" md="3" sm="4" xs="11" cols="11">
        <v-select
          v-model="filterOptions.selectedType"
          :items="allType"
          label="Type"
          outlined
          background-color="#F8EBD6"
          dense
        >
        </v-select>
      </v-col>
      <v-col xl="4" lg="4" md="8" sm="8" xs="11" cols="11">
        <v-range-slider
          v-model="filterOptions.calories"
          label="Calories"
          max="1000"
          min="50"
          thumb-label
          color="#813B1D"
          thumb-color="#16A310"
          class="align-center"
        >
        </v-range-slider>
      </v-col>
      <v-col xl="2" lg="2" md="4" sm="4" xs="11" cols="11">
        <v-select
          v-model="filterOptions.selectedSorting"
          :items="allSorting"
          label="Sorting"
          outlined
          background-color="#F8EBD6"
          dense
        >
          <template v-slot:selection="{ item }">
            <span>{{ item.text }}</span>
            <v-icon v-if="item.direction === 'asc'"> mdi-arrow-up-thin </v-icon>
            <v-icon v-if="item.direction === 'dsc'">
              mdi-arrow-down-thin
            </v-icon>
          </template>
          <template v-slot:item="{ item }">
            {{ item.text }}
            <v-icon v-if="item.direction === 'asc'"> mdi-arrow-up-thin </v-icon>
            <v-icon v-if="item.direction === 'dsc'">
              mdi-arrow-down-thin
            </v-icon>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn
          elevation="2"
          class="white--text"
          color="#16A310"
          @click="search"
        >
          Search
        </v-btn>
        <v-btn
          elevation="2"
          class="white--text ml-1"
          color="#16A310"
          @click="clear"
        >
          Clear
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import options from '../lib/startFilterOptions';

export default {
  name: 'StartPageFilter',
  data() {
    return {
      ingredients: [],
      cuisines: options.cuisines,
      allDiets: options.allDiets,
      intolerances: options.intolerances,
      allType: options.allType,
      allSorting: options.allSorting,
    };
  },
  computed: {
    formJustify() {
      return this.$vuetify.breakpoint.mobile ? 'center' : 'start';
    },
    filterOptions: {
      get() {
        return this.$store.state.startFilterOptions;
      },
      set(val) {
        this.$store.dispatch('updateStartFilterOptions', val);
      },
    },
  },
  methods: {
    clear() {
      this.filterOptions = {
        recipeName: '',
        calories: [50, 1000],
        selectedDiet: '',
        selectedType: '',
        selectedSorting: '',
        selectedIngredients: [],
        selectedCuisines: [],
        selectedIntolerances: [],
        selectedExcludeIngredients: [],
      };
    },
    search() {
      let includeIngredientsString = '';
      let excludeIngredientsString = '';
      let includeCuisinesString = '';
      let includeIntolerancesString = '';
      let direction = '';
      let sorting = '';

      if (
        this.filterOptions.selectedSorting
        && this.filterOptions.selectedSorting !== 'Default'
      ) {
        direction = this.filterOptions.selectedSorting.slice(
          this.filterOptions.selectedSorting.length - 3,
        );
        sorting = this.filterOptions.selectedSorting.slice(
          0,
          this.filterOptions.selectedSorting.length - 3,
        );
      }

      this.loading = true;

      this.filterOptions.selectedIngredients.forEach((element) => {
        includeIngredientsString += `${element},`;
      });

      this.filterOptions.selectedExcludeIngredients.forEach((element) => {
        excludeIngredientsString += `${element},`;
      });

      this.filterOptions.selectedCuisines.forEach((element) => {
        includeCuisinesString += `${element},`;
      });

      this.filterOptions.selectedIntolerances.forEach((element) => {
        includeIntolerancesString += `${element},`;
      });

      const searchParams = {
        query: this.filterOptions.recipeName,
        includeIngredients: includeIngredientsString.slice(0, -1),
        fillIngredients: true,
        addRecipeInformation: true,
        addRecipeNutrition: true,
        diet: this.filterOptions.selectedDiet,
        number: 100,
        cuisine: includeCuisinesString,
        intolerances: includeIntolerancesString,
        excludeIngredients: excludeIngredientsString,
        type: this.filterOptions.selectedType,
        minCalories: this.filterOptions.calories[0],
        maxCalories: this.filterOptions.calories[1],
        sort: sorting,
        sortDirection: direction,
      };
      this.$emit('search', searchParams);
    },
  },
  created() {
    this.ingredients = options.ingredients.map((item) => item.value);
  },
  destroyed() {
    this.$store.dispatch('updateStartFilterOptions', this.filterOptions);
  },
};
</script>

<style>
</style>
