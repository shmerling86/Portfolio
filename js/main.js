console.log('Starting up');

$('#form').parsley();


$( "form" ).submit(function( event ) {
  // if(email.classList.contains("parsley-success")) {
  //   alert( "Thank you for your message" )
  // } else {
  //   alert( "Please fill up the required fields" );
  // }
  event.preventDefault();

});

if ($("form").hasClass("parsley-success")) {
  alert( "Thank you for your message" );
}

$(".js--wp-1").waypoint(function (direction) {
  
  $(".js--wp-1").addClass("animated bounceInLeft");
  
}, {
  offset: '50%'
});

$(".js--wp-2").waypoint(function (direction) {
  
  $(".js--wp-2").addClass("animated tada");
  
}, {
  offset: '50%'
});

// function scaleHeight() {
  
  //     var windowHeight = window.innerHeight;
  
  //     if (windowHeight) {
    
    //         $('.msh').css('minHeight' , windowHeight + 'px');
    //         // document.querySelectorAll(".msh").style.minHeight = windowrHeight + 'px';
    //     }
    
    // }
    // carousel();
    
    // function carousel() {
      // var myIndex = 0;
//     var i;
//     var x = document.getElementsByClassName("mySlides");
//     for (i = 0; i < x.length; i++) {
//        x[i].style.display = "none";  
//     }
//     myIndex++;
//     if (myIndex > x.length) {myIndex = 1}    
//     x[myIndex-1].style.display = "block";  
//     setTimeout(carousel, 2000); // Change image every 2 seconds
// }