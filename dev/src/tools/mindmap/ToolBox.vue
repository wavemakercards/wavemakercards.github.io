<template>
  <div id="ToolBox">
    <div class="toolset">
      <button class="tools" @click="AddBoardNote">
        <i class="material-icons">subject</i>
      </button>
      <button @click="AddBoardImage" class="tools">
        <i class="material-icons">photo</i>
      </button>
      <button class="tools" @click="GetScreenShot">
        <i class="material-icons">camera</i>
      </button>
      <button class="tools" @click="ZoomIn">
        <i class="material-icons">zoom_in</i>
      </button>
      <button class="tools" @click="ZoomOut">
        <i class="material-icons">zoom_out</i>
      </button>
      
      <button class="tools" @click="ClearAllData">
        <i class="material-icons">delete_sweep</i>
      </button>
    </div>
    <img :src="output" style="position:absolute; top:0px; left:0px; width:200px;">
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggleMenu: false,
      output: null,
      zoom: 100
    };
  },
  methods: {
    ZoomIn() {
      this.zoom = this.zoom + 10;
      const el = document.getElementById("PinBoard");
      el.setAttribute("style", "zoom: " + this.zoom + "%");
    },
    ZoomOut() {
      if (this.zoom !== 10) {
        this.zoom = this.zoom - 10;
        const el = document.getElementById("PinBoard");
        el.setAttribute("style", "zoom: " + this.zoom + "%");
      }
    },
    AddBoardNote: function() {
      var scrollLeft =
        window.pageXOffset !== undefined
          ? window.pageXOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollLeft;
      var scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;

      this.$store.commit("AddBoardItem", {
        type: "note",
        content: "",
        left: scrollLeft + 50 + "px",
        top: scrollTop + 50 + "px"
      });
    },
    AddBoardImage: function() {
      var scrollLeft =
        window.pageXOffset !== undefined
          ? window.pageXOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollLeft;
      var scrollTop =
        window.pageYOffset !== undefined
          ? window.pageYOffset
          : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop;

      this.$store.commit("AddBoardItem", {
        type: "image",
        content: "",
        left: scrollLeft + 50 + "px",
        top: scrollTop + 50 + "px"
      });
    },
    ClearAllData: function() {
      this.$store.commit("ClearAllData");
    },
    async GetScreenShot() {
      console.log(this);
      const el = document.getElementById("PinBoard");
      // add option type to get the image version
      // if not provided the promise will return
      // the canvas.
      const options = {
        type: "dataURL"
      };
      this.output = await this.$html2canvas(el, options);
    }
  }
};
</script>
<style scoped>
#ToolBox {
  position: fixed;
  top: 0px;
  width: 100%;
  height: 50px;
  left: 0px;
  background: transparent;
  color: #fff;
  transition: all 0.5s ease;
}
.toolset {
  float: right;
}

.tools {
  display: inline-block;
  width: 50px;
  height: 50px;
  line-height: 60px;
  border-radius: 25px;
  text-align: center;
  background-color: #212121;
  color: #fff;
  border: 0px;
  cursor: pointer;
}
</style>

