var logo='<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg   xmlns:dc="http://purl.org/dc/elements/1.1/"   xmlns:cc="http://creativecommons.org/ns#"   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"   xmlns:svg="http://www.w3.org/2000/svg"   xmlns="http://www.w3.org/2000/svg"   id="svg6"   version="1.1"   style ="padding:10px; width:100%;";   viewBox="0 0 235 235">  <metadata     id="metadata12">    <rdf:RDF>      <cc:Work         rdf:about="">        <dc:format>image/svg+xml</dc:format>        <dc:type           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />        <dc:title></dc:title>      </cc:Work>    </rdf:RDF>  </metadata>  <defs     id="defs10" />  <path     id="path2"     d="M194.1 65.8L135.8 7.5c-10.1-10.1-26.5-10.1-36.6 0L41.1 65.7c-3.4 3.4-3.4 8.8 0 12.2l17.6 17.6 11.7 10.9c3.5 3.2 8.8 3.2 12.3 0l23.5-21.7c6.5-6 16.4-6 22.8 0l23.5 21.7c3.5 3.2 8.8 3.2 12.3 0l11.7-10.9L194.1 78c3.3-3.3 3.3-8.8 0-12.2z"     class="logo-top" />  <path     id="path4"     d="M7.9 135.5l91.3 91.3c10.1 10.1 26.5 10.1 36.6 0l91.3-91.3c15.8-15.8 4.7-20.5-6.9-31.5l-14.3-13.6c-3.4-3.3-8.8-3.2-12.3 0l-23.5 21.7c-6.5 6-16.4 6-22.8 0l-23.5-21.7a9.08 9.08 0 0 0-12.3 0L88 112.1c-6.5 6-16.4 6-22.8 0L41.7 90.4a9.08 9.08 0 0 0-12.3 0l-13.2 12.2c-12.1 11.2-24.8 16.3-8.3 32.9z"     class="logo-bottom" /></svg>';

function setupTimeline(){
  $("#app").load("html/timeline.html", function() {
$('.popover').popover('hide');
          GoTimeline();
      })
}

function GoTimeline(){

    if(!WaveMaker.timeline){
      WaveMaker.timeline={};
    }
     $('#timelineSortable').html("");
      $.each(WaveMaker.timeline, function(index, element) {
       $('#timelineSortable').append(NewTimeLineCard(element.cardtitle,element.cardtext,element.cardevent));
     });
     timeLineinit();
}


function timeLineinit(){
  $( "#timelineSortable" ).sortable(
   {
      start: function(event, ui) {
       // $(".ui-state-highlight").height($(this).height())
      },
     placeholder: "ui-state-highlight",
         stop : function(event, ui) {

         }
   }
  );
 $( "#timelineSortable" ).disableSelection();
 $('textarea').each(function() {
    setTextareaHeight(this);
  });

 $('.editable').on( 'change keyup keydown paste cut', function (event){
   ReSortTimelineByArray()
   // update the data array
   setTextareaHeight(this, event);
 });

$('#AddNewTimelineCard').unbind().click(function(){
  $("#timelineSortable").append(NewTimeLineCard("","",""));
   ReSortTimelineByArray()
  timeLineinit();
})


$(".handle").html(logo)
$(".handle").unbind().click(function(){
      mydata=NewTimeLineCard("","","")
      $(mydata).insertBefore($(this).parent());
       ReSortTimelineByArray()
      timeLineinit();
})

  $(".deleteevent").unbind().click(function(evt){
       evt.stopPropagation();
       swal({
           title: 'Are you sure?',
           text: "You won't be able to revert this!",
           type: 'warning',
           showCancelButton: true,
           confirmButtonColor: '#3085d6',
           cancelButtonColor: '#d33',
           confirmButtonText: 'Delete it!'
       }).then((result) => {
           if (result.value) {
             myTarget=$(this).parent().parent()
             myPosition =$("li").index(myTarget);
               WaveMaker.timeline.splice(myPosition,1);
            myTarget.remove() // physicallt remove the dom element

           // reset the array
            ReSortTimelineByArray();
               swal(
                   'Deleted!',
                   'Your Card has been deleted.',
                   'success'
               )
           }
       })
   })

}// end timeLineinit

function NewTimeLineCard(title,content, event){
    myhtml="<li class='animated fadeIn'><div class='timeline-badge handle' title='Click here to add a card above this one'>"+logo+"</div><div class='timeline-panel'><div class='deleteevent'><i class='fa fa-trash'></i></div><div class='timeline-heading'><div class='tm-card-title cheat'></div><textarea placeholder='Title' class='tm-card-title editable cardtitle'>"+title+"</textarea><div class='tm-card-sub cheat'></div><textarea placeholder='Date /Time' class='tm-card-sub editable cardevent'>"+event+"</textarea></div><div class='timeline-body'><div class='tm-card-body cheat'></div><textarea placeholder='Type Here' class='cardtext tm-card-body editable'>"+content+"</textarea></div></div></li>"
    return  myhtml;
}


function ReSortTimelineByArray(){
  var new_json=[];
   $("#timelineSortable").children().each(function(){
     new_json.push({"cardtitle":$(this).find(".cardtitle").val(),"cardevent":$(this).find(".cardevent").val(), "cardtext":$(this).find(".cardtext").val()})
   })
   WaveMaker.timeline=new_json;

}




function  setTextareaHeight(myThing, myEvent){

  $(myThing).prev().width($(myThing).width())
  $(myThing).prev().html(nl2br($(myThing).val()))

// ok add a 5% heigt
  fiveper=parseInt((100/$(myThing).prev().height())*10)
  $(myThing).height($(myThing).prev().height());
  $(myThing).prev().html('')
}
