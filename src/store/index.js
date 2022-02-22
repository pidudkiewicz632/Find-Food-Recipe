import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recipes: [],
    favouriteRecipes: JSON.parse(localStorage.getItem('FavouriteRecipes')) || [],
    showConfirm: localStorage.getItem('showConfirm') !== 'false',
    paginationStart: {
      totalResults: 0,
      currentPage: 1,
      totalPages: 1,
      perPage: 30,
    },
    startFilterOptions: {
      recipeName: '',
      calories: [50, 1000],
      selectedDiet: '',
      selectedType: '',
      selectedSorting: '',
      selectedIngredients: [],
      selectedCuisines: [],
      selectedIntolerances: [],
      selectedExcludeIngredients: [],
    },
    loading: true,
    favouriteFilterOptions: {
      recipeName: '',
      selectedDiet: '',
      selectedIngredients: [],
      selectedExcludeIngredients: [],
      calories: [50, 1000],
    },
  },
  getters: {
  },
  mutations: {
    changeRecieps(state, data) {
      state.recipes = data;
    },
    changeStartFilterOptions(state, data) {
      state.startFilterOptions = data;
    },
    changeFavouriteFilterOptions(state, data) {
      state.favouriteFilterOptions = data;
    },
    changePaginationStart(state, data) {
      state.paginationStart = data;
    },
    addFavouriteRecipes(state, data) {
      state.favouriteRecipes.push(data);
      localStorage.setItem('FavouriteRecipes', JSON.stringify(state.favouriteRecipes));
    },
    deleteFavouriteRecipes(state, index) {
      state.favouriteRecipes.splice(index, 1);
      localStorage.setItem('FavouriteRecipes', JSON.stringify(state.favouriteRecipes));
    },
    setConfirm(state, value) {
      state.showConfirm = value;
      localStorage.setItem('showConfirm', state.showConfirm);
    },
  },

  actions: {
    updateRecieps({ commit }, data) {
      commit('changeRecieps', data);
    },
    updateStartFilterOptions({ commit }, data) {
      commit('changeStartFilterOptions', data);
    },
    updateFavouriteFilterOptions({ commit }, data) {
      commit('changeFavouriteFilterOptions', data);
    },
    updatePaginationStart({ commit }, data) {
      commit('changePaginationStart', data);
    },
    addRecipeToFavourite({ commit }, data) {
      commit('addFavouriteRecipes', data);
    },
    deleteRecipeFromFavourite({ commit, state }, data) {
      commit('deleteFavouriteRecipes', state.favouriteRecipes.findIndex((item) => item.id === data.id));
    },
    updateConfirm({ commit }, data) {
      commit('setConfirm', data);
    },
  },
});
