<template>
  <v-row :justify="formJustify">
            <v-col xl="4"
                lg="4"
                md="5"
                sm="8"
                xs="11"
                cols="11">
                <v-text-field
                    v-model="filterOptions.recipeName"
                    label="Name"
                    outlined
                    dense
                    background-color="#F8EBD6">
                </v-text-field>
            </v-col>
            <v-col xl="4"
                lg="4"
                md="5"
                sm="8"
                xs="11"
                cols="11">
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
                      chips>
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
            <v-col xl="4"
                lg="4"
                md="5"
                sm="8"
                xs="11"
                cols="11">
                <v-combobox
                    id="ingredients"
                    v-model="filterOptions.selectedExcludeIngredients"
                    :items="ingredients"
                    label="Exclude Ingredients"
                    clearable
                    multiple
                    outlined
                    background-color="#F8EBD6"
                    dense
                    chips>
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
            <v-col xl="3"
                    lg="3"
                    md="5"
                    sm="8"
                    xs="11"
                    cols="11">
                <v-select
                    v-model="filterOptions.selectedDiet"
                    :items="allDiets"
                    label="Diets"
                    outlined
                    background-color="#F8EBD6"
                    dense>
                </v-select>
            </v-col>
            <v-col cols="12">
                 <v-range-slider
                    v-model="filterOptions.calories"
                    label="Calories"
                    :max="caloriesRange[1]"
                    :min="caloriesRange[0]"
                    thumb-label
                    dense
                    color="#813B1D"
                    thumb-color="#16A310"
                    class="align-center">
                </v-range-slider>
            </v-col>
            <v-col cols="12"
               class="text-center">
             <v-btn elevation="2" dense class="white--text" color="#16A310"
            @click="filter">
                Filter
           </v-btn>
        </v-col>
    </v-row>
</template>

<script>
export default {
  name: 'FilterFavoritePage',
  props: {
    ingredients: {
      type: Array,
    },
    allDiets: {
      type: Array,
    },
  },
  data() {
    return {
      caloriesRange: [50, 1000],
    };
  },
  computed: {
    formJustify() {
      return this.$vuetify.breakpoint.mobile ? 'center' : 'start';
    },
    filterOptions: {
      get() {
        return this.$store.state.favouriteFilterOptions;
      },
      set(val) {
        this.$store.dispatch('updateFavouriteFilterOptions', val);
      },
    },
  },
  methods: {
    filter() {
      this.$emit('filter', this.filterOptions);
    },
  },
  mounted() {
    this.caloriesRange = [...this.filterOptions.calories];
  },
};
</script>

<style>

</style>
