<template>
  <v-main>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <div id="content">
          <img src="@/assets/wavemaker.svg" width="50" style="display:block; margin:0 auto" />
          <h1>wavemaker cards</h1>
          <p>On loading the system up this needs to do some stuff</p>
          <ol>
            <li>Look if the localdb is set up</li>
            <li>Pop up a reminded to sync if there is a live project</li>
            <li>Show live project info and ask if they want to load/create new</li>
            <li>This page requires NO navigation</li>
          </ol>
          <a href="/#/writer">writer</a><p></p>
          <a href="/#/project">project</a>
        </div>
      </v-row>
    </v-container>
  </v-main>
</template>

<style scoped>
#content h1 {
  text-align: center;
}
</style>