<template>
  <v-container id="homeWrapper" fluid fill-height>
    <v-container fluid>
        <Logo></Logo>
        <v-row align="center" justify="center">
          <v-btn class="white--text mx-auto" color="#16A310" large href="/start">
                Get Started
          </v-btn>
        </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Logo from '../components/Logo.vue';

export default {
  name: 'Home',
  components: {
    Logo,
  },
};
</script>

<style lang="scss" scoped>
</style>
