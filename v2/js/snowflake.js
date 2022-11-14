var cardLogo="<svg version='1.1' xmlns='http://www.w3.org/2000/svg' width='15' height='15' style='fill: #222;' viewBox='0 0 512 512'><path d='M512 160l-256-128-256 128 256 128 256-128zM256 74.485l171.029 85.515-171.029 85.515-171.029-85.515 171.029-85.515zM460.722 230.361l51.278 25.639-256 128-256-128 51.278-25.639 204.722 102.361zM460.722 326.361l51.278 25.639-256 128-256-128 51.278-25.639 204.722 102.361z'></path></svg>";

function setupSnowflake(){
    $("#app").load("html/snowflake.html", function() {
      $("#snowflakeMain").append(`<button type="button" id="addChapter" class="snowflakeAddButton"><i class="fa fa-plus"></i> Add Section</button>`)
            GoSnowflake();
        })
}

function GoSnowflake(){
//console.log("Snowflake loaded");
$("#snowflakeContainer").html("");

//$("#snowflakeMain").append("<div class='container h-100' id='snowflakeContainer'></div>")
$.each(WaveMaker.writer,function(k, v){

if(!WaveMaker.writer[k].bodytext){
  WaveMaker.writer[k].bodytext="";
}

  if(!WaveMaker.writer[k].subcard1){
    WaveMaker.writer[k].subcard1={title:"", bodytext:""};
  }
  if(!WaveMaker.writer[k].subcard2){
    WaveMaker.writer[k].subcard2={title:"", bodytext:""};
  }
  if(!WaveMaker.writer[k].subcard3){
      WaveMaker.writer[k].subcard3={title:"", bodytext:""};
  }
  showsubcards="";
  if(!WaveMaker.writer[k].showsubcards){
      showsubcards="style='display:none;'";
  }
  //console.log(WaveMaker)

  $("#snowflakeContainer").append(`
    <div class='row w-100 justify-content-center align-self-center'>

      <div class='col-md-6 align-self-center'>
        <div class='wmcard snowflakeCard' data-parent='`+k+`'>
<button type="button" class="smallButtons snowflakeTrigger"><i class="fa fa-snowflake-o"></i></button>
          <input class='wmcard-title snowflaketitle' placeholder='Card Title' value='`+v.title+`' />
          <textarea class='wmcard-text texteditor' placeholder='Write Here'>`+v.bodytext+`</textarea>
        </div>
      </div>



      <div class='col-xs-11 offset-1 col-md-6 offset-md-0 ' id='`+k+`_subflake' `+showsubcards+`>
          <div class='wmcard snowflakeCard'  data-parent='`+k+`' >
            <input class='subcard1-title snowflaketitle' placeholder='Sub Card Title' value='`+v.subcard1.title+`' />
            <textarea class='subcard1-text texteditor' placeholder='New Card Text'>`+v.subcard1.bodytext+`</textarea>
          </div>
          <div class='wmcard snowflakeCard'  data-parent='`+k+`'>
            <input class='subcard2-title snowflaketitle' placeholder='Sub Card Title' value='`+v.subcard2.title+`' />
            <textarea class='subcard2-text texteditor' placeholder='New Card Text'>`+v.subcard2.bodytext+`</textarea>
          </div>
          <div class='wmcard snowflakeCard'  data-parent='`+k+`'>
            <input class='subcard3-title snowflaketitle' placeholder='Sub Card Title' value='`+v.subcard3.title+`' />
            <textarea class='subcard3-text texteditor' placeholder='New Card Text'>`+v.subcard3.bodytext+`</textarea>
          </div>
            <div class='row d-flex justify-content-center'>
              <div class='col-12'>
                <button type="button" class="sideBtn replaceCard" data-parent='`+k+`'><i class="fa fa-code"></i> Replace the Original card</button>
              </div>
            </div>
            <hr>
        </div>

    </div>`
  )
})


// add Chapter button
$(".snowflakeAddButton").unbind().click(function() {
    addEditorSection();
    GoSnowflake();
})


autosize($('.texteditor'));


$(".snowflakeCard>.wmcard-title").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].title=$(this).val()
});

$(".snowflakeCard>.wmcard-text").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].bodytext=$(this).val()
});


$(".snowflakeCard>.subcard1-title").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].subcard1.title=$(this).val()
});
$(".snowflakeCard>.subcard1-text").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].subcard1.bodytext=$(this).val()
});
$(".snowflakeCard>.subcard2-title").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].subcard2.title=$(this).val()
});

$(".snowflakeCard>.subcard2-text").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].subcard2.bodytext=$(this).val()
});
$(".snowflakeCard>.subcard3-title").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].subcard3.title=$(this).val()
});
$(".snowflakeCard>.subcard3-text").on("keyup", function() {
    WaveMaker.writer[$(this).parent().data("parent")].subcard3.bodytext=$(this).val()
});


// add Chapter button
$(".replaceCard").unbind().click(function() {


  swal({
      title: 'Are you sure?',
      text: "The old card will be discarded and replaced with the new ones?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Replace It!'
  }).then((result) => {

      if (result.value) {
        parent=$(this).data("parent");
        newpos=WaveMaker.writer[parent].position;
        // need to shuffle all positions above it up by 2
        $.each(WaveMaker.writer, function(k,i){
          if(WaveMaker.writer[k].position>newpos){
          WaveMaker.writer[k].position=WaveMaker.writer[k].position+2
          }
        })
        timestamp = new Date().getTime() + "" + new Date().getUTCMilliseconds();

        WaveMaker.writer["C" + timestamp+"s2"] = {
            title: WaveMaker.writer[parent].subcard2.title,
            bodytext: WaveMaker.writer[parent].subcard2.bodytext,
            cards: {},
            active: 0,
            position: newpos+1
        }
        WaveMaker.writer["C" + timestamp+"s3"] = {
            title: WaveMaker.writer[parent].subcard3.title,
            bodytext: WaveMaker.writer[parent].subcard3.bodytext,
            cards: {},
            active: 0,
            position: newpos+2
        }
        //the first card is a stright replace - thei keeps any attached cards on the first one
        // so we do this LAST
                WaveMaker.writer[parent].title=WaveMaker.writer[parent].subcard1.title
                WaveMaker.writer[parent].bodytext = WaveMaker.writer[parent].subcard1.bodytext
        WaveMaker.writer[parent].subcard1={title:"", bodytext:""};
        WaveMaker.writer[parent].subcard2={title:"", bodytext:""};
        WaveMaker.writer[parent].subcard3={title:"", bodytext:""};
WaveMaker.writer[parent].showsubcards=false;



      // rewrite the array
      WaveMaker.writer=sortAndReturn(WaveMaker.writer)
    GoSnowflake();
          swal(
              'Card Replaced!',
              'That card has been removed.',
              'success'
          )
      }
  })


})







$(".snowflakeTrigger").click(function(){
parent=$(this).parent().data("parent");
//console.log(parent)
/* If subcards done exist create them*/
 $("#"+parent+"_subflake").slideToggle()
  WaveMaker.writer[parent].showsubcards=!WaveMaker.writer[parent].showsubcards;

})

}
