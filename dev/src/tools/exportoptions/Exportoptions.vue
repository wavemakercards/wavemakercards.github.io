<template>
  <v-main>
    <h1></h1>
    <pre style="overflow-y: scroll; max-height: 500px">{{
      $root.shadowDB
    }}</pre>
    <v-btn @click="ExportUpload">SyncUP</v-btn>

    <v-btn @click="ExportDownload">Download</v-btn>

    <v-file-input truncate-length="15"></v-file-input>
  </v-main>
</template>

<script>
export default {
  methods: {
    async ExportDownload() {
      console.log("Exporting");
      const exportData = await this.$root.export_db()
 
      this.downloadBlob(exportData, "mytest.json");
    },
    async ExportUpload() {
        console.log("Uploading");
            const exportData = await this.$root.export_db()
          console.log("uploading")

        fetch(`https://wavemaker.co.uk/api/upload.php`, {method:"POST", body:exportData})
            .then(response => {
                if (response.ok)
                {
                       alert("Synced Up successfully")
                         return response;
                }
                else {
                  throw Error(`Server returned ${response.status}: ${response.statusText}`)
                }
            })
            .then(response => console.log(response.text()))
            .catch(err => {
                console.log(err);
            });



    },
    downloadBlob(blob, name = "file.txt") {
      // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
      const blobUrl = URL.createObjectURL(blob);

      // Create a link element
      const link = document.createElement("a");

      // Set link's href to point to the Blob URL
      link.href = blobUrl;
      link.download = name;

      // Append link to the body
      document.body.appendChild(link);

      // Dispatch click event on the link
      // This is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        })
      );

      // Remove link from body
      document.body.removeChild(link);
    },
  },
};
</script>