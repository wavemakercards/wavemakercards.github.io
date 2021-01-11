<template>
 <v-main>
    <h1></h1>
    <pre style="overflow-y : scroll; max-height:500px;">{{$root.shadowDB}}</pre>
    <v-btn @click="exportToJson()">Download</v-btn>
    <a id="downloadAnchorElem" target="blank" >sdfasfasdfasdf</a>
 </v-main>
</template>

<script>
export default {
   methods: {
 exportToJson() {

let storageObj = this.$root.shadowDB

 var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(storageObj));
var dlAnchorElem = document.getElementById('downloadAnchorElem');
dlAnchorElem.setAttribute("href",dataStr);
dlAnchorElem.setAttribute("download", "scene.json");
dlAnchorElem.click();
  }
   }      
}
</script>