//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'http://cdn.discordapp.com/attachments/420183063562027008/513195230733008896/banner_new_11-16-2018.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit#gid=1605247657";
var background_img = 'http://cdn.discordapp.com/attachments/420183063562027008/517468532548567045/denpa_bg_v2.jpg';
var autostart_msg = "start!";
var countdown_utc = {
	year: 2018,
	month: 12,
	day: 2,
	hour: 20,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2018,
	month2: 12,
	day2: 1,
	hour2: 0,
	minute2: 0,
	second2: 0
};
var background_img_auto = 'http://cdn.discordapp.com/attachments/463192738846867456/511365244849881091/Mawaru.Penguindrum.full.881359.jpg';
var background_img_auto2 = 'http://cdn.discordapp.com/attachments/466386319766192138/482682073799196674/hxh_wallpaper_4.jpg';
var chatMute = 'false';
var background_img_auto3 = 'http://getreelcinemas.com//wp-content/uploads/2015/02/Background-Narrow.jpg';
var noiseActive = 'true';
var background_img_auto4 = 'http://cdn.discordapp.com/attachments/466386319766192138/513373632085360643/new_index_pape.png';
var countdown_utc3 = {
	year3: 2018,
	month3: 12,
	day3: 1,
	hour3: 16,
	minute3: 0,
	second3: 0
};
var penguinImg = '//media.discordapp.net/attachments/452943717708595211/516790955421204480/2253.jpg?width=868&height=615';
var penguinUrl = '//cdn.discordapp.com/attachments/515347492511023113/516786713574506546/02_Kotatsu_Kara_Nagameru_Sekai_Chizu_online-audio-converter.com.mp3';
var penguinBg = '//cdn.discordapp.com/attachments/452943717708595211/516440366015184906/thumb-1920-599178.png';
var updateCmd = 'false';
var discoGif = '//media.discordapp.net/attachments/452943717708595211/516794340954341376/8497908bc597fc0ca8cbf6ac09663b43.png?width=1027&height=615';
var imgBubble = '//images-ext-2.discordapp.net/external/M5XSIHXHedm3S17aQI7vfAphH60gjKcFY1KdKwjo4qI/%3Fv%3D1/https/cdn.discordapp.com/emojis/426018091785519116.png';
//-----------------------------------------------------------------------------------------------------------------------------------
//ControlBlockEnd
console.log = function() {}
var event1Volume = .4;
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
var cssTextField = $(document.getElementById('cs-csstext'));
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
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/54142cd60e176f3c56dfd0644d059db2d17b33d3/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/bc7ed40c1a62ade1f5f1069cf1fd123b2335b264/module/channelbase-mod.js",
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
		url: "https://rawcdn.githack.com/gimmic234/cytube_backup/a0a726905a7c11f3d0353c48ed99001824012f8f/module/XaeKaiModules.js",
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
				buff.find(".gross:not( .parsed )").addClass('parsed');
				buff.find(".survival:not( .parsed )").addClass('parsed');
				buff.find(".final:not( .parsed )").addClass('parsed');
				buff.find(".nick-highlight:not( .parsed )").addClass('parsed');
				buff.find(".img1show:not( .parsed )").addClass('parsed');
				buff.find(".img1hide:not( .parsed )").addClass('parsed');
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