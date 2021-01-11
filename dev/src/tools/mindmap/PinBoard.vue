<template>
  <div id="PinBoard" ref="PinBoard" @mousemove="moveCursor">
    <div v-for="(item, index) in $root.shadowDB.Mindmap[this.$route.params.id].content.links" :key="index" class="lineDraw" :style="lineStyle(index)"></div>
    <div v-for="(item, index) in $root.shadowDB.Mindmap[this.$route.params.id].content.items" :key="index">
      <div
        :class="['box', {'dragged': dragged}]"
        tabindex="0"
        :style="itemStyle(item)"
        @focus="onSetItem($event, item)"
        @focusout="setitem=null"
        @keydown="KeyMove"
        @mouseenter="checkLink($event,item)"
        @mouseleave="clearLink($event)"
        @click="checkLink($event,item)"
        @touchstart="checkLink($event,item)"
        :id="index"
      >
        <div
          class="handle"
          v-dragged="onDragged"
          @mousedown="onSetItem($event, item)"
          @touchstart="onSetItem($event, item)"
        >
          <i class="material-icons">drag_indicator</i>
        </div>

        <div
          class="linker"
          @mousedown="onSetLinkStart($event, item)"
          @touchstart="onSetLinkStart($event, item)"
        >
          <i class="material-icons">insert_link</i>
        </div>

        <div v-if="item.type === 'note'">
          <textarea-autosize
            class="textarea"
            placeholder="Type something here..."
            v-model="BoardData[item.uuid].content"
            :change="updateItem(item)"
            :focus="()=>{this.setitem=null}"
          />
        </div>
        <div v-if="item.type === 'image'">
          <img v-if="item.content !== ''" :src="item.content">
          
          <svg
            v-if="item.content === ''"
            version="1.1"
            id="preview-placeholder"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="100%"
            viewBox="0 0 30 30"
            enable-background="new 0 0 30 30"
            xml:space="preserve"
          >
            <rect fill="#575655" width="30" height="30"></rect>
            <polygon fill="#FFFFFF" points="9,19 12,16 13,17 16,14 21,19 "></polygon>
            <circle fill="#FFFFFF" cx="12" cy="13" r="1"></circle>
            <path fill="#FFFFFF" d="M7,9v12h16V9H7z M22,20H8V10h14V20z"></path>
          </svg>
          
          <input type="file" class="ImageUpload" name="ImageUpload" @change="GoImage($event, item)">
        </div>
      </div>
    </div>
    <div id="coupontooltip" v-show="linking">
      <i class="material-icons">timeline</i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragged: false,
      setitem: false,
      setLinkStart: false,
      linking: false,
      canvas : null
    };
  },
  methods: {
    moveCursor(e) {
      var tooltip = document.getElementById("coupontooltip");
      var pinboard = document.getElementById("PinBoard");
      tooltip.style.left = e.pageX + pinboard.scrollLeft + 10 + "px";
      tooltip.style.top = e.pageY + pinboard.scrollTop + 10 + "px";
    },
    lineStyle(key) {
      var off1 = {
  

        top: parseInt(this.$root.shadowDB.Mindmap[this.$route.params.id].content.items[this.$root.shadowDB.Mindmap[this.$route.params.id].content.links[key].start].top, 10),
        left: parseInt(this.$root.shadowDB.Mindmap[this.$route.params.id].content.items[this.$root.shadowDB.Mindmap[this.$route.params.id].content.links[key].start].left, 10),
        width: 600,
        height: 25
      };
      var off2 = {
        top: parseInt(this.$root.shadowDB.Mindmap[this.$route.params.id].content.items[this.$root.shadowDB.Mindmap[this.$route.params.id].content.links[key].end].top, 10),
        left: parseInt(this.$root.shadowDB.Mindmap[this.$route.params.id].content.items[this.$root.shadowDB.Mindmap[this.$route.params.id].content.links[key].end].left, 10),
        width: 600,
        height: 25
      };

      // center of first point
      var dx1 = off1.left + off1.width / 2;
      var dy1 = off1.top + off1.height / 2;
      // center of second point
      var dx2 = off2.left + off2.width / 2;
      var dy2 = off2.top + off2.height / 2;
      // distance
      var length = Math.sqrt(
        (dx2 - dx1) * (dx2 - dx1) + (dy2 - dy1) * (dy2 - dy1)
      );
      // center
      var cx = (dx1 + dx2) / 2 - length / 2;
      var cy = (dy1 + dy2) / 2 - 2 / 2;
      // angle
      var angle = Math.atan2(dy1 - dy2, dx1 - dx2) * (180 / Math.PI);
      // draw line

      var o = {
        top: cy + "px",
        left: cx + "px",
        width: length + "px",

        transform: "rotate(" + angle + "deg)"
      };

      return o;
    },
    GoImage: function(e, item) {
      //var parentDiv = e.srcElement.parent;
      // hides the button so we get a neat swap
      // $(".wm-image-upload-form").hide()
      var fileReader = new FileReader();
      var filterType = /^(?:image\/bmp|image\/cis-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x-cmu-raster|image\/x-cmx|image\/x-icon|image\/x-portable-anymap|image\/x-portable-bitmap|image\/x-portable-graymap|image\/x-portable-pixmap|image\/x-rgb|image\/x-xbitmap|image\/x-xpixmap|image\/x-xwindowdump)$/i;

      fileReader.onload = (event) => {
        let image = new Image();

        image.onload = () => {
          // document.getElementById("original-Img").src=image.src;
          this.canvas = document.createElement("canvas");
          let context = this.canvas.getContext("2d");
          // set a width and calculate the ratio for the height
          var endWidth = "300";
          var endHeight = image.height / (image.width / endWidth);

          this.canvas.width = endWidth;
          this.canvas.height = endHeight;
          context.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            this.canvas.width,
            this.canvas.height
          );
          // create  preview image and attach to parent
          item.content = this.canvas.toDataURL();
          // this.setitem.content= this.canvas.toDataURL();
          // document.getElementById("base64").value = this.canvas.toDataURL();
          /*    idarray=parentDiv.attr("id").split("_");
      
        wavemaker.wiki[idarray[1]].wiki_components[idarray[3]].content=canvas.toDataURL();*/
        };
        image.src = event.target.result;
      };

      var uploadImage = e.srcElement;
      //check and retuns the length of uploded file.
      if (uploadImage.files.length === 0) {
        return;
      }
      //Is Used for validate a valid file.
      var uploadFile = uploadImage.files[0];
      if (!filterType.test(uploadFile.type)) {
        alert("Please select a valid image.");
        return;
      }
      fileReader.readAsDataURL(uploadFile);
      // clear the this.canvas
      this.canvas = null;
    },
    itemStyle: function(item) {
      let style = "left : " + item.left + ";top : " + item.top + ";";
      return style;
    },
    onSetItem(e, item) {
      e.preventDefault();
      this.setitem = item;
    },
    onSetLinkStart(e, item) {
      if (!this.setLinkStart && this.setLinkStart !== item.uuid) {
        this.setLinkStart = item.uuid;
        this.linking = true;
      } else {
        this.$store.commit("AddLink", {
          start: this.setLinkStart,
          end: item.uuid
        });
        this.setLinkStart = null;
        this.linking = false;
      }
    },
    checkLink(e, item) {
      e.srcElement.classList.remove("linkposs");
      if (this.setLinkStart) {
        if (item.uuid !== this.setLinkStart) {
          document.getElementById(item.uuid).classList.add("linkposs");
        }
      }
    },
    clearLink(e) {
      e.srcElement.classList.remove("linkposs");
    },
    updateItem(item) {
      this.$store.commit("UpdateBoardItem", item);
    },
    KeyMove: function(e) {
      if (this.setitem) {
        var lefty = null;
        var toppy = null;
        switch (e.code) {
          case "ArrowRight":
            lefty = 10;
            break;
          case "ArrowLeft":
            // code block
            lefty = -10;
            break;
          case "ArrowDown":
            // code block
            toppy = 10;
            break;
          case "ArrowUp":
            // code block
            toppy = -10;
            break;
          default:
          // code block
        }

        if (lefty || toppy) {
          var el = e.srcElement;
          // code block
          var l = +window.getComputedStyle(el)["left"].slice(0, -2) || 0;
          var t = +window.getComputedStyle(el)["top"].slice(0, -2) || 0;

          var newleft = l + lefty;
          var newtop = t + toppy;

          if (newleft < 0) {
            newleft = 0;
          }
          if (newtop < 0) {
            newtop = 0;
          }
          el.style.left = newleft + "px";
          el.style.top = newtop + "px";
          this.setitem.left = newleft + "px";
          this.setitem.top = newtop + "px";
        }
      }
    },
    onDragged({
      el,
      deltaX,
      deltaY,
      offsetX,
      offsetY,
      clientX,
      clientY,
      first,
      last
    }) {

        let q= offsetX+offsetY+clientX+clientY
        if(q===0){
            console.log("eslint skippy thing")
        }
      if (first) {
        this.dragged = true;
        return;
      }
      if (last) {
        this.dragged = false;
        this.updateItem(this.setitem);
        return;
      }
      var l =
        +window.getComputedStyle(el.parentElement)["left"].slice(0, -2) || 0;
      var t =
        +window.getComputedStyle(el.parentElement)["top"].slice(0, -2) || 0;

      var lefty = l + deltaX;
      var toppy = t + deltaY;

      if (lefty < 0) {
        lefty = 0;
      }
      if (toppy < 0) {
        toppy = 0;
      }
      el.parentElement.style.left = lefty + "px";
      el.parentElement.style.top = toppy + "px";
      this.setitem.left = lefty + "px";
      this.setitem.top = toppy + "px";
      el.parentElement.focus();
    }
  }
};
</script>

<style >
#coupontooltip {
  position: absolute;
  background-color: #f00;
  color: #fff;
  padding: 10px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  z-index: 9999999;
}

* {
  box-sizing: border-box;
}
body,
html {
  height: 100%;
}
body {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVQYV2NMqL7ty4ADMIIkF7SqbsYmP+gkAbAbGgsk/ddhAAAAAElFTkSuQmCC);
}
.linkposs > .linker {
  color: #f00;
}
#PinBoard {
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  padding: 50px;

  overflow: scroll;
}
.ImageUpload {
  width: 300px;
}
.textarea {
  border: 0px;
  color: #424242;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1rem;
  margin: 0px;
  display: block;
  padding: 10px;
  width: 100%;
}
.textarea:focus {
  background-color: #fafafa;
  color: #212121;
}
#app {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
}
.box {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  position: absolute;
  width: 320px;
  box-sizing: border-box;
  padding: 10px;
  padding-top: 40px;
  background: white;
  display: inline-block;
  user-select: none;
  text-align: left;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  line-height: 1.8;
  color: #272727;
  border-radius: 4px;
  z-index: 100;
  border: 2px solid #ccc;
}
.box:active {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  z-index: 101;
}
.handle {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: left;
  padding-top: 7px;
  color: #ccc;
}
.handle:active,
.handle:hover {
  color: #646464;
  cursor: move;
}

.linker {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding-top: 7px;
  color: #ccc;
}
.linker:active,
.linker:hover {
  color: #646464;
}

.lineDraw {
  position: absolute;
  background-color: #ff000033;
  height: 2px;
}

.textarea {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
}
</style>