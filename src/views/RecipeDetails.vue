<template>
<div>
<v-container class="col-12 col-md-10 col-xl-6 col-lg-8" fluid fill-height>
  <v-toolbar color="#DCAD5B"
  elevation="0">
  <v-btn
      class="ma-2 laPalmaText"
      text
      icon
     @click="$router.back()">
      <v-icon x-large>
        mdi-arrow-left
      </v-icon>
  </v-btn>
  <v-spacer></v-spacer>
   <v-btn
      class="ma-2 laPalmaText"
      text
      icon
      @click="favourite">
      <v-icon v-if="isInFavourite"
        x-large>
        mdi-cards-heart
      </v-icon>
      <v-icon v-else
      x-large>
        mdi-heart-outline
      </v-icon>
    </v-btn>
  </v-toolbar>
  <v-row class="col-12" align="center" justify="center">
    <v-col cols="12">
      <v-row align="center" justify="center">
        <v-col cols="12" class="text-h4 text-center redRobinText">
          {{information.title}}
        </v-col>
        <v-icon class="mr-1 laPalmaText">
          mdi-clock-time-two-outline
        </v-icon>
        <span class="mr-2">
          {{information.readyInMinutes + 'min'}}
        </span>
        <span class="mr-1">·</span>
          <v-icon class="mr-1 laPalmaText">
            mdi-cards-heart
        </v-icon>
        <span>
          {{information.healthScore}}
        </span>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-img contain
            :src="information.image">
      </v-img>
    </v-col>
    <v-col>
      <v-row>
            <v-col cols="6">
              <v-subheader class="font-weight-bold">Diets</v-subheader>
              <v-chip-group
                class="accent-4 white--text" column>
                <v-chip class="white--text" v-for="item in information.diets"
                    :key="item.id"
                    color="green">
                    {{item}}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="6">
              <v-subheader class="font-weight-bold">Types</v-subheader>
              <v-chip-group
                class="accent-4 white--text" column>
                <v-chip class="white--text" v-for="item in information.dishTypes"
                    :key="item.id"
                    color="blue">
                    {{item}}
                </v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="12"
            sm="6">
              <v-row>
                <v-col cols="12">
                  <v-card color="#F8EBD6"
                  class="redRobinText">
                    <v-card-title>
                      Ingredients
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-simple-table class="linen">
                      <thead>
                        <tr>
                          <th class="text-left">
                            Name
                          </th>
                          <th class="text-left">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in information.extendedIngredients"
                          :key="item.id">
                          <td>{{ item.name }}</td>
                          <td>
                            {{ `${item.measures.metric.amount} ${item.measures.metric.unitShort}` }}
                          </td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-card>
                </v-col>
                <v-col cols="12">
                  <v-card color="#F8EBD6"
                  class="redRobinText">
                    <v-card-title>
                      Instruction
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-list v-if="information.analyzedInstructions"
                    dense
                    color="#F8EBD6">
                      <v-list-item v-for="item in information.analyzedInstructions"
                          :key="item.id">
                        <v-list-item-content>
                          <v-list-item-title v-if="item.name">{{item.name}}</v-list-item-title>
                          <v-list-item
                          v-for="item in item.steps"
                          :key="item.number">
                            <v-list-item-content>
                              {{item.number + '. ' + item.step}}
                            </v-list-item-content>
                        </v-list-item>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                    <v-card-text v-if="!information.analyzedInstructions">
                      No Instructions
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12"
              sm="6">
              <v-card color="#F8EBD6"
              class="redRobinText">
                <v-card-title>
                  Nutrients
                </v-card-title>
                <v-divider></v-divider>
                <v-simple-table class="linen">
                  <thead>
                    <tr>
                      <th class="text-left">
                        Name
                      </th>
                      <th class="text-left">
                        Amount
                      </th>
                      <th class="text-left">
                        NRV(%)
                      </th>
                    </tr>
                  </thead>
                  <tbody v-if="information.nutrition">
                    <tr
                      v-for="item in information.nutrition.nutrients"
                      :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>{{ item.amount + item.unit }}</td>
                      <td>{{ item.percentOfDailyNeeds }}</td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
    </v-col>
  </v-row>
</v-container>
</div>
</template>

<script>
export default {
  name: 'RecipeDetails',
  data() {
    return {
      information: {},
      informationToFavourite: null,
      extendedIngredients: [],
      isInFavourite: false,
    };
  },

  beforeCreate() {
    this.axios.get(`/recipes/${this.$route.params.id}/information?includeNutrition=true`).then((res) => {
      this.information = res.data;
      this.extendedIngredients = this.information.extendedIngredients.map((item) => `${item.name} - ${item.measures.metric.amount} ${item.measures.metric.unitShort}`);
      this.isInFavourite = !!this.$store.state.favouriteRecipes
      // eslint-disable-next-line eqeqeq
        .find((item) => item.id == this.information.id);
    })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    favourite() {
      if (this.isInFavourite) {
        this.isInFavourite = false;
        this.$store.dispatch('deleteRecipeFromFavourite', this.information);
      } else if (!this.informationToFavourite) {
        const params = {
          titleMatch: this.information.title,
          fillIngredients: true,
          addRecipeInformation: true,
          addRecipeNutrition: true,
        };
        console.log(params);
        this.axios.get('/recipes/complexSearch', {
          params,
        }).then((res) => {
          console.log(res.data.results);
          this.informationToFavourite = res.data.results
            // eslint-disable-next-line eqeqeq
            .find((item) => this.$route.params.id == item.id);
          this.addToFavourite();
        })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.addToFavourite();
      }
    },
    addToFavourite() {
      this.informationToFavourite.isInFavourite = true;
      this.isInFavourite = true;
      this.$store.dispatch('addRecipeToFavourite', this.informationToFavourite);
    },
  },
};
</script>

<style>

</style>
