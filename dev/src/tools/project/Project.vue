<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-card class="mt-4 mx-auto">
            <v-card-title>Daily Word Count</v-card-title>
            <v-sheet class="v-sheet--offset mx-auto" elevation="0">
              <v-sparkline
                :labels="labels"
                :value="value"
                :smooth="16"
                line-width="1"
                padding="16"
              ></v-sparkline>
            </v-sheet>
            <v-card-text class="pt-0">
              <div class="title font-weight-light mb-2">User Registrations</div>
              <div class="subheading font-weight-light grey--text">
                Last Campaign Performance
              </div>
              <v-divider class="my-2"></v-divider>
              <v-icon class="mr-2" small> mdi-clock </v-icon>
              <span class="caption grey--text font-weight-light"
                >last registration 26 minutes ago</span
              >
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
<script>
export default {
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
  }),
};
</script>

