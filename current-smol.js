//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'http://cdn.discordapp.com/attachments/420183063562027008/518525268038778892/banner_new_12-1-2018.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit#gid=1605247657";
var background_img = 'http://cdn.discordapp.com/attachments/466386319766192138/530100597794406440/1546428622652.png';
var autostart_msg = "start!";
var countdown_utc = {
	year: 2019,
	month: 1,
	day: 6,
	hour: 20,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2019,
	month2: 1,
	day2: 19,
	hour2: 0,
	minute2: 0,
	second2: 0
};
var background_img_auto1 = 'http://cdn.discordapp.com/attachments/466386319766192138/518880481312374796/denpa_bg_v2.jpg';
var background_img_auto2 = 'http://cdn.discordapp.com/attachments/485983742004035594/520748085836775454/hxh_ca_background.jpg';
var chatMute = 'false';
var background_img_auto3 = 'http://getreelcinemas.com//wp-content/uploads/2015/02/Background-Narrow.jpg';
var noiseActive = 'true';
var background_img_auto4 = 'http://cdn.discordapp.com/attachments/466386319766192138/518440179246170142/misaka_cytube_pape_maybe.jpg';
var countdown_utc3 = {
	year3: 2019,
	month3: 1,
	day3: 5,
	hour3: 16,
	minute3: 0,
	second3: 0
};
var penguinImg = '//media.discordapp.net/attachments/515347492511023113/525863422840274944/DSciEJcVAAAe6rY.jpg';
var penguinUrl = '//cdn.discordapp.com/attachments/485983742004035594/525845582934310922/Intermission.mp3';
var penguinBg = '//media.discordapp.net/attachments/515347492511023113/525860289267236875/16719bfccf9c3f27d77bf05379d19388.png';
var updateCmd = 'false';
var discoGif = '//media.discordapp.net/attachments/515347492511023113/525860799210848268/1446148934-Young_animation_holiday102815_03.gif';
var imgBubble = '//media.discordapp.net/attachments/515347492511023113/526188455751843851/71e.gif';
var imgBubble2 = '//media.discordapp.net/attachments/409829343263719427/530168303721644034/jc2a1u2dqkh11.jpg';
var chatImg = 'false';
var img1show = 'false';
var img1fixedshow = 'false';
var chatLimit = 'false';
var chatDelay = '1';
var chatImgOp = '.8';
//-----------------------------------------------------------------------------------------------------------------------------------
//ControlBlockEnd
console.log = function() {}
var event1Volume = .8;
var cheerio = "https://media.discordapp.net/attachments/452943717708595211/521439055041527819/Togame-Cheerio-Katanagatari-600x375_large-400x250.jpg";
var emoteTable = "false";
var event1timeout;
var penguinTimeout = 19000;
var grossimg = '//media.discordapp.net/attachments/409829343263719427/511685643580080137/1381184072836.jpg';
var grossUrl = "https://cdn.discordapp.com/attachments/409829343263719427/511700767787450368/maji7.mp3";
var voteskipImg = 'https://cdn.discordapp.com/attachments/409829343263719427/511380810637770752/Ban_circle_font_awesome-red.svg.png';
var voteskipFinalImg = 'https://media.discordapp.net/attachments/409829343263719427/513465042797068341/1-2-fail-stamp-picture-thumb.png';
var voteskipFinalUrl = 'https://cdn.discordapp.com/attachments/409829343263719427/513476476289548318/Judges_Gavel-SoundBible.com-1321455227.wav';
const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;
var emoteArray = [];
var selectedPopover;
var handlerKeydown;
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.day, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);
var date_utc2 = Date.UTC(countdown_utc2.year2, countdown_utc2.month2 - 1, countdown_utc2.day2, countdown_utc2.hour2, countdown_utc2.minute2, countdown_utc2.second2);
var date_utc3 = Date.UTC(countdown_utc3.year3, countdown_utc3.month3 - 1, countdown_utc3.day3, countdown_utc3.hour3, countdown_utc3.minute3, countdown_utc3.second3);
var chatlineElem;
var queueList;
var emoteList;
var countDown;
var countDownTimer1;
var countDown2;
var countDownTimer2;
var countDown3;
var countDownTimer3;
var collapseArrow;
var emotePreload = "false";
var autoPosition = -1;
var voteskipMsg = "==BZZZZT!==";
var voteskipMsgFinal = "---BZZZZT!---";
var countdown1, countdown2;
var rankMod = (window.CLIENT.rank >= 2),
	rankAdmin = (window.CLIENT.rank >= 3);
var motdMode = $(document.getElementById('motd-mode'));
var jsTextField = $(document.getElementById('cs-jstext'));
var bodyElem = document.body;
var coinHead = "cointossHEADcointoss";
var coinTail = "cointossTAILcointoss";

function countdowner(countdown, destination,index) {
	if ($('#countdown'+index+':hidden').length > 0) {
		$('#countdown'+index).show();
	}
	let now = new Date().getTime(),
		distance = destination - now;
	document.getElementById('days'+index).innerText = Math.floor(distance / (day)),
		document.getElementById('hours'+index).innerText = Math.floor((distance % (day)) / (hour)),
		document.getElementById('minutes'+index).innerText = Math.floor((distance % (hour)) / (minute)),
		document.getElementById('seconds'+index).innerText = Math.floor((distance % (minute)) / second);

	let totalSeconds = Math.floor(distance / second);

	if (totalSeconds < 86400 && !countdown.classList.contains('countdownbaseActive')) {
		$(countdown).removeClass('countdownbase');
		$(countdown).addClass('countdownbaseActive');
	}

	if (totalSeconds > 86400 && countdown.classList.contains('countdownbaseActive')) {
		$(countdown).removeClass('countdownbaseActive');
		$(countdown).addClass('countdownbase');
	}

	if (distance < 0) {
		clearInterval(eval("countDownTimer" + index));
		$('#countdown' + index).hide();
	}

}

/*!
 **|   XaeMae Sequenced Module Loader
 **|   
 **@preserve
 */
// -- Channel Namespace --
if (!this[CHANNEL.name])
	this[CHANNEL.name] = {};
// -- The Module Library
window[CHANNEL.name].sequenceList = {
	'event-ext': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/16a8414afe854840adcf99bacb80d4609fbc9bf5/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/6588174bcd25baea8bbf487c9597bc592803b683/module/channelbase-mod.js",
		callback: true
	},
	'settings': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/settings.js",
		callback: true
	},
	'overlay': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/overlay.js",
		callback: true
	},
	'channels': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/channels.js",
		callback: true
	},
	'xaekai': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/16a8414afe854840adcf99bacb80d4609fbc9bf5/module/XaeKaiModules.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/2af18e0d36c8aeaf2ec97c79600ecc0f57cab5fb/module/enhancer-mod.js",
		callback: true
	}
};

window[CHANNEL.name].sequencePrev = window[CHANNEL.name].sequencePrev || "";
window[CHANNEL.name].sequenceState = window[CHANNEL.name].sequenceState || 0;
window[CHANNEL.name].sequenceIndex = Object.keys(window[CHANNEL.name].sequenceList);
window[CHANNEL.name].sequencerLoader = function() {
	// After first run we curry the previous modules callback
	// This is mainly used to reassign variables in modules/scripts that don't use module options
	if (window[CHANNEL.name].sequencePrev) {
		setTimeout(window[CHANNEL.name].sequenceList[window[CHANNEL.name].sequencePrev].callback, 0)
		window[CHANNEL.name].sequencePrev = "";
	}

	if (window[CHANNEL.name].sequenceState >= window[CHANNEL.name].sequenceIndex.length) {
		return (function() {
			if (!document.getElementById('export-btn')) {
				$(document.getElementById('cs-chanlog')).append(" <a class='export' id='export-btn' href='#' download='chat.txt'><button class='btn btn-default'>Export</button></a>");
				bindEventHandler();
				$(document.body).on('click', '.imgContainer', function() {
					if ($(this).find('img').css('filter') != 'blur(0px)') {
						$(this).find('img').css('filter', 'blur(0px)');
						$(this).removeClass('imgContainer');
						$(this).attr('title', '');
						var elem = $(this).find('a');
						setTimeout(function() {
							elem.attr('href', elem.find('img').attr('src'));
						}, 1000)
					}
				});
			}

			waitForEl('#messagebuffer', function() {
				var buff = $('#messagebuffer');
				window[CHANNEL.name].chatNotice.handler["deleteMessage"]();
				window[CHANNEL.name].chatNotice.handler["deleteButton"]();
				buff.find(".gross:not( .parsed )").addClass('parsed');
				/*buff.find(".survival:not( .parsed )").addClass('parsed');*/
				buff.find(".final:not( .parsed )").addClass('parsed');
				window[CHANNEL.name].audioNotice.handler["SurvivalStrategy"]();
				window[CHANNEL.name].audioNotice.handler["stopEvent"]();
				buff.find(".nick-highlight:not( .parsed )").addClass('parsed');
				buff.find(".img1show:not( .parsed )").addClass('parsed');
				buff.find(".img1hide:not( .parsed )").addClass('parsed');
				buff.find(".fixedimg1show:not( .parsed )").addClass('parsed');
				buff.find(".fixedimg1hide:not( .parsed )").addClass('parsed');
				if (chatImg != 'false') {
					buff.css('background-image', "linear-gradient( rgba(0, 0, 0, "+chatImgOp+"), rgba(0, 0, 0, "+chatImgOp+") ), url('"+chatImg+"')");
				} else {
					buff.css('background-image', '');
				}
			});

			waitForEl('#club_redirect', function() {
				$('#club_redirect').attr('href', href_url);
				collapseArrow = $(document.getElementById('collapseArrow'));
			});
			waitForEl('#club_banner', function() {
				$('#club_banner').attr('src', banner_url);
			});

			waitForEl('#disco', function() {
				let elem = $('#disco');
				elem.find('img').attr("src", discoGif);
			});

			waitForEl('#imgBubble', function() {
				let elem = $('#imgBubble');
				elem.attr("src", imgBubble);
				if (img1show == "true") {
					$('#imgWrap1').show();
				} else {
					$('#imgWrap1').hide();
				}
			});

			waitForEl('#imgBubble2', function() {
				let elem = $('#imgBubble2');
				elem.attr("src", imgBubble2);
				if (img1fixedshow == "true") {
					$('#imgWrapFixed1').show();
				} else {
					$('#imgWrapFixed1').hide();
				}
			});

			waitForEl('#chatline', function() {
				chatlineElem = $(document.getElementById('chatline'))
				populateEmote();
				chatlineElem.off('keydown');
				chatlineElem.on('keydown', function(e) {
					chatHandler(e);
				});
			});

			waitForEl('#AudioNoticeEvent1', function() {
				window[CHANNEL.name].audioNotice["survivalStrategy"].audio = $("<audio>").prop("id", "AudioNoticeEvent1").appendTo("body").attr("preload", "auto").prop("volume", window[CHANNEL.name].audioNotice["survivalStrategy"].volume).append($("<source>").attr("src", penguinUrl).attr("type", "audio/ogg"));
			});

			waitForEl('span#plcount', function() {
				queueList = $(document.getElementById('queue'));
				videoDisplayToggle();
				autoStartHandler();
			});

			waitForEl('#motd-mode', function() {
				motdMode = $(document.getElementById('motd-mode'));
			});

			waitForEl('#backg', function() {
				if ($(document.getElementById('backg')).css('background-image') != "url(\"https:" + penguinBg + "\")") {
					$(document.getElementById('backg')).css('background-image', "url(" + background_img + ")");
				}
			});

			waitForEl('#countdown1', function() {
				countdown1 = document.getElementById('countdown1');
				$(document.getElementById('date1')).html(new Date(date_utc).toString());
				countdown2 = document.getElementById('countdown2');
				$(document.getElementById('date2')).html(new Date(date_utc2).toString());
				countdown3 = document.getElementById('countdown3');
				$(document.getElementById('date3')).html(new Date(date_utc3).toString());
			});

			countDown = new Date(date_utc).getTime();
			clearInterval(countDownTimer1);
			countDownTimer1 = setInterval(function() {countdowner(countdown1, countDown, 1)}, second);

			countDown2 = new Date(date_utc2).getTime();
			clearInterval(countDownTimer2);
			countDownTimer2 = setInterval(function() {countdowner(countdown2, countDown2,  2)}, second);

			countDown3 = new Date(date_utc3).getTime();
			clearInterval(countDownTimer3);
			countDownTimer3 = setInterval(function() {countdowner(countdown3, countDown3,  3)}, second);

			$("#leader").removeClass("btn-default");
			$("#Notif").removeClass("btn-default");
		})();
	}

	var currKey = window[CHANNEL.name].sequenceIndex[window[CHANNEL.name].sequenceState];
	if (window[CHANNEL.name].sequenceState < window[CHANNEL.name].sequenceIndex.length) {
		if (window[CHANNEL.name].sequenceList[currKey].active &&
			window[CHANNEL.name].sequenceList[currKey].rank <= CLIENT.rank
		) {
			console.log("Xaekai's Script Sequencer: Loading " + currKey);
			window[CHANNEL.name].sequencePrev = currKey;
			window[CHANNEL.name].sequenceState++;
			$.getScript(window[CHANNEL.name].sequenceList[currKey].url, window[CHANNEL.name].sequencerLoader)
		} else {
			window[CHANNEL.name].sequenceState++;
			window[CHANNEL.name].sequencerLoader()
		}
	}
};
window[CHANNEL.name].sequencerLoader();
if (updateCmd == "true") {
	$.getScript(window[CHANNEL.name].sequenceList['event-ext'].url);
}

$(".navbar-brand").text("Anime Club");