$('head').append("<link rel='stylesheet' href='//dl.dropbox.com/s/oq6ylt0pueg63j8/settings.css' />"); 
$("#chatheader").append("<button id='settings' title='settings' class='btn-default fa fa-cog ch'></button>");
$("#chatheader").append("<button id='hidesettings' title='settings' class='btn-default fa fa-cog ch'></button>");
$("#userlist").after("<div id='chatsettings' class='csettings'></div>");
$("#ytapiplayer_html5_api").attr("airplay","allow");
$("#ytapiplayer_html5_api").attr("x-webkit-airplay","allow");
$("#ytapiplayer_html5_api").attr("poster","");
$("#ytapiplayer_html5_api").attr("autoplay","true");

$(document).ready(function(){
	$('#settings').on('click', function(){noset();});
	$('#hidesettings').on('click', function(){maxset();});
});

function noset(){
	$('#chatsettings').addClass('show');
	$('#settings').addClass('hidden');
	$('#hidesettings').addClass('show');
    $(this).slideDown("fast");
}

function maxset(){
	$('#chatsettings').removeClass('show');
        $('#hidesettings').removeClass('show');
	$('#settings').removeClass('hidden');
        $(this).slideDown("fast");
}




function updateClock(){
    var currentTime = new Date ();
    var currentHours = currentTime.getHours ( );
    var currentMinutes = currentTime.getMinutes ( );
    var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
    	currentTime.setDate(currentTime.getDate());    
    	currentMinutes = ( currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    	currentHours = ( currentHours > 12 ) ? currentHours - 12 : currentHours; 
    	currentHours = ( currentHours == 0 ) ? 12 : currentHours;
    	var currentTimeString = currentHours + ":" + currentMinutes;
    $(".time-cont").html(currentTimeString); 
    $('.date').html(currentTime.getDate() + ' ' + monthNames[currentTime.getMonth()]);
}
$.fn.togglePlaceholder = function(){
    return this.each(function() {
        $(this)
        .data("holder", $(this).attr("placeholder"))
        .focusin(function(){
            $(this).attr('placeholder','');
        })
        .focusout(function(){
            $(this).attr('placeholder',$(this).data('holder'));
        });
    });
};
$(document).ready(function(){
	setInterval('updateClock()', 200);
    $('.settings').click(function(){            	
        $('.leftside').addClass('flipl');
        $('.rightside').addClass('flipr');                
    });
    $('.return').click(function(){
        $('.leftside').removeClass('flipl');
        $('.rightside').removeClass('flipr');
    });
    $("[placeholder]").togglePlaceholder();           
});
//$('.timestamp').attr('id', 'timestamp');
$('.chat-avatar').attr('id', 'chatavatar');
$('.server-whisper').attr('id', 'servwhisper');
$('.vjs-polyzor-skin .vjs-control-bar').attr('id', 'vidcontrol');

$("#chatsettings").append("<ul id='settingstitle' class='settingstitle'>Channel Settings</ul>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='tstog' class='Toggle-checkbox'><label for='tstog' class='Toggle-label'>Hide Timestamps</label></div>");
//$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='whisptog' class='Toggle-checkbox'><label for='whisptog' class='Toggle-label'>Channel messages</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Avatog' class='Toggle-checkbox'><label for='Avatog' class='Toggle-label'>Chat Avatars</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Maintog' class='Toggle-checkbox'><label for='Maintog' class='Toggle-label'>Video</label></div>");
$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Motdtog' class='Toggle-checkbox'><label for='Motdtog' class='Toggle-label'>MOTD</label></div>");
//$("#chatsettings").append("<div class='Toggles'><input type='checkbox' id='Contog' class='Toggle-checkbox'><label for='Contog' class='Toggle-label'>Controls</label></div>");

$("#tstog").click(function() {
  $(".timestamp").toggleClass("show");
});
$("#whisptog").click(function() {
  $(servwhisper).toggleClass("hide");
});
$("#Avatog").click(function() {
  $(chatavatar).toggleClass("hide");
});
$("#Maintog").click(function() {
  $(main).toggleClass("hide");
});
$("#Motdtog").click(function() {
  $(motdwrap).toggleClass("hide");
});
$("#Contog").click(function() {
  $(vidcontrol).removeClass("hide");
  $(ytapiplayer).removeClass("video-js");
  $("#ytapiplayer_html5_api").attr("controls","true");
});

