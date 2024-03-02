$( document ).ready(function() {
    $('form').submit(function(e){
      e.preventDefault();
        var message = $('.message_input').val();
        $('.message_input').val("");
          if(message !== "") {
             appendMessage('left',message);
              $.getJSON("https://chatbotgui.vercel.app/message="+message,function(clever){
                if(clever.error){
                  var error = "Sorry :( "+ data.error;
                    appendMessage('right',error);      
                }else{
                    appendMessage('right',clever.reply);
                }
              });
          }
      $('.messages').animate({scrollTop: $('.messages').get(0).scrollHeight}, 2000);
    });
  
  function appendMessage(message_side,message_text){
         $(".messages").append(
           '<li class="message '+message_side+' appeared">'+
              '<div class="avatar"></div>'+
                '<div class="text_wrapper">'+
                '<div class="text">'+message_text+'</div>'+
              '</div>'+
            '</li>'
          )
      }
});
