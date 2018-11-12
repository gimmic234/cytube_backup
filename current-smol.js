//-------------------------------------------------[CONTROL BLOCK]----------------------------------------------------------------------
//https is preferred for url
var banner_url = 'http://cdn.discordapp.com/attachments/420183063562027008/508982831586738176/banner_new_11-04-2018.png?width=1300&height=250';
var href_url = "https://docs.google.com/spreadsheets/d/1C8yBViojH0E839tlS9kZLCRN99B-6UYh2hGKAB_QTAI/edit#gid=1605247657";
var background_img = 'http://cdn.discordapp.com/attachments/463192738846867456/511365244849881091/Mawaru.Penguindrum.full.881359.jpg';
var autostart_msg = "start!";
var countdown_utc = {
	year: 2018,
	month: 11,
	day: 15,
	hour: 0,
	minute: 0,
	second: 0,
};
var countdown_utc2 = {
	year2: 2018,
	month2: 11,
	day2: 17,
	hour2: 0,
	minute2: 0,
	second2: 0
};
var background_img_auto = 'http://cdn.discordapp.com/attachments/463192738846867456/511365244849881091/Mawaru.Penguindrum.full.881359.jpg';
var background_img_auto2 = 'http://cdn.discordapp.com/attachments/466386319766192138/482682073799196674/hxh_wallpaper_4.jpg';
var chatMute = 'false';
var background_img_auto3 = 'http://getreelcinemas.com//wp-content/uploads/2015/02/Background-Narrow.jpg';
//-----------------------------------------------------------------------------------------------------------------------------------
//ControlBlockEnd
console.log = function() {}
var emoteTable = "false";
var grossimg = '//media.discordapp.net/attachments/409829343263719427/511685643580080137/1381184072836.jpg';
var voteskipImg = 'https://cdn.discordapp.com/attachments/409829343263719427/511380810637770752/Ban_circle_font_awesome-red.svg.png';
const second = 1000,
	minute = second * 60,
	hour = minute * 60,
	day = hour * 24;
var emoteArray = [];
var selectedPopover;
var handlerKeydown;
var date_utc = Date.UTC(countdown_utc.year, countdown_utc.month - 1, countdown_utc.day, countdown_utc.hour, countdown_utc.minute, countdown_utc.second);
var date_utc2 = Date.UTC(countdown_utc2.year2, countdown_utc2.month2 - 1, countdown_utc2.day2, countdown_utc2.hour2, countdown_utc2.minute2, countdown_utc2.second2);
var chatlineElem;
var queueList;
var emoteList;
var countDown;
var countDownTimer;
var countDown2;
var countDownTimer2;
var collapseArrow;
var autoPosition = -1;
var voteskipMsg = "==BZZZZT!==";
var voteskipMsgFinal = "---BZZZZT!---";
var countdown1, countdown2;
var rankMod = (window.CLIENT.rank >= 2),
	rankAdmin = (window.CLIENT.rank >= 3);
var motdMode = $(document.getElementById('motd-mode'));
var jsTextField = $(document.getElementById('cs-jstext'));
var bodyElem = document.body;

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
		url: "https://raw.githack.com/gimmic234/cytube_backup/b0e0904e1aea4bb0e8e19c7c51b2fa3b0a52be17/current-ext.js",
		callback: true
	},
	'layout': {
		active: 1,
		rank: -1,
		url: "https://raw.githack.com/gimmic234/cytube_backup/2d2edd233452cfd9a5d8789f1e00a7def56d5063/module/channelbase-mod.js",
		callback: true
	},
	'xaekai': {
		active: 1,
		rank: -1,
		url: "https://raw.githack.com/gimmic234/cytube_backup/b0e0904e1aea4bb0e8e19c7c51b2fa3b0a52be17/module/XaeKaiModules.js",
		callback: true
	},
	'channel': {
		active: 1,
		rank: -1,
		url: "https://rawgit.com/gimmic234/cytube_backup/067c40e2d8dab045009b7f666cc541a1c8923a32/enhancer-mod.min.js",
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
				buff.find(".final:not( .parsed )").addClass('parsed');
				buff.find(".nick-highlight:not( .parsed )").addClass('parsed');
			});

			waitForEl('#club_redirect', function() {
				$('#club_redirect').attr('href', href_url);
				collapseArrow = $(document.getElementById('collapseArrow'));
			});
			waitForEl('#club_banner', function() {
				$('#club_banner').attr('src', banner_url);
			});

			waitForEl('#chatline', function() {
				chatlineElem = $(document.getElementById('chatline'))
				populateEmote();
				chatlineElem.off('keydown');
				chatlineElem.on('keydown', function(e) {
					chatHandler(e);
				});
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
				$(document.getElementById('backg')).css('background-image', "url(" + background_img + ")");
			});

			waitForEl('#countdown1', function() {
				countdown1 = document.getElementById('countdown1');
				$(document.getElementById('date1')).html(new Date(date_utc).toString());
				countdown2 = document.getElementById('countdown2');
				$(document.getElementById('date2')).html(new Date(date_utc2).toString());
			});

			countDown = new Date(date_utc).getTime();
			clearInterval(countDownTimer);
			countDownTimer = setInterval(function() {
				if ($('#countdown1:hidden').length > 0) {
					$('#countdown1').show();
				}
				let now = new Date().getTime(),
					distance = countDown - now;
				document.getElementById('days').innerText = Math.floor(distance / (day)),
					document.getElementById('hours').innerText = Math.floor((distance % (day)) / (hour)),
					document.getElementById('minutes').innerText = Math.floor((distance % (hour)) / (minute)),
					document.getElementById('seconds').innerText = Math.floor((distance % (minute)) / second);

				let totalSeconds = Math.floor(distance / second);

				if (totalSeconds < 86400 && !countdown1.classList.contains('countdownbaseActive')) {
					$(countdown1).removeClass('countdownbase');
					$(countdown1).addClass('countdownbaseActive');
				}

				if (totalSeconds > 86400 && countdown1.classList.contains('countdownbaseActive')) {
					$(countdown1).removeClass('countdownbaseActive');
					$(countdown1).addClass('countdownbase');
				}

				if (distance < 0) {
					clearInterval(countDownTimer);
					$('#countdown1').hide();
				}

			}, second)
			countDown2 = new Date(date_utc2).getTime();
			clearInterval(countDownTimer2);
			countDownTimer2 = setInterval(function() {
				if ($('#countdown2:hidden').length > 0) {
					$('#countdown2').show();
				}
				let now2 = new Date().getTime(),
					distance2 = countDown2 - now2;
				document.getElementById('days2').innerText = Math.floor(distance2 / (day)),
					document.getElementById('hours2').innerText = Math.floor((distance2 % (day)) / (hour)),
					document.getElementById('minutes2').innerText = Math.floor((distance2 % (hour)) / (minute)),
					document.getElementById('seconds2').innerText = Math.floor((distance2 % (minute)) / second);
				let totalSeconds = Math.floor(distance2 / second);

				if (totalSeconds < 86400 && !countdown2.classList.contains('countdownbaseActive')) {
					$(countdown2).removeClass('countdownbase');
					$(countdown2).addClass('countdownbaseActive');
				}

				if (totalSeconds > 86400 && countdown2.classList.contains('countdownbaseActive')) {
					$(countdown2).removeClass('countdownbaseActive');
					$(countdown2).addClass('countdownbase');
				}

				if (distance2 < 0) {
					clearInterval(countDownTimer2);
					$('#countdown2').hide();
				}
			}, second)

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


$(".navbar-brand").text("Anime Club");