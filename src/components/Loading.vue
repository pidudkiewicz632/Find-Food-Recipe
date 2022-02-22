<template>
      <v-dialog v-model="showProgress" persistent fullscreen content-class="loading-dialog">
        <v-container fill-height>
          <v-row align="center" justify="center">
            <v-progress-circular indeterminate :size="70" :width="7"
            color="#16A310"></v-progress-circular>
          </v-row>
        </v-container>
      </v-dialog>
</template>
<script>
export default {
  name: 'Loading',
  props: {
    showProgress: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.loading-dialog {
   box-shadow: none !important;
}
</style>
