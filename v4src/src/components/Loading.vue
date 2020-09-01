<template>
<div id="loader">

<div style="width:50px; margin:0 auto;">
<svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
<circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>
  <circle fill="#fff" stroke="#fff4" stroke-width="3" cx="8" cy="54" r="6" >
    <animateTransform
      attributeName="transform"
      dur="2s"
      type="rotate"
      from="0 50 48"
      to="360 50 52"
      repeatCount="indefinite" />
  </circle>
</svg>
</div>
 <p>Loading</p>
 </div>
</template>
<style scoped >
#loader{
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    color:#fefefe;
    background-color:  #424242;
    text-align: center;
    padding:20%;
    font-size:1rem;
}


</style>

