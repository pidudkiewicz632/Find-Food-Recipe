<template>
  <v-dialog
      v-model="dialog"
      max-width="290"
      @input="close(false)"
    >
      <v-card>
        <v-card-title>Confirm</v-card-title>
        <v-card-text>
          {{message}}
        </v-card-text>
        <v-card-text>
          <v-checkbox
            v-model="showAgain"
            dense
            label="Don't show it again">
            </v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
            <v-btn
            color="green darken-1"
            text
            @click="close(true)">
            Yes
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="close(false)"
          >
            No
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'Confirm',
  data() {
    return {
      dialog: false,
      message: '',
      resolve: null,
      reject: null,
      showAgain: false,
    };
  },
  methods: {
    open(message) {
      this.dialog = true;
      this.message = message;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    close(accepted) {
      this.resolve(accepted);

      if (accepted && this.showAgain) {
        this.$store.dispatch('updateConfirm', false);
        console.log(this.$store.state.showConfirm);
      }

      this.dialog = false;
    },
  },
};
</script>

<style>

</style>
