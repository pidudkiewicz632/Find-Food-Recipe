<template>
  <v-app id="start">
    <v-main class="ma-0  pa-0">
      <v-app-bar v-if="showAppBar" color="#DCAD5B" elevation="0">
        <v-avatar :tile="true">
          <img :src="require('@/assets/logo.svg')" alt="logo">
        </v-avatar>
        <v-toolbar-title id="logoText">FoodApp</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-app-bar>
      <v-navigation-drawer
        v-model="drawer"
        color="#faefd8"
        temporary
        fixed
        clipped
        right
      >
        <v-list
          nav
          dense
        >
          <v-list-item to="/start"
          color="#13a210">
            <v-list-item-title class="h3">Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/favourite"
          color="#13a210">
            <v-list-item-title class="h3">Favourite</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-slide-x-transition mode="out-in">
        <router-view />
      </v-slide-x-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  computed: {
    showAppBar() {
      return this.$route.name !== 'Home';
    },
  },
};
</script>
<style>
#start{
  background-color: #DCAD5B;
}
.cream{
  background-color: #DCAD5B;
}
.linen{
  background-color: #F8EBD6 !important;
}
.laPalmaText{
  color: #16A310 !important;
}
.redRobinText{
  color: #813B1D !important;
}
.peanut{
  background-color: #732f13!important;
}
li:hover,
li.router-link-active,
li.router-link-exact-active {
   background-color: indianred;
   cursor: pointer;
 }
</style>
