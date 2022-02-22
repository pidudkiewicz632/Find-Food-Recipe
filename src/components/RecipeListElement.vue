<template>
    <v-card
        class="linen elevation-5 my-3">
        <v-img
        class="text-right"
        contain
        :src="information.image">
            <v-btn
             v-if="showClose"
            class="ma-2 laPalmaText"
            text
            icon
            @click.stop="favourite">
                <v-icon v-if="information.isInFavourite"
                x-large>
                    mdi-close
                </v-icon>
            </v-btn>
            <v-btn
            v-else
            class="ma-2 laPalmaText"
            text
            icon
            @click.stop="favourite">
                <v-icon v-if="information.isInFavourite"
                x-large>
                    mdi-cards-heart
                </v-icon>
                <v-icon v-else
                x-large>
                    mdi-heart-outline
                </v-icon>
            </v-btn>
        </v-img>
        <v-card-title>
            {{information.title}}
        </v-card-title>
        <v-card-text>
            <v-chip-group v-if="showUsedIngredients"
                class="accent-4 white--text"
                column>
                <v-chip class="white--text" v-for="item in information.usedIngredients"
                    :key="item.id"
                    color="green">
                    {{item.name}}
                </v-chip>
                <v-chip v-for="item in information.missedIngredients" :key="item.id"
                    class="white--text"
                    color="red">
                    {{item.name}}
                </v-chip>
            </v-chip-group>
            <v-chip-group v-else
                class="accent-4 white--text"
                column>
                <v-chip class="white--text" v-for="item in information.allIngredients"
                    :key="item.id"
                    color="blue">
                    {{item.name}}
                </v-chip>
            </v-chip-group>
        </v-card-text>
        <v-divider class="mx-2"></v-divider>
        <v-card-text>
            <v-row
            class="laPalmaText mb-2"
            align="center"
            justify="center">
                <v-icon class="mr-1 laPalmaText">
                    mdi-clock-time-two-outline
                </v-icon>
                <span class="mr-2">
                    {{information.readyInMinutes + 'min'}}
                </span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1 laPalmaText">
                    mdi-star
                </v-icon>
                <span>
                    {{information.healthScore}}
                </span>
                <span class="mr-1">·</span>
                <v-icon class="mr-1 laPalmaText">
                    mdi-fire
                </v-icon>
                <span>
                    {{information.nutrition.nutrients[0].amount.toFixed()}}
                </span>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
  name: 'RecpieListElement',
  props: {
    information: {
      type: Object,
      required: true,
    },
    showUsedIngredients: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    favourite() {
      if (this.information.isInFavourite) {
        this.$emit('deleteFromFavourite', this.information);
      } else {
        this.$emit('addToFavourite', this.information);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
