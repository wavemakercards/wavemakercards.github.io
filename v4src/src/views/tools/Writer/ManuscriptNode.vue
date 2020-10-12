<template>
<span>
    <span v-if="title">{{title}}</span>
    <span v-if="!title"><em style="opacity:50%">untitled ....... </em></span>
</span>
</template>
<script>
export default {
    data(){
        return{
            title : null
        }
    },
  props: {
       el: {
      required: true,
      type: Object
    }
  },
  beforeMount(){
      if(this.el.icon==="folder"){
          this.title =this.el.title
      }
  }
}
</script>