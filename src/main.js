import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMasonry from 'vue-masonry-css';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import store from './store/index';

Vue.use(VueMasonry);

axios.defaults.baseURL = 'https://api.spoonacular.com/';
axios.defaults.params = {};
axios.defaults.params.apiKey = process.env.API_KEY;

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
